"use client";

/* ─────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD — SideNav collapse / expand
 *
 * Read top-to-bottom. Each `at` value is ms after toggle.
 *
 *    0ms   rail width springs toward collapsed / expanded
 *    0ms   brand heading fades + slides with the rail
 *   40ms   chapter groups fade + slide in (stagger 30ms)
 * ───────────────────────────────────────────────────────── */

import { AppShell as AstryxAppShell } from "@astryxdesign/core/AppShell";
import { Section } from "@astryxdesign/core/Section";
import { HStack } from "@astryxdesign/core/HStack";
import {
  SideNav,
  SideNavCollapseButton,
  SideNavHeading,
  SideNavItem,
} from "@astryxdesign/core/SideNav";
import { VStack } from "@astryxdesign/core/VStack";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Transition,
} from "motion/react";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { flattenNavSectionIds } from "@/lib/nav";
import type { NavGroup, NavItem } from "@/lib/brand-types";

type AppShellProps = {
  brandName: string;
  groups: readonly NavGroup[];
  children: ReactNode;
};

const STORAGE_KEY = "brand-guide-sidebar-collapsed";
const SCROLL_OFFSET_PX = 96;
const DEFAULT_NAV_WIDTH = 248;
/** Matches Astryx `--spacing-12` collapsed rail. */
const COLLAPSED_NAV_WIDTH = 48;

const TIMING = {
  heading: 0, // brand heading fades with the rail
  items: 40, // nav items start shortly after
};

const NAV_RAIL = {
  spring: {
    type: "spring",
    stiffness: 380,
    damping: 36,
    mass: 0.85,
  } satisfies Transition,
};

const NAV_CONTENT = {
  offsetX: 10, // px items slide from when entering
  stagger: 0.03, // seconds between each top-level group
  spring: {
    type: "spring",
    stiffness: 420,
    damping: 34,
    mass: 0.7,
  } satisfies Transition,
};

function groupOwnsActive(group: NavGroup, activeId: string): boolean {
  if (activeId === group.id) return true;
  if (activeId.startsWith(`${group.id}-`)) return true;
  return group.items.some(
    (item) =>
      item.id === activeId ||
      Boolean(item.children?.some((child) => child.id === activeId)),
  );
}

function isItemActive(item: NavItem, activeId: string): boolean {
  if (item.id === activeId) return true;
  return Boolean(item.children?.some((child) => child.id === activeId));
}

