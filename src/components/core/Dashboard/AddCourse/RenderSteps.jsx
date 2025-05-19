import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaCheck } from 'react-icons/fa'; // Don't forget this import!

import CourseInformationForm from './CourseInformation/CourseInformationForm.jsx';
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm.jsx';
import PublishCourse from './PublishCourse/PublishCourse.jsx';
import { setStep } from '../../../../slices/courseSlice.js';

function RenderSteps() {
	const dispatch = useDispatch();

	const { step } = useSelector((state) => state.course);

	console.log('This the current step', step);

	const steps = [
		{ id: 1, title: 'Course Information' },
		{ id: 2, title: 'Course Builder' },
		{ id: 3, title: 'Publish' },
	];

	return (
		<React.Fragment>
			<div className="relative mb-2 flex w-full justify-center">
				{steps.map((item) => (
					<React.Fragment key={item.id}>
						{/* Step Circle */}
						<div className="flex flex-col items-center ">
							<button className={`cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] ${step === item.id ? ' border-yellow-50 bg-yellow-900 text-yellow-50' : ' border-richblack-700 bg-richblack-800 text-richblack-300'} ${step > item.id ? ' bg-yellow-50' : 'text-yellow-50'}`}>{step > item.id ? (<FaCheck className="font-bold text-richblack-900" /> ) : ( item.id )}
							</button>
						</div>
						{/* Dotted Line */}
						{item.id !== steps.length && (
							<>
								<div key={item.id} className={`h-[calc(34px/2)] w-[33%]  border-dashed border-b-2 ${step > item.id ? 'border-yellow-50' : 'border-richblack-500'}`}></div>
							</>
						)}
					</React.Fragment>
				))}
			</div>

			{/* Step Titles */}
			<div className="relative mb-16 flex w-full select-none justify-between">
				{steps.map((item) => (
					<div className="flex min-w-[130px] flex-col items-center gap-y-2" key={item.id}>
						<p className={`text-sm ${ step >= item.id ? 'text-richblack-5' : 'text-richblack-500'}`}>
							{item.title}
						</p>
					</div>
				))}
			</div>

			{/* debug */}
			<button onClick={() => dispatch(setStep(2))} className="text-4xl bg-white text-black font-black">
				go to step 2
			</button>

			{/* Render Step Content */}
			{step === 1 && <CourseInformationForm />}
			{step === 2 && <CourseBuilderForm />}
			{step === 3 && <PublishCourse />}

		</React.Fragment>
	);
}

export default RenderSteps;
