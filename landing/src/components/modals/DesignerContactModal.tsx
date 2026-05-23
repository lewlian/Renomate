"use client";

import { useState } from "react";
import { ModalShell } from "../ui/ModalShell";
import { Button } from "../ui/Button";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function DesignerContactModal({ open, onClose }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    setSubmitted(true);
  };

  const reset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <ModalShell open={open} onClose={reset}>
      {submitted ? (
        <div className="py-6">
          <h2 className="font-display text-display-md text-ink mb-3">Thank you.</h2>
          <p className="text-charcoal text-body-lg">
            We&rsquo;ll reply within two working days. &mdash; Sean (founder)
          </p>
          <Button variant="secondary" onClick={reset} className="mt-6">
            Close
          </Button>
        </div>
      ) : (
        <form onSubmit={onSubmit}>
          <h2 className="font-display text-display-md text-ink mb-2">Become an early partner firm.</h2>
          <p className="text-body-sm text-slate mb-5">Tell us about your firm. We&rsquo;ll reply within two working days.</p>

          <Field label="Your name" required>
            <input type="text" required className="input" />
          </Field>

          <Field label="Firm name" required>
            <input type="text" required className="input" />
          </Field>

          <Field label="Email" required>
            <input type="email" required className="input" />
          </Field>

          <Field label="Mobile" required>
            <input type="tel" required className="input" />
          </Field>

          <Field label="Roughly how many active projects right now?" required>
            <select className="input" required defaultValue="">
              <option value="" disabled>
                Choose one&hellip;
              </option>
              <option value="1-5">1&ndash;5</option>
              <option value="6-15">6&ndash;15</option>
              <option value="16-30">16&ndash;30</option>
              <option value="30+">30+</option>
            </select>
          </Field>

          <Field label="Biggest coordination headache right now?" required help="A couple of sentences is plenty.">
            <textarea rows={3} required className="input resize-y min-h-[80px]" />
          </Field>

          <Button variant="accent" size="lg" type="submit" className="w-full" disabled={loading}>
            {loading ? "Sending…" : "Send"}
          </Button>
        </form>
      )}
      <style jsx>{`
        :global(.input) {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #a8a29b;
          border-radius: 4px;
          background: #ffffff;
          font-family: var(--font-inter);
          font-size: 16px;
          color: #161513;
          transition: border-color 150ms;
        }
        :global(.input:focus) {
          outline: 2px solid #b85c3c;
          outline-offset: -1px;
          border-color: #b85c3c;
        }
      `}</style>
    </ModalShell>
  );
}

function Field({
  label,
  required,
  optional,
  help,
  children,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  help?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <label className="text-body-sm font-medium text-ink">
        {label}{" "}
        {optional && <span className="font-normal text-slate">(optional)</span>}
      </label>
      {children}
      {help && <span className="text-[13px] text-slate">{help}</span>}
    </div>
  );
}
