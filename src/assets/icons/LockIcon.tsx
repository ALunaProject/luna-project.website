import React from "react"

interface SvgComponentProps extends React.SVGProps<SVGSVGElement> {
	width?: string | number
	height?: string | number
}

const LockIcon = React.forwardRef<SVGSVGElement, SvgComponentProps>(
	({ width = 20, height = 20, ...props }, ref) => {
		return (
			<svg
				ref={ref}
				width={width}
				height={height}
				role="img"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				{...props}>
				<defs>
					<clipPath id="a">
						<path fill="#fff" d="M0 0h20v20H0z" />
					</clipPath>
				</defs>
				<g className="layer">
					<g
						clipPath="url(#a)"
						stroke="#5A189A"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2">
						<path d="M14.17 9.17H5.83c-.92 0-1.66.74-1.66 1.66v5c0 .92.74 1.67 1.66 1.67h8.34c.92 0 1.66-.75 1.66-1.67v-5c0-.92-.74-1.66-1.66-1.66z" />
						<path d="M10 14.17c.46 0 .83-.38.83-.84 0-.46-.37-.83-.83-.83-.46 0-.83.37-.83.83 0 .46.37.84.83.84zM6.67 9.17V5.83a3.33 3.33 0 1 1 6.66 0v3.34" />
					</g>
				</g>
			</svg>
		)
	},
)

LockIcon.displayName = "LockIcon"

export default LockIcon
