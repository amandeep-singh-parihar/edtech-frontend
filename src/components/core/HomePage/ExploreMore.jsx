import React from 'react';
import { HomePageExplore } from '../../../data/homepage-explore';
import HighlightText from './HighlightText';
import { useState } from 'react';
import CourseCard from './CourseCard';

const tabsName = [
	'Free',
	'New to coding',
	'Most popular',
	'Skills paths',
	'Career paths',
];

const ExploreMore = () => {
	const [currentTab, setCurrentTab] = useState(HomePageExplore[0].tag); // free

	const [courses, setCourses] = useState(HomePageExplore[0].courses); // courses array of index 0

	const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0]); //first course of courses array

	const setMyCourse = (element) => {
		setCurrentTab(element);

		const result = HomePageExplore.filter((course) => course.tag === element);

		setCourses(result[0].courses);

		setCurrentCard(result[0].courses[0]);
	};

	return (
		<div>
			<div className="text-4xl font-semibold text-center ">
				Unlock the
				<HighlightText text={'Power of Code'} />
			</div>

			<p className="text-center text-richblack-300  text-lg font-semibold mt-3 mb-3 lg:mb-0 ">
				Learn to build anything you can imagine
			</p>

			{/* Free, New to coding, Most popular, Skills paths,Career paths */}
			<div
				className=" hidden lg:flex mt-5 shadow-custom  flex-row rounded-full
       bg-richblack-800 mb-5 border-richblack-100
      p-1 gap-2"
			>
				{tabsName.map((element, index) => {
					return (
						<div
							onClick={() => setMyCourse(element)}
							key={index}
							className={`text-[16px] flex flex-row items-center gap-9 font-medium ${
								currentTab === element
									? 'bg-richblack-900 text-richblack-5 font-medium'
									: 'text-richblack-200'
							} rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-8 py-2`}
						>
							{' '}
							{element}
						</div>
					);
				})}
			</div>

			{/* Gap Div */}
			<div className="hidden lg:block lg:h-[200px]"></div>

			{/* course card*/}
			<div
				className="lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between 
      flex-wrap w-full lg:left-1 lg:-translate-y-[50%] text-black 
      lg:mb-0  mb-9 lg:px-12"
			>
				{courses.map((course, index) => (
					<CourseCard
						key={index}
						cardData={course}
						currentCard={currentCard.heading}
						setCurrentCard={setCurrentCard}
						onClick={() => setCurrentCard(course)}
					/>
				))}
			</div>
		</div>
	);
};

export default ExploreMore;
