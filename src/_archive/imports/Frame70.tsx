import svgPaths from "./svg-7zd58e47fv";

export default function Frame({ className }: { className?: string }) {
  return (
    <div className={className || "h-[18px] relative w-[20px]"}>
      <div className="absolute inset-[0_-1%_-1.11%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.2 18.2">
          <g filter="url(#filter0_d_2446_10)" id="Rectangle 6790">
            <path d={svgPaths.p30ee3fc0} fill="var(--fill-0, #CEB6A1)" />
            <path d={svgPaths.p39079000} stroke="var(--stroke-0, white)" strokeWidth="0.05" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="18.2" id="filter0_d_2446_10" width="20.2" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="0.2" dy="0.2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_2446_10" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_2446_10" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}