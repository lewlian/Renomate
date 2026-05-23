"use client";

import { useEffect, useState } from "react";
import { useModal } from "../modals/ModalContext";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { open } = useModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-[border-color,background-color] duration-200 ${
        scrolled
          ? "bg-paper/85 backdrop-blur-md border-b border-mist"
          : "bg-paper/0 border-b border-transparent"
      }`}
    >
      <div className="container-page flex items-center justify-between py-4">
        <a href="#" className="font-display text-[22px] tracking-tight text-ink no-underline">
          renomate
        </a>
        <div className="flex items-center gap-5">
          <a href="#product" className="hidden md:inline text-body-sm font-medium text-charcoal hover:text-ink no-underline">
            Product
          </a>
          <a href="#how" className="hidden md:inline text-body-sm font-medium text-charcoal hover:text-ink no-underline">
            How it works
          </a>
          <a href="#designers" className="hidden md:inline text-body-sm font-medium text-charcoal hover:text-ink no-underline">
            For designers
          </a>
          <a href="#faq" className="hidden md:inline text-body-sm font-medium text-charcoal hover:text-ink no-underline">
            FAQ
          </a>
          <button
            onClick={() => open("waitlist")}
            className="inline-flex items-center px-5 py-3 text-[15px] font-medium rounded bg-clay text-paper hover:bg-clay-deep transition-colors ease-brand"
          >
            Join the waitlist
          </button>
        </div>
      </div>
    </nav>
  );
}
