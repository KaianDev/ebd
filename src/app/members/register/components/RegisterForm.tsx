"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddMember } from "@/utils/mutations";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { CancelButton } from "@/components/CancelButton";
import { ConfirmButton } from "@/components/ConfirmButton";
import { memberFormSchema } from "@/schemas/memberFormSchema";
import { MemberForm } from "@/types/MemberForm";
import { Input } from "@/components/Input";
import { InputRadio } from "@/components/InputRadio";

const RegisterForm = () => {
    const { control, handleSubmit } = useForm<MemberForm>({
        resolver: zodResolver(memberFormSchema),
    });

    const addMember = useAddMember();
    const navigate = useRouter();

    const onRegister = async (data: MemberForm) => {
        data.hasChild = data.hasChild === "yes" ? true : false;
        data.isTeacher = data.isTeacher === "yes" ? true : false;
        await addMember.mutateAsync(data, {
            onSuccess() {
                toast.success("Membro Cadastrado!", { autoClose: 500 });
            },
        });
        setTimeout(() => navigate.push("/members"), 2500);
    };

    return (
        <div className="p-6 max-w-3xl mx-auto w-full bg-white rounded-md shadow-md mb-6">
            <form
                onSubmit={handleSubmit(onRegister)}
                className="flex flex-col gap-6">
                <Input
                    id="name"
                    control={control}
                    name="name"
                    type="text"
                    label="Nome"
                    placeholder="Digite o nome"
                />
                <Input
                    id="birthDate"
                    control={control}
                    name="birthDate"
                    type="date"
                    label="Data de Nascimento"
                />
                <div>
                    <h3 className="font-bold">Informe o sexo:</h3>
                    <div className="grid grid-cols-2 gap-2">
                        <InputRadio
                            control={control}
                            name="sex"
                            label="Masculino"
                            value="M"
                        />
                        <InputRadio
                            control={control}
                            name="sex"
                            label="Feminino"
                            value="F"
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
                        />
                        <InputRadio
                            control={control}
                            name="isTeacher"
                            value="no"
                            label="Não"
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
                        />
                        <InputRadio
                            control={control}
                            name="hasChild"
                            value="no"
                            label="Não"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <ConfirmButton type="submit">Cadastrar</ConfirmButton>
                    <CancelButton onClick={() => navigate.push("/members")}>
                        Cancelar
                    </CancelButton>
                </div>
            </form>
            {addMember.isSuccess && <ToastContainer />}
        </div>
    );
};

export default RegisterForm;
