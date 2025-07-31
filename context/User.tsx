/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useFetchSingle } from "@/queries";
import { ReactNode, createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const userContext = createContext<{
	user: any;
	permissions: any[];
	setUser: any;
	setPerm: any;
	setToken: any;
	token: null | string;
}>({
	user: null,
	permissions: [],
	setUser: () => {},
	setPerm: () => {},
	setToken: () => {},
	token: null,
});
const UserProvider = ({ children }: { children: ReactNode }) => {
	const { fetch } = useFetchSingle();
	const [user, setUser] = useState<any>(null);
	const [token, setToken] = useState<null | string>(null);
	const [permissions, setPerm] = useState<any[]>([]);
	const getData = async () => {
		const res = await fetch(`/auth/me`);
		if (res.status === 200) {
			const user = await res.data;
			setUser(user);
			setPerm(JSON.parse(user?.menu));
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
				token,
				setToken,
			}}
		>
			{children}
		</userContext.Provider>
	);
};

export { userContext, UserProvider };
