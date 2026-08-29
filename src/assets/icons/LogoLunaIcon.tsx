import React from "react";

interface SvgComponentProps extends React.SVGProps<SVGSVGElement> {
    width?: string | number;
    height?: string | number;
}

const LunaLogoIcon = React.forwardRef<SVGSVGElement, SvgComponentProps>(
    ({ width = 126, height = 144, ...props }, ref) => {
        return (
            <svg
                ref={ref}
                width={width}
                height={height}
                viewBox="0 0 126 144"
                role="img"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                {...props}
            >
                <defs>
                    <linearGradient
                        id="luna-gradient"
                        x1=".05"
                        x2=".98"
                        y1=".5"
                        y2=".52"
                    >
                        <stop stopColor="#7B2CBF" />
                        <stop offset=".83" stopColor="#E66063" />
                        <stop offset="1" stopColor="#E66063" />
                    </linearGradient>
                </defs>

                <g className="layer">
                    {/* Paths do SVG original */}
                </g>
            </svg>
        );
    }
);

LunaLogoIcon.displayName = "LunaLogo";

export default LunaLogoIcon;