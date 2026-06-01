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

interface FormCardHeaderProps {
	title: string;
	description?: string;
	children?: ReactNode;
}

interface FormCardProps {
	children: ReactNode;
	className?: string;
}

interface FormCardContentProps extends React.ComponentPropsWithoutRef<"form"> {
	children: ReactNode;
}

interface FormCardContext extends React.FC<FormCardProps> {
	Header: React.FC<FormCardHeaderProps>;
	Form: React.FC<FormCardContentProps>;
	Footer: React.FC<{ children: ReactNode; className?: string }>;
}

const FormCard: FormCardContext = ({ children, className }: FormCardProps) => {
	return <Card className={cn("w-full", className)}>{children}</Card>;
};

FormCard.Header = ({ title, description, children }) => (
	<CardHeader className="border-b">
		<CardTitle>{title}</CardTitle>
		{description && <CardDescription>{description}</CardDescription>}
		{children}
	</CardHeader>
);

const FormCardContent = ({
	children,
	className,
	...props
}: FormCardContentProps) => (
	<CardContent className="pt-4 pb-8">
		<form className={cn("space-y-6", className)} {...props}>
			{children}
		</form>
	</CardContent>
);

FormCard.Footer = ({ children, className }) => (
	<CardFooter className={cn("border-t", className)}>{children}</CardFooter>
);

FormCard.Header.displayName = "FormCard.Header";
FormCard.Form = FormCardContent;
FormCard.Form.displayName = "FormCard.Form";
FormCard.Footer.displayName = "FormCard.Footer";

export { FormCard };
