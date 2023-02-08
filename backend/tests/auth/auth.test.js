const request = require('supertest');
const app = require('../../index');

test("GET /", async () => {
    const response = await request(app.callback()).get("/");
    expect(response.status).toBe(401);
});

test("GET /api/auth", async () => {
    const response = await request(app.callback()).get("/api/auth");
    expect(response.status).toBe(200);
});