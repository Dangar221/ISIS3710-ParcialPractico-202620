"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";

const locales = ["es", "en"] as const;

export function LocaleSwitcher() {
  const pathname = usePathname();
  const currentLocale = useLocale();

  return (
    <nav aria-label="Idioma / Language" className="flex gap-2 text-sm">
      {locales.map((loc) => {
        const newPath = pathname.replace(`/${currentLocale}`, `/${loc}`);
        return (
          <Link
            key={loc}
            href={newPath}
            aria-current={loc === currentLocale ? "true" : undefined}
            className={
              loc === currentLocale
                ? "font-bold underline"
                : "text-slate-500 hover:underline"
            }
          >
            {loc.toUpperCase()}
          </Link>
        );
      })}
    </nav>
  );
}
