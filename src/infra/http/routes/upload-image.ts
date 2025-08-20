import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { uploadImage } from "@/app/functions/errors/upload-image";
import { InvalidFileFormat } from "@/app/functions/errors/invalid-file-format";
import { isRight, unwrapEither } from "@/shared/either";

export const uploadImageRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/uploads",
    {
      schema: {
        summary: "Upload an image",
        consumes: ["multipart/form-data"],
        response: {
          201: z.object({ message: z.string() }),
          400: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const uploadedFile = await request.file({
        limits: {
          fieldSize: 1024 * 1024 * 2, // 2mb
        },
      });

      if (!uploadedFile) {
        return reply.status(400).send({ message: "No file uploaded" });
      }

      const result = await uploadImage({
        fileName: uploadedFile.filename || "unknown",
        contentType: uploadedFile.mimetype || "unknown",
        contentStream: uploadedFile.file,
      });

      if (isRight(result)) {
        return reply
          .status(201)
          .send({ message: "Image uploaded successfully" });
      }

      const error = unwrapEither(result);

      if (error instanceof InvalidFileFormat) {
        return reply.status(400).send({ message: error.message });
      }

      return reply.status(500).send({ message: "Internal server error" });
    }
  );
};
