"use client";
import { CancelButton } from "@/components/CancelButton";
import { ConfirmButton } from "@/components/ConfirmButton";
import { useRemoveMember } from "@/utils/mutations";

type Props = {
    name: string;
    closeModal: () => void;
    memberId: number;
};

export const Modal = ({ name, closeModal, memberId }: Props) => {
    const removeMember = useRemoveMember(memberId);

    const handleRemoveMember = async () => {
        removeMember.mutateAsync();
        closeModal();
    };

    return (
        <div className="bg-zinc-100 p-3 rounded-md max-w-md w-full">
            <h1 className="text-xl font-semibold text-center mb-6">
                Tem certeza que deseja excluir o membro{" "}
                <span className="underline">{name}</span>?
            </h1>

            <div className="grid grid-cols-2 gap-2">
                <ConfirmButton onClick={handleRemoveMember}>
                    Confirmar
                </ConfirmButton>
                <CancelButton onClick={() => closeModal()}>
                    Cancelar
                </CancelButton>
            </div>
        </div>
    );
};
