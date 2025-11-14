/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useContext } from "react";
import axios from "@/lib/config";
import { userContext } from "@/context/User";
import { format } from "date-fns";
import { curMonth, curYear } from "@/lib/ynm";
import showNotification from "@/lib/showNoification";

// Core reusable hook with notification toggle
function useApi<T = any>(
	method: "GET" | "POST",
	transformPayload?: (payload?: any, user?: any) => any,
	enableNotification: boolean = true
) {
	const { user } = useContext(userContext);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<T | any>(null);

	const request = async (url: string, payload?: any) => {
		setLoading(true);
		try {
			const config: any = { method, url };
			if (method === "POST") {
				config.data = transformPayload
					? transformPayload(payload, user)
					: payload;
			}

			const res = await axios(config);
			setData(res.data);
			if (enableNotification) showNotification(res.status);
			return { data: res.data, headers: res.headers, status: res.status };
		} catch (error: any) {
			if (enableNotification) showNotification(error.response?.status || 500);
			return { data: null, headers: {}, status: error.response?.status || 500 };
		} finally {
			setLoading(false);
		}
	};

	return { loading, data, request };
}

// === Your hooks (same names) ===
// Notifications disabled for these two:
export const useFetch = () => {
	const { loading, data, request } = useApi<any[]>("GET", undefined, false);
	return { loading, data, fetch: request };
};

export const useFetchSingle = () => {
	const { loading, data, request } = useApi<any>("GET", undefined, false);
	return { loading, data, fetch: request };
};

// Notifications enabled for the rest:
export const useHospNo = () => {
	const { loading, request } = useApi(
		"POST",
		() => ({
			year: curYear,
			month: curMonth,
		}),
		false
	);
	return { loading, fetch: request };
};

export const usePostNormal = () => {
	const { loading, data, request } = useApi<any[]>(
		"POST",
		(payload) => ({ ...payload }),
		false
	);
	return { loading, data, post: request };
};

export const useCreate = () => {
	const { loading, data, request } = useApi<any[]>("POST", (payload, user) => ({
		...payload,
		createdById: user?.id,
		updatedById: user?.id,
	}));
	return { loading, data, post: request };
};

export const usePost = () => {
	const { loading, data, request } = useApi<any[]>("POST", (payload, user) => ({
		...payload,
		createdById: user?.id,
	}));
	return { loading, data, post: request };
};

export const usePostT = () => {
	const { loading, data, request } = useApi<any[]>("POST", (payload, user) => ({
		...payload,
		createdById: user?.id,
		time: format(new Date(), "PPpp").split(",")[2].trim(),
	}));
	return { loading, data, post: request };
};

export const useEditT = () => {
	const { loading, data, request } = useApi<any[]>("POST", (payload, user) => ({
		...payload,
		updatedById: user?.id,
		time: format(new Date(), "PPpp").split(",")[2].trim(),
	}));
	return { loading, data, edit: request };
};

export const useEdit = () => {
	const { loading, data, request } = useApi<any[]>("POST", (payload, user) => ({
		...payload,
		updatedById: user?.id,
	}));
	return { loading, data, edit: request };
};
export const useDelete = () => {
	const { loading, data, request } = useApi<any[]>("POST", (payload) => ({
		...payload,
	}));
	return { loading, data, remove: request };
};
