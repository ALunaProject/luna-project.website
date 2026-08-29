import React from "react";

interface SvgComponentProps extends React.SVGProps<SVGSVGElement> {
    width?: string | number;
    height?: string | number;
}

const MailIcon = React.forwardRef<SVGSVGElement, SvgComponentProps>(
    ({ width = 20, height = 20, ...props }, ref) => {
        return (
            <svg
                ref={ref}
                width={width}
                height={height}
                role="img"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                {...props}
            >
                <defs>
                    <clipPath id="a">
                        <path fill="#fff" d="M0 0h20v20H0z" />
                    </clipPath>
                </defs>
                <g className="layer">
                    <g clipPath="url(#a)" stroke="#5A189A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                        <path d="M15.83 4.17H4.17c-.92 0-1.67.74-1.67 1.66v8.34c0 .92.75 1.66 1.67 1.66h11.66c.92 0 1.67-.74 1.67-1.66V5.83c0-.92-.75-1.66-1.67-1.66z" />
                        <path d="m2.5 5.83 7.5 5 7.5-5" />
                    </g>
                </g>
            </svg>
        );
    }
);

MailIcon.displayName = "MailIcon";

export default MailIcon;