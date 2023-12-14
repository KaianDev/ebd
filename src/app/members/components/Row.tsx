"use client";
import { getAge } from "@/utils/getAge";
import { Member } from "@/types/Member";
import { LuTrash, LuFileEdit } from "react-icons/lu";
import { useState } from "react";
import { FadeIn } from "@/components/FadeIn";
import { Modal } from "./Modal";
import { useRouter } from "next/navigation";
import { useMemberCtx } from "@/contexts/memberContext";

type Props = {
    member: Member;
};

const Row = ({ member }: Props) => {
    const memberCtx = useMemberCtx();

    const [showModal, setShowModal] = useState(false);
    const navigate = useRouter();

    const birthDate = new Date(member.birthDate).toLocaleDateString("pt-BR", {
        timeZone: "UTC",
    });
    const age = getAge(new Date(member.birthDate));

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleEditMemberClick = () => {
        memberCtx?.saveMember(member);
        navigate.push(`/members/edit`);
    };

    return (
        <>
            <tr className="border-2 overflow-x-scroll max-w-full hover:bg-zinc-300">
                <td className="p-2">
                    <p className="truncate font-semibold">{member.name}</p>
                    <p className="text-xs">{age} anos</p>
                </td>
                <td className="text-center">{birthDate}</td>
                <td className="text-center text-lg p-2">
                    {member.sex === "M" ? "👨🏻" : "👩🏻"}
                </td>
                <td className="text-center text-lg p-2">
                    {member.hasChild ? "✅" : "❌"}
                </td>
                <td className="text-center text-lg p-2">
                    {member.isTeacher ? "✅" : "❌"}
                </td>
                <td className="text-center p-2">
                    <button
                        onClick={handleEditMemberClick}
                        className="bg-yellow-500 p-2 rounded-md duration-200 ease-in hover:bg-yellow-600 hover:text-white">
                        <LuFileEdit size={16} />
                    </button>
                </td>
                <td className="text-center p-2">
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-red-500 p-2 rounded-md duration-200 ease-in hover:bg-red-600 hover:text-white">
                        <LuTrash size={16} />
                    </button>
                </td>
            </tr>
            {showModal && (
                <FadeIn>
                    <Modal
                        key={member.id}
                        memberId={member.id}
                        closeModal={handleCloseModal}
                        name={member.name}
                    />
                </FadeIn>
            )}
        </>
    );
};

export default Row;
