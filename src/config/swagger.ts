import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AgriConnect API Docs",
      version: "1.0.0",
      description: "API documentation for AgriConnect",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }], // apply globally (optional)
  },
  apis: ["./src/routes/**/*.ts"], // make sure your protected.route.ts is included
});
