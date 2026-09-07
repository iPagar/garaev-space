import type { ReactNode } from "react";

function WindowFrame({ children }: { children: ReactNode }) {
  return (
    <>
      <rect x="45" y="30" width="270" height="160" rx="5" fill="white" />
      <path d="M45 53h270" />
      <g fill="#d4d4d4" stroke="none">
        <circle cx="57" cy="42" r="2" />
        <circle cx="65" cy="42" r="2" />
        <circle cx="73" cy="42" r="2" />
      </g>
      {children}
    </>
  );
}

function DiagramContent({ slug }: { slug: string }) {
  switch (slug) {
    case "ai-systems-integrations":
      return (
        <>
          <g fill="white">
            <rect x="16" y="40" width="77" height="36" rx="3" />
            <rect x="16" y="92" width="77" height="36" rx="3" />
            <rect x="16" y="144" width="77" height="36" rx="3" />
            <rect x="135" y="72" width="90" height="76" rx="5" />
            <rect x="268" y="80" width="76" height="60" rx="3" />
          </g>
          <path d="M93 58h19v52h23M93 110h42M93 162h19v-52M225 110h43" />
          <path d="m260 106 8 4-8 4" />
          <g fill="#525252" stroke="none" textAnchor="middle" fontSize="11">
            <text x="54" y="62">
              Documents
            </text>
            <text x="54" y="114">
              Data
            </text>
            <text x="54" y="166">
              Tools
            </text>
            <text x="180" y="115" fontSize="16">
              AI
            </text>
            <text x="306" y="114">
              Result
            </text>
          </g>
          <path d="M162 131h36" stroke="#d4d4d4" />
        </>
      );
    case "websites-web-applications":
      return (
        <WindowFrame>
          <rect
            x="62"
            y="68"
            width="31"
            height="7"
            rx="1"
            fill="#d4d4d4"
            stroke="none"
          />
          <path d="M242 71h15m10 0h15m10 0h9" />
          <rect
            x="62"
            y="91"
            width="130"
            height="10"
            rx="1"
            fill="#737373"
            stroke="none"
          />
          <path d="M62 115h115M62 124h98" />
          <rect x="62" y="139" width="58" height="18" rx="2" fill="white" />
          <rect x="217" y="91" width="80" height="67" rx="2" fill="#f5f5f5" />
          <path d="m217 158 80-67m-80 0 80 67" stroke="#d4d4d4" />
          <path d="M62 174h235" stroke="#e5e5e5" />
        </WindowFrame>
      );
    case "mobile-app-development":
      return (
        <>
          <rect x="85" y="33" width="85" height="164" rx="12" fill="#f5f5f5" />
          <path d="M100 66h53M100 79h36M100 94h53" stroke="#d4d4d4" />
          <rect x="151" y="13" width="104" height="194" rx="15" fill="white" />
          <rect
            x="184"
            y="23"
            width="38"
            height="5"
            rx="2.5"
            fill="#d4d4d4"
            stroke="none"
          />
          <rect x="163" y="44" width="80" height="57" rx="3" fill="#f5f5f5" />
          <path d="m163 101 80-57m-80 0 80 57" stroke="#d4d4d4" />
          <path d="M164 118h57M164 128h77M164 138h65" />
          <rect
            x="164"
            y="153"
            width="78"
            height="23"
            rx="4"
            fill="#e5e5e5"
            stroke="none"
          />
          <path d="M187 194h32" strokeWidth="3" strokeLinecap="round" />
        </>
      );
    case "bots-workflow-automation":
      return (
        <>
          <g fill="white">
            <rect x="16" y="89" width="82" height="42" rx="4" />
            <path d="m168 77 33 33-33 33-33-33z" />
            <rect x="246" y="40" width="98" height="42" rx="4" />
            <rect x="246" y="138" width="98" height="42" rx="4" />
          </g>
          <path d="M98 110h37M201 110h21V61h24M222 110v49h24" />
          <path d="m238 57 8 4-8 4m0 90 8 4-8 4" />
          <path d="m158 110 7 7 13-14" stroke="#737373" strokeWidth="2" />
          <g fill="#525252" stroke="none" textAnchor="middle" fontSize="12">
            <text x="57" y="114">
              Request
            </text>
            <text x="295" y="65">
              Action
            </text>
            <text x="295" y="163">
              Notification
            </text>
          </g>
        </>
      );
    case "desktop-app-development":
      return (
        <WindowFrame>
          <path d="M111 53v137" />
          <path d="M61 73h32M61 89h24M61 105h30M61 121h22" />
          <rect x="129" y="70" width="165" height="24" rx="2" fill="#f5f5f5" />
          <path
            d="M141 82h47M129 112h165M129 136h165M129 160h165M231 103v71"
            stroke="#d4d4d4"
          />
          <path d="M139 124h65M139 148h46M139 172h55M244 124h36M244 148h36M244 172h36" />
        </WindowFrame>
      );
    default:
      throw new Error(`Missing service visual: ${slug}`);
  }
}

export default function ServiceVisual({ slug }: { slug: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 360 220"
      fill="none"
      stroke="#a3a3a3"
      strokeWidth="1.25"
      className="h-auto max-h-full w-full max-w-sm"
    >
      <DiagramContent slug={slug} />
    </svg>
  );
}
