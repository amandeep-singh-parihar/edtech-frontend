const BASE_URL = import.meta.env.VITE_BASE_URL;

// AUTH ENDPOINTS
export const authEndpoints = {
	SENDOTP_API: BASE_URL + '/auth/sendotp',
	SIGNUP_API: BASE_URL + '/auth/signup',
	LOGIN_API: BASE_URL + '/auth/login',
	RESET_PASSWORD_TOKEN_API: BASE_URL + '/auth/reset-password-token',
	RESET_PASSWORD_API: BASE_URL + '/auth/reset-password',
};

// COURSE ENDPOINTS
export const courseEndpoints = {
	CREATE_COURSE_API: BASE_URL + '/course/createCourse',
	GET_ALL_COURSES_API: BASE_URL + '/course/getAllCourses',
	GET_COURSE_DETAILS: BASE_URL + '/course/getCourseDetails',
	EDIT_COURSE_API: BASE_URL + '/course/editCourse',
	GET_FULL_COURSE_DETAILS_API: BASE_URL + '/course/getFullCourseDetails',
	GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + '/course/getInstructorCourses',
	DELETE_COURSE_API: BASE_URL + '/course/deleteCourse',
	CREATE_CATEGORIES_API: BASE_URL + '/course/createCategory',
	SHOW_CATEGORIES_API: BASE_URL + '/course/showAllcategories',
	CATEGORY_PAGE_DETAILS_API: BASE_URL + '/course/categoryPageDetails',
	UPDATE_COURSE_PROGRESS: BASE_URL + '/course/updateCourseProgress',
	CREATE_RATING_API: BASE_URL + '/course/createRating',
	GET_AVERAGE_RATING_API: BASE_URL + '/course/getAverageRating',
	GET_ALL_RATING_API: BASE_URL + '/course/getAllRating',
	GET_RATING_AND_REVIEWS_BY_ID_API:
		BASE_URL + '/course/getRatingAndreviewsById',
	CREATE_SECTION_API: BASE_URL + '/course/createSection',
	UPDATE_SECTION_API: BASE_URL + '/course/updateSection',
	DELETE_SECTION_API: BASE_URL + '/course/deleteSection',
	CREATE_SUBSECTION_API: BASE_URL + '/course/addSubSection',
	UPDATE_SUBSECTION_API: BASE_URL + '/course/updateSubSection',
	DELETE_SUBSECTION_API: BASE_URL + '/course/deleteSubSection',
};

// PAYMENT ENDPOINTS
export const paymentEndpoints = {
	CAPTURE_PAYMENT_API: BASE_URL + '/payment/capturePayment',
	VERIFY_PAYMENT_API: BASE_URL + '/payment/verifyPayment',
	SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + '/payment/sendPaymentSuccessEmail',
};

// PROFILE ENDPOINTS
export const profileEndpoints = {
	GET_ALL_USER_DETAILS_API: BASE_URL + '/profile/getAllUserDetails',
	GET_USER_ENROLLED_COURSES_API: BASE_URL + '/profile/getEnrolledCourses',
	GET_INSTRUCTOR_DATA_API: BASE_URL + '/profile/instructorDashboard',
};

// CATALOG PAGE DATA
export const catalogData = {
	CATALOGPAGEDATA_API: BASE_URL + '/course/getCategoryPageDetails',
};

// CONTACTUS ENDPOINTS
export const contactUsEndpoints = {
	CONTACT_US_API: BASE_URL + '/contact',
};

// SETTINGS PAGE API
export const settingsEndpoints = {
	UPDATE_DISPLAY_PICTURE_API: BASE_URL + '/profile/updateDisplayPicture',
	UPDATE_PROFILE_API: BASE_URL + '/profile/updateProfile',
	CHANGE_PASSWORD_API: BASE_URL + '/auth/changepassword',
	DELETE_PROFILE_API: BASE_URL + '/profile/deleteProfile',
};

// CATAGORIES API
export const categories = {
	CATEGORIES_API: BASE_URL + '/course/showAllCategories',
};
