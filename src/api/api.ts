import { LoginForm } from "@/types/LoginForm";
import { Member } from "@/types/Member";
import { req } from "@/api/axios";
import { Token } from "@/types/Token";
import { MemberForm } from "@/types/MemberForm";
import { Filters } from "@/types/Filters";

export const login = async (data: LoginForm) => {
    try {
        const results = await req.post("/login", data);
        return results.data as Token;
    } catch (err: any) {
        throw err.response.data.error;
    }
};

export const addNewMember = async (data: MemberForm): Promise<Member> => {
    const token = localStorage.getItem("ebd-login");
    try {
        const results = await req.post("/members", data, {
            headers: { Authorization: `Token ${token}` },
        });
        return results.data.member as Member;
    } catch (err: any) {
        throw err.response.data.error;
    }
};

export const getMembers = async (): Promise<Member[]> => {
    const token = localStorage.getItem("ebd-login");
    try {
        const results = await req.get("/members", {
            headers: { Authorization: `Token ${token}` },
        });
        return results.data.members as Member[];
    } catch (err: any) {
        throw err.response.data.error;
    }
};

export const getMember = async (id: number) => {
    const token = localStorage.getItem("ebd-login");
    const results = await req.get(`/members/${id}`, {
        headers: { Authorization: `Token ${token}` },
    });
    return (results.data.member as Member) || false;
};

interface EditRequest extends MemberForm {
    id: number;
}

export const editMember = async (member: EditRequest) => {
    const token = localStorage.getItem("ebd-login");
    const results = await req.put(`/members/${member.id}`, member, {
        headers: { Authorization: `Token ${token}` },
    });
    return results.data;
};

export const removeMember = async (id: number) => {
    const token = localStorage.getItem("ebd-login");
    const results = await req.delete(`/members/${id}`, {
        headers: { Authorization: `Token ${token}` },
    });
    return results.data;
};

export const searchMember = async (filters: Filters) => {
    const token = localStorage.getItem("ebd-login");
    const results = await req.get(
        `/members/search?${
            filters.birthMonth ? `birthMonth=${filters.birthMonth}&` : ""
        }${filters.name ? `name=${filters.name}&` : ""}${
            filters.sex ? `sex=${filters.sex}&` : ""
        }${filters.hasChild ? `hasChild=${filters.hasChild}&` : ""}${
            filters.isTeacher ? `isTeacher=${filters.isTeacher}` : ""
        }`,
        {
            headers: { Authorization: `Token ${token}` },
        }
    );
    return results.data.members as Member[];
};
