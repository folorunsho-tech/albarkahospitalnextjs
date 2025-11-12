/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ReactNode, createContext, useEffect, useState } from "react";
import getUser from "./getUser";
import { useRouter } from "next/navigation";
import { useFetch } from "@/queries";
const userContext = createContext<{
	user: any;
	accounts: { id: string | null; username: string | null }[];
	permissions: { link: string; label: string }[];
	setUser: any;
	setPerm: any;
}>({
	user: null,
	accounts: [],
	permissions: [],
	setUser: () => {},
	setPerm: () => {},
});
const UserProvider = ({ children }: { children: ReactNode }) => {
	const router = useRouter();
	const { fetch } = useFetch();
	const [user, setUser] = useState<any>(null);
	const [accounts, setAccounts] = useState<any[]>([]);
	const [permissions, setPerm] = useState<{ link: string; label: string }[]>(
		[]
	);

	const getData = async () => {
		const currUser: any = await getUser("albarkahospitaltoken");
		if (!currUser) {
			router.push("/login");
		} else {
			setUser(currUser);
			setPerm(JSON.parse(currUser?.menu || []));
		}
	};
	const initSnap = async () => {
		await fetch("/reports/drugsummary");
	};
	const initAccounts = async () => {
		const { data } = await fetch("/accounts/simple");
		setAccounts(data);
	};
	useEffect(() => {
		getData();
		initSnap();
		initAccounts();
	}, []);

	return (
		<userContext.Provider
			value={{
				user,
				setUser,
				permissions,
				setPerm,
				accounts,
			}}
		>
			{children}
		</userContext.Provider>
	);
};

export { userContext, UserProvider };
