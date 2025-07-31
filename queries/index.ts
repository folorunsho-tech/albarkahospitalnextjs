/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import axios from "@/lib/config";
import { userContext } from "@/context/User";
import React from "react";
import { notifications } from "@mantine/notifications";
import { format } from "date-fns";
import { curMonth, curYear } from "@/lib/ynm";
const showNotification = (status: number) => {
	if (status == 200) {
		notifications.show({
			title: "Success !!!",
			message: "Operation sucessfull",
			color: "green",
		});
	} else if (status == 400) {
		notifications.show({
			title: "Error !!!",
			message: "Data alredy exist",
			color: "orange",
		});
	} else if (status == 401) {
		notifications.show({
			title: "Error !!!",
			message: "Access Denied",
			color: "red",
		});
	} else if (status == 404) {
		notifications.show({
			title: "Error !!!",
			message: "Data not Found",
			color: "red",
		});
	} else {
		notifications.show({
			title: "Server Error !!!",
			message: "Seems the server is having issues",
			color: "red",
		});
	}
};

export const useFetch = () => {
	const { token } = React.useContext(userContext);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const fetch = async (url: string) => {
		setLoading(true);
		const getquery = await axios.get(url, {
			headers: {
				Authorization: token,
			},
		});
		setData(getquery.data);
		setLoading(false);
		return {
			data: getquery.data,
			headers: getquery.headers,
			status: getquery.status,
		};
	};

	return { loading, fetch, data };
};
export const useFetchSingle = () => {
	const { token } = React.useContext(userContext);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState({});
	const fetch = async (url: string) => {
		setLoading(true);
		const getquery = await axios.get(url, {
			headers: {
				Authorization: token,
			},
		});
		setData(getquery.data);
		setLoading(false);
		return {
			data: getquery.data,
			headers: getquery.headers,
			status: getquery.status,
		};
	};

	return { loading, fetch, data };
};
export const useHospNo = () => {
	const { token } = React.useContext(userContext);
	const [loading, setLoading] = useState(false);
	const fetch = async (url: string) => {
		setLoading(true);
		const getquery = await axios.post(
			url,
			{
				year: curYear,
				month: curMonth,
			},
			{
				headers: {
					Authorization: token,
				},
			}
		);
		setLoading(false);
		return {
			data: getquery.data,
			headers: getquery.headers,
			status: getquery.status,
		};
	};

	return { loading, fetch };
};

export const usePostNormal = () => {
	const { token } = React.useContext(userContext);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const post = async (url: string, postData: any) => {
		setLoading(true);
		const postquery = await axios.post(
			url,
			{
				...postData,
			},
			{
				headers: {
					Authorization: token,
				},
			}
		);
		setData(postquery.data);
		setLoading(false);

		return {
			data: postquery.data,
			headers: postquery.headers,
			status: postquery.status,
		};
	};
	return { loading, post, data };
};
export const useCreate = () => {
	const { user, token } = React.useContext(userContext);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const post = async (url: string, postData: any) => {
		setLoading(true);
		const postquery = await axios.post(
			url,
			{
				...postData,
				createdById: user?.id,
				updatedById: user?.id,
			},
			{
				headers: {
					Authorization: token,
				},
			}
		);
		setData(postquery.data);
		setLoading(false);
		showNotification(postquery.status);
		return {
			data: postquery.data,
			headers: postquery.headers,
			status: postquery.status,
		};
	};
	return { loading, post, data };
};
export const usePost = () => {
	const { user, token } = React.useContext(userContext);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const post = async (url: string, postData: any) => {
		setLoading(true);
		const postquery = await axios.post(
			url,
			{
				...postData,
				createdById: user?.id,
			},
			{
				headers: {
					Authorization: token,
				},
			}
		);
		setData(postquery.data);
		setLoading(false);
		showNotification(postquery.status);
		return {
			data: postquery.data,
			headers: postquery.headers,
			status: postquery.status,
		};
	};
	return { loading, post, data };
};
export const usePostT = () => {
	const { user, token } = React.useContext(userContext);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const post = async (url: string, postData: any) => {
		setLoading(true);
		const postquery = await axios.post(
			url,
			{
				...postData,
				createdById: user?.id,
				time: format(new Date(), "PPpp").split(",")[2].trim(),
			},
			{
				headers: {
					Authorization: token,
				},
			}
		);
		setData(postquery.data);
		setLoading(false);
		showNotification(postquery.status);
		return {
			data: postquery.data,
			headers: postquery.headers,
			status: postquery.status,
		};
	};
	return { loading, post, data };
};
export const useEditT = () => {
	const { user, token } = React.useContext(userContext);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const edit = async (url: string, postData: any) => {
		setLoading(true);
		const postquery = await axios.post(
			url,
			{
				...postData,
				updatedById: user?.id,
				time: format(new Date(), "PPpp").split(",")[2].trim(),
			},
			{
				headers: {
					Authorization: token,
				},
			}
		);
		setData(postquery.data);
		setLoading(false);
		showNotification(postquery.status);

		return {
			data: postquery.data,
			headers: postquery.headers,
			status: postquery.status,
		};
	};
	return { loading, edit, data };
};
export const useEdit = () => {
	const { user, token } = React.useContext(userContext);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const edit = async (url: string, postData: any) => {
		setLoading(true);
		const postquery = await axios.post(
			url,
			{
				...postData,
				updatedById: user?.id,
			},
			{
				headers: {
					Authorization: token,
				},
			}
		);
		setData(postquery.data);
		setLoading(false);
		showNotification(postquery.status);

		return {
			data: postquery.data,
			headers: postquery.headers,
			status: postquery.status,
		};
	};
	return { loading, edit, data };
};
