import createMiddleware from "next-intl/middleware";

export const proxy = createMiddleware({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "always",
});


export const config = {
    matcher: ["/((?!api|_next|.*\\..*).*)"],
};

