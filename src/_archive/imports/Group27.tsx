import svgPaths from "./svg-sg0ezcs3e9";

function Localisation() {
  return (
    <div className="absolute bottom-[23.2%] content-stretch flex items-center left-[calc(50%+110px)] top-[67.4%] translate-x-[-50%]" data-name="Localisation">
      <p className="font-['Satoshi:Regular',sans-serif] leading-[17px] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-white">Remote</p>
    </div>
  );
}

function LogoFlowdee() {
  return (
    <div className="absolute h-[41px] left-0 top-0 w-[181px]" data-name="Logo Flowdee">
      <div className="absolute inset-[0_-0.1%_0_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 181.18 41">
          <g id="Logo Flowdee">
            <path d={svgPaths.p134dde00} fill="var(--fill-0, white)" id="Vector" />
            <g id="FL">
              <path d={svgPaths.pa8f9a80} fill="var(--fill-0, white)" id="Vector_2" />
              <path d={svgPaths.p121b2a00} fill="var(--fill-0, white)" id="Vector_3" />
            </g>
            <path d={svgPaths.p1c918f00} fill="var(--fill-0, white)" id="o" />
            <g id="Group 47">
              <path d={svgPaths.p29a3c300} fill="var(--fill-0, white)" id="Vector_4" />
              <path d={svgPaths.p1102b900} fill="var(--fill-0, white)" id="Vector_5" />
              <path d={svgPaths.p2f609b80} fill="var(--fill-0, white)" id="Vector_6" />
              <path d={svgPaths.p261caa80} fill="var(--fill-0, white)" id="Vector_7" />
              <path d={svgPaths.p1ed64800} fill="var(--fill-0, #4F3FDC)" id="Vector_8" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-0 top-0">
      <p className="[text-underline-position:from-font] absolute decoration-solid font-['Satoshi:Medium',sans-serif] inset-[32.6%_54.1%_58.01%_0] leading-[17px] not-italic text-[14px] text-center text-nowrap text-white underline">contact@flowdee.fr</p>
      <p className="absolute font-['Satoshi:Medium',sans-serif] inset-[50.83%_54.85%_41.44%_0] leading-[16px] not-italic text-[14px] text-center text-white">+33 6 26 45 45 75</p>
      <div className="absolute h-[13.064px] left-0 top-[123.97px] w-[7.499px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.49883 13.0644">
          <path d={svgPaths.p27a88800} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <p className="absolute font-['Satoshi:Medium',sans-serif] leading-[17px] left-[112px] not-italic text-[14px] text-center text-nowrap text-white top-[122px] translate-x-[-50%]">
        <span>{`UX/UI Design - `}</span>
        <span className="font-['Satoshi:Regular',sans-serif]">Bordeaux</span>
        <span>{` | `}</span>
        <span className="font-['Satoshi:Regular',sans-serif]">{`Nice `}</span>
      </p>
      <div className="absolute inset-[87.29%_90.77%_0_0]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.7333 23">
          <path d={svgPaths.p21fc6870} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
      <LogoFlowdee />
    </div>
  );
}

export default function Group() {
  return (
    <div className="relative size-full">
      <Localisation />
      <Group1 />
    </div>
  );
}