const request = require('supertest');
const app = require('../../index');
const users = require('../user/user-case');

test("POST /api/auth/signout", async () => {
    const response = await request(app.callback()).post("/api/auth/signout");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "User logged out", token: null });
});

test("POST /api/auth/signup", async () => {
    for (let i = 0; i < users.length; i++) {
        const response = await request(app.callback())
            .post("/api/auth/signup")
            .send({ username: users[i].username, password: users[i].password, confirmPassword: users[i].confirmPassword });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("token");
        expect(response.body).toHaveProperty("user");
        expect(response.body).toHaveProperty("message");

        users[i].doneTest = true;
    }
});

test("POST /api/auth/signin", async () => {
    for (let i = 0; i < users.length; i++) {
        const response = await request(app.callback())
            .post("/api/auth/signin")
            .send({ username: users[i].username, password: users[i].password });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("token");
        expect(response.body).toHaveProperty("user");
        expect(response.body).toHaveProperty("message");
    }
})