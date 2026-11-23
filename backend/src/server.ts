import Fastify from "fastify";

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
