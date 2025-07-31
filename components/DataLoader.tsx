/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Select } from "@mantine/core";
import { useEffect, useState } from "react";
import { DatePickerInput } from "@mantine/dates";
import { curMonth, curMonthNo, curYear, months, years } from "@/lib/ynm";

const DataLoader = ({
	link,
	setQueryData,
	post,
	updated,
	defaultLoad = "yearnmonth",
	setLoaded,
}: {
	link: string;
	setQueryData: any;
	post: any;
	updated?: boolean;
	defaultLoad?: string;
	setLoaded?: any;
}) => {
	const [criteria, setCriteria] = useState(defaultLoad);
	const [cYear, setCYear] = useState<string | null>(curYear);
	const [cYnmY, setCYnmY] = useState<string | null>(curYear);
	const [cYnmM, setCYnmM] = useState<string | null>(curMonth);
	const [cDate, setCDate] = useState<Date | any>(new Date());
	const [from, setFrom] = useState<Date | any>(
		new Date(Number(curYear), curMonthNo, 2)
	);
	const [to, setTo] = useState<Date | any>(new Date());
	const loadValue = (criteria: string) => {
		if (criteria == "yearnmonth") {
			return (
				<div className='flex items-end gap-6'>
					<Select
						label='Load Year'
						placeholder='Select a year'
						data={years}
						value={cYnmY}
						searchable
						allowDeselect={false}
						onChange={(yearvalue) => {
							setCYnmY(yearvalue);
						}}
					/>
					<Select
						label='Load Month'
						placeholder='Select a month'
						data={months}
						allowDeselect={false}
						searchable
						value={cYnmM}
						onChange={(monthvalue: any) => {
							setCYnmM(monthvalue);
						}}
					/>
				</div>
			);
		} else if (criteria == "date") {
			return (
				<DatePickerInput
					label='Pick date'
					placeholder='Pick date'
					value={cDate}
					onChange={(datevalue: any) => {
						setCDate(datevalue);
					}}
				/>
			);
		} else if (criteria == "range") {
			return (
				<div className='flex items-start gap-4'>
					<DatePickerInput
						label='From date'
						placeholder='Pick a date'
						className='w-[10rem]'
						value={from}
						onChange={(datevalue) => {
							setFrom(datevalue);
						}}
					/>
					<DatePickerInput
						label='To date'
						placeholder='Pick a date'
						className='w-[10rem]'
						value={to}
						onChange={(datevalue) => {
							setTo(datevalue);
						}}
					/>
				</div>
			);
		} else {
			return (
				<Select
					label='Load Year'
					placeholder='Select a year'
					data={years}
					value={cYear}
					searchable
					allowDeselect={false}
					onChange={(yearvalue) => {
						setCYear(yearvalue);
					}}
				/>
			);
		}
	};
	const getData = async () => {
		if (criteria == "year") {
			const { data } = await post(`${link}/${criteria}`, {
				value: Number(cYear),
			});
			setQueryData(data);
		} else if (criteria == "yearnmonth") {
			const { data } = await post(`${link}/${criteria}`, {
				value: { year: Number(cYnmY), month: cYnmM },
			});

			setQueryData(data);
		} else if (criteria == "date") {
			const { data } = await post(`${link}/${criteria}`, {
				value: cDate,
			});
			setQueryData(data);
		} else if (criteria == "range") {
			const { data } = await post(`${link}/${criteria}`, {
				value: { from, to },
			});
			setQueryData(data);
		}
	};
	useEffect(() => {
		getData();
	}, [criteria, cYear, cYnmY, cYnmM, cDate, to, updated, from]);
	useEffect(() => {
		if (setLoaded)
			if (criteria == "yearnmonth") {
				setLoaded(`Year - ${cYnmY} and Month - ${cYnmM}`);
			} else if (criteria == "year") {
				setLoaded(`Year - ${cYear}`);
			} else if (criteria == "date") {
				setLoaded(`Date - ${new Date(cDate).toLocaleDateString()}`);
			} else if (criteria == "range") {
				setLoaded(
					`From - ${new Date(from).toLocaleDateString()}, To - ${new Date(
						to
					).toLocaleDateString()}`
				);
			}
	}, [criteria, cYear, cYnmY, cYnmM, cDate, to, from]);

	return (
		<form
			className='flex items-end gap-6 '
			onSubmit={async (e) => {
				e.preventDefault();
				getData();
			}}
		>
			<Select
				label='Load data by criteria'
				placeholder='Select a criteria'
				value={criteria}
				data={[
					{ label: "Year", value: "year" },
					{ label: "Year and Month", value: "yearnmonth" },
					{ label: "Date", value: "date" },
					{ label: "Date range", value: "range" },
				]}
				allowDeselect={false}
				onChange={(value: any) => {
					setCriteria(value);
				}}
			/>
			{loadValue(criteria)}
		</form>
	);
};

export default DataLoader;
