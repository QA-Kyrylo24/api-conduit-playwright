import fs from 'fs';
import path from 'path';
import { APIClient } from '../controllers/APIClient';
const TOKENS_FILE = path.resolve(process.cwd(), 'tokens.json');

function readTokenFromFile(): string | null {
    if (!fs.existsSync(TOKENS_FILE)) {
        return null;
    }
    try {
        const raw = fs.readFileSync(TOKENS_FILE, "utf8");
        const data = JSON.parse(raw);

        if (!data.accessToken || typeof data.accessToken !== "string") {
            return null;
        }
        return data.accessToken;
    } catch (err) {
        return null;
    }
}

function writeTokenToFile(token: string) {
    fs.writeFileSync(
        TOKENS_FILE,
        JSON.stringify({ accessToken: token }, null, 2),
        'utf8'
    );
}

function parseJwt(token: string) {
    const payload = token.split('.')[1];
    const decoded = Buffer.from(payload, 'base64').toString('utf8');
    return JSON.parse(decoded);
}

function isExpired(token: string): boolean {
    try {
        const payload = parseJwt(token);
        const now = Math.floor(Date.now() / 1000);
        return now >= payload.exp;
    } catch {
        return true;
    }
}

export async function validateToken(
    client: APIClient
): Promise<string> {
    let token = readTokenFromFile();

    if (token && !isExpired(token)) {
        return token;
    }

    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;
    if (!email || !password) {
        throw new Error('EMAIL and PASSWORD must be set in .env');
    }

    const response = await client.auth.login({ email, password });
    if (!response.ok()) {
        throw new Error(`Login failed: ${response.status()}`);
    }

    const body = await response.json();
    token = body.user.token;
    if (!token) {
        throw new Error('Login response did not contain a token');
    }

    writeTokenToFile(token);
    return token;
}