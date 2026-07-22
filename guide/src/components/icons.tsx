/**
 * App icons — swap the underlying library here without changing call sites.
 *
 * Current provider: lucide-react (minimal line icons).
 * To switch: change imports below and keep the same named exports + IconProps.
 */
import {
  ChevronDown,
  PanelLeft,
  PanelLeftClose,
  type LucideProps,
} from "lucide-react";

/** Shared props for every icon in this kit. */
export type IconProps = LucideProps;

const defaults = {
  size: 16,
  strokeWidth: 1.75,
  absoluteStrokeWidth: false,
} as const;

function withDefaults(Icon: typeof ChevronDown) {
  function Wrapped(props: IconProps) {
    return <Icon {...defaults} {...props} />;
  }
  Wrapped.displayName = Icon.displayName ?? Icon.name;
  return Wrapped;
}

export const Icons = {
  ChevronDown: withDefaults(ChevronDown),
  PanelLeft: withDefaults(PanelLeft),
  PanelLeftClose: withDefaults(PanelLeftClose),
} as const;
