import { z } from "zod";

export const loginSchema = z.object({
    password: z
        .string({ required_error: "Campo obrigatório" })
        .min(8, "Informe pelo menos 8 caracteres"),
});
