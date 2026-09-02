"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { DEVSTUDIO_COTIZAR_URL, DEVSTUDIO_LOGO_SRC } from "@/lib/brand";

const EASE = [0.22, 1, 0.36, 1] as const;
const DEMO_ANCHOR_KEY = "cronica-demo-anchor-path";

function isAllowedWithoutPrompt(href: string, currentUrl: URL): boolean {
  if (!href || href.startsWith("#")) return true;
  if (href.startsWith("mailto:") || href.startsWith("tel:")) return true;

  let target: URL;
  try {
    target = new URL(href, currentUrl.origin);
  } catch {
    return false;
  }

  if (target.href.startsWith(DEVSTUDIO_COTIZAR_URL)) return true;

  const samePath = target.pathname === currentUrl.pathname;
  const sameSearch = target.search === currentUrl.search;
  if (samePath && sameSearch && target.hash) return true;

  return false;
}

function shouldPromptNavigation(href: string, currentUrl: URL): boolean {
  if (isAllowedWithoutPrompt(href, currentUrl)) return false;

  let target: URL;
  try {
    target = new URL(href, currentUrl.origin);
  } catch {
    return true;
  }

  if (target.origin !== currentUrl.origin) return true;

  return target.pathname !== currentUrl.pathname || target.search !== currentUrl.search;
}

function getOrInitDemoAnchor(): string {
  const stored = sessionStorage.getItem(DEMO_ANCHOR_KEY);
  if (stored) return stored;

  const current = window.location.pathname + window.location.search;
  sessionStorage.setItem(DEMO_ANCHOR_KEY, current);
  return current;
}

function buildLocationPath(pathname: string, search: string): string {
  return pathname + search;
}

export function DemoNavigationGuard() {
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const router = useRouter();
  const isRestoringRef = useRef(false);
  const [open, setOpen] = useState(false);
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  const openGate = useCallback((href: string) => {
    setPendingHref(href);
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setPendingHref(null);
  }, []);

  const blockUrlChange = useCallback(
    (targetHref: string) => {
      const anchor = getOrInitDemoAnchor();
      const anchorUrl = new URL(anchor, window.location.origin);

      if (!shouldPromptNavigation(targetHref, anchorUrl)) return false;

      openGate(targetHref);
      isRestoringRef.current = true;
      router.replace(anchor);
      return true;
    },
    [openGate, router],
  );

  useEffect(() => {
    if (isRestoringRef.current) {
      isRestoringRef.current = false;
      return;
    }

    const search = window.location.search;
    const currentPath = buildLocationPath(pathname, search);
    const anchor = getOrInitDemoAnchor();

    if (currentPath === anchor) return;

    blockUrlChange(window.location.origin + currentPath);
  }, [blockUrlChange, pathname]);

  useEffect(() => {
    const onPopState = () => {
      blockUrlChange(window.location.href);
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [blockUrlChange]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.dataset.demoAllow === "true") return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      const currentUrl = new URL(window.location.href);
      if (!shouldPromptNavigation(href, currentUrl)) return;

      event.preventDefault();
      event.stopPropagation();

      openGate(anchor.href);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [openGate]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [close, open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="demo-gate-overlay"
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.3, ease: EASE }}
        >
          <motion.button
            type="button"
            className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
            aria-label="Cerrar aviso"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
          />

          <motion.div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="demo-gate-title"
            aria-describedby="demo-gate-desc"
            className="relative w-full max-w-md rounded-[28px] border border-black/10 bg-white p-6 shadow-[0_24px_60px_rgba(0,0,0,0.18)] sm:p-7"
            initial={reduce ? false : { opacity: 0, y: 28, scale: 0.94, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={
              reduce
                ? { opacity: 0 }
                : { opacity: 0, y: 14, scale: 0.97, filter: "blur(6px)" }
            }
            transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 grid size-8 place-items-center text-ff-muted transition hover:text-ff-ink"
              aria-label="Cerrar"
            >
              <X className="size-4" strokeWidth={2} />
            </button>

            <motion.div
              className="mb-5 flex items-center justify-between gap-4 pr-10"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0 : 0.45, ease: EASE, delay: reduce ? 0 : 0.06 }}
            >
              <Image
                src={DEVSTUDIO_LOGO_SRC}
                alt="DevStudio"
                width={160}
                height={56}
                className="h-10 w-auto object-contain sm:h-11"
                priority
              />
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
                Demo visual
              </p>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0 : 0.45, ease: EASE, delay: reduce ? 0 : 0.1 }}
            >
              <h2 id="demo-gate-title" className="text-xl font-extrabold tracking-tight text-ff-ink sm:text-2xl">
                Estás viendo una demo visual
              </h2>
              <p id="demo-gate-desc" className="mt-3 text-sm leading-relaxed text-ff-muted">
                Esta experiencia muestra el diseño y la navegación del portal de noticias. Para
                acceder a artículos completos, panel editorial, suscripciones y funcionalidades
                avanzadas, solicita el servicio con DevStudio.
              </p>
            </motion.div>

            <motion.div
              className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:items-center"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0 : 0.45, ease: EASE, delay: reduce ? 0 : 0.16 }}
            >
              <a
                href={DEVSTUDIO_COTIZAR_URL}
                data-demo-allow="true"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 bg-ff-ink px-5 text-sm font-semibold text-white transition hover:bg-black"
              >
                Solicitar servicio
                <ArrowUpRight className="size-4" strokeWidth={2.2} />
              </a>
              <button
                type="button"
                onClick={close}
                className="inline-flex h-11 items-center justify-center border border-black/20 px-5 text-sm font-medium text-ff-ink transition hover:border-black/35 hover:bg-white"
              >
                Seguir en la demo
              </button>
            </motion.div>

            {pendingHref ? (
              <motion.p
                className="mt-4 text-[11px] leading-snug text-ff-soft"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: reduce ? 0 : 0.35, delay: reduce ? 0 : 0.22 }}
              >
                Destino bloqueado en demo:{" "}
                <span className="font-medium text-ff-muted">
                  {pendingHref.replace(window.location.origin, "") || pendingHref}
                </span>
              </motion.p>
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
