/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Text, Table, Select, Button, TextInput } from "@mantine/core";
import { usePostNormal, useFetch } from "@/queries";
import { useEffect, useState } from "react";
import DataLoader from "@/components/DataLoader";

import ReportsTable from "@/components/ReportsTable";

const page = () => {
	const { post, loading } = usePostNormal();
	const { fetch } = useFetch();
	const [queryData, setQueryData] = useState<any[]>([]);
	const [towns, setTowns] = useState<any[]>([]);
	const [groups, setGroups] = useState<any[]>([]);
	const [sortedData, setSortedData] = useState<any[]>(queryData);
	const [value, setValue] = useState<any>("");
	const [condition, setCondition] = useState<string | null>("equals");
	const [criteria, setCriteria] = useState<string | null>("");
	const [loaded, setLoaded] = useState<any>("");
	const rows = sortedData?.map((row, i) => (
		<Table.Tr key={row?.id}>
			<Table.Td>{new Date(row?.reg_date).toLocaleDateString()}</Table.Td>
			<Table.Td>{row?.hosp_no}</Table.Td>
			<Table.Td>{row?.name}</Table.Td>
			<Table.Td>{row?.sex}</Table.Td>
			<Table.Td>{row?.age}</Table.Td>
			<Table.Td>{row?.occupation}</Table.Td>
			<Table.Td>{row?.religion}</Table.Td>
			<Table.Td>{row?.phone_no}</Table.Td>
			<Table.Td>{row?.town?.name}</Table.Td>
			<Table.Td>{row?.groups?.name}</Table.Td>
			<Table.Td>{row?._count?.encounters}</Table.Td>
			<Table.Td>{row?._count?.transactions}</Table.Td>
		</Table.Tr>
	));
	const printRows = sortedData?.map((row, i) => (
		<Table.Tr key={row?.id}>
			<Table.Td>{new Date(row?.reg_date).toLocaleDateString()}</Table.Td>
			<Table.Td>{row?.hosp_no}</Table.Td>
			<Table.Td>{row?.name}</Table.Td>
			<Table.Td>{row?.sex}</Table.Td>
			<Table.Td>{row?.age}</Table.Td>
			<Table.Td>{row?.occupation}</Table.Td>
			<Table.Td>{row?.religion}</Table.Td>
			<Table.Td>{row?.phone_no}</Table.Td>
			<Table.Td>{row?.town?.name}</Table.Td>
			<Table.Td>{row?.groups?.name}</Table.Td>
			<Table.Td>{row?._count?.encounters}</Table.Td>
			<Table.Td>{row?._count?.transactions}</Table.Td>
		</Table.Tr>
	));
	const ages = [
		"1d",
		"2d",
		"3d",
		"4d",
		"5d",
		"6d",
		"7d",
		"8d",
		"9d",
		"10d",
		"11d",
		"12d",
		"13d",
		"2w",
		"3w",
		"4w",
		"5w",
		"6w",
		"7w",
		"2m",
		"3m",
		"4m",
		"5m",
		"6m",
		"7m",
		"8m",
		"9m",
		"10m",
		"11m",
		"1y",
		"1y 6m",
		"2y",
		"2y 6m",
		"3y",
		"3y 6m",
		"4y",
		"4y 6m",
		"5y",
		"6y",
		"7y",
		"8y",
		"9y",
		"10y",
		"11y",
		"12y",
		"13y",
		"14y",
		"15y",
		"16y",
		"17y",
		"18y",
		"19y",
		"20y",
		"21y",
		"22y",
		"23y",
		"24y",
		"25y",
		"26y",
		"27y",
		"28y",
		"29y",
		"30y",
		"31y",
		"32y",
		"33y",
		"34y",
		"35y",
		"36y",
		"37y",
		"38y",
		"39y",
		"40y",
		"41y",
		"42y",
		"43y",
		"44y",
		"45y",
		"46y",
		"47y",
		"48y",
		"49y",
		"50y",
		"51y",
		"52y",
		"53y",
		"54y",
		"55y",
		"56y",
		"57y",
		"58y",
		"59y",
		"60y",
		"61y",
		"62y",
		"63y",
		"64y",
		"65y",
		"66y",
		"67y",
		"68y",
		"69y",
		"70y",
		"75y",
		"80y",
		"85y",
		"90y",
	];
	const getValuesUI = () => {
		if (criteria == "Sex") {
			return (
				<Select
					label='Value'
					placeholder='search for or select a value'
					data={["Male", "Female"]}
					className='w-[16rem]'
					searchable
					clearable
					value={value}
					onChange={(value) => {
						setValue(value);
					}}
				/>
			);
		}
		if (criteria == "Age") {
			return (
				<div className='flex items-end gap-3'>
					<Select
						label='Condition'
						placeholder='select a condition'
						data={["equals", "lt", "gt", "lte", "gte"]}
						className='w-[16rem]'
						value={condition}
						onChange={(value) => {
							setCondition(value);
						}}
					/>
					<Select
						label='Value'
						placeholder='search for or select a value'
						data={ages}
						className='w-[16rem]'
						searchable
						clearable
						value={value}
						onChange={(value) => {
							setValue(value);
						}}
					/>
				</div>
			);
		}
		if (criteria == "Occupation") {
			return (
				<TextInput
					label='Occupation'
					placeholder='occupation'
					value={value}
					onChange={(e) => {
						setValue(e.currentTarget.value);
					}}
				/>
			);
		}
		if (criteria == "Religion") {
			return (
				<Select
					label='Value'
					placeholder='search for or select a value'
					data={["Islam", "Christianity", "Others"]}
					className='w-[16rem]'
					searchable
					clearable
					value={value}
					onChange={(value) => {
						setValue(value);
					}}
				/>
			);
		}
		if (criteria == "Address") {
			return (
				<Select
					label='Value'
					placeholder='search for or select a value'
					data={towns}
					className='w-[16rem]'
					searchable
					clearable
					value={value}
					onChange={(value) => {
						setValue(value);
					}}
				/>
			);
		}
		if (criteria == "Group") {
			return (
				<Select
					label='Value'
					placeholder='search for or select a value'
					data={groups}
					className='w-[16rem]'
					searchable
					clearable
					value={value}
					onChange={(value) => {
						setValue(value);
					}}
				/>
			);
		}
	};

	const getFilter = () => {
		if (criteria == "Sex") {
			const found = queryData?.filter((d: any) => d?.sex == value);
			setSortedData(found);
		}
		if (criteria == "Age") {
			if (condition == "equals") {
				const found = queryData?.filter(
					(d: any) => ages.indexOf(d?.age) == ages.indexOf(value)
				);
				setSortedData(found);
			}
			if (condition == "lt") {
				const found = queryData?.filter(
					(d: any) => ages.indexOf(d?.age) < ages.indexOf(value)
				);
				setSortedData(found);
			}
			if (condition == "gt") {
				const found = queryData?.filter(
					(d: any) => ages.indexOf(d?.age) > ages.indexOf(value)
				);
				setSortedData(found);
			}
			if (condition == "lte") {
				const found = queryData?.filter(
					(d: any) => ages.indexOf(d?.age) <= ages.indexOf(value)
				);
				setSortedData(found);
			}
			if (condition == "gte") {
				const found = queryData?.filter(
					(d: any) => ages.indexOf(d?.age) >= ages.indexOf(value)
				);
				setSortedData(found);
			}
		}
		if (criteria == "Occupation") {
			const found = queryData?.filter((d: any) =>
				String(d?.occupation).toLowerCase().includes(value)
			);
			setSortedData(found);
		}
		if (criteria == "Religion") {
			const found = queryData?.filter((d: any) => d?.religion == value);
			setSortedData(found);
		}
		if (criteria == "Address") {
			const found = queryData?.filter((d: any) => d?.town?.name == value);
			setSortedData(found);
		}
		if (criteria == "Group") {
			const found = queryData?.filter((d: any) => d?.groups?.name == value);
			setSortedData(found);
		}
		if (criteria == "New Out Patients") {
			const found = queryData?.filter((d: any) => d?._count?.encounters == 0);
			setSortedData(found);
		}
	};
	const filters = (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				getFilter();
			}}
			className='w-full'
		>
			<label htmlFor='filters'>Filters</label>
			<div id='filters' className='flex gap-3 items-end flex-wrap'>
				<Select
					label='Criteria'
					placeholder='select a criteria'
					data={[
						"Sex",
						"Age",
						"Occupation",
						"Religion",
						"Address",
						"Group",
						"New Out Patients",
					]}
					value={criteria}
					className='w-[16rem]'
					searchable
					clearable
					onChange={(value) => {
						setCriteria(value);
						setValue(null);
					}}
				/>
				{getValuesUI()}
				<Button type='submit'>Filter</Button>
				<Button
					color='red'
					onClick={() => {
						setSortedData(queryData);
						setCriteria(null);
						setValue(null);
						setCondition("equals");
					}}
				>
					Clear Filter
				</Button>
			</div>
		</form>
	);
	const getReport = () => {
		if (criteria && value) {
			return `Patients report for ${criteria} --> ${value}`;
		}
		return "Patients report for";
	};
	useEffect(() => {
		const getD = async () => {
			const { data } = await fetch("/settings/town");
			const { data: groups } = await fetch("/settings/groups");
			const sorted = data.map((d: { name: string; id: string }) => {
				return d.name;
			});
			const sortedG = groups.map((d: { name: string; id: string }) => {
				return d.name;
			});
			setTowns(sorted);
			setGroups(sortedG);
		};
		getD();
	}, []);
	useEffect(() => {
		setSortedData(queryData);
		setCriteria(null);
		setValue(null);
		setCondition("equals");
	}, [loaded]);
	return (
		<main className='space-y-6'>
			<div className='flex justify-between items-end'>
				<DataLoader
					link='/reports/patients'
					post={post}
					setQueryData={setQueryData}
					setLoaded={setLoaded}
				/>

				<Text size='md' fw={600}>
					Patients report
				</Text>
			</div>

			<ReportsTable
				headers={[
					"Reg Date",
					"Hosp No",
					"Name",
					"Sex",
					"Age",
					"Occupation",
					"Religion",
					"Phone No",
					"Address",
					"Group",
					"ENC Count",
					"TNX Count",
				]}
				printHeaders={[
					"Reg Date",
					"Hosp No",
					"Name",
					"Sex",
					"Age",
					"Occupation",
					"Religion",
					"Phone No",
					"Address",
					"Group",
					"ENC Count",
					"TNX Count",
				]}
				sortedData={sortedData}
				setSortedData={setSortedData}
				data={queryData}
				tableLoading={loading}
				rows={rows}
				printRows={printRows}
				filters={filters}
				loaded={loaded}
				tableReport={getReport()}
				metadata={
					<div className='text-lg font-semibold my-2'>
						<h2>Total Count: {sortedData.length}</h2>
					</div>
				}
			/>
		</main>
	);
};

export default page;
