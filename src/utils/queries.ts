import { useQuery } from "@tanstack/react-query";
import { getMember, getMembers } from "../api/api";

export const useMembers = () => {
    return useQuery({
        queryKey: ["members"],
        queryFn: getMembers,
        staleTime: Infinity,
    });
};

export const useMember = (id: number) => {
    return useQuery({
        queryKey: ["members", id],
        queryFn: () => getMember(id),
        staleTime: Infinity,
    });
};
