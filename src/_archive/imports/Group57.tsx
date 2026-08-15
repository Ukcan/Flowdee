import svgPaths from "./svg-u4apcz4mg0";

function ImageWithFallback() {
  return (
    <div className="absolute h-[191.996px] left-0 top-0 w-[247.008px]" data-name="ImageWithFallback">
      <div className="absolute inset-0 bg-gradient-to-b from-[#EDD2AF]/20 to-[#FAF5ED]/20" />
    </div>
  );
}

function Container() {
  return <div className="absolute bg-gradient-to-b from-[#EDD2AF] h-[191.996px] left-0 opacity-90 to-[#FAF5ED] top-0 w-[247.008px]" data-name="Container" />;
}

function Icon() {
  return (
    <div className="absolute left-[9.99px] size-[15.993px] top-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9931 15.9931">
        <g clipPath="url(#clip0_36_655)" id="Icon">
          <path d={svgPaths.p608eb00} id="Vector" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33276" />
          <path d={svgPaths.pdae7c00} id="Vector_2" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33276" />
        </g>
        <defs>
          <clipPath id="clip0_36_655">
            <rect fill="white" height="15.9931" width="15.9931" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[rgba(255,255,255,0.9)] h-[31.994px] relative rounded-[8px] shrink-0 w-[128.83px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon />
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[39.98px] not-italic text-[#101828] text-[14px] text-nowrap top-[4.49px]">View Project</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute content-stretch flex h-[191.996px] items-center justify-center left-0 opacity-0 pl-0 pr-[0.008px] py-0 top-0 w-[247.008px]" data-name="Container">
      <Button />
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[191.996px] overflow-clip relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <ImageWithFallback />
      <Container />
      <Container1 />
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute h-[27.992px] left-0 top-0 w-[247.008px]" data-name="Heading 3">
      <p className="absolute font-['Poppins:SemiBold',sans-serif] leading-[28px] left-0 not-italic text-[#252121] text-[18px] text-nowrap top-px">SaaS Dashboard</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[41px] left-[-0.5px] overflow-clip top-[39.51px] w-[248px]" data-name="Paragraph">
      <p className="absolute font-['Satoshi:Regular',sans-serif] leading-[20px] left-[-0.5px] not-italic text-[#6e6e6e] text-[14px] top-[0.52px] w-[258px]">{`Optimisation du parcours d'onboarding avec réduction de 40% du time-to-value.`}</p>
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[148.5px] size-[15.993px] top-[47.54px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9931 15.9931">
        <g id="Icon">
          <path d={svgPaths.p2603b5c0} id="Vector" stroke="var(--stroke-0, #7D5FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33276" />
          <path d={svgPaths.p8ba6a80} id="Vector_2" stroke="var(--stroke-0, #7D5FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33276" />
          <path d={svgPaths.p1ac63e80} id="Vector_3" stroke="var(--stroke-0, #7D5FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33276" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[82.5px] top-[45.54px]">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[82.5px] not-italic text-[#7d5fff] text-[14px] text-nowrap top-[45.54px]">Voir plus</p>
      <Icon1 />
    </div>
  );
}

function Badge() {
  return (
    <div className="absolute bg-[#d9d5ff] h-[24.984px] left-[-0.5px] rounded-[8px] top-[-17.46px] w-[61.678px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[8.501px] py-[4.501px] relative rounded-[inherit] size-full">
        <p className="font-['Satoshi:Medium',sans-serif] leading-[13px] not-italic relative shrink-0 text-[#5142dc] text-[12px] text-nowrap">Data Viz</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.501px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Badge1() {
  return (
    <div className="absolute bg-[#d9d5ff] h-[24.984px] left-[69.18px] rounded-[8px] top-[-17.46px] w-[116.98px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[8.501px] py-[4.501px] relative rounded-[inherit] size-full">
        <p className="font-['Satoshi:Medium',sans-serif] leading-[13px] not-italic relative shrink-0 text-[#5142dc] text-[12px] text-nowrap">Dashboard Design</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.501px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute h-[31.994px] left-0 rounded-[8px] top-[108.98px] w-[247.008px]" data-name="Button">
      <Group />
      <Badge />
      <Badge1 />
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[140.97px] relative shrink-0 w-full" data-name="Container">
      <Heading />
      <Paragraph />
      <Button1 />
    </div>
  );
}

function ProjectCard() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[15.993px] h-[445.418px] items-start left-0 pb-[0.501px] pt-[24.499px] px-[24.499px] rounded-[16px] shadow-[0px_3px_9px_-1px_rgba(0,0,0,0.2)] top-0 w-[296.006px]" data-name="Project Card 1">
      <Container2 />
      <Container3 />
    </div>
  );
}

function ImageWithFallback1() {
  return (
    <div className="absolute h-[191.996px] left-0 top-0 w-[247.008px]" data-name="ImageWithFallback">
      <div className="absolute inset-0 bg-gradient-to-b from-[#c787ff]/20 to-[#dfa8ff]/20" />
    </div>
  );
}

function Container4() {
  return <div className="absolute bg-gradient-to-b from-[#c787ff] h-[191.996px] left-0 opacity-90 to-[#dfa8ff] top-0 w-[247.008px]" data-name="Container" />;
}

function Icon2() {
  return (
    <div className="absolute left-[9.99px] size-[15.993px] top-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9931 15.9931">
        <g clipPath="url(#clip0_36_655)" id="Icon">
          <path d={svgPaths.p608eb00} id="Vector" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33276" />
          <path d={svgPaths.pdae7c00} id="Vector_2" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33276" />
        </g>
        <defs>
          <clipPath id="clip0_36_655">
            <rect fill="white" height="15.9931" width="15.9931" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[rgba(255,255,255,0.9)] h-[31.994px] relative rounded-[8px] shrink-0 w-[128.83px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon2 />
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[39.98px] not-italic text-[#101828] text-[14px] text-nowrap top-[4.49px]">View Project</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute content-stretch flex h-[191.996px] items-center justify-center left-0 opacity-0 pl-0 pr-[0.008px] py-0 top-0 w-[247.008px]" data-name="Container">
      <Button2 />
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[191.996px] overflow-clip relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <ImageWithFallback1 />
      <Container4 />
      <Container5 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="absolute h-[27.992px] left-0 top-0 w-[247.008px]" data-name="Heading 3">
      <p className="absolute font-['Poppins:SemiBold',sans-serif] leading-[28px] left-0 not-italic text-[#252121] text-[18px] text-nowrap top-px">Appli mobile</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute h-[20.003px] left-0 overflow-clip top-[39.99px] w-[247.008px]" data-name="Paragraph">
      <p className="absolute font-['Satoshi:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#6e6e6e] text-[14px] text-nowrap top-px">Création d’une application mobile</p>
    </div>
  );
}

function Badge2() {
  return (
    <div className="absolute bg-[#d9d5ff] h-[24.984px] left-0 rounded-[8px] top-0 w-[61.678px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[8.501px] py-[4.501px] relative rounded-[inherit] size-full">
        <p className="font-['Satoshi:Medium',sans-serif] leading-[13px] not-italic relative shrink-0 text-[#5142dc] text-[12px] text-nowrap">Data Viz</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.501px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Badge3() {
  return (
    <div className="absolute bg-[#d9d5ff] h-[24.984px] left-[69.67px] rounded-[8px] top-0 w-[116.98px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[8.501px] py-[4.501px] relative rounded-[inherit] size-full">
        <p className="font-['Satoshi:Medium',sans-serif] leading-[13px] not-italic relative shrink-0 text-[#5142dc] text-[12px] text-nowrap">Dashboard Design</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.501px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute h-[24.984px] left-0 top-[71.99px] w-[247.008px]" data-name="Container">
      <Badge2 />
      <Badge3 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute left-[148.5px] size-[15.993px] top-[47.54px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9931 15.9931">
        <g id="Icon">
          <path d={svgPaths.p2603b5c0} id="Vector" stroke="var(--stroke-0, #7D5FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33276" />
          <path d={svgPaths.p8ba6a80} id="Vector_2" stroke="var(--stroke-0, #7D5FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33276" />
          <path d={svgPaths.p1ac63e80} id="Vector_3" stroke="var(--stroke-0, #7D5FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33276" />
        </g>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[82.5px] top-[45.54px]">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[82.5px] not-italic text-[#7d5fff] text-[14px] text-nowrap top-[45.54px]">Voir plus</p>
      <Icon3 />
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute h-[31.994px] left-0 rounded-[8px] top-[108.98px] w-[247.008px]" data-name="Button">
      <Group1 />
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[140.97px] relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <Paragraph1 />
      <Container7 />
      <Button3 />
    </div>
  );
}

function ProjectCard2() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[15.993px] h-[445.418px] items-start left-[672px] pb-[0.501px] pt-[24.499px] px-[24.499px] rounded-[16px] shadow-[0px_3px_9px_-1px_rgba(0,0,0,0.2)] top-0 w-[296.006px]" data-name="Project Card 3">
      <Container6 />
      <Container8 />
    </div>
  );
}

function ImageWithFallback2() {
  return (
    <div className="absolute h-[191.996px] left-0 top-0 w-[247.008px]" data-name="ImageWithFallback">
      <div className="absolute inset-0 bg-gradient-to-b from-[#ff87cf]/20 to-[#ffa8d8]/20" />
    </div>
  );
}

function Container9() {
  return <div className="absolute bg-gradient-to-b from-[#ff87cf] h-[191.996px] left-0 opacity-90 to-[#ffa8d8] top-0 w-[247.008px]" data-name="Container" />;
}

function Icon4() {
  return (
    <div className="absolute left-[9.99px] size-[15.993px] top-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9931 15.9931">
        <g clipPath="url(#clip0_36_655)" id="Icon">
          <path d={svgPaths.p608eb00} id="Vector" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33276" />
          <path d={svgPaths.pdae7c00} id="Vector_2" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33276" />
        </g>
        <defs>
          <clipPath id="clip0_36_655">
            <rect fill="white" height="15.9931" width="15.9931" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[rgba(255,255,255,0.9)] h-[31.994px] relative rounded-[8px] shrink-0 w-[128.83px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon4 />
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[39.98px] not-italic text-[#101828] text-[14px] text-nowrap top-[4.49px]">View Project</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute content-stretch flex h-[191.996px] items-center justify-center left-0 opacity-0 pl-0 pr-[0.008px] py-0 top-0 w-[247.008px]" data-name="Container">
      <Button4 />
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[191.996px] overflow-clip relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <ImageWithFallback2 />
      <Container9 />
      <Container10 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="absolute h-[27.992px] left-0 top-0 w-[247.008px]" data-name="Heading 3">
      <p className="absolute font-['Poppins:SemiBold',sans-serif] leading-[28px] left-0 not-italic text-[#252121] text-[18px] text-nowrap top-px">Site web</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute h-[20.003px] left-0 overflow-clip top-[39.99px] w-[247.008px]" data-name="Paragraph">
      <p className="absolute font-['Satoshi:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#6e6e6e] text-[14px] text-nowrap top-px">Création site web associatif</p>
    </div>
  );
}

function Badge4() {
  return (
    <div className="absolute bg-[#d9d5ff] h-[24.984px] left-0 rounded-[8px] top-0 w-[61.678px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[8.501px] py-[4.501px] relative rounded-[inherit] size-full">
        <p className="font-['Satoshi:Medium',sans-serif] leading-[14px] not-italic relative shrink-0 text-[#5142dc] text-[12px] text-nowrap">Web</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.501px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Badge5() {
  return (
    <div className="absolute bg-[#d9d5ff] h-[24.984px] left-[69.67px] rounded-[8px] top-0 w-[116.98px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[8.501px] py-[4.501px] relative rounded-[inherit] size-full">
        <p className="font-['Satoshi:Medium',sans-serif] leading-[14px] not-italic relative shrink-0 text-[#5142dc] text-[12px] text-nowrap">UX / UI design</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.501px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute h-[24.984px] left-0 top-[71.99px] w-[247.008px]" data-name="Container">
      <Badge4 />
      <Badge5 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="absolute left-[148.5px] size-[15.993px] top-[47.54px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9931 15.9931">
        <g id="Icon">
          <path d={svgPaths.p2603b5c0} id="Vector" stroke="var(--stroke-0, #7D5FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33276" />
          <path d={svgPaths.p8ba6a80} id="Vector_2" stroke="var(--stroke-0, #7D5FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33276" />
          <path d={svgPaths.p1ac63e80} id="Vector_3" stroke="var(--stroke-0, #7D5FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33276" />
        </g>
      </svg>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-[82.5px] top-[45.54px]">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[82.5px] not-italic text-[#7d5fff] text-[14px] text-nowrap top-[45.54px]">Voir plus</p>
      <Icon5 />
    </div>
  );
}

function Badge6() {
  return (
    <div className="absolute bg-[#d9d5ff] h-[25px] left-[-0.5px] rounded-[8px] top-[-5.46px] w-[88px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[8.501px] py-[4.501px] relative rounded-[inherit] size-full">
        <p className="font-['Satoshi:Medium',sans-serif] leading-[14px] not-italic relative shrink-0 text-[#5142dc] text-[12px] text-nowrap">Graphisme</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.501px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute h-[31.994px] left-0 rounded-[8px] top-[108.98px] w-[247.008px]" data-name="Button">
      <Group2 />
      <Badge6 />
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[140.97px] relative shrink-0 w-full" data-name="Container">
      <Heading2 />
      <Paragraph2 />
      <Container12 />
      <Button5 />
    </div>
  );
}

function ProjectCard1() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[15.993px] h-[445.418px] items-start left-[336px] pb-[0.501px] pt-[24.499px] px-[24.499px] rounded-[16px] shadow-[0px_3px_9px_-1px_rgba(0,0,0,0.2)] top-0 w-[296.006px]" data-name="Project Card 2">
      <Container11 />
      <Container13 />
    </div>
  );
}

function ImageWithFallback3() {
  return (
    <div className="absolute h-[191.996px] left-0 top-0 w-[247.008px]" data-name="ImageWithFallback">
      <div className="absolute inset-0 bg-gradient-to-b from-[#ffd387]/20 to-[#ffe5a8]/20" />
    </div>
  );
}

function Container14() {
  return <div className="absolute bg-gradient-to-b from-[#ffd387] h-[191.996px] left-0 opacity-90 to-[#ffe5a8] top-0 w-[247.008px]" data-name="Container" />;
}

function Icon6() {
  return (
    <div className="absolute left-[9.99px] size-[15.993px] top-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9931 15.9931">
        <g clipPath="url(#clip0_36_655)" id="Icon">
          <path d={svgPaths.p608eb00} id="Vector" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33276" />
          <path d={svgPaths.pdae7c00} id="Vector_2" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33276" />
        </g>
        <defs>
          <clipPath id="clip0_36_655">
            <rect fill="white" height="15.9931" width="15.9931" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-[rgba(255,255,255,0.9)] h-[31.994px] relative rounded-[8px] shrink-0 w-[128.83px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon6 />
        <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[39.98px] not-italic text-[#101828] text-[14px] text-nowrap top-[4.49px]">View Project</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute content-stretch flex h-[191.996px] items-center justify-center left-0 opacity-0 pl-0 pr-[0.008px] py-0 top-0 w-[247.008px]" data-name="Container">
      <Button6 />
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[191.996px] overflow-clip relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <ImageWithFallback3 />
      <Container14 />
      <Container15 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="absolute h-[27.992px] left-0 top-0 w-[247.008px]" data-name="Heading 3">
      <p className="absolute font-['Poppins:SemiBold',sans-serif] leading-[28px] left-0 not-italic text-[#252121] text-[18px] text-nowrap top-px">Dashboard</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="absolute h-[20.003px] left-0 overflow-clip top-[39.99px] w-[247.008px]" data-name="Paragraph">
      <p className="absolute font-['Satoshi:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#6e6e6e] text-[14px] text-nowrap top-px">Créationd’un tableau de bord</p>
    </div>
  );
}

function Badge7() {
  return (
    <div className="absolute bg-[#d9d5ff] h-[24.984px] left-0 rounded-[8px] top-0 w-[61.678px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[8.501px] py-[4.501px] relative rounded-[inherit] size-full">
        <p className="font-['Satoshi:Medium',sans-serif] leading-[14px] not-italic relative shrink-0 text-[#5142dc] text-[12px] text-nowrap">Web</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.501px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Badge8() {
  return (
    <div className="absolute bg-[#d9d5ff] h-[24.984px] left-[69.67px] rounded-[8px] top-0 w-[116.98px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[8.501px] py-[4.501px] relative rounded-[inherit] size-full">
        <p className="font-['Satoshi:Medium',sans-serif] leading-[14px] not-italic relative shrink-0 text-[#5142dc] text-[12px] text-nowrap">UX / UI design</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.501px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute h-[24.984px] left-0 top-[71.99px] w-[247.008px]" data-name="Container">
      <Badge7 />
      <Badge8 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="absolute left-[148.5px] size-[15.993px] top-[47.54px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9931 15.9931">
        <g id="Icon">
          <path d={svgPaths.p2603b5c0} id="Vector" stroke="var(--stroke-0, #7D5FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33276" />
          <path d={svgPaths.p8ba6a80} id="Vector_2" stroke="var(--stroke-0, #7D5FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33276" />
          <path d={svgPaths.p1ac63e80} id="Vector_3" stroke="var(--stroke-0, #7D5FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33276" />
        </g>
      </svg>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents left-[82.5px] top-[45.54px]">
      <p className="absolute font-['Arial:Regular',sans-serif] leading-[20px] left-[82.5px] not-italic text-[#7d5fff] text-[14px] text-nowrap top-[45.54px]">Voir plus</p>
      <Icon7 />
    </div>
  );
}

function Badge9() {
  return (
    <div className="absolute bg-[#d9d5ff] h-[25px] left-[-0.5px] rounded-[8px] top-[-5.46px] w-[88px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[8.501px] py-[4.501px] relative rounded-[inherit] size-full">
        <p className="font-['Satoshi:Medium',sans-serif] leading-[14px] not-italic relative shrink-0 text-[#5142dc] text-[12px] text-nowrap">Graphisme</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.501px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Button7() {
  return (
    <div className="absolute h-[31.994px] left-0 rounded-[8px] top-[108.98px] w-[247.008px]" data-name="Button">
      <Group3 />
      <Badge9 />
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[140.97px] relative shrink-0 w-full" data-name="Container">
      <Heading3 />
      <Paragraph3 />
      <Container17 />
      <Button7 />
    </div>
  );
}

function ProjectCard3() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[15.993px] h-[445.418px] items-start left-[1008px] pb-[0.501px] pt-[24.499px] px-[24.499px] rounded-[16px] shadow-[0px_3px_9px_-1px_rgba(0,0,0,0.2)] top-0 w-[296.006px]" data-name="Project Card 4">
      <Container16 />
      <Container18 />
    </div>
  );
}

export default function Group4() {
  return (
    <div className="relative size-full">
      <ProjectCard />
      <ProjectCard2 />
      <ProjectCard1 />
      <ProjectCard3 />
    </div>
  );
}