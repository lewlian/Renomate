export function Footer() {
  return (
    <footer className="bg-ink text-mist py-16 pb-6">
      <div className="container-page">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-8 mb-12">
          <div>
            <a href="#" className="font-heading text-white text-[22px] tracking-tight inline-block mb-3 no-underline">
              renomate
            </a>
            <p className="text-body-sm text-mist max-w-[320px] leading-relaxed">
              The system of record for Singapore renovations. Built in Singapore.
            </p>
          </div>
          <div>
            <h5 className="text-[12px] font-semibold uppercase tracking-wider text-white mb-3">Product</h5>
            <ul className="space-y-2">
              <li><a href="#how" className="text-body-sm text-mist hover:text-white no-underline">How it works</a></li>
              <li><a href="#designers" className="text-body-sm text-mist hover:text-white no-underline">For designers</a></li>
              <li><a href="#faq" className="text-body-sm text-mist hover:text-white no-underline">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-[12px] font-semibold uppercase tracking-wider text-white mb-3">Contact</h5>
            <ul className="space-y-2">
              <li><a href="mailto:hello@renomate.sg" className="text-body-sm text-mist hover:text-white no-underline">hello@renomate.sg</a></li>
              <li><a href="#" className="text-body-sm text-mist hover:text-white no-underline">Privacy (coming)</a></li>
              <li><a href="#" className="text-body-sm text-mist hover:text-white no-underline">Terms (coming)</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-5 border-t border-charcoal text-[12px] text-slate">
          © 2026 Renomate. Built in Singapore.
        </div>
      </div>
    </footer>
  );
}
