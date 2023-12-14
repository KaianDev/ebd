import { z } from "zod";

export const editSchema = z.object({
    name: z
        .string({ required_error: "O campo é obrigatório!" })
        .min(2, "O nome deve conter pelo menos 2 letras")
        .optional(),
    birthDate: z.string({ required_error: "Campo obrigatório" }).optional(),
    sex: z.enum(["M", "F"], { required_error: "Campo obrigatório" }).optional(),
    isTeacher: z
        .enum(["yes", "no"], { required_error: "Campo obrigatório" })
        .or(z.boolean())
        .optional(),
    hasChild: z
        .enum(["yes", "no"], { required_error: "Campo obrigatório" })
        .or(z.boolean())
        .optional(),
});
