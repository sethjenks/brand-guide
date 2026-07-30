"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Icons } from "@/components/icons";
import { flattenNavSectionIds } from "@/lib/nav";
import type { NavGroup } from "@/lib/brand-types";

type AppShellProps = {
  brandName: string;
  year: string;
  groups: readonly NavGroup[];
  children: ReactNode;
};

const STORAGE_KEY = "brand-guide-sidebar-collapsed";
const SCROLL_OFFSET_PX = 96;

const MOBILE_MQ = "(max-width: 720px)";

function groupForSectionId(
  sectionId: string,
  groups: readonly NavGroup[],
): string | null {
  for (const group of groups) {
    if (group.id === sectionId) return group.id;
    for (const item of group.items) {
      if (item.id === sectionId) return group.id;
      if (item.children?.some((child) => child.id === sectionId)) {
        return group.id;
      }
    }
  }
  return groups[0]?.id ?? null;
}

function labelForSectionId(
  sectionId: string,
  groups: readonly NavGroup[],
): string {
  for (const group of groups) {
    for (const item of group.items) {
      if (item.id === sectionId) return item.label;
      const child = item.children?.find((entry) => entry.id === sectionId);
      if (child) return child.label;
    }
  }
  return "Sections";
}

function applySidebarState(collapsed: boolean) {
  document.documentElement.dataset.sidebar = collapsed
    ? "collapsed"
    : "expanded";
}

