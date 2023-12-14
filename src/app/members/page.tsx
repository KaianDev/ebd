"use client";
import { useEffect, useState } from "react";
import Table from "./components/Table";
import { useRouter } from "next/navigation";

const Page = () => {
    const [scroll, setScroll] = useState(0);
    const navigate = useRouter();

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
                <div>
                    <input
                        type="search"
                        className="p-2 w-full"
                        placeholder="Pesquisar"
                    />
                    <div>Filtros</div>
                </div>
                <Table />
                {scroll !== 0 && (
                    <button
                        onClick={toTop}
                        className="fixed bottom-5 right-5 bg-amber-500 p-2 rounded-full ">
                        Top
                    </button>
                )}
            </div>
        </section>
    );
};

export default Page;
