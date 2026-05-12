import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/core/providers/query-provider";
import { getCurrentLocale } from "../core/i18n/locale-provider";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const metadata: Metadata = {
	title: "Base Next.js App",
	description:
		"A starter template for building modern web applications with Next.js, React Query, and Tailwind CSS.",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const locale = await getCurrentLocale();
	const messages = await getMessages();

	return (
		<html
			lang={locale}
			className={`${inter.variable} h-full antialiased`}
			suppressHydrationWarning
		>
			<body className="min-h-full flex flex-col">
				<NextIntlClientProvider locale={locale} messages={messages}>
					<QueryProvider>
						<main className="flex-1 flex flex-col">{children}</main>
					</QueryProvider>

					<Toaster closeButton richColors position="top-right" />
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