export function AppShell({
  brandName,
  year,
  groups,
  children,
}: AppShellProps) {
  const sectionIds = useMemo(() => flattenNavSectionIds(groups), [groups]);

  const [openId, setOpenId] = useState<string>(groups[0]?.id ?? "");
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const activeLabel = useMemo(
    () => labelForSectionId(activeId, groups),
    [activeId, groups],
  );

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ);
    const sync = () => {
      const matches = mq.matches;
      setIsMobile(matches);
      if (!matches) setMobileNavOpen(false);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const next = saved === "1";
    setCollapsed(next);
    applySidebarState(next);
  }, []);

  useEffect(() => {
    applySidebarState(collapsed);
    window.localStorage.setItem(STORAGE_KEY, collapsed ? "1" : "0");
  }, [collapsed]);

  useEffect(() => {
    if (!mobileNavOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileNavOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileNavOpen]);

  const syncActiveFromScroll = useCallback(() => {
    const root = cardRef.current;
    if (!root || sectionIds.length === 0) return;

    const rootTop = root.getBoundingClientRect().top;
    let current = sectionIds[0];

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top - rootTop;
      if (top <= SCROLL_OFFSET_PX) {
        current = id;
      }
    }

    setActiveId((prev) => (prev === current ? prev : current));

    const groupId = groupForSectionId(current, groups);
    if (groupId) {
      setOpenId((prev) => (prev === groupId ? prev : groupId));
    }
  }, [groups, sectionIds]);

  useEffect(() => {
    const root = cardRef.current;
    if (!root) return;

    syncActiveFromScroll();
    root.addEventListener("scroll", syncActiveFromScroll, { passive: true });
    window.addEventListener("resize", syncActiveFromScroll);

    return () => {
      root.removeEventListener("scroll", syncActiveFromScroll);
      window.removeEventListener("resize", syncActiveFromScroll);
    };
  }, [syncActiveFromScroll]);

  useEffect(() => {
    const onHashChange = () => {
      const id = window.location.hash.replace(/^#/, "");
      if (!id) return;
      const groupId = groupForSectionId(id, groups);
      if (groupId) setOpenId(groupId);
      if (sectionIds.includes(id)) setActiveId(id);
      window.requestAnimationFrame(() => syncActiveFromScroll());
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [groups, sectionIds, syncActiveFromScroll]);

  const toggleAccordion = useCallback((id: string) => {
    setOpenId((current) => (current === id ? "" : id));
  }, []);

  const toggleCollapsed = useCallback(() => {
    setCollapsed((current) => !current);
  }, []);

  const toggleMobileNav = useCallback(() => {
    setMobileNavOpen((current) => !current);
  }, []);

  const closeMobileNav = useCallback(() => {
    setMobileNavOpen(false);
  }, []);

  const onNavClick = useCallback((itemId: string, groupId: string) => {
    setActiveId(itemId);
    setOpenId(groupId);
    setMobileNavOpen(false);
  }, []);

  const navHidden = isMobile ? !mobileNavOpen : collapsed;
  const navTabIndex = navHidden ? -1 : undefined;

  return (
    <div className="app-shell">
      <header className="app-chrome">
        <button
          type="button"
          className="chrome-toggle"
          onClick={toggleCollapsed}
          aria-expanded={!collapsed}
          aria-controls="app-sidebar"
          title={collapsed ? "Show navigation" : "Hide navigation"}
        >
          {collapsed ? (
            <Icons.PanelLeft aria-hidden />
          ) : (
            <Icons.PanelLeftClose aria-hidden />
          )}
          <span className="sr-only">
            {collapsed ? "Show navigation" : "Hide navigation"}
          </span>
        </button>
        <a className="chrome-brand" href="#top">
          {brandName}
        </a>
      </header>

      <div className="mobile-nav">
        <button
          type="button"
          className={`mobile-nav-trigger${mobileNavOpen ? " is-open" : ""}`}
          onClick={toggleMobileNav}
          aria-expanded={mobileNavOpen}
          aria-controls="app-sidebar"
        >
          <span className="mobile-nav-label">{activeLabel}</span>
          <Icons.ChevronDown
            className={`mobile-nav-chevron${mobileNavOpen ? " is-open" : ""}`}
            aria-hidden
          />
        </button>
      </div>

      {mobileNavOpen ? (
        <button
          type="button"
          className="mobile-nav-backdrop"
          aria-label="Close navigation"
          onClick={closeMobileNav}
        />
      ) : null}

      <div className="app-body">
        <aside
          id="app-sidebar"
          className={`sidebar${collapsed ? " is-collapsed" : ""}${mobileNavOpen ? " is-mobile-open" : ""}`}
          aria-label="Brand guide navigation"
          aria-hidden={navHidden}
        >
          <nav className="sidebar-accordion" aria-label="Guide sections">
            {groups.map((group) => {
              const isOpen = openId === group.id;
              const hasActive = group.items.some(
                (item) =>
                  item.id === activeId ||
                  item.children?.some((child) => child.id === activeId),
              );
              const panelId = `nav-panel-${group.id}`;
              const buttonId = `nav-btn-${group.id}`;

              return (
                <div className="accordion-group" key={group.id}>
                  <button
                    type="button"
                    id={buttonId}
                    className={`accordion-trigger${isOpen ? " is-open" : ""}${hasActive ? " has-active" : ""}`}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleAccordion(group.id)}
                    tabIndex={navTabIndex}
                  >
                    <span>{group.label}</span>
                    <Icons.ChevronDown
                      className={`accordion-chevron${isOpen ? " is-open" : ""}`}
                      aria-hidden
                    />
                  </button>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={`accordion-panel${isOpen ? " is-open" : ""}`}
                    hidden={!isOpen}
                  >
                    <ul className="sidebar-nav">
                      {group.items.map((item) => {
                        const childActive = item.children?.some(
                          (child) => child.id === activeId,
                        );
                        const isActive =
                          item.id === activeId || Boolean(childActive);
                        return (
                          <li key={item.id}>
                            <a
                              href={`#${item.id}`}
                              className={isActive ? "is-active" : undefined}
                              aria-current={
                                item.id === activeId ? "location" : undefined
                              }
                              tabIndex={navTabIndex}
                              onClick={() => onNavClick(item.id, group.id)}
                            >
                              {item.label}
                            </a>
                            {item.children && item.children.length > 0 ? (
                              <ul className="sidebar-subnav">
                                {item.children.map((child) => {
                                  const isChildActive = child.id === activeId;
                                  return (
                                    <li key={child.id}>
                                      <a
                                        href={`#${child.id}`}
                                        className={
                                          isChildActive ? "is-active" : undefined
                                        }
                                        aria-current={
                                          isChildActive ? "location" : undefined
                                        }
                                        tabIndex={navTabIndex}
                                        onClick={() =>
                                          onNavClick(child.id, group.id)
                                        }
                                      >
                                        {child.label}
                                      </a>
                                    </li>
                                  );
                                })}
                              </ul>
                            ) : null}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            })}
          </nav>

          <p className="sidebar-foot">Brand Guide · {year}</p>
        </aside>

        <main className="workspace">
          <div className="content-card" ref={cardRef}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
