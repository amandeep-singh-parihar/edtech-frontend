import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import CTAButton from './CTAButton.jsx';
import { TypeAnimation } from 'react-type-animation';
import './CodeBlocks.css';

function CodeBlocks({
	position,
	heading,
	subheading,
	ctabtn1,
	ctabtn2,
	codeColor,
	codeblock,
}) {
	return (
		<div className={`flex flex-col ${position} my-20 justify-between gap-12`}>
			{/* section1 */}

			<div className="w-[100%] lg:w-[50%] flex flex-col gap-8">
				{heading}
				<div className="text-richblack-300 text-base font-bold w-[85%] -mt-3 ">
					{subheading}
				</div>

				<div className="flex gap-7 mt-7">
					<CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
						<div className="flex gap-2 items-center capitalize">
							{ctabtn1.btnText}
							<FaArrowRight />
						</div>
					</CTAButton>

					<CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
						<div className="capitalize">{ctabtn2.btnText}</div>
					</CTAButton>
				</div>
			</div>

			{/*Section 2*/}
			<div className="card h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px] bg-white">
				<div
					className="absolute w-[373px] h-[257px] rounded-full blur-2xl opacity-20 -left-8 -top-8"
					style={{
						background:
							'linear-gradient(135deg, rgba(138, 43, 226, 1) 17%, rgba(255, 165, 0, 1) 50%, rgba(248, 248, 255, 1) 90%)',
					}}
				></div>

				<div
					className="text-center flex select-none flex-col w-[10%]
         text-richblack-400 font-inter font-bold"
				>
					<p>1</p>
					<p>2</p>
					<p>3</p>
					<p>4</p>
					<p>5</p>
					<p>6</p>
					<p>7</p>
					<p>8</p>
					<p>9</p>
					<p>10</p>
					<p>11</p>
				</div>

				<div
					className={`w-[90%] flex flex-col gap-2 font-bold 
        font-mono ${codeColor} pr-1`}
				>
					<TypeAnimation
						sequence={[codeblock, 2000, '']}
						repeat={Infinity}
						cursor={true}
						style={{
							whiteSpace: 'pre-line',
							display: 'block',
						}}
						omitDeletionAnimation={true}
					/>
				</div>
			</div>
		</div>
	);
}

export default CodeBlocks;