export function AppShell({
  brandName,
  groups,
  children,
}: AppShellProps) {
  const sectionIds = useMemo(() => flattenNavSectionIds(groups), [groups]);
  const reduceMotion = useReducedMotion();

  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "");
  const [collapsed, setCollapsed] = useState(false);
  const [navWidth, setNavWidth] = useState(DEFAULT_NAV_WIDTH);
  /** Spring only on collapse toggle; resize stays 1:1 with the drag. */
  const [railTransition, setRailTransition] = useState<Transition>({
    duration: 0,
  });
  const [openGroupIds, setOpenGroupIds] = useState<ReadonlySet<string>>(
    () => new Set(groups[0] ? [groups[0].id] : []),
  );

  const onCollapsedChange = useCallback(
    (next: boolean) => {
      setRailTransition(reduceMotion ? { duration: 0 } : NAV_RAIL.spring);
      setCollapsed(next);
    },
    [reduceMotion],
  );

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    setCollapsed(saved === "1");
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, collapsed ? "1" : "0");
  }, [collapsed]);

  // Keep the chapter accordion open for the active hash / scroll target.
  useEffect(() => {
    const owner = groups.find((group) => groupOwnsActive(group, activeId));
    if (!owner) return;
    setOpenGroupIds((prev) => {
      if (prev.has(owner.id)) return prev;
      const next = new Set(prev);
      next.add(owner.id);
      return next;
    });
  }, [activeId, groups]);

  const syncActiveFromScroll = useCallback(() => {
    if (sectionIds.length === 0) return;

    let current = sectionIds[0];
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top;
      if (top <= SCROLL_OFFSET_PX) {
        current = id;
      }
    }

    setActiveId((prev) => (prev === current ? prev : current));
  }, [sectionIds]);

  useEffect(() => {
    syncActiveFromScroll();
    window.addEventListener("scroll", syncActiveFromScroll, { passive: true });
    window.addEventListener("resize", syncActiveFromScroll);
    return () => {
      window.removeEventListener("scroll", syncActiveFromScroll);
      window.removeEventListener("resize", syncActiveFromScroll);
    };
  }, [syncActiveFromScroll]);

  useEffect(() => {
    const onHashChange = () => {
      const id = window.location.hash.replace(/^#/, "");
      if (!id) return;
      if (sectionIds.includes(id)) setActiveId(id);
      window.requestAnimationFrame(() => syncActiveFromScroll());
    };

    if (window.location.hash) {
      onHashChange();
    }

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [sectionIds, syncActiveFromScroll]);

  const onNavigate = useCallback((itemId: string) => {
    setActiveId(itemId);
  }, []);

  const contentTransition = reduceMotion
    ? { duration: 0 }
    : NAV_CONTENT.spring;

  const sideNav = (
    <motion.div
      className="brand-guide-sidenav-motion"
      initial={false}
      animate={{ width: collapsed ? COLLAPSED_NAV_WIDTH : navWidth }}
      transition={railTransition}
    >
      <SideNav
        collapsible={{
          isCollapsed: collapsed,
          onCollapsedChange: onCollapsedChange,
          hasButton: false,
        }}
        resizable={{
          defaultWidth: DEFAULT_NAV_WIDTH,
          minWidth: 200,
          maxWidth: 360,
          autoSaveId: "brand-guide-sidenav-width",
          onWidthChange: (width) => {
            // Collapse reports 0 — keep the last expanded width for reopen.
            // Same width on expand restore: leave the collapse spring alone.
            if (width <= 0 || width === navWidth) return;
            setRailTransition({ duration: 0 });
            setNavWidth(width);
          },
        }}
        header={
          <VStack gap={2} align="stretch">
            <HStack hAlign="start" vAlign="center">
              <SideNavCollapseButton />
            </HStack>
            <AnimatePresence initial={false}>
              {!collapsed ? (
                <motion.div
                  key="sidenav-heading"
                  initial={{ opacity: 0, x: -NAV_CONTENT.offsetX }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -NAV_CONTENT.offsetX }}
                  transition={{
                    ...contentTransition,
                    delay: reduceMotion ? 0 : TIMING.heading / 1000,
                  }}
                >
                  <SideNavHeading
                    heading={brandName}
                    headingHref="#top"
                    subheading="Brand Guide"
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>
          </VStack>
        }
      >
        {groups.map((group, index) => {
          const isOpen = openGroupIds.has(group.id);

          return (
            <motion.div
              key={group.id}
              initial={false}
              animate={
                collapsed
                  ? { opacity: 0, x: -NAV_CONTENT.offsetX }
                  : { opacity: 1, x: 0 }
              }
              transition={{
                ...contentTransition,
                delay: reduceMotion
                  ? 0
                  : collapsed
                    ? 0
                    : TIMING.items / 1000 + index * NAV_CONTENT.stagger,
              }}
              style={{
                // Keep layout for SideNav nesting; hide from hit-testing when collapsed.
                pointerEvents: collapsed ? "none" : "auto",
              }}
            >
              <SideNavItem
                label={group.label.toUpperCase()}
                href={`#${group.id}`}
                isSelected={activeId === group.id}
                collapsible={{
                  isCollapsed: !isOpen,
                  onCollapsedChange: (isCollapsed) => {
                    setOpenGroupIds((prev) => {
                      const next = new Set(prev);
                      if (isCollapsed) next.delete(group.id);
                      else next.add(group.id);
                      return next;
                    });
                  },
                }}
                onClick={() => {
                  onNavigate(group.id);
                  setOpenGroupIds((prev) => {
                    const next = new Set(prev);
                    next.add(group.id);
                    return next;
                  });
                }}
              >
                {group.items.map((item) => {
                  const hasChildren = Boolean(
                    item.children && item.children.length > 0,
                  );
                  const selected = isItemActive(item, activeId);

                  return (
                    <SideNavItem
                      key={item.id}
                      label={item.label}
                      href={`#${item.id}`}
                      isSelected={selected}
                      collapsible={
                        hasChildren
                          ? { defaultIsCollapsed: !selected }
                          : false
                      }
                      onClick={() => onNavigate(item.id)}
                    >
                      {hasChildren
                        ? item.children!.map((child) => (
                            <SideNavItem
                              key={child.id}
                              label={child.label}
                              href={`#${child.id}`}
                              isSelected={child.id === activeId}
                              onClick={() => onNavigate(child.id)}
                            />
                          ))
                        : null}
                    </SideNavItem>
                  );
                })}
              </SideNavItem>
            </motion.div>
          );
        })}
      </SideNav>
    </motion.div>
  );

  return (
    <AstryxAppShell
      height="auto"
      variant="elevated"
      contentPadding={0}
      sideNav={sideNav}
    >
      <Section variant="transparent" padding={0} maxWidth="none" width="100%">
        {children}
      </Section>
    </AstryxAppShell>
  );
}
