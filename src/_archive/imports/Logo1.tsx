import svgPaths from "./svg-qcekpzsr5v";

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={className || "content-stretch flex flex-col h-[15px] items-start relative w-[73px]"} data-name="Logo 1">
      <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] leading-[0] relative shrink-0">
        <div className="col-1 h-[15px] ml-0 mt-0 relative row-1 w-[16px]">
          <div className="absolute inset-[-6.67%_-12.5%_-20%_-12.5%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 19">
              <g filter="url(#filter0_d_399_387)" id="Rectangle 6789" opacity="0.6">
                <path d={svgPaths.p324a6700} fill="url(#paint0_linear_399_387)" />
              </g>
              <defs>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="19" id="filter0_d_399_387" width="20" x="0" y="0">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                  <feOffset dy="1" />
                  <feGaussianBlur stdDeviation="1" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
                  <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_399_387" />
                  <feBlend in="SourceGraphic" in2="effect1_dropShadow_399_387" mode="normal" result="shape" />
                </filter>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_399_387" x1="12.4742" x2="0.165048" y1="21.1404" y2="-5.88146">
                  <stop stopColor="#2D2E4F" />
                  <stop offset="1" stopColor="#6769B5" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <p className="col-1 font-['Tilt_Warp:Regular',sans-serif] h-[27px] leading-[normal] ml-[21px] mt-0 relative row-1 text-[#2f2f3b] text-[12px] tracking-[0.12px] uppercase w-[97px] whitespace-pre-wrap" style={{ fontVariationSettings: "'XROT' 0, 'YROT' 0" }}>
          Flowdee
        </p>
      </div>
    </div>
  );
}