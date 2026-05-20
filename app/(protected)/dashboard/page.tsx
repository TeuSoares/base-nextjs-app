"use client";

import { PageHeader } from "@/components/layout/page-header";
import { useUser } from "@/features/auth/hooks/use-user";

export default function DashboardPage() {
	const { data: user } = useUser();

	return (
		<>
			<PageHeader title="Dashboard" sticky={false} />
			<div className="p-6 space-y-6">
				{/* Welcome */}
				<div className="rounded-lg border bg-card p-6">
					<h1 className="text-2xl font-bold mb-1">
						Bem-vindo, {user?.name}! 👋
					</h1>
					<p className="text-muted-foreground">
						Aqui está um resumo das suas atividades recentes.
					</p>
				</div>

				{/* Stats */}
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{[
						{ label: "Total de Usuários", value: "1.284" },
						{ label: "Receita Mensal", value: "R$ 48.320" },
						{ label: "Pedidos Ativos", value: "342" },
						{ label: "Taxa de Conversão", value: "3,6%" },
					].map((stat) => (
						<div key={stat.label} className="rounded-lg border bg-card p-4">
							<p className="text-sm text-muted-foreground">{stat.label}</p>
							<p className="text-2xl font-bold mt-1">{stat.value}</p>
						</div>
					))}
				</div>

				{/* Recent Activity */}
				<div className="rounded-lg border bg-card p-6">
					<h2 className="text-lg font-semibold mb-4">Atividade Recente</h2>
					<div className="space-y-3">
						{[
							{
								user: "João Silva",
								action: "criou uma nova conta",
								time: "2 min atrás",
							},
							{
								user: "Maria Souza",
								action: "atualizou o perfil",
								time: "15 min atrás",
							},
							{
								user: "Pedro Alves",
								action: "realizou um pedido",
								time: "1h atrás",
							},
							{
								user: "Ana Costa",
								action: "cancelou a assinatura",
								time: "2h atrás",
							},
							{
								user: "Lucas Lima",
								action: "enviou um feedback",
								time: "3h atrás",
							},
							{
								user: "Carla Dias",
								action: "criou uma nova conta",
								time: "4h atrás",
							},
							{
								user: "Bruno Reis",
								action: "atualizou o plano",
								time: "5h atrás",
							},
						].map((item) => (
							<div
								key={item.user}
								className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
							>
								<div>
									<span className="font-medium">{item.user}</span>
									<span className="text-muted-foreground"> {item.action}</span>
								</div>
								<span className="text-xs text-muted-foreground shrink-0">
									{item.time}
								</span>
							</div>
						))}
					</div>
				</div>

				{/* Two columns */}
				<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
					<div className="rounded-lg border bg-card p-6">
						<h2 className="text-lg font-semibold mb-4">Tarefas Pendentes</h2>
						<div className="space-y-2">
							{[
								"Revisar relatório mensal",
								"Aprovar novos cadastros",
								"Atualizar documentação",
								"Responder suporte",
								"Configurar integrações",
							].map((task) => (
								<div
									key={task}
									className="flex items-center gap-2 rounded-md border p-3"
								>
									<div className="h-4 w-4 rounded border shrink-0" />
									<span className="text-sm">{task}</span>
								</div>
							))}
						</div>
					</div>

					<div className="rounded-lg border bg-card p-6">
						<h2 className="text-lg font-semibold mb-4">Notificações</h2>
						<div className="space-y-3">
							{[
								{
									title: "Nova mensagem",
									desc: "Você tem 3 mensagens não lidas.",
									type: "info",
								},
								{
									title: "Pagamento recebido",
									desc: "R$ 1.200,00 creditado.",
									type: "success",
								},
								{
									title: "Erro de integração",
									desc: "Falha na API de pagamentos.",
									type: "error",
								},
								{
									title: "Atualização disponível",
									desc: "Versão 2.1.0 disponível.",
									type: "info",
								},
								{
									title: "Backup concluído",
									desc: "Backup realizado com sucesso.",
									type: "success",
								},
							].map((n) => (
								<div
									key={n.title}
									className="flex flex-col gap-0.5 rounded-md border p-3"
								>
									<span className="text-sm font-medium">{n.title}</span>
									<span className="text-xs text-muted-foreground">
										{n.desc}
									</span>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Table */}
				<div className="rounded-lg border bg-card p-6">
					<h2 className="text-lg font-semibold mb-4">Últimos Pedidos</h2>
					<div className="overflow-x-auto">
						<table className="w-full text-sm">
							<thead>
								<tr className="border-b text-left text-muted-foreground">
									<th className="pb-3 font-medium">Pedido</th>
									<th className="pb-3 font-medium">Cliente</th>
									<th className="pb-3 font-medium">Valor</th>
									<th className="pb-3 font-medium">Status</th>
									<th className="pb-3 font-medium">Data</th>
								</tr>
							</thead>
							<tbody className="divide-y">
								{[
									{
										id: "#1042",
										client: "João Silva",
										value: "R$ 320,00",
										status: "Pago",
										date: "20/05/2026",
									},
									{
										id: "#1041",
										client: "Maria Souza",
										value: "R$ 150,00",
										status: "Pendente",
										date: "19/05/2026",
									},
									{
										id: "#1040",
										client: "Pedro Alves",
										value: "R$ 890,00",
										status: "Pago",
										date: "18/05/2026",
									},
									{
										id: "#1039",
										client: "Ana Costa",
										value: "R$ 240,00",
										status: "Cancelado",
										date: "17/05/2026",
									},
									{
										id: "#1038",
										client: "Lucas Lima",
										value: "R$ 560,00",
										status: "Pago",
										date: "16/05/2026",
									},
								].map((order) => (
									<tr key={order.id}>
										<td className="py-3 font-medium">{order.id}</td>
										<td className="py-3 text-muted-foreground">
											{order.client}
										</td>
										<td className="py-3">{order.value}</td>
										<td className="py-3">
											<span
												className={`rounded-full px-2 py-0.5 text-xs font-medium ${
													order.status === "Pago"
														? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
														: order.status === "Pendente"
															? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
															: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
												}`}
											>
												{order.status}
											</span>
										</td>
										<td className="py-3 text-muted-foreground">{order.date}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	);
}
