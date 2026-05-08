import type { ReactNode } from "react";
import { Center } from "@/components/common";

export default function RootAuthLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex flex-col min-h-screen bg-background">
			<div className="flex justify-center bg-primary">
				<div className="p-9">
					<h1 className="text-2xl font-bold text-white uppercase tracking-widest">
						Logo
					</h1>
				</div>
			</div>

			<Center className="p-4 sm:p-8">
				<div className="w-full max-w-112.5">{children}</div>
			</Center>
		</div>
	);
}
