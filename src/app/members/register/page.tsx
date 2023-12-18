import RegisterForm from "./components/RegisterForm";

const Page = () => {
    return (
        <section className="flex-1 bg-zinc-200 p-3">
            <h2 className="p-3 text-center text-2xl font-semibold">
                Cadastrar novo membro
            </h2>
            <RegisterForm />
        </section>
    );
};

export default Page;
