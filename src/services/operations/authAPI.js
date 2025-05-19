import { toast } from 'react-hot-toast';
import { setLoading, setToken } from '../../slices/authSlice';
import { resetCart } from '../../slices/cartSlice';
import { setUser } from '../../slices/profileSlice';
import { apiConnector } from '../apiconnector';
import { authEndpoints } from '../apis.js';

const {
	SENDOTP_API,
	SIGNUP_API,
	LOGIN_API,
	RESET_PASSWORD_TOKEN_API,
	RESET_PASSWORD_API,
} = authEndpoints;

// Functions to make async backend calls with data from UI or store and then to update UI or control the navigation after receiving response.
export function sendOtp(email, navigate) {
	return async (dispatch) => {
		const toastId = toast.loading('Loading...');
		dispatch(setLoading(true));

		try {
			const response = await apiConnector('POST', SENDOTP_API, {
				email,
				checkUserPresent: true,
			});

			console.log('SENDOTP API RESPONSE.', response);

			console.log(response.data.success);

			if (!response.data.success) {
				throw new Error(response.data.message);
			}

			toast.success('OTP Sent Successfully');
			navigate('/verify-email');
		} catch (error) {
			console.log('SENDOTP API ERROR.', error);
			toast.error('Could Not Send OTP');
		}
		dispatch(setLoading(false));
		toast.dismiss(toastId);
	};
}

export function signUp(
	accountType,
	firstName,
	lastName,
	email,
	password,
	confirmPassword,
	otp,
	navigate,
) {
	return async (dispatch) => {
		const toastId = toast.loading('Loading...');
		dispatch(setLoading(true));

		try {
			const response = await apiConnector('POST', SIGNUP_API, {
				accountType,
				firstName,
				lastName,
				email,
				password,
				confirmPassword,
				otp,
			});

			console.log('SIGNUP_API RESPONSE.', response);

			console.log(response.data.success);

			if (!response.data.success) {
				throw new Error(response.data.message);
			}

			toast.success('Signup successful');
			navigate('/login');
		} catch (error) {
			console.log('SIGNUP_API ERROR.', error);
			toast.error('Could Not Sign up user');
		}
		dispatch(setLoading(false));
		toast.dismiss(toastId);
	};
}

export function login(email, password, navigate) {
	return async (dispatch) => {
		const toastId = toast.loading('Logging in...');
		dispatch(setLoading(true));

		try {
			const response = await apiConnector('POST', LOGIN_API, {
				email,
				password,
			});

			console.log('LOGIN API RESPONSE:', response);

			if (!response?.data?.success) {
				toast.error(response?.data?.message || 'Login failed');
				dispatch(setLoading(false));
				toast.dismiss(toastId);
				return;
			}

			const token = response.data.token;
			const user = response.data?.user;

			if (!user) {
				toast.error('User data is missing in response');
				dispatch(setLoading(false));
				toast.dismiss(toastId);
				return;
			}

			dispatch(setToken(token));
			const userImage = user?.image
				? user.image
				: `https://api.dicebear.com/5.x/initials/svg?seed=${user.firstName} ${user.lastName}`;
			dispatch(setUser({ ...user, image: userImage }));

			// localStorage.setItem("token", JSON.stringify(token));
			// localStorage.setItem("user", JSON.stringify(user));

			localStorage.setItem('token', JSON.stringify(response.data.token));
			localStorage.setItem('user', JSON.stringify(user));

			toast.success('Login Successful');
			navigate('/dashboard/my-profile');
		} catch (error) {
			console.error('LOGIN API ERROR:', error);
			toast.error('Could not login');
		} finally {
			dispatch(setLoading(false));
			toast.dismiss(toastId);
		}
	};
}

export function logout(navigate) {
	return (dispatch) => {
		dispatch(setToken(null));
		dispatch(setUser(null));
		dispatch(resetCart());
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		toast.success('Logged Out');
		navigate('/');
	};
}

export function getPasswordResetToken(email, setEmailSent) {
	return async (dispatch) => {
		const toastId = toast.loading('Loading...');
		dispatch(setLoading(true));

		try {
			const response = await apiConnector('POST', RESET_PASSWORD_TOKEN_API, {
				email,
			});
			console.log('RESET_PASSWORD_TOKEN_API RESPONSE.', response);

			console.log(response.data.success);

			if (!response.data.success) {
				throw new Error(response.data.message);
			}

			toast.success('Mail Sent successful');
			setEmailSent(true);
		} catch (error) {
			console.log('RESET_PASSWORD_TOKEN_API ERROR.', error);
			toast.error('Could Not Send Mail');
		}
		dispatch(setLoading(false));
		toast.dismiss(toastId);
	};
}

export function resetPassword(password, confirmPassword, token, navigate) {
	return async (dispatch) => {
		const toastId = toast.loading('Loading in reset password');
		dispatch(setLoading(true));

		try {
			const response = await apiConnector('POST', RESET_PASSWORD_API, {
				password,
				confirmPassword,
				token,
			});

			console.log('RESET_PASSWORD_API RESPONSE.', response);

			console.log(response.data.success);

			if (!response.data.success) {
				throw new Error(response.data.message);
			}

			toast.success('Password reset successful');
			navigate('/login');
		} catch (error) {
			console.log('RESET PASSWORD TOKEN Error', error);
			toast.error('Unable to reset password');
		}

		dispatch(setLoading(false));
		toast.dismiss(toastId);
	};
}
