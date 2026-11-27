
import React from "react"

interface UserIconProps extends React.SVGProps<SVGSVGElement> {
	width?: string | number
	height?: string | number
}

const UserIcon = React.forwardRef<SVGSVGElement, UserIconProps>(
	({ width = 20, height = 20, ...props }, ref) => {
		return (
			<svg
				ref={ref}
				width={width}
				height={height}
				viewBox="0 0 20 20"
				fill="none"
				role="img"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				{...props}
			>
				<path
					stroke="#5A189A"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={1.5}
					d="M10.099 10.65a.806.806 0 0 0-.2 0 2.724 2.724 0 0 1-2.633-2.725A2.73 2.73 0 0 1 9.999 5.19a2.73 2.73 0 0 1 .1 5.458ZM15.616 16.15A8.279 8.279 0 0 1 10 18.333a8.279 8.279 0 0 1-5.616-2.183c.083-.783.583-1.55 1.475-2.15 2.283-1.517 6.016-1.517 8.283 0 .892.6 1.392 1.367 1.475 2.15Z"
				/>
				<path
					stroke="#5A189A"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={1.5}
					d="M18.333 10a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0Z"
				/>
			</svg>
		)
	}
)

UserIcon.displayName = "UserIcon"

export default UserIcon
