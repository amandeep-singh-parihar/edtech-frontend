import React from 'react';

function Error() {
	return (
		<div className="w-full h-full flex items-center justify-center">
			<div className="flex flex-col justify-center items-center text-4xl font-bold text-richblack-200 mt-48">
				<div className="font-black text-8xl">
					4<span className="text-richblack-50">0</span>4
				</div>
				<div className="capitalize">
					<span className="text-richblack-50">Page </span>
					Not
					<span className="text-richblack-50"> Found</span>
				</div>
			</div>
		</div>
	);
}

export default Error;
