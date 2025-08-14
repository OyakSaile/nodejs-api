import fastify from "fastify";
import { db } from "./src/database/client.ts";
import { courses } from "./src/database/schema.ts";
import {
  validatorCompiler,
  serializerCompiler,
} from "fastify-type-provider-zod";
import { eq } from "drizzle-orm";

const server = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
});

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.get(
  "/courses",
  {
    schema,
  },
  async (request, reply) => {
    const result = await db.select().from(courses);

    return reply.send({ courses: result });
  }
);

// server.get("/courses/:id", async (request, reply) => {
//   type Params = {
//     id: string;
//   };

//   const params = request.params as Params;

//   const courseId = params.id;

//   const course = await db
//     .select()
//     .from(courses)
//     .where(eq(courses.id, courseId));

//   if (course.length > 0) {
//     return { course: course[0] };
//   }

//   return reply.status(404).send();
// });

// server.post("/courses", async (request, reply) => {
//   type Body = {
//     name: string;
//   };

//   const body = request.body as Body;
//   const courseName = body.name;

//   if (!courseName) {
//     return reply.status(400).send({ message: "Título obrigatório." });
//   }

//   const result = await db
//     .insert(courses)
//     .values({ name: courseName })
//     .returning();

//   return reply.status(201).send({
//     id: result[0].id,
//   });
// });

server.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running!");
});
