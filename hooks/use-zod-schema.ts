import type { TranslationValues } from "next-intl";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

type TranslationFn = (key: string, values?: TranslationValues) => string;
type SchemaFactory<T> = (v: TranslationFn, ns: TranslationFn) => T;

export function useZodSchema<T>(factory: SchemaFactory<T>, namespace: string) {
	const ns = useTranslations(namespace);
	const v = useTranslations("Validation");

	return useMemo(() => factory(v, ns), [v, ns, factory]);
}
