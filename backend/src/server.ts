import Fastify from "fastify";
import { processRequest } from "./brain/central-brain";

const app = Fastify({
  logger: true
});

app.get("/", async () => {
  return {
    name: "E-commerce HQ",
    status: "online",
    version: "1.0.0",
    message: "Central Backend is running"
  };
});

app.get("/health", async () => {
  return {
    status: "healthy",
    service: "ecommerce-hq-backend",
    timestamp: new Date().toISOString()
  };
});

// Central Brain API
app.post<{
  Body: {
    message: string;
    projectId?: string;
  };
}>("/api/chat", async (request, reply) => {

  const result = processRequest(request.body || {
    message: ""
  });

  if (result.status === "rejected") {
    return reply.code(400).send(result);
  }

  return reply.code(200).send(result);
});

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 3000;

    await app.listen({
      port,
      host: "0.0.0.0"
    });

    console.log(`E-commerce HQ Backend running on port ${port}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();
