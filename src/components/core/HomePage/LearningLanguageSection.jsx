import React from 'react';
import HighlightText from './HighlightText.jsx';
import Know_your_progress from '../../../assets/Images/Know_your_progress.svg';
import Compare_with_others from '../../../assets/Images/Compare_with_others.svg';
import Plan_your_lessons from '../../../assets/Images/Plan_your_lessons.svg';
import CTAButton from './CTAButton.jsx';

function LearningLanguageSection() {
	return (
		<div className="mt-24 mb-20 px-4 sm:px-6 md:px-12">
			<div className="flex flex-col gap-5 items-center">
				<div className="text-3xl sm:text-4xl font-semibold text-center">
					Your swiss knife for
					<HighlightText text={'learning any language'} />
				</div>

				<div className="text-center text-richblack-600 mx-auto text-sm sm:text-base mt-3 font-medium w-full sm:w-[80%] md:w-[70%]">
					Using spin making learning multiple languages easy. with 20+ languages
					realistic voice-over, progress tracking, custom schedule and more.
				</div>

				<div className="flex flex-col lg:flex-row items-center justify-center mt-8 gap-6 lg:gap-0">
					<img
						src={Know_your_progress}
						alt="Know_your_progress"
						className="object-contain w-[80%] sm:w-[60%] lg:w-auto lg:-mr-32"
					/>
					<img
						src={Compare_with_others}
						alt="Compare_with_others"
						className="object-contain w-[80%] sm:w-[60%] lg:w-auto -mt-10 lg:mt-0"
					/>
					<img
						src={Plan_your_lessons}
						alt="Plan_your_lessons"
						className="object-contain w-[80%] sm:w-[60%] lg:w-auto -mt-12 lg:mt-0 lg:-ml-36"
					/>
				</div>

				<div className="w-fit mt-6">
					<CTAButton active={true} linkto={'/signup'}>
						<div className="capitalize">learn more</div>
					</CTAButton>
				</div>
			</div>
		</div>
	);
}

export default LearningLanguageSection;
