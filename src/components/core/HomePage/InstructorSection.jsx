import React from 'react';
import instructor from '../../../assets/Images/Instructor.png';
import HighlightText from './HighlightText.jsx';
import CTAButton from './CTAButton.jsx';
import { FaArrowRight } from 'react-icons/fa';

function InstructorSection() {
	return (
		<div className="mt-20">
			<div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center justify-between">
				{/* Image Section */}
				<div className="w-full lg:w-[50%]">
					<img
						src={instructor}
						className="w-full max-w-[500px] mx-auto shadow-white shadow-[-20px_-20px_0_0]"
						alt="instructor image"
					/>
				</div>

				{/* Text Section */}
				<div className="flex flex-col w-full lg:w-[50%] gap-6 lg:gap-10 items-center lg:items-start text-center lg:text-left">
					<p className="capitalize text-white text-3xl sm:text-4xl font-semibold">
						Become an <HighlightText text={'Instructor'} />
					</p>

					<p className="font-medium text-sm sm:text-base w-[90%] sm:w-[80%] text-richblack-300">
						Instructors from around the world teach millions of students on
						StudyNotion. We provide the tools and skills to teach what you love.
					</p>

					<div className="w-fit">
						<CTAButton active={true} linkto={'/signup'}>
							<div className="flex items-center gap-2 capitalize">
								start teaching today
								<FaArrowRight />
							</div>
						</CTAButton>
					</div>
				</div>
			</div>
		</div>
	);
}

export default InstructorSection;
