/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
	Table,
	Select,
	Button,
	TextInput,
	NumberFormatter,
} from "@mantine/core";
import { useFetch } from "@/queries";
import { useEffect, useState } from "react";

import ReportsTable from "@/components/ReportsTable";
import { format } from "date-fns";
export default function StatementsT({
	queryData,
	loading,
	patient,
}: {
	queryData: any[];
	loading: boolean;
	patient?: { hosp_no: string; name: string } | null;
}) {
	const { fetch } = useFetch();
	const [sortedData, setSortedData] = useState<any[]>(queryData);
	const [fees, setFees] = useState<any[]>([]);
	const [value, setValue] = useState<any>("");
	const [criteria, setCriteria] = useState<string | null>("");
	const rows = sortedData?.map((row, i) => (
		<Table.Tr key={row?.id}>
			<Table.Td>{format(new Date(row?.createdAt), "dd/MM/yyyy, p")}</Table.Td>
			<Table.Td>{row?.tnxId}</Table.Td>
			<Table.Td>{row?.transaction?.patient?.hosp_no}</Table.Td>
			<Table.Td>{row?.transaction?.patient?.name}</Table.Td>
			<Table.Td>{row?.name}</Table.Td>
			<Table.Td>
				<NumberFormatter value={row?.paid} thousandSeparator />
			</Table.Td>
			<Table.Td>{row?.method}</Table.Td>
			<Table.Td>{row?.type}</Table.Td>
			<Table.Td>{row?.createdBy?.username}</Table.Td>
		</Table.Tr>
	));
	const printRows = sortedData?.map((row, i) => (
		<Table.Tr key={row?.id} className='text-[10px]'>
			<Table.Td>{format(new Date(row?.createdAt), "dd/MM/yyyy, p")}</Table.Td>
			<Table.Td>{row?.tnxId}</Table.Td>
			<Table.Td>{row?.transaction?.patient?.hosp_no}</Table.Td>
			<Table.Td>{row?.transaction?.patient?.name}</Table.Td>
			<Table.Td>{row?.name}</Table.Td>
			<Table.Td>
				<NumberFormatter value={row?.paid} thousandSeparator />
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
					label='Cashier'
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
			return `Payments report for ${patient?.hosp_no} - ${patient?.name} filtered by ${criteria} : ${value}`;
		}
		return "Payments report for" + ` ${patient?.hosp_no} - ${patient?.name}`;
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
	return (
		<ReportsTable
			headers={[
				"Date",
				"Tnx Id",
				"Hosp No",
				"Name",
				"Item",
				"Paid(N)",
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
				"Paid(N)",
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
			tableReport={getReport()}
			pdfTitle={getReport()}
			metadata={
				<div className='text-sm font-semibold my-2'>
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
						<NumberFormatter value={totalPay} thousandSeparator />
					</Table.Td>
					<Table.Td></Table.Td>
					<Table.Td></Table.Td>
					<Table.Td></Table.Td>
				</Table.Tr>
			}
		/>
	);
}
