"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { CancelButton } from "@/components/CancelButton";
import { ConfirmButton } from "@/components/ConfirmButton";
import { useMemberCtx } from "@/contexts/memberContext";
import { useEditMember } from "@/utils/mutations";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { InputRadio } from "@/components/InputRadio";
import { MemberForm } from "@/types/MemberForm";
import { Input } from "@/components/Input";
import { memberFormSchema } from "@/schemas/memberFormSchema";

const EditForm = () => {
    const memberCtx = useMemberCtx();
    const birthDate =
        memberCtx?.member &&
        new Date(memberCtx.member.birthDate).toJSON().slice(0, 10);

    const { control, handleSubmit } = useForm<MemberForm>({
        resolver: zodResolver(memberFormSchema),
        defaultValues: {
            name: memberCtx?.member?.name,
            birthDate,
            sex: memberCtx?.member?.sex,
            hasChild: memberCtx?.member?.hasChild === true ? "yes" : "no",
            isTeacher: memberCtx?.member?.isTeacher === true ? "yes" : "no",
        },
    });

    const editMember = useEditMember();

    const navigate = useRouter();

    const onEdit = async (data: MemberForm) => {
        data.hasChild = data.hasChild === "yes" ? true : false;
        data.isTeacher = data.isTeacher === "yes" ? true : false;
        if (!memberCtx?.member) return;
        await editMember.mutateAsync(
            { id: memberCtx.member.id, ...data },
            {
                onSuccess() {
                    toast.success("Membro editado com sucesso", {
                        autoClose: 500,
                    });
                    setTimeout(() => navigate.push("/members"), 2000);
                },
            }
        );
    };

    return (
        <div className="p-6 max-w-3xl mx-auto w-full bg-white rounded-md shadow-md mb-6">
            <form
                onSubmit={handleSubmit(onEdit)}
                className="flex flex-col gap-6">
                <Input
                    id="name"
                    control={control}
                    name="name"
                    type="text"
                    label="Nome"
                    defaultValue={memberCtx?.member?.name}
                    placeholder="Digite o nome"
                />
                <Input
                    id="birthDate"
                    control={control}
                    name="birthDate"
                    type="date"
                    label="Data de Nascimento"
                    defaultValue={birthDate}
                />
                <div>
                    <h3 className="font-bold">Informe o sexo:</h3>
                    <div className="grid grid-cols-2 gap-2">
                        <InputRadio
                            control={control}
                            name="sex"
                            label="Masculino"
                            value="M"
                            defaultChecked={memberCtx?.member?.sex === "M"}
                        />
                        <InputRadio
                            control={control}
                            name="sex"
                            label="Feminino"
                            value="F"
                            defaultChecked={memberCtx?.member?.sex === "F"}
                        />
                    </div>
                </div>
                <div>
                    <h3 className="font-bold">É professor?</h3>
                    <div className="grid grid-cols-2 gap-2">
                        <InputRadio
                            control={control}
                            name="isTeacher"
                            value="yes"
                            label="Sim"
                            defaultChecked={
                                memberCtx?.member?.isTeacher === true ?? false
                            }
                        />
                        <InputRadio
                            control={control}
                            name="isTeacher"
                            value="no"
                            label="Não"
                            defaultChecked={
                                memberCtx?.member?.isTeacher === false ?? true
                            }
                        />
                    </div>
                </div>
                <div>
                    <h3 className="font-bold">Tem filho(s)?</h3>
                    <div className="grid grid-cols-2 gap-2">
                        <InputRadio
                            control={control}
                            name="hasChild"
                            value="yes"
                            label="Sim"
                            defaultChecked={
                                memberCtx?.member?.hasChild === true ?? false
                            }
                        />
                        <InputRadio
                            control={control}
                            name="hasChild"
                            value="no"
                            label="Não"
                            defaultChecked={
                                memberCtx?.member?.hasChild === false ?? true
                            }
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <ConfirmButton type="submit">Editar</ConfirmButton>
                    <CancelButton onClick={() => navigate.push("/members")}>
                        Cancelar
                    </CancelButton>
                </div>
            </form>
            {editMember.isSuccess && <ToastContainer />}
        </div>
    );
};

export default EditForm;
