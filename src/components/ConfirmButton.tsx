import { ComponentProps, ForwardedRef } from "react";

export const ConfirmButton = ({
    children,
    ...props
}: ComponentProps<"button">) => {
    return (
        <button
            {...props}
            className="w-full inline-block mx-auto p-2 bg-amber-500 mb-2 rounded-md border-2  font-bold hover:bg-emerald-700 duration-200 ease-linear cursor-pointer hover:text-white">
            {children}
        </button>
    );
};
