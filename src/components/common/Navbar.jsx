import React, { useEffect, useState } from 'react';
import { Link, matchPath } from 'react-router-dom';
import Logo from '../../assets/Logo/Logo-Full-Light.png';
import { NavbarLinks } from '../../data/navbar-links.js';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import ProfileDropDown from '../core/Auth/ProfileDropDown.jsx';
import { categoriesEndpoints } from '../../services/apis.js';
import { apiConnector } from '../../services/apiconnector.js';
import { FaChevronDown } from 'react-icons/fa';

function Navbar() {
	const { token } = useSelector((state) => state.auth);
	const { user } = useSelector((state) => state.profile);
	const { totalItems } = useSelector((state) => state.cart);

	// Debug
	// console.log('token:', token);
	// console.log('user:', user);
	// Debug

	const location = useLocation();

	const [subLinks, setSubLinks] = useState([]);

	const fetchSublinks = async () => {
		try {
			const result = await apiConnector(
				'GET',
				categoriesEndpoints.SHOW_CATEGORIES_API,
			);
			console.log('printing sublinks : ', result);
			setSubLinks(result.data.data);
		} catch (error) {
			console.log('Could not fetch the category list');
		}
	};

	useEffect(() => {
		fetchSublinks();
	}, []);

	const matchRoute = (route) => {
		return matchPath({ path: route }, location.pathname);
	};

	return (
		<div className="flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700">
			<div className="w-11/12 flex max-w-maxContent items-center justify-between">
				<Link to="/">
					<img src={Logo} alt="Logo-Full-Light.png" width={160} height={32} />
				</Link>

				<nav>
					<ul className="flex gap-x-6 text-richblack-25">
						{NavbarLinks.map((link, index) => {
							return (
								<li key={index}>
									{link.title === 'Catalog' ? (
										<div className="flex items-center justify-center gap-2 group relative">
											<p>{link.title}</p>
											<FaChevronDown className="text-xs" />

											<div
												className={`invisible absolute left-[50%] 
                                    translate-x-[-49%] ${subLinks.length ? 'translate-y-[15%]' : 'translate-y-[40%]'}
                                 top-[50%] z-50 
                                flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                                opacity-0 transition-all duration-200 group-hover:visible
                                group-hover:opacity-100 lg:w-[300px]`}
											>
												<div className="absolute left-[50%] top-0 h-6 w-6 rotate-45 rounded bg-richblack-5 translate-x-[80%] translate-y-[-30%]"></div>

												{subLinks.length ? (
													subLinks.map((subLink, index) => (
														<Link
															className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
															to={`catalog/${subLink.name}`}
															key={index}
														>
															<p>{subLink.name}</p>
														</Link>
													))
												) : (
													<div></div>
												)}
											</div>
										</div>
									) : (
										<Link to={link?.path}>
											<p
												className={`${matchRoute(link?.path) ? 'text-yellow-25' : 'text-richblack-25'}`}
											>
												{link.title}
											</p>
										</Link>
									)}
								</li>
							);
						})}
					</ul>
				</nav>

				{/* login/signup/dashboard */}
				<div className="flex gap-x-4 items-center">
					{/* <div>Hello navbar</div> */}
					{user && user?.accountType != 'Instructor' && (
						<Link to="/dashboard/cart" className="relative pr-2">
							<AiOutlineShoppingCart className="text-2xl text-richblack-100 " />
							{totalItems > 0 && (
								<span className=" absolute -bottom-2 -right-0 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
									{totalItems}
								</span>
							)}
						</Link>
					)}
					{token === null && (
						<Link to="/login">
							<button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
								Log in
							</button>
						</Link>
					)}
					{token === null && (
						<Link to="/signup">
							<button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
								Sign Up
							</button>
						</Link>
					)}
					{token !== null && <ProfileDropDown></ProfileDropDown>}
				</div>
			</div>
		</div>
	);
}

export default Navbar;
