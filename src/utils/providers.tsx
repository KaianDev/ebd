"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ReactNode } from "react";
import { queryClient } from "./queryClient";
import { MemberContextProvider } from "@/contexts/memberContext";

export const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <MemberContextProvider>{children}</MemberContextProvider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
};
