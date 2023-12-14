import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};
export const FadeIn = ({ children }: Props) => {
    return (
        <div className="fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center p-6 bg-black/30 z-10">
            {children}
        </div>
    );
};
