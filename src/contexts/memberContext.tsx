import { Member } from "@/types/Member";
import { ReactNode, createContext, useContext, useState } from "react";

type MemberContext = {
    member?: Member;
    saveMember: (member: Member) => void;
};

const memberContext = createContext<null | MemberContext>(null);

export const MemberContextProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [member, setMember] = useState<Member>();
    
    const saveMember = (member: Member) => {
        setMember(member);
    };

    return (
        <memberContext.Provider value={{ member, saveMember }}>
            {children}
        </memberContext.Provider>
    );
};

export const useMemberCtx = () => useContext(memberContext);
