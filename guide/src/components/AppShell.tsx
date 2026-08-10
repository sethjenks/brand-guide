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
import type {
  ChapterStatusAggregate,
  SectionStatus,
  SectionStatusMap,
} from "@/lib/section-status-ui";
import { sectionNeedsWork, worse } from "@/lib/section-status-ui";
import { SectionStatusShape } from "@/components/SectionStatusShape";

type AppShellProps = {
  brandName: string;
  groups: readonly NavGroup[];
  children: ReactNode;
  /** Per GUIDE_NAV leaf customization status (ok leaves omit indicator). */
  sectionStatusById?: SectionStatusMap;
  /** Chapter rollups for muted need-work counts on group rows. */
  chapterStatus?: readonly ChapterStatusAggregate[];
};

function NavStatusEnd({
  status,
  count,
}: {
  status?: SectionStatus;
  count?: number;
}) {
  const needsWork = sectionNeedsWork(status) || (count != null && count > 0);
  if (!needsWork) return null;
  return (
    <span className="nav-status-end">
      {count != null && count > 0 ? (
        <span className="nav-status-count" aria-label={`${count} need work`}>
          {count}
        </span>
      ) : null}
      <SectionStatusShape
        status={sectionNeedsWork(status) ? status : "empty"}
        size="sm"
      />
    </span>
  );
}

function itemNeedsWorkStatus(
  item: NavItem,
  byId: SectionStatusMap | undefined,
): { status: SectionStatus; count: number } {
  if (!byId) return { status: "ok", count: 0 };
  let count = 0;
  let worst: SectionStatus = byId[item.id] ?? "ok";
  if (sectionNeedsWork(worst)) count += 1;
  for (const child of item.children ?? []) {
    const childStatus = byId[child.id] ?? "ok";
    if (sectionNeedsWork(childStatus)) {
      count += 1;
      worst = worse(worst, childStatus);
    }
  }
  return {
    status: count > 0 && worst === "ok" ? "empty" : worst,
    count,
  };
}

const STORAGE_KEY = "brand-guide-sidebar-collapsed";
const WIDTH_STORAGE_KEY = "brand-guide-sidenav-width";
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
  sectionStatusById,
  chapterStatus,
}: AppShellProps) {
  const sectionIds = useMemo(() => flattenNavSectionIds(groups), [groups]);
  const chapterById = useMemo(() => {
    const map = new Map<string, ChapterStatusAggregate>();
    for (const chapter of chapterStatus ?? []) {
      map.set(chapter.id, chapter);
    }
    return map;
  }, [chapterStatus]);
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
  /** False until localStorage prefs are applied post-mount (avoids SSR mismatch). */
  const [prefsReady, setPrefsReady] = useState(false);

  const onCollapsedChange = useCallback(
    (next: boolean) => {
      setRailTransition(reduceMotion ? { duration: 0 } : NAV_RAIL.spring);
      setCollapsed(next);
    },
    [reduceMotion],
  );

  // Restore prefs after mount so SSR HTML matches the first client render.
  // Do not use SideNav autoSaveId — it can rehydrate a collapsed width of 0.
  useEffect(() => {
    const savedCollapsed = window.localStorage.getItem(STORAGE_KEY);
    const savedWidth = Number(
      window.localStorage.getItem(WIDTH_STORAGE_KEY),
    );
    if (savedCollapsed === "1") setCollapsed(true);
    if (
      Number.isFinite(savedWidth) &&
      savedWidth >= 200 &&
      savedWidth <= 360
    ) {
      setNavWidth(savedWidth);
    }
    setPrefsReady(true);
  }, []);

  useEffect(() => {
    if (!prefsReady) return;
    window.localStorage.setItem(STORAGE_KEY, collapsed ? "1" : "0");
  }, [collapsed, prefsReady]);

  useEffect(() => {
    if (!prefsReady) return;
    window.localStorage.setItem(WIDTH_STORAGE_KEY, String(navWidth));
  }, [navWidth, prefsReady]);

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
          defaultWidth: navWidth,
          minWidth: 200,
          maxWidth: 360,
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
          const chapterAgg = chapterById.get(group.id);

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
                endContent={
                  <NavStatusEnd
                    status={chapterAgg?.worst}
                    count={chapterAgg?.needsWorkCount}
                  />
                }
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
                  const itemStatus = itemNeedsWorkStatus(
                    item,
                    sectionStatusById,
                  );

                  return (
                    <SideNavItem
                      key={item.id}
                      label={item.label}
                      href={`#${item.id}`}
                      isSelected={selected}
                      endContent={
                        <NavStatusEnd
                          status={itemStatus.status}
                          count={
                            hasChildren && itemStatus.count > 1
                              ? itemStatus.count
                              : undefined
                          }
                        />
                      }
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
                              endContent={
                                <NavStatusEnd
                                  status={
                                    sectionStatusById?.[child.id] ?? "ok"
                                  }
                                />
                              }
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
