import React from "react";

interface SvgComponentProps extends React.SVGProps<SVGSVGElement> {
    width?: string | number;
    height?: string | number;
}

const UserIcon = React.forwardRef<SVGSVGElement, SvgComponentProps>(
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
                <g className="layer">
                    <path
                        d="M10.1 10.65a.67.67 0 0 0-.2 0 2.72 2.72 0 0 1-2.63-2.73c0-1.5 1.21-2.73 2.73-2.73 1.51 0 2.73 1.23 2.73 2.73a2.727 2.727 0 0 1-2.63 2.73zM15.62 16.15A8.282 8.282 0 0 1 10 18.33c-2.17 0-4.13-.82-5.62-2.18.09-.78.59-1.55 1.48-2.15 2.28-1.52 6.01-1.52 8.28 0 .89.6 1.39 1.37 1.48 2.15z"
                        stroke="#5A189A"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                    />
                    <path
                        d="M10 18.33a8.33 8.33 0 1 0-.001-16.661A8.33 8.33 0 0 0 10 18.33z"
                        stroke="#5A189A"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                    />
                </g>
            </svg>
        );
    }
);

UserIcon.displayName = "UserIcon";

export default UserIcon;