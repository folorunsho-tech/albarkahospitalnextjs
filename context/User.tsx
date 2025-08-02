/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useFetchSingle } from "@/queries";
import { ReactNode, createContext, useEffect, useState } from "react";
import getCookie from "./getCookie";

const userContext = createContext<{
	user: any;
	permissions: any[];
	setUser: any;
	setPerm: any;
}>({
	user: null,
	permissions: [],
	setUser: () => {},
	setPerm: () => {},
});
const UserProvider = ({ children }: { children: ReactNode }) => {
	const { fetch } = useFetchSingle();
	const [user, setUser] = useState<any>(null);
	const [permissions, setPerm] = useState<any[]>([]);
	const getData = async () => {
		const cookie = await getCookie("token");
		if (cookie?.value) {
			const { data } = await fetch(`/auth/me`);
			setUser(data);
			setPerm(JSON.parse(data?.menu));
		}
	};
	useEffect(() => {
		getData();
	}, []);

	return (
		<userContext.Provider
			value={{
				user,
				setUser,
				permissions,
				setPerm,
			}}
		>
			{children}
		</userContext.Provider>
	);
};

export { userContext, UserProvider };
