/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Text, Table, Select, Button, Pill } from "@mantine/core";
import { usePostNormal, useFetch } from "@/queries";
import { useEffect, useState } from "react";
import DataLoader from "@/components/DataLoader";

import ReportsTable from "@/components/ReportsTable";

const page = () => {
	const { post, loading, data } = usePostNormal();
	const [queryData, setQueryData] = useState<any[]>([]);
	const [sortedData, setSortedData] = useState<any[]>(queryData);
	const { fetch } = useFetch();
	const [cares, setCares] = useState<any[]>([]);
	const [diagnosis, setDiagnosis] = useState<any[]>([]);
	const [value, setValue] = useState<any>("");
	const [criteria, setCriteria] = useState<string | null>("");
	const [loaded, setLoaded] = useState<any>("");
	const rows = sortedData?.map((row, i) => (
		<Table.Tr key={row?.id}>
			<Table.Td>
				{new Date(row?.enc_date).toLocaleDateString() + " - " + row?.time}
			</Table.Td>
			<Table.Td>{row?.patient?.hosp_no}</Table.Td>
			<Table.Td>{row?.patient?.name}</Table.Td>
			<Table.Td>{row?.patient?.age}</Table.Td>
			{/* <Table.Td>{row?.admitted ? "True" : "False"}</Table.Td> */}
			<Table.Td>{row?.care?.name}</Table.Td>
			<Table.Td>
				{row?.diagnosis?.length > 0 ? (
					<Pill>
						{row?.diagnosis?.length > 1
							? `${row?.diagnosis[0]?.name} + ${row?.diagnosis?.length - 1}`
							: row?.diagnosis[0]?.name}
					</Pill>
				) : (
					""
				)}
			</Table.Td>
			<Table.Td>{row?._count?.drugsGiven}</Table.Td>
			<Table.Td>{row?._count?.labTest}</Table.Td>
			<Table.Td>{row?.outcome}</Table.Td>
			<Table.Td>{row?.follow_ups[0]?.encounter?.diagnosis[0]?.name}</Table.Td>
		</Table.Tr>
	));

	const printRows = sortedData?.map((row, i) => (
		<Table.Tr key={row?.id}>
			<Table.Td>
				{new Date(row?.enc_date).toLocaleDateString() + " - " + row?.time}
			</Table.Td>
			<Table.Td>{row?.patient?.hosp_no}</Table.Td>
			<Table.Td>{row?.patient?.name}</Table.Td>
			<Table.Td>{row?.patient?.age}</Table.Td>
			{/* <Table.Td>{row?.admitted ? "True" : "False"}</Table.Td> */}
			<Table.Td>{row?.care?.name}</Table.Td>
			<Table.Td>
				{row?.diagnosis?.length > 0 ? (
					<Pill>
						{row?.diagnosis?.length > 1
							? `${row?.diagnosis[0]?.name} + ${row?.diagnosis?.length - 1}`
							: row?.diagnosis[0]?.name}
					</Pill>
				) : (
					""
				)}
			</Table.Td>
			<Table.Td>{row?._count?.drugsGiven}</Table.Td>
			<Table.Td>{row?._count?.labTest}</Table.Td>
			<Table.Td>{row?.outcome}</Table.Td>
			<Table.Td>{row?.follow_ups[0]?.encounter?.diagnosis[0]?.name}</Table.Td>
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
		if (criteria == "Care") {
			return (
				<Select
					label='Care'
					placeholder='search for or select a value'
					data={cares}
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
		if (criteria == "Diagnosis") {
			return (
				<Select
					label='Value'
					placeholder='search for or select a value'
					data={diagnosis}
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
		if (criteria == "Referals") {
			return (
				<Select
					label='Referals'
					placeholder='select a value'
					data={["None"]}
					className='w-[16rem]'
					disabled
					value={value}
					onChange={(value) => {
						setValue(value);
					}}
				/>
			);
		}
		if (criteria == "Under-5 Malaria") {
			return (
				<Select
					label='Under-5 Malaria'
					placeholder='select a value'
					data={["None"]}
					className='w-[16rem]'
					disabled
					value={value}
					onChange={(value) => {
						setValue(value);
					}}
				/>
			);
		}
		if (criteria == "New ANC Pts") {
			return (
				<Select
					label='New ANC Pts'
					placeholder='select a value'
					data={["None"]}
					className='w-[16rem]'
					disabled
					value={value}
					onChange={(value) => {
						setValue(value);
					}}
				/>
			);
		}
		if (criteria == "Follow-up ANC") {
			return (
				<Select
					label='Follow-up ANC'
					placeholder='select a value'
					data={["None"]}
					className='w-[16rem]'
					disabled
					value={value}
					onChange={(value) => {
						setValue(value);
					}}
				/>
			);
		}
		if (criteria == "Follow-up Out-Pts") {
			return (
				<Select
					label='Follow-up Out-Pts'
					placeholder='select a value'
					data={["None"]}
					className='w-[16rem]'
					disabled
					value={value}
					onChange={(value) => {
						setValue(value);
					}}
				/>
			);
		}
		if (criteria == "Outcome") {
			return (
				<Select
					label='Outcome'
					placeholder='search for or select a value'
					data={[
						"Admited",
						"DAMA",
						"Dead",
						"Discharged",
						"PoliceCase",
						"ReferGH",
						"ReferFMC",
						"ReferUITH",
						"Treated",
					]}
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
	const getFilter = async () => {
		if (criteria == "Care") {
			const found = queryData?.filter((d: any) => d?.care?.name == value);
			setSortedData(found);
		}
		if (criteria == "Outcome") {
			const found = queryData?.filter((d: any) => d?.outcome == value);
			setSortedData(found);
		}
		if (criteria == "Referals") {
			const found = queryData?.filter((d: any) =>
				String(d?.outcome).includes("Refer")
			);
			setSortedData(found);
		}
		if (criteria == "Diagnosis") {
			const isDiags = queryData.filter((d: any) => d?.diagnosis.length > 0);
			const found: any[] = [];
			isDiags.forEach((enc: { diagnosis: any[] }) => {
				const filtered = enc.diagnosis.filter(
					(diag: { id: string; name: string }) => diag.id == value
				);
				if (filtered.length > 0) found.push(enc);
			});
			setSortedData(found);
		}
		if (criteria == "Under-5 Malaria") {
			const isDiags = queryData.filter(
				(d: any) =>
					d?.diagnosis.length > 0 &&
					ages.indexOf(d?.patient?.age) < ages.indexOf("5y")
			);
			const found: any[] = [];
			isDiags.forEach((enc: { diagnosis: any[] }) => {
				const filtered = enc.diagnosis.filter(
					(diag: { id: string; name: string }) =>
						diag.name.toLowerCase().includes("malaria")
				);
				if (filtered.length > 0) found.push(enc);
			});
			setSortedData(found);
		}

		if (criteria == "Follow-up ANC") {
			const found = queryData?.filter((d: any) => d?._count?.follow_ups > 0);
			const data = found?.filter(
				(dat: any) => dat?.follow_ups[0]?.encounter?.care?.name == "ANC"
			);
			setSortedData(data);
		}
		if (criteria == "New ANC Pts") {
			const found = queryData?.filter(
				(d: any) => d?._count?.anc == 1 && d?.care?.name == "ANC"
			);
			setSortedData(found);
		}
		if (criteria == "Follow-up Out-Pts") {
			const found = queryData?.filter((d: any) => d?._count?.follow_ups > 0);
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
						"Care",
						"Diagnosis",
						"Outcome",
						"Referals",
						"Under-5 Malaria",
						"New ANC Pts",
						"Follow-up ANC",
						"Follow-up Out-Pts",
					]}
					value={criteria}
					className='w-[16rem]'
					searchable
					clearable
					onChange={(value) => {
						setCriteria(value);
						if (value == "Care" || value == "Diagnosis" || value == "Outcome") {
							setValue(null);
						} else {
							setValue("None");
						}
					}}
				/>
				{getValuesUI()}
				<Button type='submit' disabled={!value}>
					Filter
				</Button>
				<Button
					color='red'
					onClick={() => {
						setSortedData(queryData);
						setCriteria(null);
						setValue(null);
					}}
				>
					Clear Filter
				</Button>
			</div>
		</form>
	);
	const getReport = () => {
		if (criteria && value) {
			return `Encounters report for ${criteria} --> ${value}`;
		}
		return "Encounters report for";
	};
	useEffect(() => {
		const getD = async () => {
			const { data } = await fetch("/settings/care");
			const { data: diags } = await fetch("/settings/diagnosis");
			const sorted = data.map((d: { name: string; id: string }) => {
				return d.name;
			});
			const sortedD = diags.map((d: { name: string; id: string }) => {
				return {
					label: d.name,
					value: d.id,
				};
			});

			setDiagnosis(sortedD);
			setCares(sorted);
		};
		getD();
	}, []);

	useEffect(() => {
		setCriteria(null);
		setValue(null);
		setSortedData(queryData);
	}, [loaded, data]);

	return (
		<main className='space-y-6'>
			<div className='flex justify-between items-end'>
				<DataLoader
					link='/reports/encounters'
					post={post}
					setQueryData={setQueryData}
					setLoaded={setLoaded}
				/>

				<Text size='md' fw={600}>
					Encounters report
				</Text>
			</div>

			<ReportsTable
				headers={[
					"ENC Date-Time",
					"Hosp No",
					"Patient",
					"Age",
					// "Admitted",
					"Care",
					"Diagnosis",
					"Drugs Count",
					"Tests Count",
					"Outcome",
					"Follow Up To",
				]}
				printHeaders={[
					"ENC Date-Time",
					"Hosp No",
					"Patient",
					"Age",
					// "Admitted",
					"Care",
					"Diagnosis",
					"Drugs Count",
					"Tests Count",
					"Outcome",
					"Follow Up To",
				]}
				sortedData={sortedData}
				setSortedData={setSortedData}
				data={sortedData}
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
