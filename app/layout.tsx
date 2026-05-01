import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/core/providers/query-provider";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const metadata: Metadata = {
	title: "Base Next.js App",
	description:
		"A starter template for building modern web applications with Next.js, React Query, and Tailwind CSS.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${inter.variable} h-full antialiased`}
			suppressHydrationWarning
		>
			<body className="min-h-full flex flex-col">
				<QueryProvider>
					<main className="flex-1 flex flex-col">{children}</main>
				</QueryProvider>

				<Toaster closeButton richColors position="top-right" />
			</body>
		</html>
	);
}
