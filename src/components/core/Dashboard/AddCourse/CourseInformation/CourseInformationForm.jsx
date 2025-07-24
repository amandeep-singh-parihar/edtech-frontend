import React from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import { MdNavigateNext } from 'react-icons/md';
import {
	addCourseDetails,
	editCourseDetails,
	fetchCourseCategories,
} from '../../../../../services/operations/courseDetailsAPI.js';
import { setCourse, setStep } from '../../../../../slices/courseSlice.js';
import { COURSE_STATUS } from '../../../../../utils/constants.js';
import IconBtn from '../../../../common/IconBtn.jsx';
import Upload from '../Upload.jsx';
import ChipInput from './ChipInput.jsx';
import RequirementsField from './RequirementField.jsx';

const CourseInformationForm = () => {
	const {
		register,
		setValue,
		getValues,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const dispatch = useDispatch();

	const { token } = useSelector((state) => state.auth);

	// const {step} = useSelector((state)=>state.course);

	const { course, editCourse } = useSelector((state) => state.course);

	const [loading, setLoading] = useState(false);

	const [courseCategories, setCourseCategories] = useState([]);

	useEffect(() => {
		// console.log('Course from slice in the step 1 form is', course);
		// console.log('EditCourse from slice in the step 1 form is', editCourse);

		const getCategories = async () => {
			setLoading(true);
			const categoriesResponse = await fetchCourseCategories();
			// console.log('Full categories response:', categoriesResponse);
			// console.log('First data : ',categoriesResponse[0])
			// console.log("Length of the array is : ",categoriesResponse.length)

			if (categoriesResponse.length > 0) {
				// console.log('Categories data:', categoriesResponse);
				setCourseCategories(categoriesResponse);
			} else {
				console.log(
					'Failed to fetch or invalid categories:',
					categoriesResponse,
				);
			}
			setLoading(false);
			// console.log('Loading state:', loading);
			// console.log('Current courseCategories state:', courseCategories);
		};

		// if form is in edit mode
		if (editCourse) {
			// console.log('data populated', editCourse);
			setValue('courseTitle', course.courseName);
			setValue('courseShortDesc', course.courseDescription);
			setValue('courseBenefits', course.whatWillYouLearn);
			setValue('coursePrice', course.price);
			setValue('courseCategory', course.category?._id || ''); // -<<<>>><_
			setValue('courseTags', course.tags);
			setValue('courseRequirements', course.instructions);
			setValue('courseImage', course.thumbnail);
		}
		getCategories();
	}, []);

	const isFormUpdated = () => {
		const currentValues = getValues();

		if (
			currentValues.courseTitle !== course.courseName ||
			currentValues.courseShortDesc !== course.courseDescription ||
			currentValues.coursePrice !== course.price ||
			(currentValues.courseTags || []).toString() !==
				(course.tags || []).toString() ||
			currentValues.courseBenefits !== course.whatWillYouLearn ||
			currentValues.courseCategory !== course.category._id ||
			(currentValues.courseRequirements || []).toString() !==
				(course.instructions || []).toString() ||
			currentValues.courseImage !== course.thumbnail
		) {
			return true;
		}
		return false;
	};

	const submitTheForm = async (data) => {
		try {
			console.log('Form submitted with data:', data);
			if (editCourse) {
				// console.log("is this alive :",editCourse);
				if (isFormUpdated()) {
					const currentValues = getValues();
					const formData = new FormData();
					console.log('inside the editcourse if : ', data);
					formData.append('courseId', course._id);
					if (currentValues.courseTitle !== course.courseName) {
						formData.append('courseName', data.courseTitle);
					}

					if (currentValues.courseShortDesc !== course.courseDescription) {
						formData.append('description', data.courseShortDesc);
					}

					if (currentValues.coursePrice !== course.price) {
						formData.append('price', data.coursePrice);
					}

					if (
						(currentValues.courseTags || []).toString() !==
						(course.tags || []).toString()
					) {
						formData.append('tags', JSON.stringify(currentValues.courseTags));
					}

					if (currentValues.courseBenefits !== course.whatWillYouLearn) {
						formData.append('whatWillYouLearn', data.courseBenefits);
					}

					const categoryToSend =
						typeof data.courseCategory === 'object' &&
						data.courseCategory !== null
							? data.courseCategory._id
							: data.courseCategory;

					if (categoryToSend !== course.category?._id) {
						formData.append('category', categoryToSend);
					}

					if (
						currentValues.courseRequirements.toString() !==
						course.instructions.toString()
					) {
						formData.append(
							'instructions',
							JSON.stringify(data.courseRequirements),
						);
					}

					if (currentValues.courseImage !== course.thumbnail) {
						formData.append('thumbnail', data.courseImage);
					}
					console.log('Edit Form data: ', formData);
					setLoading(true);
					const result = await editCourseDetails(formData, token);
					setLoading(false);
					if (result) {
						console.log('Dispatching next step');

						dispatch(setStep(2));
						dispatch(setCourse(result));
					}
				} else {
					toast.error('No changes made to the form');
				}
				return;
			}

			// Debug
			// console.log("data->",data);
			// Debug

			const formData = new FormData();
			formData.append('courseName', data.courseTitle);
			formData.append('courseDescription', data.courseShortDesc);
			formData.append('price', data.coursePrice);
			formData.append('tags', JSON.stringify(data.courseTags));
			formData.append('whatWillYouLearn', data.courseBenefits);
			formData.append('category', data.courseCategory);
			formData.append('status', COURSE_STATUS.DRAFT);
			formData.append('instructions', JSON.stringify(data.courseRequirements));
			formData.append('thumbnail', data.courseImage);

			setLoading(true);

			// Debug

			// for (let pair of formData.entries()) {
			// 	console.log(pair[0] + ':', pair[1]);
			// }

			// Debug

			const result = await addCourseDetails(formData, token);

			console.log('Course API result:', result);

			// //
			// const success = result ||  result?.success || result?.data?.success;
			// const courseData = result?.data?.data || result?.data || result;
			// //

			// if(success){
			// 	toast.success('Course created successfully');
			// 	dispatch(setCourse(courseData));
			// 	dispatch(setStep(2));
			// 	console.log('step moved to 2');
			// 	// console.log('')
			// }else{
			// 	console.log('cousre creation failed')
			// 	toast.error('course creation failed')
			// }

			if (result?.success) {
				console.log('Dispatching next step');
				// DEbug
				// console.log('Course API result:', result);
				// console.log('Going to step 2...');
				// Debug
				dispatch(setStep(2));
				// Debug
				// console.log('DISPATCHED setStep(2)');
				// Debug
				dispatch(setCourse(result.data));
				// Debug
				// console.log('Going to step 2...');
				// Debug
			} else {
				toast.error('Course creation failed');
				console.error('course creation failed', result);
			}
			setLoading(false);
		} catch (error) {
			toast.error('Course creation failed');
			console.error('Error creating course:', error);
		}
	};

	return (
		<div>
			<form
				onSubmit={handleSubmit(submitTheForm)}
				className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6"
			>
				{/* Course Title */}
				<div className="flex flex-col space-y-2">
					<label className="text-sm text-richblack-5" htmlFor="courseTitle">
						Course Title <sup className="text-pink-200">*</sup>
					</label>
					<input
						id="courseTitle"
						placeholder="Enter Course Title"
						{...register('courseTitle', { required: true })}
						className="form-style w-full rounded-[0.5rem] bg-richblack-700 p-[10px] text-richblack-5 border-b-[1px] border-richblack-100"
					/>
					{errors.courseTitle && (
						<span className="ml-2 text-xs tracking-wide text-pink-200">
							Course title is required
						</span>
					)}
				</div>

				{/* Course Description */}
				<div className="flex flex-col space-y-2">
					<label
						htmlFor="courseShortDesc"
						className=" text-sm text-richblack-5"
					>
						Course Short Description <sup className=" text-pink-200">*</sup>
					</label>
					<textarea
						id="courseShortDesc"
						placeholder="Enter Description"
						{...register('courseShortDesc', { required: true })}
						className=" form-style resize-x-none min-h-[130px] 
                form-style w-full rounded-[0.5rem] bg-richblack-700 p-[10px] text-richblack-5 border-b-[1px] border-richblack-100"
					/>
					{errors.courseShortDesc && (
						<span className="ml-2 text-xs tracking-wide text-pink-200">
							Course Description is required
						</span>
					)}
				</div>

				{/* Course Price */}
				<div className="flex flex-col space-y-2">
					<label className="text-sm text-richblack-5" htmlFor="coursePrice">
						Course Price <sup className="text-pink-200">*</sup>
					</label>
					<div className="relative">
						<input
							id="coursePrice"
							placeholder="Enter Course Price"
							{...register('coursePrice', {
								required: true,
								valueAsNumber: true,
								pattern: {
									value: /^(0|[1-9]\d*)(\.\d+)?$/,
								},
							})}
							className="form-style w-full !pl-12 form-style rounded-[0.5rem] bg-richblack-700 p-[10px] text-richblack-5 border-b-[1px] border-richblack-100"
						/>
						<HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
					</div>
					{errors.coursePrice && (
						<span className="ml-2 text-xs tracking-wide text-pink-200">
							Course Price is required
						</span>
					)}
				</div>

				{/* Course Category DropDown */}
				<div className="flex flex-col space-y-2">
					<label htmlFor="courseCategory" className="text-sm text-richblack-5">
						Category <sup className="text-pink-200">*</sup>
					</label>

					<select
						id="courseCategory"
						defaultValue=""
						{...register('courseCategory', { required: true })}
						className="form-style w-full form-style rounded-[0.5rem] bg-richblack-700 p-[10px] text-richblack-5 border-b-[1px] border-richblack-100"
					>
						<option value="" disabled>
							Choose a category
						</option>
						{!loading &&
							courseCategories.map((category, index) => (
								<option value={category?._id} key={index}>
									{category?.name}
								</option>
							))}
					</select>
					{errors.courseCategory && (
						<span className="ml-2 text-xs tracking-wide text-pink-200">
							Course Category is required
						</span>
					)}
				</div>

				{/* Tags component */}
				<ChipInput
					label="Tags"
					name="courseTags"
					placeholder="Enter Tags and Press Enter"
					register={register}
					setValue={setValue}
					getValues={getValues}
					errors={errors}
				/>

				{/* Upload Component */}
				<Upload
					name="courseImage"
					label="Course Thumbnail"
					register={register}
					setValue={setValue}
					errors={errors}
					editData={editCourse ? course?.thumbnail : null}
				/>

				{/* Benefits of the course */}
				<div className="flex flex-col space-y-2">
					<label className="text-sm text-richblack-5" htmlFor="courseBenefits">
						Benefits of the course <sup className="text-pink-200">*</sup>
					</label>
					<textarea
						id="courseBenefits"
						placeholder="Enter benefits of the course"
						{...register('courseBenefits', { required: true })}
						className="form-style resize-x-none min-h-[130px] w-full form-style rounded-[0.5rem] bg-richblack-700 p-[10px] text-richblack-5 border-b-[1px] border-richblack-100"
					/>
					{errors.courseBenefits && (
						<span className="ml-2 text-xs tracking-wide text-pink-200">
							Benefits of the course is required
						</span>
					)}
				</div>
				{/* Requirements/Instructions */}
				<RequirementsField
					name="courseRequirements"
					label="Requirements/Instructions"
					register={register}
					setValue={setValue}
					errors={errors}
					getValues={getValues}
				/>

				<div className="flex justify-end gap-2">
					{editCourse && (
						<button
							onClick={() => dispatch(setStep(2))}
							disabled={loading}
							className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
						>
							Continue Without Saving
						</button>
					)}
					<IconBtn
						disabled={loading}
						text={editCourse ? 'Save Changes' : 'Next'}
						type="submit"
					>
						<MdNavigateNext />
					</IconBtn>
				</div>

				{/* debug */}
				{/* <button
				onClick={() => dispatch(setStep(2))}
				className="text-4xl bg-white text-black font-black"
			>
				go to step 2
			</button> */}
			</form>
		</div>
	);
};

export default CourseInformationForm;
