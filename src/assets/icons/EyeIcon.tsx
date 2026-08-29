import React from "react";

interface SvgComponentProps extends React.SVGProps<SVGSVGElement> {
    width?: string | number;
    height?: string | number;
}

const EyeIcon = React.forwardRef<SVGSVGElement, SvgComponentProps>(
    ({ width = 16, height = 16, ...props }, ref) => {
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
                        <path fill="#fff" d="M0 0h16v16H0z" />
                    </clipPath>
                </defs>
                <g className="layer">
                    <g clipPath="url(#a)" stroke="#5A189A" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M8 9.33c.74 0 1.33-.59 1.33-1.33 0-.74-.59-1.33-1.33-1.33-.74 0-1.33.59-1.33 1.33 0 .74.59 1.33 1.33 1.33z" />
                        <path d="M14.67 8c-1.78 3.11-4 4.67-6.67 4.67S3.11 11.11 1.33 8c1.78-3.11 4-4.67 6.67-4.67S12.89 4.89 14.67 8z" />
                    </g>
                </g>
            </svg>
        );
    }
);

EyeIcon.displayName = "EyeIcon";

export default EyeIcon;