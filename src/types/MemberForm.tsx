import { memberFormSchema } from "@/schemas/memberFormSchema";
import { z } from "zod";

export type MemberForm = z.infer<typeof memberFormSchema>;
