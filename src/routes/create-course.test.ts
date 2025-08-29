import { expect, test } from "vitest";
import request from "supertest";
import { server } from "../app.ts";
import { faker } from "@faker-js/faker";

function soma(n1: number, n2: number) {
  return n1 + n2;
}

test("cria um curso com sucesso", async () => {
  await server.ready();

  const response = await request(server.server)
    .post("/courses")
    .set("Content-Type", "application/json")
    .send({ title: faker.lorem.word(4) });

  console.log(response.body);
});
