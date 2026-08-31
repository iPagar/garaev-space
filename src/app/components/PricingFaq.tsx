import { FiMinus, FiPlus } from "react-icons/fi";
import type { PricingFaq as PricingFaqItem } from "../lib/pricing";

export default function PricingFaq({
  items,
}: {
  items: readonly PricingFaqItem[];
}) {
  return (
    <div className="mt-12 divide-y divide-slate-200">
      {items.map((item, index) => (
        <details key={item.question} className="group" open={index === 0}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left text-base/7 font-semibold text-slate-950 marker:content-none hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700">
            {item.question}
            <span className="shrink-0 text-blue-700" aria-hidden="true">
              <FiPlus className="size-5 group-open:hidden" />
              <FiMinus className="hidden size-5 group-open:block" />
            </span>
          </summary>
          <p className="max-w-3xl pb-6 text-base/7 text-slate-600">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
