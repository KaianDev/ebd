import { searchMember } from "@/api/api";
import { useMemberCtx } from "@/contexts/memberContext";
import * as data from "@/data/data";
import { useRef } from "react";
import { LuSearch } from "react-icons/lu";

type Props = {
    handleSearch: () => void;
};
export const Search = ({ handleSearch }: Props) => {
    const name = useRef<HTMLInputElement>(null);
    const birthMonth = useRef<HTMLSelectElement>(null);
    const sex = useRef<HTMLSelectElement>(null);
    const hasChild = useRef<HTMLSelectElement>(null);
    const isTeacher = useRef<HTMLSelectElement>(null);

    const memberCtx = useMemberCtx();

    const handleSearchButton = async () => {
        if (
            name.current?.value === "" &&
            birthMonth.current?.value === "" &&
            sex.current?.value === "" &&
            hasChild.current?.value === "" &&
            isTeacher.current?.value === ""
        ) {
            return;
        }
        const results = await searchMember({
            name: name.current?.value,
            birthMonth: birthMonth.current?.value,
            sex: sex.current?.value,
            hasChild: hasChild.current?.value,
            isTeacher: isTeacher.current?.value,
        });

        if (results) {
            memberCtx?.saveMembers(results);
            handleSearch();
        }
    };
    return (
        <div className="w-full overflow-auto mb-5">
            <h2 className="font-semibold">Filtre suas buscas:</h2>
            <table className="w-full mb-2 overflow-hidden rounded-md">
                <thead className="bg-zinc-500">
                    <tr>
                        <td className="p-2">Nome</td>
                        <td className="p-2 truncate">Mês</td>
                        <td className="p-2">Sexo</td>
                        <td className="p-2">Tem filhos</td>
                        <td className="p-2">É professor</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody className="bg-zinc-100">
                    <tr>
                        <td className="p-2">
                            <input
                                ref={name}
                                type="search"
                                className="p-2 border-2 rounded-md"
                                placeholder="Pesquise"
                            />
                        </td>
                        <td className="p-2">
                            <select
                                ref={birthMonth}
                                className="p-2 bg-zinc-400 rounded-md w-max cursor-pointer">
                                <option value="">Selecione</option>
                                {data.months.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </td>
                        <td className="p-2">
                            <select
                                ref={sex}
                                className="p-2 bg-zinc-400 rounded-md text-center cursor-pointer">
                                <option value="">Selecione</option>
                                <option value="M">Masculino</option>
                                <option value="F">Feminino</option>
                            </select>
                        </td>
                        <td className="p-2">
                            <select
                                ref={hasChild}
                                className="p-2 bg-zinc-400 rounded-md text-center cursor-pointer">
                                <option value="">Selecione</option>
                                <option value="yes">Sim</option>
                                <option value="no">Não</option>
                            </select>
                        </td>
                        <td className="p-2">
                            <select
                                ref={isTeacher}
                                className="p-2 bg-zinc-400 rounded-md text-center cursor-pointer">
                                <option value="">Selecione</option>
                                <option value="yes">Sim</option>
                                <option value="no">Não</option>
                            </select>
                        </td>
                        <td className="p-2">
                            <button
                                onClick={handleSearchButton}
                                className="p-2 bg-amber-500 rounded-md duration-200 ease-in
                             hover:bg-amber-600">
                                <LuSearch size={20} />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
