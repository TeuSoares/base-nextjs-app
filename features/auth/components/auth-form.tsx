import type { ReactNode } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AuthFormHeaderProps {
	title: string;
	description?: string;
}

interface AuthFormProps {
	children: ReactNode;
	className?: string;
}

interface AuthFormContentProps extends React.ComponentPropsWithoutRef<"form"> {
	children: ReactNode;
}

interface AuthFormContext extends React.FC<AuthFormProps> {
	Header: React.FC<AuthFormHeaderProps>;
	Form: React.FC<AuthFormContentProps>;
	Footer: React.FC<{ children: ReactNode }>;
}

const AuthForm: AuthFormContext = ({ children, className }: AuthFormProps) => {
	return (
		<Card
			className={cn(
				"border-none shadow-none sm:border sm:shadow-sm bg-transparent sm:bg-card",
				className,
			)}
		>
			{children}
		</Card>
	);
};

AuthForm.Header = ({ title, description }) => (
	<CardHeader className="space-y-1 pb-6 text-center">
		<CardTitle className="text-2xl font-bold tracking-tight">{title}</CardTitle>
		{description && (
			<CardDescription className="text-balance">{description}</CardDescription>
		)}
	</CardHeader>
);

const AuthFormContent = ({
	children,
	className,
	...props
}: AuthFormContentProps) => (
	<CardContent className="grid gap-4 mb-3">
		<form className={cn("space-y-6", className)} {...props}>
			{children}
		</form>
	</CardContent>
);

AuthForm.Footer = ({ children }) => (
	<CardFooter className="flex flex-col gap-6 pt-5">{children}</CardFooter>
);

AuthForm.Header.displayName = "AuthForm.Header";
AuthForm.Form = AuthFormContent;
AuthForm.Form.displayName = "AuthForm.Form";
AuthForm.Footer.displayName = "AuthForm.Footer";

export { AuthForm };
