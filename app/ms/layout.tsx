/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import NavMenu from "@/components/NavMenu";
import React from "react";
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<NavMenu />
			<main className='p-2'>{children}</main>
		</>
	);
}
