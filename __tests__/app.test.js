const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const data = require("../db/data/test-data");
const endpoints = require("../endpoints.json");

beforeEach(() => {
	return seed(data);
});

afterAll(() => {
	return db.end();
});

test.only("404", () => {
	return request(app).get("/aghhthht").expect(404);
});

describe("GET /api", () => {
	test("200: responds with endpoints.json", () => {
		return request(app)
			.get("/api")
			.expect(200)
			.then(({ body }) => {
				// expect body.endpoints to equal endpoints.json
			});
	});
});

describe("GET /api/topics", () => {
	test("200: returns array of all available topics", () => {
		return request(app)
			.get("/api/topics")
			.expect(200)
			.then(({ body }) => {
				// expect body.topics...
				expect(body.topics.length).toBe(3);
				body.topics.forEach((topic) => {
					expect(typeof topic.slug).toBe("string");
					expect(typeof topic.description).toBe("string");
				});
			});
	});
});
