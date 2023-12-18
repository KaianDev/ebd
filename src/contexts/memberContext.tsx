import { Member } from "@/types/Member";
import { ReactNode, createContext, useContext, useState } from "react";

type MemberContext = {
    member?: Member;
    searchMembers?: Member[];
    saveMember: (member: Member) => void;
    saveMembers: (members: Member[]) => void;
};

const memberContext = createContext<null | MemberContext>(null);

export const MemberContextProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [member, setMember] = useState<Member>();
    const [searchMembers, setSearchMembers] = useState<Member[]>();

    const saveMember = (member: Member) => {
        setMember(member);
    };

    const saveMembers = (members: Member[]) => {
        setSearchMembers(members);
    };

    return (
        <memberContext.Provider
            value={{ member, saveMember, searchMembers, saveMembers }}>
            {children}
        </memberContext.Provider>
    );
};

export const useMemberCtx = () => useContext(memberContext);
