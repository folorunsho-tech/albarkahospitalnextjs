"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { userContext } from "@/context/User";
import { Button, Text } from "@mantine/core";
import { ChevronRight, HomeIcon } from "lucide-react";
import axios from "@/lib/config";
import {
	Pill,
	Contact,
	Users,
	ReceiptText,
	Settings,
	BookUser,
} from "lucide-react";
import Image from "next/image";
import { IconReport } from "@tabler/icons-react";
import { format } from "date-fns";
const NavMenu = () => {
	const url = usePathname();
	const currPath = url.split("/");
	const router = useRouter();
	const { permissions, user } = useContext(userContext);
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
		} else if (name == "reports") {
			return <IconReport />;
		}
	};
	return (
		<nav className='flex justify-between bg-indigo-600 w-full'>
			<div className='px-2 py-2 flex gap-2 items-center '>
				<Image
					src='/hospital.svg'
					alt='Hospital logo'
					width={40}
					height={40}
					loading='eager'
				/>
				<h2 className='font-semibold text-md text-white'>AHW</h2>
			</div>
			<div className='flex flex-wrap gap-1 text-gray-300 text-sm'>
				<Link
					className='flex gap-1 items-center transition duration-300 ease-in-out data-[active]:font-semibold data-[active]:bg-indigo-500 data-[active]:text-white hover:bg-indigo-500 p-2'
					data-active={`/ms` === url || undefined}
					href={`/ms`}
				>
					<HomeIcon />
					<span>Home</span>
				</Link>
				{permissions?.map((item) => {
					return (
						<Link
							className='flex flex-wrap gap-2 items-center p-2  hover:text-white capitalize hover:bg-indigo-500 transition duration-300 ease-in-out data-[active]:font-semibold data-[active]:bg-indigo-500 data-[active]:text-white'
							data-active={
								item?.link.toLowerCase() === currPath[2] || undefined
							}
							href={`/ms/${item?.link}`}
							key={item?.link}
						>
							{getIcon(item?.link)}
							<span>{item?.label}</span>
						</Link>
					);
				})}
			</div>
			<div className='flex flex-wrap gap-2 items-center pr-2'>
				<Text
					size='sm'
					c='white'
					fw={500}
					style={{ textDecoration: "underline" }}
				>
					{user?.username} - {format(new Date(), "dd/MM/yyyy")}
				</Text>

				<Button
					onClick={async () => {
						await axios.post("/auth/logout");
						router.push("/login");
					}}
					color='red'
					rightSection={<ChevronRight size={14} />}
				>
					Logout
				</Button>
			</div>
		</nav>
	);
};

export default NavMenu;
