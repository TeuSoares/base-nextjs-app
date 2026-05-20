import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/core/providers/query-provider";
import { TooltipProvider } from "../components/ui/tooltip";
import { getCurrentLocale } from "../core/i18n/locale-provider";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
});

export async function generateMetadata(): Promise<Metadata> {
	const locale = await getCurrentLocale();
	const t = await getTranslations({ locale, namespace: "Metadata" });

	return {
		title: t("title"),
		description: t("description"),
	};
}

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
						<TooltipProvider>
							<main className="flex-1 flex flex-col">{children}</main>
						</TooltipProvider>
					</QueryProvider>

					<Toaster closeButton richColors position="top-right" />
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
