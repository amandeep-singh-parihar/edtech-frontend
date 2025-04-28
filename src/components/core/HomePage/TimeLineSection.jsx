import React from 'react';
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg';
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg';
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg';
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg';
import TimelineImage from '../../../assets/Images/TimelineImage.png';

const timeline = [
	{
		Logo: Logo1,
		heading: 'LeaderShip',
		Description: 'Fully committed to the success company',
	},
	{
		Logo: Logo2,
		heading: 'Responsibility',
		Description: 'Students will always be our top priority',
	},
	{
		Logo: Logo3,
		heading: 'Flexibility',
		Description: 'The ability to switch is an important skills',
	},
	{
		Logo: Logo4,
		heading: 'Solve the problem',
		Description: 'Code your way to a solution',
	},
];

function TimeLineSection() {
	return (
		<div className="px-4 sm:px-6 md:px-12 lg:px-20 mt-20">
			<div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-center justify-between">
				{/* Timeline Text Section */}
				<div className="flex flex-col gap-8 w-full lg:w-[45%]">
					{timeline.map((ele, index) => (
						<div className="flex gap-4 sm:gap-6" key={index}>
							<div className="min-w-[50px] h-[50px] bg-white flex items-center justify-center rounded-full shadow-md">
								<img src={ele.Logo} alt="" className="w-[24px] h-[24px]" />
							</div>
							<div>
								<h2 className="font-semibold text-lg sm:text-xl">
									{ele.heading}
								</h2>
								<p className="text-sm sm:text-base text-richblack-600">
									{ele.Description}
								</p>
							</div>
						</div>
					))}
				</div>

				{/* Timeline Image with Overlay */}
				<div className="relative w-full max-w-[600px]">
					<img
						src={TimelineImage}
						alt="TimelineImage"
						className="w-full object-cover rounded-md shadow-[10px_-5px_50px_-5px] hover:shadow-blue-200 transition-shadow duration-700"
					/>

					{/* Overlay Stats */}
					<div
						className="absolute left-[50%] -translate-x-1/2 -translate-y-1/2 
						bg-caribbeangreen-700 text-white uppercase flex flex-col sm:flex-row text-center sm:text-left 
						divide-y sm:divide-y-0 sm:divide-x divide-caribbeangreen-300 w-[90%] sm:w-auto rounded-md overflow-hidden"
					>
						<div className="flex flex-col sm:flex-row items-center gap-2 px-5 py-4 sm:py-7 sm:px-7">
							<p className="text-2xl sm:text-3xl font-bold">10</p>
							<p className="text-caribbeangreen-300 text-sm">
								Years of Experience
							</p>
						</div>

						<div className="flex flex-col sm:flex-row items-center gap-2 px-5 py-4 sm:py-7 sm:px-7">
							<p className="text-2xl sm:text-3xl font-bold">250</p>
							<p className="text-caribbeangreen-300 text-sm">Type of Courses</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TimeLineSection;
