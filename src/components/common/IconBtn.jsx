import React from 'react';

function IconBtn({
	text,
	onclick,
	children,
	disabled,
	outline = false,
	customClasses = '',
	type = 'submit',
}) {
	return (
		<button
			disabled={disabled}
			onClick={onclick}
			type={type}
			className={`flex items-center ${
				outline ? 'border border-yellow-50 bg-transparent' : 'bg-yellow-50'
			} cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 ${customClasses}`}
		>
			{children ? (
				<div className="flex items-center justify-center gap-1">
					<span className={outline ? 'text-yellow-50' : ''}>{text}</span>
					{children}
				</div>
			) : (
				text
			)}
		</button>
	);
}

export default IconBtn;
