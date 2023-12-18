import Row from "./Row";
import { Member } from "@/types/Member";

type Props = {
    members: Member[];
};

const Table = ({ members }: Props) => {
    return (
        <div className="w-full overflow-auto mb-8">
            {members.length === 0 && (
                <p className="text-center text-xl">
                    Nenhum resultado encontrado!
                </p>
            )}
            {members.length > 0 && (
                <table className="w-full overflow-hidden rounded-md shadow-md bg-zinc-50">
                    <thead className="bg-zinc-700 text-white font-light">
                        <tr>
                            <th className="p-2 text-start border-r">Nome</th>
                            <th className="truncate p-2 border-r">
                                Dt Nascimento
                            </th>
                            <th className="p-2 border-r">Sexo</th>
                            <th className="p-2 border-r">Filhos?</th>
                            <th className="p-2 border-r">Professor?</th>
                            <th colSpan={2} className="p-2">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {members.map((member) => (
                            <Row key={member.id} member={member} />
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Table;
