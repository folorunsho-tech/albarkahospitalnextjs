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
const Payments = () => {
	const { post, loading } = usePostNormal();
	const { fetch } = useFetch();
	const [queryData, setQueryData] = useState<any[]>([]);
	const [sortedData, setSortedData] = useState<any[]>(queryData);
	const [fees, setFees] = useState<any[]>([]);
	const [value, setValue] = useState<any>("");
	const [criteria, setCriteria] = useState<string | null>("");
	const [loaded, setLoaded] = useState<any>("");
	const rows = sortedData?.map((row, i) => (
		<Table.Tr key={row?.id}>
			<Table.Td>{new Date(row?.createdAt).toLocaleDateString()}</Table.Td>
			<Table.Td>{row?.tnxId}</Table.Td>
			<Table.Td>{row?.transaction?.patient?.hosp_no}</Table.Td>
			<Table.Td>{row?.transaction?.patient?.name}</Table.Td>
			<Table.Td>{row?.name}</Table.Td>
			<Table.Td>
				<NumberFormatter prefix='NGN ' value={row?.paid} thousandSeparator />
			</Table.Td>
			<Table.Td>{row?.method}</Table.Td>
			<Table.Td>{row?.type}</Table.Td>
			<Table.Td>{row?.createdBy?.username}</Table.Td>
		</Table.Tr>
	));
	const printRows = sortedData?.map((row, i) => (
		<Table.Tr key={row?.id}>
			<Table.Td>{new Date(row?.createdAt).toLocaleDateString()}</Table.Td>
			<Table.Td>{row?.tnxId}</Table.Td>
			<Table.Td>{row?.transaction?.patient?.hosp_no}</Table.Td>
			<Table.Td>{row?.transaction?.patient?.name}</Table.Td>
			<Table.Td>{row?.name}</Table.Td>
			<Table.Td>
				<NumberFormatter prefix='NGN ' value={row?.paid} thousandSeparator />
			</Table.Td>
			<Table.Td>{row?.method}</Table.Td>
			<Table.Td>{row?.type}</Table.Td>
			<Table.Td>{row?.createdBy?.username}</Table.Td>
		</Table.Tr>
	));
	const totalPay = sortedData.reduce((prev, curr) => {
		return Number(prev) + Number(curr.paid);
	}, 0);
	const getValuesUI = () => {
		if (criteria == "Cashier") {
			return (
				<TextInput
					label='Ward matron'
					placeholder='name'
					value={value}
					onChange={(e) => {
						setValue(e.currentTarget.value);
					}}
				/>
			);
		}
		if (criteria == "Payment Method") {
			return (
				<Select
					label='Payment Method'
					placeholder='method'
					data={["Cash", "Bank TRF", "POS", "MD Collect"]}
					value={value}
					onChange={(value) => {
						setValue(value);
					}}
				/>
			);
		}
		if (criteria == "Item") {
			return (
				<Select
					label='Tnx Item'
					placeholder='item'
					data={fees}
					value={value}
					onChange={(value) => {
						setValue(value);
					}}
				/>
			);
		}
		if (criteria == "Payment Type") {
			return (
				<Select
					label='Payment Type'
					placeholder='type'
					data={["payment", "reversal", "balance"]}
					value={value}
					onChange={(value) => {
						setValue(value);
					}}
				/>
			);
		}
	};
	const getFilter = () => {
		if (criteria == "Payment Type") {
			const found = queryData?.filter((d: any) => d?.type == value);
			setSortedData(found);
		}
		if (criteria == "Payment Method") {
			const found = queryData?.filter((d: any) => d?.method == value);
			setSortedData(found);
		}
		if (criteria == "Item") {
			const found = queryData?.filter((d: any) => d?.name == value);
			setSortedData(found);
		}
		if (criteria == "Cashier") {
			const found = queryData?.filter((d: any) =>
				String(d?.createdBy?.username).toLowerCase().includes(value)
			);
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
					data={["Payment Type", "Payment Method", "Item", "Cashier"]}
					className='w-[16rem]'
					clearable
					value={criteria}
					onChange={(value) => {
						setCriteria(value);
						setValue(null);
					}}
				/>
				{getValuesUI()}
				<Button
					onClick={() => {
						getFilter();
					}}
					disabled={!value}
					type='submit'
				>
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
			return `Payments report for ${criteria} --> ${value}`;
		}
		return "Payments report for";
	};
	useEffect(() => {
		const getD = async () => {
			const { data } = await fetch("/settings/fees");

			const sorted = data.map((d: { name: string; id: string }) => {
				return d.name;
			});

			setFees(sorted);
		};
		getD();
	}, []);
	useEffect(() => {
		setSortedData(queryData);
		setCriteria(null);
		setValue(null);
	}, [loaded]);
	return (
		<main className='space-y-6'>
			<div className='flex justify-between items-end'>
				<DataLoader
					link='/reports/payments'
					post={post}
					setQueryData={setQueryData}
					setLoaded={setLoaded}
				/>

				<Text size='md' fw={600}>
					Payments report
				</Text>
			</div>

			<ReportsTable
				headers={[
					"Date",
					"Tnx Id",
					"Hosp No",
					"Name",
					"Item",
					"Amount paid",
					"Method",
					"Type",
					"Cashier",
				]}
				printHeaders={[
					"Date",
					"Tnx Id",
					"Hosp No",
					"Name",
					"Item",
					"Amount paid",
					"Method",
					"Type",
					"Cashier",
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
				pdfTitle={getReport()}
				metadata={
					<div className='text-lg font-semibold my-2'>
						<h2>Total Count: {sortedData.length}</h2>
					</div>
				}
				tableFoot={
					<Table.Tr>
						<Table.Td>Total: </Table.Td>
						<Table.Td></Table.Td>
						<Table.Td></Table.Td>
						<Table.Td></Table.Td>
						<Table.Td></Table.Td>
						<Table.Td>
							<NumberFormatter
								prefix='NGN '
								value={totalPay}
								thousandSeparator
							/>
						</Table.Td>
						<Table.Td></Table.Td>
						<Table.Td></Table.Td>
						<Table.Td></Table.Td>
					</Table.Tr>
				}
			/>
		</main>
	);
};

export default Payments;
