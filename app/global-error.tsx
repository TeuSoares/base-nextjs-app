"use client";

import { useEffect } from "react";

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<html lang="en">
			<body className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
				<h1 className="text-6xl font-bold">500</h1>
				<h2 className="text-2xl font-semibold">Something went wrong!</h2>
				<button
					type="button"
					onClick={reset}
					className="mt-4 rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
				>
					Try again
				</button>
			</body>
		</html>
	);
}
