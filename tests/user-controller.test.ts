// tests/api.spec.ts
import { test, expect } from '@playwright/test';
import StatusCodes from "http-status-codes";
import {UserDTO} from "./DTO/UserDTO";

let baseURLWithEndpoint: string = 'http://localhost:3000/users';

test.describe('User management API', () => {

    test('all users: should return empty array when no users', async ({request}) => {
        const response = await request.get(`${baseURLWithEndpoint}/users`);
        expect(response.status()).toBe(StatusCodes.NOT_FOUND);
        const responseBody = await response.json();
        expect(responseBody).toEqual({message: "User not found"});
    });

    test('find user: should return a user by ID', async ({request}) => {
        const createUserResponse = await request.post(`${baseURLWithEndpoint}`);
        const createUserJson: UserDTO = await createUserResponse.json();
        const findUserResponse = await request.get(`${baseURLWithEndpoint}/${createUserJson.id}`);
        expect(findUserResponse.status()).toBe(200);
        const findUserJson: UserDTO = await findUserResponse.json();
        UserDTO.checkServerResponse(findUserJson);
    });

    test('find user: should return 404 if user not found', async ({request}) => {
        const findUserResponse = await request.get(`${baseURLWithEndpoint}/200`);
        expect(findUserResponse.status()).toBe(404);
    });

    test('create user: should add a new user', async ({request}) => {
        const createUserResponse = await request.post(`${baseURLWithEndpoint}`);
        const createUserJson: UserDTO = await createUserResponse.json();
        const deleteUserResponse = await request.delete(`${baseURLWithEndpoint}/${createUserJson.id}`);
        expect(deleteUserResponse.status()).toBe(StatusCodes.OK);
        const deleteUserJson: UserDTO = await deleteUserResponse.json();
        UserDTO.checkServerResponse(deleteUserJson);
    });

    test('delete user: should delete a user by ID', async ({request}) => {
        const createUserResponse = await request.post(`${baseURLWithEndpoint}`);
        const createUserJson: UserDTO = await createUserResponse.json();
        const deleteUserResponse = await request.delete(`${baseURLWithEndpoint}/${createUserJson.id}`);
        expect(deleteUserResponse.status()).toBe(StatusCodes.OK);
        const deleteUserJson: UserDTO = await deleteUserResponse.json();
        UserDTO.checkServerResponse(deleteUserJson);
    });

    test('delete user: should return 404 if user not found', async ({request}) => {
        const deleteUserResponse = await request.delete(`${baseURLWithEndpoint}/200`);
        expect(deleteUserResponse.status()).toBe(StatusCodes.NOT_FOUND);
    });
});