/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
	Text,
	Table,
	Select,
	Button,
	TextInput,
	NumberFormatter,
} from "@mantine/core";
import { usePostNormal, useFetch } from "@/queries";
import { useEffect, useState } from "react";
import DataLoader from "@/components/DataLoader";

import ReportsTable from "@/components/ReportsTable";

const page = () => {
	const { post, loading } = usePostNormal();
	const { fetch } = useFetch();
	const [queryData, setQueryData] = useState<any[]>([]);
	const [tests, setTests] = useState<any[]>([]);
	const [sortedData, setSortedData] = useState<any[]>(queryData);
	const [result, setResult] = useState<string>("");
	const [test, setTest] = useState<string | null>("");
	const [info, setInfo] = useState<string | null>("");
	const [criteria, setCriteria] = useState<string | null>("");
	const [loaded, setLoaded] = useState<any>("");
	const rows = sortedData?.map((row, i) => (
		<Table.Tr key={row?.id}>
			<Table.Td>
				{new Date(row?.encounter?.enc_date).toLocaleDateString()}
			</Table.Td>
			<Table.Td>{new Date(row?.date).toLocaleDateString()}</Table.Td>
			<Table.Td>{row?.encounter?.patient?.hosp_no}</Table.Td>
			<Table.Td>{row?.encounter?.patient?.name}</Table.Td>
			<Table.Td>{row?.testType?.name}</Table.Td>
			<Table.Td>{row?.result}</Table.Td>
			<Table.Td>{row?.info}</Table.Td>
			<Table.Td>
				<NumberFormatter prefix='N ' value={row?.rate} thousandSeparator />
			</Table.Td>
		</Table.Tr>
	));
	const printRows = sortedData?.map((row, i) => (
		<Table.Tr key={row?.id}>
			<Table.Td>
				{new Date(row?.encounter?.enc_date).toLocaleDateString()}
			</Table.Td>
			<Table.Td>{new Date(row?.date).toLocaleDateString()}</Table.Td>
			<Table.Td>{row?.encounter?.patient?.hosp_no}</Table.Td>
			<Table.Td>{row?.encounter?.patient?.name}</Table.Td>
			<Table.Td>{row?.testType?.name}</Table.Td>
			<Table.Td>{row?.result}</Table.Td>
			<Table.Td>{row?.info}</Table.Td>
			<Table.Td>
				<NumberFormatter prefix='N ' value={row?.rate} thousandSeparator />
			</Table.Td>
		</Table.Tr>
	));

	const getFilter = () => {
		if (criteria == "Result") {
			const found = queryData?.filter((d: any) => d?.testType?.name == test);
			const filtered = found?.filter((f: any) =>
				String(f?.result).toLowerCase().includes(result)
			);
			setSortedData(filtered);
		}
		if (criteria == "Info") {
			const found = queryData?.filter((d: any) => d?.testType?.name == test);
			const filtered = found?.filter((f: any) => f?.info == info);
			setSortedData(filtered);
		}
		if (criteria == "Result and Info") {
			const found = queryData?.filter((d: any) => d?.testType?.name == test);
			const filtered = found?.filter(
				(f: any) =>
					f?.info == info && String(f?.result).toLowerCase().includes(result)
			);
			setSortedData(filtered);
		}
	};
	const getValuesUI = () => {
		if (criteria == "Result") {
			return (
				<TextInput
					label='Result'
					placeholder='test result'
					className='w-[16rem]'
					value={result}
					onChange={(e) => {
						setResult(e.currentTarget.value);
					}}
				/>
			);
		}
		if (criteria == "Info") {
			return (
				<Select
					label='Info'
					placeholder='select a test info'
					data={["High", "Low", "Positive", "Negative"]}
					value={info}
					className='w-[16rem]'
					searchable
					clearable
					onChange={(value) => {
						setInfo(value);
					}}
				/>
			);
		}
		if (criteria == "Result and Info") {
			return (
				<div className='flex gap-3 items-end'>
					<TextInput
						label='Result'
						placeholder='test result'
						className='w-[16rem]'
						value={result}
						onChange={(e) => {
							setResult(e.currentTarget.value);
						}}
					/>
					<Select
						label='Info'
						placeholder='select a test info'
						data={["High", "Low", "Positive", "Negative"]}
						value={info}
						className='w-[16rem]'
						searchable
						clearable
						onChange={(value) => {
							setInfo(value);
						}}
					/>
				</div>
			);
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
					label='Test'
					placeholder='select a test'
					data={tests}
					value={test}
					className='w-[16rem]'
					searchable
					clearable
					onChange={(value) => {
						setTest(value);
					}}
				/>
				{test && (
					<>
						<Select
							label='Criteria'
							placeholder='select a criteria'
							data={["Result", "Info", "Result and Info"]}
							value={criteria}
							className='w-[16rem]'
							searchable
							clearable
							onChange={(value) => {
								setCriteria(value);
							}}
						/>
						{getValuesUI()}
					</>
				)}

				<Button disabled={!test} type='submit'>
					Filter
				</Button>
				<Button
					color='red'
					onClick={() => {
						setSortedData(queryData);
						setTest(null);
						setCriteria(null);
						setInfo(null);
						setResult("");
					}}
				>
					Clear Filter
				</Button>
			</div>
		</form>
	);
	const getReport = () => {
		if (criteria || test) {
			return `Labtests report for ${test} --> ${info}`;
		}
		return "Labtests report for";
	};
	useEffect(() => {
		const getD = async () => {
			const { data } = await fetch("/settings/tests");
			const sorted = data.map((d: { name: string; id: string }) => {
				return d.name;
			});
			setTests(sorted);
		};
		getD();
	}, []);
	useEffect(() => {
		if (test) {
			const found = queryData?.filter((d: any) => d?.testType?.name == test);
			setSortedData(found);
		} else {
			setSortedData(queryData);
		}
	}, [test]);
	useEffect(() => {
		setSortedData(queryData);
		setTest(null);
		setCriteria(null);
		setInfo(null);
		setResult("");
	}, [loaded]);
	const total = sortedData.reduce((prev, curr) => {
		return Number(prev) + Number(curr?.rate);
	}, 0);
	return (
		<main className='space-y-6'>
			<div className='flex justify-between items-end'>
				<DataLoader
					link='/reports/labs'
					post={post}
					setQueryData={setQueryData}
					setLoaded={setLoaded}
				/>

				<Text size='md' fw={600}>
					Labtests report
				</Text>
			</div>

			<ReportsTable
				headers={[
					"ENC Date",
					"Date",
					"Hosp No",
					"Patient",
					"Test",
					"Result",
					"Info",
					"Rate",
				]}
				printHeaders={[
					"ENC Date",
					"Date",
					"Hosp No",
					"Patient",
					"Test",
					"Result",
					"Info",
					"Rate",
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
				tableFoot={
					<Table.Tr className='tableFoot'>
						<Table.Td></Table.Td>
						<Table.Td></Table.Td>
						<Table.Td></Table.Td>
						<Table.Td></Table.Td>
						<Table.Td></Table.Td>
						<Table.Td></Table.Td>
						<Table.Td>Total: </Table.Td>

						<Table.Td>
							<NumberFormatter prefix='NGN ' value={total} thousandSeparator />
						</Table.Td>
					</Table.Tr>
				}
			/>
		</main>
	);
};

export default page;
