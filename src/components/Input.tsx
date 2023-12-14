import { MemberForm } from "@/types/MemberForm";
import { HTMLInputTypeAttribute } from "react";
import { UseControllerProps, useController } from "react-hook-form";

interface Props extends UseControllerProps<MemberForm> {
    placeholder?: string;
    label?: string;
    type?: HTMLInputTypeAttribute;
    value?: string;
    defaultValue?: string;
    id: string;
}

export const Input = ({
    value,
    type,
    label,
    placeholder,
    id,
    defaultValue,
    ...props
}: Props) => {
    const { field, fieldState } = useController(props);
    return (
        <div className="relative flex flex-col">
            <label htmlFor={id} className="font-bold">
                {label}
            </label>
            <input
                {...field}
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                defaultValue={defaultValue}
                name={props.name}
                className="p-2 border-2 rounded-md outline-amber-400"
            />
            <div className="text-xs absolute -bottom-5 text-red-400">
                {fieldState.error && fieldState.error.message}
            </div>
        </div>
    );
};
