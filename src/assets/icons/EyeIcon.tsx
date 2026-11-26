
import React from "react"

interface EyeIconProps extends React.SVGProps<SVGSVGElement> {
	width?: string | number
	height?: string | number
}

const EyeIcon = React.forwardRef<SVGSVGElement, EyeIconProps>(
	({ width = 16, height = 16, ...props }, ref) => {
		return (
			<svg
				ref={ref}
				width={width}
				height={height}
				viewBox="0 0 16 16"
				fill="none"
				role="img"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				{...props}
			>
				<g
					stroke="#5A189A"
					strokeLinecap="round"
					strokeLinejoin="round"
					clipPath="url(#eye-clip)"
				>
					<path d="M9.333 8a1.333 1.333 0 1 1-2.667 0 1.333 1.333 0 0 1 2.667 0Z" />
					<path d="M14.667 8c-1.778 3.111-4 4.666-6.666 4.666-2.667 0-4.889-1.555-6.667-4.666 1.778-3.112 4-4.667 6.667-4.667 2.666 0 4.888 1.555 6.666 4.667Z" />
				</g>

				<defs>
					<clipPath id="eye-clip">
						<path fill="#fff" d="M0 0h16v16H0z" />
					</clipPath>
				</defs>
			</svg>
		)
	}
)

EyeIcon.displayName = "EyeIcon"

export default EyeIcon
