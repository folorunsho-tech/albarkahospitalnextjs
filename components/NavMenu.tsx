"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { userContext } from "@/context/User";
import { Divider, Group, ScrollAreaAutosize, Text } from "@mantine/core";
import { ChevronRight, HomeIcon } from "lucide-react";
import axios from "@/lib/config";
import {
	Pill,
	Contact,
	DatabaseBackup,
	Users,
	ReceiptText,
	Settings,
	BookUser,
} from "lucide-react";
import Image from "next/image";
import { IconReport } from "@tabler/icons-react";
const NavMenu = () => {
	const url = usePathname();
	const currPath = url.split("/");
	const router = useRouter();
	const { permissions: menu, user } = useContext(userContext);
	const getIcon = (name: string) => {
		if (name == "transactions") {
			return <ReceiptText />;
		} else if (name == "settings") {
			return <Settings />;
		} else if (name == "drugs") {
			return <Pill />;
		} else if (name == "encounters") {
			return <BookUser />;
		} else if (name == "patients") {
			return <Users />;
		} else if (name == "accounts") {
			return <Contact />;
		} else if (name == "backup") {
			return <DatabaseBackup />;
		} else if (name == "reports") {
			return <IconReport />;
		}
	};
	return (
		<ScrollAreaAutosize mah={"100vh"} className='h-full'>
			<nav className='flex flex-col bg-indigo-600 h-full w-full'>
				<div className='px-2 py-2 flex gap-2 items-center'>
					<Image
						src='/hospital.svg'
						alt='Hospital logo'
						width={40}
						height={40}
						loading='eager'
					/>
					<h2 className='font-semibold text-md text-white'>AHW</h2>
				</div>
				<Divider />
				<Group className='flex flex-col gap-1 text-gray-300 font-medium text-sm'>
					<Link
						className='flex gap-2 items-center w-full transition duration-300 ease-in-out data-[active]:font-semibold data-[active]:bg-indigo-500 data-[active]:text-white hover:bg-indigo-500 p-3'
						data-active={`/ms` === url || undefined}
						href={`/ms`}
					>
						<HomeIcon />
						<span>Home</span>
					</Link>
					{menu?.map((item: any) => (
						<Link
							className='flex gap-2 items-center p-3 w-full hover:text-white capitalize hover:bg-indigo-500 transition duration-300 ease-in-out data-[active]:font-semibold data-[active]:bg-indigo-500 data-[active]:text-white'
							data-active={
								item?.link.toLowerCase() === currPath[2] || undefined
							}
							href={`/ms/${item?.link}`}
							key={item?.link}
						>
							{getIcon(item?.link)}
							<span>{item?.label}</span>
						</Link>
					))}
				</Group>
			</nav>
			<Group className='bg-gray-200 cursor-pointer'>
				<Text
					size='sm'
					fw={500}
					px={12}
					pt={12}
					style={{ textDecoration: "underline" }}
				>
					{user?.username} - {new Date().toLocaleDateString()}
				</Text>

				<button
					className='flex cursor-pointer justify-between items-center w-full p-2 bg-red-500 text-white font-semibold hover:bg-red-400 transition duration-300'
					onClick={async () => {
						await axios.post("/auth/logout");
						router.push("/login");
					}}
				>
					<span className='mr-2'>Logout</span> <ChevronRight size={20} />
				</button>
			</Group>
		</ScrollAreaAutosize>
	);
};

export default NavMenu;
