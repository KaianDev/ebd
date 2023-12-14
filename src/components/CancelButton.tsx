import { ComponentProps, ForwardedRef } from "react";

export const CancelButton = ({
    children,
    ...props
}: ComponentProps<"button">) => {
    return (
        <button
            {...props}
            type="button"
            className="w-full inline-block mx-auto p-2 bg-zinc-700 mb-2 rounded-md border-2 text-white font-bold hover:bg-red-500 duration-200 ease-linear cursor-pointer hover:text-zinc-700">
            {children}
        </button>
    );
};
