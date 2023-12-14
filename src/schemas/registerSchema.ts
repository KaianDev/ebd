import { z } from "zod";

export const registerSchema = z.object({
    name: z
        .string({ required_error: "O campo é obrigatório!" })
        .min(2, "O nome deve conter pelo menos 2 letras"),
    birthDate: z.string({ required_error: "Campo obrigatório" }),
    sex: z.enum(["M", "F"], { required_error: "Campo obrigatório" }),
    isTeacher: z
        .enum(["yes", "no"], { required_error: "Campo obrigatório" })
        .or(z.boolean()),
    hasChild: z
        .enum(["yes", "no"], { required_error: "Campo obrigatório" })
        .or(z.boolean()),
});
