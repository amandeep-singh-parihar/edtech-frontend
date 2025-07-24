import React from 'react';
import { toast } from 'react-hot-toast';
import { apiConnector } from '../apiconnector.js';
import { catalogData } from '../apis.js';

export const getCatalogaPageData = async (categoryId) => {
	const toastId = toast.loading('Loading...');
	let result = null;

	try {
		const response = await apiConnector(
			'POST',
			catalogData.CATALOGPAGEDATA_API,
			{ categoryId },
		);

		// Only show error toast if response.success is explicitly false
		if (response?.data?.success) {
			result = response.data;
		} else {
			toast.error(
				response?.data?.message || 'Could not fetch category page data',
			);
			result = response.data;
		}
	} catch (error) {
		console.log('CATALOG PAGE DATA API ERROR....', error);
		console.log('FULL ERROR RESPONSE:', error?.response); // Add this
		toast.error('Something went wrong. Please try again.');
		result = error.response?.data || null;
	}

	toast.dismiss(toastId);
	return result;
};
