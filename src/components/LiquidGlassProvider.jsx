export default function LiquidGlassProvider() {
  return (
    <svg
      className="liquid-glass-svg"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* Main liquid distortion — feTurbulence + feDisplacementMap */}
        <filter id="liquid-distortion" x="-20%" y="-20%" width="140%" height="140%"
          colorInterpolationFilters="sRGB">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.018 0.022"
            numOctaves="3"
            seed="5"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="6"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="0.4" result="blurred" />
          <feComposite in="blurred" in2="SourceGraphic" operator="atop" />
        </filter>

        {/* Edge-refraction filter — bends light at borders */}
        <filter id="glass-refraction" x="-10%" y="-10%" width="120%" height="120%"
          colorInterpolationFilters="sRGB">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.04 0.03"
            numOctaves="2"
            seed="12"
            result="refracNoise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="refracNoise"
            scale="3"
            xChannelSelector="R"
            yChannelSelector="B"
          />
        </filter>

        {/* Glow filter for primary accent elements */}
        <filter id="glow-primary" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
          <feColorMatrix in="blur" type="saturate" values="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Soft inner shadow for depth */}
        <filter id="inner-shadow" x="-5%" y="-5%" width="110%" height="110%">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  )
}
