"use client";

import { useState } from "react";
import { ModalShell } from "../ui/ModalShell";
import { Button } from "../ui/Button";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function WaitlistModal({ open, onClose }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: wire to Supabase `waitlist` table — see Knowledge/DataModel.md §11
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
          <h2 className="font-display text-display-md text-ink mb-3">You&rsquo;re on the list.</h2>
          <p className="text-charcoal text-body-lg">
            We&rsquo;ll be in touch when private beta opens &mdash; usually within a few weeks of you joining.
          </p>
          <Button variant="secondary" onClick={reset} className="mt-6">
            Close
          </Button>
        </div>
      ) : (
        <form onSubmit={onSubmit}>
          <h2 className="font-display text-display-md text-ink mb-2">Join the waitlist.</h2>
          <p className="text-body-sm text-slate mb-5">We&rsquo;ll email you when beta opens. No spam, no sharing.</p>

          <Field label="Email" required>
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="input"
            />
          </Field>

          <Field
            label="BTO key collection date"
            optional
            help="Helps us prioritise who to onboard first."
          >
            <input type="date" className="input" />
          </Field>

          <Field label="Anything you&rsquo;d like this app to solve?" optional>
            <textarea
              rows={3}
              placeholder="One or two sentences is plenty."
              className="input resize-y min-h-[80px]"
            />
          </Field>

          <Button variant="accent" size="lg" type="submit" className="w-full" disabled={loading}>
            {loading ? "Joining…" : "Join the waitlist"}
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
