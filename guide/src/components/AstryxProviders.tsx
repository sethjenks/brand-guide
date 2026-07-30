"use client";

import { LinkProvider } from "@astryxdesign/core/Link";
import { Theme } from "@astryxdesign/core/theme";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { brandGuideTheme } from "@/themes/brand-guide";

type AstryxProvidersProps = {
  children: ReactNode;
};

/**
 * Hash-only destinations stay on native anchors so same-page scroll and
 * history behavior stay browser-native. Everything else uses Next.js Link.
 */
function GuideLink({
  href,
  children,
  ...rest
}: ComponentProps<"a"> & { href?: string }) {
  const destination = href ?? "";
  if (destination.startsWith("#")) {
    return (
      <a href={destination} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={destination} {...rest}>
      {children}
    </Link>
  );
}

export function AstryxProviders({ children }: AstryxProvidersProps) {
  return (
    <Theme theme={brandGuideTheme} mode="light">
      <LinkProvider component={GuideLink}>{children}</LinkProvider>
    </Theme>
  );
}
