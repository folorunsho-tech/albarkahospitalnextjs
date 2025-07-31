"use client";
import React from "react";
import { userContext } from "@/context/User";
import Image from "next/image";

const Home = () => {
	const { user } = React.useContext(userContext);
	return (
		<section className='bg-white p-3 rounded-md flex flex-col items-center h-2/3 gap-6'>
			<Image
				src='/hospital.svg'
				alt='Hospital logo'
				width={150}
				height={150}
				loading='eager'
			/>
			<h2 className='text-5xl text-center'>
				Albarka Hospital Wawa, Niger state
			</h2>
			<h3 className='text-3xl text-center'>
				Welcome back <i className='underline'>{user?.username} </i>!!!
			</h3>
			<div className='flex gap-10 '>
				<p>
					Operation Date:{" "}
					<i className='font-semibold'>{new Date().toLocaleDateString()}</i>
				</p>
			</div>
		</section>
	);
};

export default Home;
