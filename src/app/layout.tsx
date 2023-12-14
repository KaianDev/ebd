import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "@/utils/providers";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "EBD",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt-BR">
            <body className={poppins.className}>
                <Providers>
                    <div className="h-full flex flex-col">
                        <Header />
                        {children}
                        <Footer />
                    </div>
                </Providers>
            </body>
        </html>
    );
}
