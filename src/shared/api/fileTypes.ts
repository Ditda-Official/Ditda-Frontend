import { z } from "zod";

export const filePresignedUrlResultSchema = z.object({
  key: z.string(),
  presignedUrl: z.string(),
});

export type FilePresignedUrlResult = z.infer<typeof filePresignedUrlResultSchema>;

export type PostFilePresignedUrlBody<Target extends string = string> = {
  target: Target;
  contentType: string;
};
