"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
    const path = usePathname();
    const navigate = useRouter();
    const logout = () => {
        navigate.push("/");
        localStorage.removeItem("ebd-login");
    };

    return (
        <header className={`${path !== "/" && "bg-zinc-700"}`}>
            <div
                className={`flex p-3  items-center mx-auto max-w-3xl
            ${
                path === "/"
                    ? "flex-col justify-center"
                    : "flex-row shadow-lg justify-between"
            }`}>
                <Image
                    src="/logo.png"
                    alt="Logo EBD"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className={`${
                        path === "/" ? "w-auto h-32" : "h-16 w-auto invert"
                    }`}
                    priority={true}
                />
                <h1 className="text-xl sm:text-2xl font-semibold text-center text-amber-500">
                    Relação de Membros
                </h1>
                {path !== "/" && (
                    <button
                        onClick={logout}
                        className="px-3 bg-zinc-700 text-lg border-2 border-white text-white rounded-md hover:bg-amber-500  duration-200 ease-linear">
                        Sair
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;
