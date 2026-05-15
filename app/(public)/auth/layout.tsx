import type { ReactNode } from "react";
import { Center } from "@/components/common";
import { LanguagePicker } from "@/components/common/language-picker";

export default function RootAuthLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex flex-col min-h-screen bg-background">
			<div className="flex w-full items-center justify-between bg-primary px-9 py-6 sm:grid sm:grid-cols-3">
				<div className="hidden sm:block" /> {/* left spacer */}
				<h1 className="text-2xl font-bold text-white uppercase tracking-widest sm:text-center">
					Logo
				</h1>
				<div className="flex sm:justify-end">
					<LanguagePicker />
				</div>
			</div>

			<Center className="p-4 sm:p-8">
				<div className="w-full max-w-112.5">{children}</div>
			</Center>
		</div>
	);
}
