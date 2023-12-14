import { MemberForm } from "@/types/MemberForm";
import { UseControllerProps, useController } from "react-hook-form";

interface Props extends UseControllerProps<MemberForm> {
    placeholder?: string;
    label?: string;
    value?: string;
    defaultChecked?: boolean;
}

export const InputRadio = ({
    value,
    label,
    placeholder,
    defaultChecked,
    ...props
}: Props) => {
    const { field, fieldState } = useController(props);
    return (
        <div>
            <label className="p-3 flex gap-2 border-2 rounded-md cursor-pointer hover:bg-amber-400 duration-200 ease-in">
                <input
                    {...field}
                    type="radio"
                    placeholder={placeholder}
                    value={value}
                    name={props.name}
                    defaultChecked={defaultChecked}
                />
                <span className={`${fieldState.error && "text-red-400"}`}>
                    {label}
                </span>
            </label>
        </div>
    );
};
