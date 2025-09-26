/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ReactNode, createContext, useEffect, useState } from "react";
import getUser from "./getUser";
import { useRouter } from "next/navigation";

const userContext = createContext<{
	user: any;
	permissions: { link: string; label: string }[];
	setUser: any;
	setPerm: any;
}>({
	user: null,
	permissions: [],
	setUser: () => {},
	setPerm: () => {},
});
const UserProvider = ({ children }: { children: ReactNode }) => {
	const router = useRouter();
	const [user, setUser] = useState<any>(null);
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
