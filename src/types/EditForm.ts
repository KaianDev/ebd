import { editSchema } from "@/schemas/editSchema";
import { z } from "zod";

export type EditForm = z.infer<typeof editSchema>;
