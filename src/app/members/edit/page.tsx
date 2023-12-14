import EditForm from "./components/EditForm";

const Page = () => {
    return (
        <section className="flex-1 bg-zinc-200 p-3">
            <h2 className="p-3 text-center text-2xl font-semibold">
                Editar Membro
            </h2>
            <EditForm />
        </section>
    );
};

export default Page;
