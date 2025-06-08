import React from 'react';
import { useEffect, useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI.js';
import IconBtn from '../../common/IconBtn';
import CoursesTable from './InstructorCourses/CoursesTable.jsx';

const MyCourses = () => {
	const { token } = useSelector((state) => state.auth);
	const navigate = useNavigate();
	const [courses, setCourses] = useState([]);

	useEffect(() => {
		const fetchCourses = async () => {
			const result = await fetchInstructorCourses(token);
			if (result) {
				setCourses(result);
			}
		};

		fetchCourses();
	}, []);

	return (
		<div>
			<div className="mb-14 flex items-center justify-between">
				<h1 className=" text-3xl font-medium text-richblack-5">My Courses</h1>
				<IconBtn text="New" onclick={() => navigate('/dashboard/add-course')}>
					<FaPlusCircle />
				</IconBtn>
			</div>
			<div className="flex items-center justify-center">
				{courses && <CoursesTable courses={courses} setCourses={setCourses} />}
			</div>
		</div>
	);
};

export default MyCourses;
