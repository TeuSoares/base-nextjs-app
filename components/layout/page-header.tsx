"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ModeToggle } from "../theme/mode-toggle";

export interface BreadcrumbItem {
	label: string;
	href?: string;
}

export interface PageHeaderProps {
	title: string;
	breadcrumbs?: BreadcrumbItem[];
	actions?: ReactNode;
	sticky?: boolean;
	className?: string;
}

export function PageHeader({
	title,
	breadcrumbs,
	actions,
	sticky = true,
	className,
}: PageHeaderProps) {
	return (
		<header
			className={cn(
				"flex items-center gap-3 border-b bg-background px-4 h-14 shrink-0",
				sticky && "sticky top-0 z-10",
				className,
			)}
		>
			<div className="flex items-center gap-2">
				<SidebarTrigger className="ml-1 shrink-0" />
				<Separator orientation="vertical" />
			</div>

			<div className="flex flex-1 items-center gap-1 min-w-0 text-sm">
				{breadcrumbs && breadcrumbs.length > 0 ? (
					<nav className="flex items-center gap-1 text-muted-foreground">
						{breadcrumbs.map((crumb, index) => (
							<Fragment key={`${crumb.label}-${index ?? "current"}`}>
								{index > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0" />}
								{crumb.href ? (
									<Link
										href={crumb.href}
										className="hover:text-foreground transition-colors truncate max-w-32"
									>
										{crumb.label}
									</Link>
								) : (
									<span className="text-foreground font-medium truncate max-w-32">
										{crumb.label}
									</span>
								)}
							</Fragment>
						))}
					</nav>
				) : (
					<h1 className="font-semibold text-foreground truncate">{title}</h1>
				)}
			</div>

			<div className="flex items-center gap-2 shrink-0">
				{actions && (
					<>
						<Separator orientation="vertical" />
						{actions}
					</>
				)}

				<ModeToggle />
			</div>
		</header>
	);
}
