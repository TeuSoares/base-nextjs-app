import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme/theme-provider";

export default function PublicLayout({ children }: { children: ReactNode }) {
	return (
		<ThemeProvider
			attribute="class"
			forcedTheme="light"
			disableTransitionOnChange
		>
			{children}
		</ThemeProvider>
	);
}
