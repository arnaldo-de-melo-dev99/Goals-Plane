//import "biome" from "@biomejs/biome";
import fastify from "fastify";
import { createGoal } from "../functions/create-goal";
import z from "zod";

const app = fastify();

app.post('/goals', (request) => {
    const createGoalBodySchema = z.object({
        title: z.string(),
        desiredWeeklyFrequency: z.number().int().min(1).max(7),
    });

    const body = createGoalBodySchema.parse(request.body);

   await createGoal({
        title: body.title,
        desiredWeeklyFrequency: body.desiredWeeklyFrequency,
    });
});

app.listen({
    port: 3333,
}).then(() => {
    console.log("Server is running on http://localhost:3333");
})