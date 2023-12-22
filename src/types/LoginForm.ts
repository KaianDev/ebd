import { loginSchema } from "@/schemas/loginSchema";
import z from "zod";
export type LoginFormType = z.infer<typeof loginSchema>;
