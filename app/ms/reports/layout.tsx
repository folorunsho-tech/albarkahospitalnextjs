"use client";
import { NavLink } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";
const Layout = ({ children }: { children: ReactNode }) => {
	const url = usePathname();

	return (
		<main>
			<nav className='flex items-center bg-teal-700 text-white navs rounded-r-full mb-3 '>
				<NavLink
					variant='filled'
					color='teal'
					component={Link}
					href='/ms/reports'
					label='Patients'
					className='rounded-r-full'
					active={`/ms/reports` == url}
				/>
				<NavLink
					variant='filled'
					color='teal'
					component={Link}
					href='/ms/reports/encounters'
					label='Encounters'
					className='rounded-r-full'
					active={`/ms/reports/encounters` == url}
				/>
				<NavLink
					variant='filled'
					color='teal'
					component={Link}
					href='/ms/reports/admissions'
					label='Admissions'
					className='rounded-r-full'
					active={`/ms/reports/admissions` == url}
				/>
				<NavLink
					variant='filled'
					color='teal'
					component={Link}
					href='/ms/reports/prescriptions'
					label='Prescriptions'
					className='rounded-r-full'
					active={`/ms/reports/drugs` == url}
				/>
				<NavLink
					variant='filled'
					color='teal'
					component={Link}
					href='/ms/reports/deliveries'
					label='Delivery'
					className='rounded-r-full'
					active={`/ms/reports/deliveries` == url}
				/>
				<NavLink
					variant='filled'
					color='teal'
					component={Link}
					href='/ms/reports/labs'
					label='Labs'
					className='rounded-r-full'
					active={`/ms/reports/labs` == url}
				/>
				<NavLink
					variant='filled'
					color='teal'
					component={Link}
					href='/ms/reports/operations'
					label='Operation'
					className='rounded-r-full'
					active={`/ms/reports/operations` == url}
				/>
				<NavLink
					variant='filled'
					color='teal'
					component={Link}
					href='/ms/reports/anc'
					label='ANC'
					className='rounded-r-full'
					active={`/ms/reports/anc` == url}
				/>
				<NavLink
					variant='filled'
					color='teal'
					component={Link}
					href='/ms/reports/immunizations'
					label='Immunizations'
					className='rounded-r-full'
					active={`/ms/reports/immunizations` == url}
				/>
				<NavLink
					variant='filled'
					color='teal'
					component={Link}
					href='/ms/reports/drugs_summary'
					label='Drugs Summary'
					className='rounded-r-full text-xs'
					active={`/ms/reports/drugs_summary` == url}
				/>
			</nav>
			{children}
		</main>
	);
};

export default Layout;
