import React, { useState } from 'react';
import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './Pages/Home.jsx';
import Navbar from './components/common/Navbar.jsx';
import Login from './Pages/Login.jsx';
import Signup from './Pages/Signup.jsx';
import OpenRoute from './components/core/Auth/OpenRoute.jsx';
import ForgotPassword from './Pages/ForgotPassword.jsx';
import UpdatePassword from './Pages/UpdatePassword.jsx';
import VerifyEmail from './Pages/VerifyEmail.jsx';
import About from './Pages/About.jsx';
import ContactUs from './Pages/ContactUs.jsx';
import PrivateRoute from '../src/components/core/Auth/PrivateRoute.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import MyProfile from './components/core/Dashboard/MyProfile.jsx';
import Settings from './components/core/Dashboard/Settings/Settings.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { ACCOUNT_TYPE } from './utils/constants.js';
import Cart from './components/core/Dashboard/Cart/Cart.jsx';
import Error from './Pages/Error.jsx';
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses.jsx';
import AddCourse from './components/core/Dashboard/AddCourse/AddCourse.jsx';
import Instructor from './components/core/Dashboard/Instructor.jsx';
import MyCourses from './components/core/Dashboard/MyCourses.jsx';

function App() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { user } = useSelector((state) => state.profile);
	const [toastStatus, settoastStatus] = useState(true);

	return (
		<div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
			<Navbar></Navbar>
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route
					path="signup"
					element={
						<OpenRoute>
							<Signup />
						</OpenRoute>
					}
				/>
				<Route
					path="login"
					element={
						<OpenRoute>
							<Login />
						</OpenRoute>
					}
				/>

				<Route
					path="verify-email"
					element={
						<OpenRoute>
							<VerifyEmail />
						</OpenRoute>
					}
				/>

				<Route
					path="forgot-password"
					element={
						<OpenRoute>
							<ForgotPassword />
						</OpenRoute>
					}
				/>

				<Route
					path="update-password/:id"
					element={
						<OpenRoute>
							<UpdatePassword />
						</OpenRoute>
					}
				/>

				<Route path="about" element={<About />} />

				<Route path="contact" element={<ContactUs />} />

				<Route
					element={
						<PrivateRoute>
							<Dashboard />
						</PrivateRoute>
					}
				>
					<Route path="dashboard/my-profile" element={<MyProfile />} />
					<Route path="dashboard/Settings" element={<Settings />} />


					{user?.accountType === ACCOUNT_TYPE.STUDENT && (
						<>
							<Route path="dashboard/cart" element={<Cart />} />
							<Route
								path="dashboard/enrolled-courses"
								element={<EnrolledCourses />}
							/>
						</>
					)}


					{user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
						<>
							<Route path="dashboard/instructor" element={<Instructor />} />
							<Route path="dashboard/add-course" element={<AddCourse />} />
							<Route path="dashboard/my-courses" element={<MyCourses />} />
							{/* <Route
								path="dashboard/edit-course/:courseId"
								element={<EditCourse />}
							/> */}
						</>
					)}


				</Route>

				<Route path="*" element={<Error />} />
			</Routes>
		</div>
	);
}

export default App;
