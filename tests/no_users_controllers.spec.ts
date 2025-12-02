import { expect, test } from "@playwright/test";
import  StatusCodes  from "http-status-codes";

const baseURLWithEndpoint = "http://localhost:3000/users";


test("should return empty array when no users exist", async ({ request }) => {
    const response = await request.get(baseURLWithEndpoint);
    expect(response.status()).toBe(StatusCodes.OK);

    const responseBody = await response.text();
    expect(JSON.parse(responseBody)).toEqual([]);
});

test("should return 404 if deleting non-existent user", async ({ request }) => {
    const response = await request.delete(`${baseURLWithEndpoint}/1`);
    expect(response.status()).toBe(StatusCodes.NOT_FOUND);
});

test("should return 404 if user not found", async ({ request }) => {
    const response = await request.get(`${baseURLWithEndpoint}/1`);
    expect(response.status()).toBe(StatusCodes.NOT_FOUND);
});