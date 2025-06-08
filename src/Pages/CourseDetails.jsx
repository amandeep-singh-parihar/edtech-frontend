import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { buyCourse } from '../services/operations/studentFeaturesAPI.js';
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI.js';
import { setCourse } from '../slices/courseSlice.js';
import GetAvgRating from '../utils/avgRating.js';
import Error from './Error.jsx';
import ConfirmationModal from '../components/common/ConfirmationModal.jsx';
import RatingStars from '../components/common/RatingStars.jsx';
import { formatDate } from '../services/formatDate.js';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { BsGlobe } from 'react-icons/bs';
import { BiVideo } from 'react-icons/bi';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import CourseDetailsCard from '../components/core/Course/CourseDetailsCard.jsx';
import { toast } from 'react-hot-toast';
import Footer from '../components/common/Footer.jsx';

const CourseDetails = () => {
	const { token } = useSelector((state) => state.auth);
	const { user } = useSelector((state) => state.profile);
	const { loading: profileLoading } = useSelector((state) => state.profile); // Renamed to avoid conflict
	const { cart } = useSelector((state) => state.cart);
	const { courseId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [courseData, setCourseData] = useState(null);
	const [confirmationModal, setConfirmationModal] = useState(null);
	const [avgReviewCount, setAvgReviewCount] = useState(0);
	const [courseLoading, setCourseLoading] = useState(true); // State for course data fetching itself

	useEffect(() => {
		const getCourseFullDetails = async () => {
			setCourseLoading(true); // Start loading
			try {
				const result = await fetchCourseDetails(courseId);
				console.log('Printing CourseData-> ', result.course);
				setCourseData(result.course); // 'result' should directly be the course object
				console.log('Printing the course ->>>', courseData);
				// setCourseData(result?.data?.courseDetails || result?.courseDetails || result);
			} catch (error) {
				toast.error('Could not get course details');
				console.error('Error fetching course details:', error); // Log the full error for debugging
				setCourseData(null); // Set to null on error to potentially show Error component
			} finally {
				setCourseLoading(false); // End loading
			}
		};

		if (courseId) {
			// Only fetch if courseId exists
			getCourseFullDetails();
		}
	}, [courseId]);

	// Calculate average review count
	useEffect(() => {
		if (courseData && Array.isArray(courseData.ratingAndreviews)) {
			const count = GetAvgRating(courseData.ratingAndreviews);
			setAvgReviewCount(count);
		} else {
			setAvgReviewCount(0); // Reset if data is not available
		}
	}, [courseData]); // Recalculate when courseData changes

	// Calculate total number of lectures
	const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
	useEffect(() => {
		// Ensure courseData and courseContent exist before iterating
		if (courseData && Array.isArray(courseData.courseContent)) {
			let lectures = 0;
			courseData.courseContent.forEach((sec) => {
				lectures += sec.subSection?.length || 0; // Use optional chaining for subSection
			});
			setTotalNoOfLectures(lectures);
		} else {
			setTotalNoOfLectures(0); // Reset if data is not available
		}
	}, [courseData]); // Recalculate when courseData changes

	// State for managing active sections in the dropdown
	const [isActive, setIsActive] = useState([]);
	const handleActive = (id) => {
		setIsActive(
			(prevActive) =>
				prevActive.includes(id)
					? prevActive.filter((e) => e !== id) // Remove if already active
					: [...prevActive, id], // Add if not active
		);
	};

	const handleBuyCourse = () => {
		if (token) {
			buyCourse(token, [courseId], user, navigate, dispatch);
			return;
		}
		setConfirmationModal({
			text1: 'You are not Logged in',
			text2: 'Please login to purchase the course',
			btn1Text: 'Login',
			btn2Text: 'Cancel',
			btn1Handler: () => navigate('/login'),
			btn2Handler: () => setConfirmationModal(null),
		});
	};

	// Combined loading check (for user profile and course data)
	if (profileLoading || courseLoading) {
		return (
			<div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
				<div className="spinner"></div>{' '}
				{/* Assuming you have a CSS spinner class */}
				<div>Loading course details...</div>
			</div>
		);
	}

	// Check if courseData is null or doesn't contain a valid course (e.g., _id) after loading
	// This catches cases where the fetch failed or returned no actual course
	if (!courseData || !courseData._id) {
		// Checking for _id ensures it's a valid course object
		return (
			<div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
				<Error /> {/* Renders your custom Error component */}
			</div>
		);
	}

	// Safely destructure properties directly from 'courseData'
	// This is the line that was causing the primary error
	const {
		_id: course_id,
		courseName,
		description,
		thumbnail,
		price,
		whatWillYouLearn,
		courseContent,
		ratingAndreviews,
		instructor,
		studentsEnrolled,
		createdAt,
		totalDuration,
	} = courseData;

	return (
		<>
			{/* Details and Course Buy Card */}
			<div className="relative w-full bg-richblack-800">
				<div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative ">
					<div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
						<div className="relative block max-h-[30rem] lg:hidden">
							<div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
							{/* Always provide an alt attribute for images for accessibility */}
							<img
								src={thumbnail}
								className="aspect-auto w-full"
								alt={`${courseName} Thumbnail`}
							/>
						</div>

						<div className="z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5">
							<p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">
								{courseName}
							</p>
							<p className="text-richblack-200">{description}</p>

							<div className="text-md flex flex-wrap items-center gap-2">
								<span className="text-yellow-25">{avgReviewCount}</span>
								<RatingStars Review_Count={avgReviewCount} Star_Size={24} />
								{/* Ensure ratingAndReviews is an array before checking length */}
								<span>{`(${ratingAndreviews?.length || 0} reviews) `}</span>
								{/* Ensure studentsEnrolled is an array before checking length */}
								<span>{`(${studentsEnrolled?.length || 0} students enrolled)`}</span>
							</div>

							<div>
								{/* Use optional chaining for instructor details */}
								<p>
									Created By{' '}
									{`${instructor?.firstName || ''} ${instructor?.lastName || ''}`}
								</p>
							</div>

							<div className="flex flex-wrap gap-5 text-lg">
								<p className="flex items-center gap-2">
									<i className=" text-white">
										<IoIosInformationCircleOutline />
									</i>
									Created At {formatDate(createdAt)}
								</p>
								<p className="flex items-center gap-2">
									<BsGlobe /> English
								</p>
							</div>
						</div>

						<div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
							<p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">
								Rs. {price}
							</p>

							<button className="yellowButton" onClick={handleBuyCourse}>
								Buy Now
							</button>
							<button className="blackButton">Add to Cart</button>
						</div>
					</div>

					<div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block">
						<CourseDetailsCard
							course={courseData}
							setConfirmationModal={setConfirmationModal}
							handleBuyCourse={handleBuyCourse}
						/>
					</div>
				</div>
			</div>

			{/* What will you learn, Course Content, Sections dropdown, Author */}
			<div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
				<div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
					<div className="my-8 border border-richblack-600 p-8 rounded-md">
						<p className="text-3xl font-semibold"> What You Will Learn</p>
						{/* Render whatWillYouLearn only if it exists */}
						<div className="mt-5">
							{whatWillYouLearn || 'No learning objectives provided.'}
						</div>
					</div>

					<div className="max-w-[830px] ">
						<div className="flex flex-col gap-3">
							<p className="text-[28px] font-semibold">Course Content:</p>

							<div className="flex flex-wrap justify-between gap-2">
								<div className="flex gap-2">
									{/* Ensure courseContent is an array */}
									<span>{courseContent?.length || 0} section(s)</span>
									<span>{totalNoOfLectures} lectures</span>
									<span>{totalDuration || 'N/A'} total length</span>{' '}
									{/* Display totalDuration */}
								</div>
								<div>
									<button
										className="text-yellow-25"
										onClick={() => setIsActive([])}
									>
										Collapse all Sections
									</button>
								</div>
							</div>
						</div>

						<div className="py-4">
							{/* Conditionally render course content */}
							{courseContent && courseContent.length > 0 ? (
								courseContent.map((section) => (
									<div
										key={section._id}
										className="overflow-hidden border border-solid border-richblack-600 bg-richblack-700 text-richblack-5 last:mb-0 rounded-md"
									>
										{/* Section */}
										<div onClick={() => handleActive(section._id)}>
											<div className="flex cursor-pointer items-start justify-between bg-opacity-20 px-7  py-6 transition-[0.3s]">
												<div className="flex items-center gap-2">
													{isActive.includes(section._id) ? (
														<i className=" -rotate-90">
															<MdOutlineArrowForwardIos />
														</i>
													) : (
														<i className=" rotate-90">
															<MdOutlineArrowForwardIos />
														</i>
													)}
													<p className="font-bold p-2">{section.sectionName}</p>
												</div>

												<div className="space-x-4 mt-2">
													<span className="text-yellow-25 font-bold">
														{' '}
														{`${section.subSection?.length || 0} lecture(s)`}{' '}
													</span>
												</div>
											</div>
										</div>

										{/* SubSections (conditionally rendered) */}
										<div
											className={` ${isActive.includes(section._id) ? 'h-auto max-h-[500px]' : 'h-0'} relative overflow-hidden bg-richblack-900 transition-[height] duration-[0.35s] ease-[ease]`}
										>
											{section.subSection && section.subSection.length > 0 ? (
												section.subSection.map((subSection) => (
													<div
														key={subSection._id}
														className="text-textHead flex flex-col gap-2 px-7 py-6 font-semibold"
													>
														<div className="py-2 flex justify-start items-center gap-2">
															<span>
																<BiVideo />
															</span>
															<p>{subSection.title}</p>
															{/* Add subSection duration if available */}
															{subSection.timeDuration && (
																<span className="ml-auto">
																	{subSection.timeDuration}
																</span>
															)}
														</div>
													</div>
												))
											) : (
												<p className="px-7 py-6 text-richblack-400">
													No subsections in this section.
												</p>
											)}
										</div>
									</div>
								))
							) : (
								<p className="text-richblack-400">
									No course content available for this course.
								</p>
							)}
						</div>

						<div className="mb-12 py-4">
							<p className="text-[28px] font-semibold">Author</p>
							<div className=" flex items-center gap-4 py-4">
								{/* Check instructor and image exist before rendering */}
								{instructor?.image && (
									<img
										className="h-14 w-14 rounded-full object-cover"
										src={instructor.image}
										alt={`${instructor.firstName} ${instructor.lastName}`}
									/>
								)}
								<p className="text-lg">
									{instructor?.firstName || ''}{' '}
									{instructor?.lastName || ''}{' '}
								</p>
							</div>
							{/* Check instructor.additionalDetails and about exist */}
							<p className="text-lg">
								{instructor?.additionalDetails?.about ||
									'No author bio available.'}
							</p>
						</div>
					</div>
				</div>
			</div>

			<Footer />
			{confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
		</>
	);
};

export default CourseDetails;
