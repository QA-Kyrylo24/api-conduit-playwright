import { test } from '../fixtures/fixtures';
import { expect } from '@playwright/test';
import { APIClient } from '../controllers/APIClient';
import { faker } from '@faker-js/faker';
import { UserFactory } from '../fixtures/PayloadFactory';


test('ID001 @user Sign UP with new User', async ({ request }) => {
    const uniqueUser = {
        username: `user${Date.now()}`,
        email: faker.internet.email().toLowerCase(),
        password: 'Test1234!',
    };
    const client = new APIClient(request);

    console.log(uniqueUser);
    const signUp = await client.auth.signUp(uniqueUser);

    expect(signUp.status(), 'Sign up should return 200').toBe(200);

    const signUpBody = await signUp.json();
    expect(signUpBody.user.token).toBeDefined();
    expect(signUpBody.user.email).toBe(uniqueUser.email);
    expect(signUpBody.user.username).toBe(uniqueUser.username);
});


test('ID002 @user Login with existing User', async ({ request }) => {
    const client = new APIClient(request);

    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;
    if (!email || !password) throw new Error('Fill EMAIL&PASSWORD in .env');
    const user = { email, password };
    const login = await client.auth.login(user);

    expect(login.ok(), `Login failed: ${login.status()}`).toBeTruthy();

    const loginBody = await login.json();
    expect(loginBody.user.token).toBeDefined();
    expect(loginBody.user.email).toBe(process.env.EMAIL);
    expect(loginBody.user.username).toBe(process.env.CONDUIT_USERNAME);
});

test('ID003 @user GET user', async ({ authedClient }) => {

    const getMyUser = await authedClient.users.getUser();
    expect(getMyUser.ok(), `GET /user failed: ${getMyUser.status()}`).toBeTruthy();

    const userBody = await getMyUser.json();
    expect(userBody.user.token).toBeDefined();
    expect(userBody.user.email).toBe(process.env.EMAIL);
    console.log(userBody)
});

test('ID004 @user Update (PUT) user', async ({ authedClient }) => {

   const updatePayload = UserFactory.createUpdateUserPayload({
    bio: 'updated via factory',
    username: 'automationqa1updated',
  });
  const response = await authedClient.users.updateUser(updatePayload);

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.user.bio).toBe(updatePayload.bio);
  expect(body.user.username).toBe(updatePayload.username);
});