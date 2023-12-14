import { loginSchema } from "@/schemas/loginSchema";
import z from "zod";
export type LoginForm = z.infer<typeof loginSchema>;
