"use client";
import { LoginFormType } from "@/types/LoginForm";
import { useLogin } from "@/utils/mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/schemas/loginSchema";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export default function Home() {
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<LoginFormType>({
        mode: "all",
        resolver: zodResolver(loginSchema),
    });

    const login = useLogin();
    const navigate = useRouter();

    const onLogin = async (data: LoginFormType) => {
        await login.mutateAsync(data, {
            onError() {
                toast.error("Senha Incorreta!", { autoClose: 500 });
                reset();
            },
            onSuccess(data) {
                localStorage.setItem("ebd-login", data.token);
                navigate.push("/members");
            },
        });
    };

    return (
        <div className="flex-1 flex justify-center items-start mt-8 p-6">
            <div className="p-6 bg-white rounded-md h-72 shadow-lg w-full max-w-xl">
                <h2 className="text-2xl text-zinc-700 font-semibold text-center mb-8 italic">
                    Fazer Login
                </h2>
                <form
                    onSubmit={handleSubmit(onLogin)}
                    className="flex flex-col gap-8">
                    <div className="flex flex-col relative">
                        <label
                            htmlFor="passwordField"
                            className="text-zinc-700 cursor-pointer w-max font-semibold text-lg">
                            Senha:
                        </label>
                        <input
                            {...register("password")}
                            type="password"
                            id="passwordField"
                            placeholder="Digite sua senha"
                            className="px-3 py-2 mt-1 rounded-md border-2 outline-amber-500"
                            autoFocus
                        />
                        {errors.password && (
                            <small className="text-red-500 absolute -bottom-5">
                                {errors.password.message}
                            </small>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="p-2 bg-zinc-700 text-xl text-white rounded-md hover:bg-amber-500 duration-200 ease-linear flex items-center justify-center"
                        disabled={login.isPending}>
                        {(login.isPending || login.isSuccess) && (
                            <div className="w-6 h-6 rounded-full border-t-4 border-l-4 border-white animate-spin"></div>
                        )}
                        {(login.isIdle || login.isError) && "Entrar"}
                    </button>
                </form>
                {login.error && <ToastContainer />}
            </div>
        </div>
    );
}
