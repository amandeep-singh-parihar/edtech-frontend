const BASE_URL = import.meta.env.VITE_BASE_URL;

// AUTH ENDPOINTS
export const authEndpoints = {
	SENDOTP_API: BASE_URL + '/auth/sendOtp',
	SIGNUP_API: BASE_URL + '/auth/signup',
	LOGIN_API: BASE_URL + '/auth/login',
	CHANGEPASSWORD_API: BASE_URL + '/auth/changePassword',
};

// CATEGORIES ENDPOINTS
export const categoriesEndpoints = {
	CREATE_CATEGORIES_API: BASE_URL + '/course/createCategory',
	SHOW_CATEGORIES_API: BASE_URL + '/course/showAllcategories',
	CATEGORY_PAGE_DETAILS_API: BASE_URL + '/course/categoryPageDetails',
};

// COURSE ENDPOINTS
export const courseEndpoints = {
	CREATE_COURSE_API: BASE_URL + '/course/createCourse',
	GET_ALL_COURSES_API: BASE_URL + '/course/getAllCourses',
	GET_COURSE_DETAILS: BASE_URL + '/course/getCourseDetails',
	EDIT_COURSE_API: BASE_URL + '/course/editCourse',
	GET_FULL_COURSE_DETAILS_API: BASE_URL + '/course/getFullCourseDetails',
	GET_INSTRUCTOR_COURSES_API: BASE_URL + '/course/getInstructorCourses',
	DELETE_COURSE_API: BASE_URL + '/course/deleteCourse',
};

// COURSE PROGRESS ENDPOINTS
export const courseProgressEndpoints = {
	UPDATE_COURSE_PROGRESS: BASE_URL + '/course/updateCourseProgress',
};

// PAYMENT ENDPOINTS
export const paymentEndpoints = {
	CAPTURE_PAYMENT_API: BASE_URL + '/payment/capturePayment',
	VERIFY_PAYMENT_API: BASE_URL + '/payment/verifyPayment',
	SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + '/payment/sendPaymentSuccessEmail',
};

// PROFILE ENDPOINTS
export const profileEndpoints = {
	UPDATE_PROFILE_API: BASE_URL + '/profile/updateProfile',
	DELETE_ACCOUNT_API: BASE_URL + '/profile/deleteAccount',
	GET_ALL_USER_DETAILS_API: BASE_URL + '/profile/getAllUserDetails',
	UPDATE_DISPLAY_PICTURE_API: BASE_URL + '/profile/updateDisplayPicture',
	GET_ENROLLED_COURSES_API: BASE_URL + '/profile/getEnrolledCourses',
	INSTRUCTOR_DASHBOARD_API: BASE_URL + '/profile/instructorDashboard',
};

// RATING AND REVIEW ENDPOINTS
export const ratingAndReviewEntpoints = {
	CREATE_RATING_API: BASE_URL + '/course/createRating',
	GET_AVERAGE_RATING_API: BASE_URL + '/course/getAverageRating',
	GET_ALL_RATING_API: BASE_URL + '/course/getAllRating',
	GET_RATING_AND_REVIEWS_BY_ID_API:
		BASE_URL + '/course/getRatingAndReviewsById',
};

// RESET PASSWORD ENDPOINTS
export const resetPasswordEndpoints = {
	RESET_PASSWORD_TOKEN_API: BASE_URL + '/auth/resetPasswordToken',
	RESET_PASSWORD_API: BASE_URL + '/auth/resetPassword',
};

// SECTION ENDPOINTS
export const sectionEndpoints = {
	CREATE_SECTION_API: BASE_URL + '/course/createSection',
	UPDATE_SECTION_API: BASE_URL + '/course/updateSection',
	DELETE_SECTION_API: BASE_URL + '/course/deleteSection',
};

// SUBSECTION ENDPOINTS
export const subSectionEndpoints = {
	CREATE_SUBSECTION_API: BASE_URL + '/course/createSubsection',
	UPDATE_SUBSECTION_API: BASE_URL + '/course/updateSubsection',
	DELETE_SUBSECTION_API: BASE_URL + '/course/deleteSubsection',
};
