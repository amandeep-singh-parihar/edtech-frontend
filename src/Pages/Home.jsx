import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import HighlightText from '../components/core/HomePage/HighlightText.jsx';
import banner from '../assets/Images/banner.mp4';
import CodeBlocks from '../components/core/HomePage/CodeBlocks.jsx';
import CTAButton from '../components/core/HomePage/CTAButton.jsx';
import Footer from '../components/common/Footer.jsx';
import InstructorSection from '../components/core/HomePage/InstructorSection.jsx';
import TimeLineSection from '../components/core/HomePage/TimeLineSection.jsx';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection.jsx';
import ExploreMore from '../components/core/HomePage/ExploreMore.jsx';

function Home() {
	return (
		<div className="">
			{/* section 1 */}
			<div className="relative mx-auto flex flex-col w-11/12 items-center text-white justify-between">
				<Link to={'/signup'}>
					<div className="group mt-16 p-1 mx-autp rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit">
						<div className="flex justify-center items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
							<p>Become an Instructor</p>
							<FaArrowRight />
						</div>
					</div>
				</Link>

				<div className="capitalize text-4xl font-semibold mt-7">
					Empower Your Future with{' '}
					<HighlightText text={'Coding skills'}></HighlightText>
				</div>

				<div className="mt-4 w-[90%] text-center text-lg font-bold text-richblack-300">
					<p>
						With our online coding courses, you can learn at your own pace, from
						anywhere in the world, and get access to a wealth of resources,
						including hands-on projects, quizzes, and personalized feedback from
						instructors.{' '}
					</p>
				</div>

				<div className=" flex flex-row gap-7 mt-8">
					<CTAButton active={true} linkto={'/signup'}>
						Learn More
					</CTAButton>

					<CTAButton active={false} linkto={'/login'}>
						Book a Demo
					</CTAButton>
				</div>

				{/* video */}
				<div className="mx-3 my-14 shadow-[10px_-5px_50px_-5px] shadow-blue-200 rounded-md w-11/12">
					<video
						muted
						loop
						autoPlay
						className="shadow-[15px_15px_rgba(255,255,255)] rounded-md overflow-hidden"
					>
						<source src={banner} />
					</video>
				</div>

				{/* code section 1 */}
				<div className="w-11/12">
					<CodeBlocks
						position={'lg:flex-row'}
						heading={
							<div className="text-4xl font-semibold">
								Unlock Your{' '}
								<HighlightText text={'coding potential'}></HighlightText> with
								our online courses
							</div>
						}
						subheading={
							'Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.'
						}
						ctabtn1={{
							btnText: 'try it yourself',
							linkto: '/signup',
							active: true,
						}}
						ctabtn2={{
							btnText: 'learn more',
							linkto: '/login',
							active: false,
						}}
						codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a></nav>\n</body>`}
						codeColor={'text-yellow-25'}
					/>
				</div>

				{/* code section 2 */}
				<div className="w-11/12">
					<CodeBlocks
						position={'lg:flex-row-reverse'}
						heading={
							<div className="text-4xl font-semibold flex flex-col">
								<div>
									Start <HighlightText text={'coding'}></HighlightText>
								</div>{' '}
								<HighlightText text={'in seconds'}></HighlightText>
							</div>
						}
						subheading={
							"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
						}
						ctabtn1={{
							btnText: 'Continue Lesson',
							linkto: '/signup',
							active: true,
						}}
						ctabtn2={{
							btnText: 'learn more',
							linkto: '/login',
							active: false,
						}}
						codeblock={`import React from "react";\nimport CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
						codeColor={'text-blue-25'}
					/>
				</div>

				<ExploreMore></ExploreMore>
			</div>

			{/* section 2 */}
			{/* cross pattern section */}
			<div className="bg-pure-greys-5 text-richblack-700 mt-16">
				<div className="homepage_bg h-[320px]">
					<div className="w-11/12 max-w-maxContent flex flex-col items-center justify-center gap-5 mx-auto">
						<div className="flex gap-7 text-white mt-40">
							<CTAButton active={true} linkto={'/signup'}>
								<div className="flex items-center gap-2 justify-center">
									Explore full catalog
									<FaArrowRight />
								</div>
							</CTAButton>

							<CTAButton active={false} linkto={'/signup'}>
								<div className="flex items-center gap-2 justify-center">
									Learn More
								</div>
							</CTAButton>
						</div>
					</div>
				</div>

				<div>
					<div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7">
						{/* Top Text & CTA Section */}
						<div className="flex flex-col lg:flex-row gap-10 lg:gap-20 mb-10 mt-24 items-center">
							{/* Heading */}
							<div className="text-3xl sm:text-4xl font-semibold w-full lg:w-[45%] text-center lg:text-left">
								Get the skills you need for a{' '}
								<HighlightText text={'job that is in demand'} />
							</div>

							{/* Description + Button */}
							<div className="flex flex-col gap-6 w-full lg:w-[40%] items-center lg:items-start text-center lg:text-left">
								<div className="text-sm sm:text-base text-richblack-600">
									The modern StudyNotion dictates its own terms. Today, to be a
									competitive specialist requires more than professional skills.
								</div>

								<CTAButton active={true} linkto={'/signup'}>
									<div className="capitalize">learn more</div>
								</CTAButton>
							</div>
						</div>

						{/* Timeline section */}
						<TimeLineSection />

						{/* Learning language section */}
						<LearningLanguageSection />
					</div>
				</div>
			</div>

			{/* Section 3 */}
			{/* Become an instructor section */}
			<div className="w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-10 bg-richblack-900 text-white">
				<InstructorSection />

				<h2 className="text-center text-3xl font-semibold mt-10">
					Reviews from other learners
				</h2>
			</div>

			{/* Footer */}
			<Footer></Footer>
		</div>
	);
}

export default Home;
