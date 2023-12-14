import { registerSchema } from "@/schemas/registerSchema";
import { z } from "zod";

export type RegisterForm = z.infer<typeof registerSchema>;
