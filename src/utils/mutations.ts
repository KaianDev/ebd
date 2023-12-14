import { useMutation } from "@tanstack/react-query";
import { addNewMember, editMember, login, removeMember } from "../api/api";
import { queryClient } from "./queryClient";

export const useLogin = () => {
    return useMutation({
        mutationFn: login,
    });
};

export const useAddMember = () => {
    return useMutation({
        mutationFn: addNewMember,
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ["members"],
            });
        },
    });
};

export const useEditMember = () => {
    return useMutation({
        mutationFn: editMember,
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ["members"],
            });
        },
    });
};

export const useRemoveMember = (id: number) => {
    return useMutation({
        mutationFn: () => removeMember(id),
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ["members"],
            });
        },
    });
};
