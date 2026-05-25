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
          <h2 className="font-heading text-display-md text-deep-charcoal mb-3">You&rsquo;re on the list.</h2>
          <p className="text-charcoal text-body-lg">
            We&rsquo;ll be in touch when private beta opens &mdash; usually within a few weeks of you joining.
          </p>
          <Button variant="secondary" onClick={reset} className="mt-6">
            Close
          </Button>
        </div>
      ) : (
        <form onSubmit={onSubmit}>
          <h2 className="font-heading text-display-md text-deep-charcoal mb-2">Join the waitlist.</h2>
          <p className="text-body-sm text-smoke mb-5">We&rsquo;ll email you when beta opens. No spam, no sharing.</p>

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
          border: 1px solid #e8e8e8;
          border-radius: 8px;
          background: #ffffff;
          font-family: var(--font-inter);
          font-size: 16px;
          color: #292d34;
          transition: border-color 150ms;
        }
        :global(.input:focus) {
          outline: 2px solid #7b68ee;
          outline-offset: -1px;
          border-color: #7b68ee;
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
      <label className="text-body-sm font-medium text-deep-charcoal">
        {label}{" "}
        {optional && <span className="font-normal text-smoke">(optional)</span>}
      </label>
      {children}
      {help && <span className="text-[13px] text-smoke">{help}</span>}
    </div>
  );
}
