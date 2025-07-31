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
const Debtors = () => {
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
			<Table.Td>{new Date(row?.updatedAt).toLocaleDateString()}</Table.Td>
			<Table.Td>{row?.transactionId}</Table.Td>
			<Table.Td>{row?.transaction?.patient?.hosp_no}</Table.Td>
			<Table.Td>{row?.transaction?.patient?.name}</Table.Td>
			<Table.Td>{row?.fee?.name}</Table.Td>
			<Table.Td>
				<NumberFormatter prefix='NGN ' value={row?.price} thousandSeparator />
			</Table.Td>
			<Table.Td>
				<NumberFormatter prefix='NGN ' value={row?.paid} thousandSeparator />
			</Table.Td>
			<Table.Td>
				<NumberFormatter prefix='NGN ' value={row?.balance} thousandSeparator />
			</Table.Td>
		</Table.Tr>
	));
	const printRows = sortedData?.map((row, i) => (
		<Table.Tr key={row?.id}>
			<Table.Td>{new Date(row?.updatedAt).toLocaleDateString()}</Table.Td>
			<Table.Td>{row?.transactionId}</Table.Td>
			<Table.Td>{row?.transaction?.patient?.hosp_no}</Table.Td>
			<Table.Td>{row?.transaction?.patient?.name}</Table.Td>
			<Table.Td>{row?.fee?.name}</Table.Td>
			<Table.Td>
				<NumberFormatter prefix='NGN ' value={row?.price} thousandSeparator />
			</Table.Td>
			<Table.Td>
				<NumberFormatter prefix='NGN ' value={row?.paid} thousandSeparator />
			</Table.Td>
			<Table.Td>
				<NumberFormatter prefix='NGN ' value={row?.balance} thousandSeparator />
			</Table.Td>
		</Table.Tr>
	));
	const totalPrice = sortedData.reduce((prev, curr) => {
		return Number(prev) + Number(curr.price);
	}, 0);
	const totalPay = sortedData.reduce((prev, curr) => {
		return Number(prev) + Number(curr.paid);
	}, 0);
	const totalBalance = sortedData.reduce((prev, curr) => {
		return Number(prev) + Number(curr.balance);
	}, 0);
	const getValuesUI = () => {
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
	};
	const getFilter = () => {
		if (criteria == "Item") {
			const found = queryData?.filter((d: any) => d?.fee?.name == value);
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
					data={["Item"]}
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
			return `Debtors report for ${criteria} --> ${value}`;
		}
		return "Debtors report for";
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
					link='/reports/debtors'
					post={post}
					setQueryData={setQueryData}
					setLoaded={setLoaded}
				/>

				<Text size='md' fw={600}>
					Debtors report
				</Text>
			</div>

			<ReportsTable
				headers={[
					"Date",
					"Tnx Id",
					"Hosp No",
					"Name",
					"Item",
					"Amount",
					"Paid",
					"Balance",
				]}
				printHeaders={[
					"Date",
					"Tnx Id",
					"Hosp No",
					"Name",
					"Item",
					"Amount",
					"Paid",
					"Balance",
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
								value={totalPrice}
								thousandSeparator
							/>
						</Table.Td>
						<Table.Td>
							<NumberFormatter
								prefix='NGN '
								value={totalPay}
								thousandSeparator
							/>
						</Table.Td>
						<Table.Td>
							<NumberFormatter
								prefix='NGN '
								value={totalBalance}
								thousandSeparator
							/>
						</Table.Td>
					</Table.Tr>
				}
			/>
		</main>
	);
};

export default Debtors;
