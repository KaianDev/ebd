"use client";
import { useEffect, useState } from "react";
import Table from "@/components/Table";
import { useRouter } from "next/navigation";
import { Search } from "./components/Search";
import { useMembers } from "@/utils/queries";
import { LuArrowBigUp } from "react-icons/lu";
import { useMemberCtx } from "@/contexts/memberContext";

const Page = () => {
    const [scroll, setScroll] = useState(0);
    const navigate = useRouter();
    const members = useMembers();
    const [showSearch, setShowSearch] = useState(false);

    useEffect(() => {
        const toTopScroll = () => setScroll(window.scrollY);
        window.addEventListener("scroll", toTopScroll);
        return () => window.removeEventListener("scroll", toTopScroll);
    }, []);

    const toTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const memberCtx = useMemberCtx();

    const handleSearchMember = () => setShowSearch(true);

    return (
        <section className="flex-1 p-3 bg-zinc-200 gap-4">
            <div className="max-w-3xl w-full mx-auto flex flex-col relative">
                <div className="flex items-center justify-between">
                    <h2 className="text-base sm:text-xl font-semibold">
                        Cadastrar novo membro
                    </h2>
                    <button
                        onClick={() => navigate.push("/members/register")}
                        className="p-2 bg-amber-500 mb-2 rounded-md border-2  font-bold hover:bg-zinc-700 duration-200 ease-linear cursor-pointer hover:text-amber-500">
                        Cadastrar
                    </button>
                </div>
                <Search handleSearch={handleSearchMember} />
                {members.isLoading && (
                    <div className="w-full flex items-center justify-center gap-2">
                        <div className="w-6 h-6 rounded-full border-t-4 border-l-4 border-amber-500 animate-spin"></div>
                        <p className="text-amber-500">Carregando...</p>
                    </div>
                )}
                {!showSearch && members.data && (
                    <Table members={members.data} />
                )}
                {showSearch && memberCtx?.searchMembers && (
                    <Table members={memberCtx.searchMembers} />
                )}
                {scroll !== 0 && (
                    <button
                        onClick={toTop}
                        className="fixed bottom-5 right-5 bg-amber-500 p-2 rounded-full">
                        <LuArrowBigUp size={20} />
                    </button>
                )}
            </div>
        </section>
    );
};

export default Page;
