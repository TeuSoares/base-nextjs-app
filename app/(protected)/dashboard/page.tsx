"use client";

import { useUser } from "@/features/auth/hooks/use-user";

export default function DashboardPage() {
	const { data: user } = useUser();

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Dashboard</h1>
			<p>
				Bem-vindo ao seu dashboard {user?.name}! Aqui você pode ver suas
				informações e atividades recentes.
			</p>
		</div>
	);
}
