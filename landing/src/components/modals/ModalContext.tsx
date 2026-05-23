"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { WaitlistModal } from "./WaitlistModal";
import { DesignerContactModal } from "./DesignerContactModal";

type ModalName = "waitlist" | "designer" | null;

type Ctx = {
  open: (name: Exclude<ModalName, null>) => void;
  close: () => void;
};

const ModalContext = createContext<Ctx | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<ModalName>(null);

  return (
    <ModalContext.Provider
      value={{
        open: (name) => setActive(name),
        close: () => setActive(null),
      }}
    >
      {children}
      <WaitlistModal open={active === "waitlist"} onClose={() => setActive(null)} />
      <DesignerContactModal open={active === "designer"} onClose={() => setActive(null)} />
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used inside ModalProvider");
  return ctx;
}
