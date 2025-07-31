/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { AppShell } from "@mantine/core";
import NavMenu from "@/components/NavMenu";
import React from "react";
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<AppShell
			navbar={{
				width: 150,
				breakpoint: "sm",
			}}
			padding='sm'
		>
			<AppShell.Navbar>
				<NavMenu />
			</AppShell.Navbar>
			<AppShell.Main>{children}</AppShell.Main>
		</AppShell>
	);
}
