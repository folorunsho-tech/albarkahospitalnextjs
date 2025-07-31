/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Text, NumberFormatter, Table, Select } from "@mantine/core";
import { usePostNormal, useFetch } from "@/queries";
import { useEffect, useState } from "react";
import DataLoader from "@/components/DataLoader";

import ReportsTable from "@/components/ReportsTable";

const Detailed = () => {
	const { post, loading } = usePostNormal();
	const { fetch } = useFetch();
	const [queryData, setQueryData] = useState<any[]>([]);
	const [drugs, setDrugs] = useState<any[]>([]);
	const [sortedData, setSortedData] = useState<any[]>(queryData);
	const [filter, setFilter] = useState<string | null>("");
	const [loaded, setLoaded] = useState<any>("");

	const rows = sortedData?.map((row, i) => (
		<Table.Tr key={row?.id}>
			<Table.Td>
				{new Date(row?.encounter?.enc_date).toLocaleDateString()}
			</Table.Td>
			<Table.Td>{new Date(row?.date).toLocaleDateString()}</Table.Td>
			<Table.Td>{row?.encounter?.patient?.hosp_no}</Table.Td>
			<Table.Td>{row?.encounter?.patient?.name}</Table.Td>
			<Table.Td>{row?.name}</Table.Td>
			<Table.Td>
				<NumberFormatter value={row?.quantity} thousandSeparator />
			</Table.Td>
			<Table.Td>
				<NumberFormatter value={row?.price} prefix='N ' thousandSeparator />
			</Table.Td>
			<Table.Td>
				<NumberFormatter value={row?.rate} prefix='N ' thousandSeparator />
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
			<Table.Td>{row?.name}</Table.Td>
			<Table.Td>
				<NumberFormatter value={row?.quantity} thousandSeparator />
			</Table.Td>
			<Table.Td>
				<NumberFormatter value={row?.price} prefix='N ' thousandSeparator />
			</Table.Td>
			<Table.Td>
				<NumberFormatter value={row?.rate} prefix='N ' thousandSeparator />
			</Table.Td>
		</Table.Tr>
	));
	const filters = (
		<section className='w-full'>
			<label htmlFor='filters'>Filters</label>
			<div id='filters' className='flex gap-3 items-end flex-wrap'>
				<Select
					label='Drug'
					placeholder='select drug'
					data={drugs}
					value={filter}
					className='w-[16rem]'
					searchable
					clearable
					onChange={(value) => {
						setFilter(value);
					}}
				/>
			</div>
		</section>
	);
	useEffect(() => {
		const getD = async () => {
			const { data } = await fetch("/drugsinventory/report");
			const sorted = data.map((d: { drug: { name: string } }) => {
				return d.drug.name;
			});
			setDrugs(sorted);
		};
		getD();
	}, []);
	useEffect(() => {
		if (filter) {
			const filtered = queryData.filter((d) => {
				return d?.name == filter;
			});
			setSortedData(filtered);
		} else {
			setSortedData(queryData);
		}
	}, [filter]);
	useEffect(() => {
		setSortedData(queryData);
		setFilter(null);
	}, [loaded]);
	const total = sortedData.reduce((prev, curr) => {
		return Number(prev) + Number(curr?.price);
	}, 0);
	const quantity = sortedData.reduce((prev, curr) => {
		return Number(prev) + Number(curr?.quantity);
	}, 0);
	return (
		<main className='space-y-6'>
			<div className='flex justify-between items-end'>
				<DataLoader
					link='/reports/drugs/detailed'
					post={post}
					setQueryData={setQueryData}
					setLoaded={setLoaded}
				/>

				<Text size='md' fw={600}>
					Prescriptions report detailed
				</Text>
			</div>

			<ReportsTable
				headers={[
					"ENC Date",
					"Date",
					"Hosp No",
					"Patient",
					"Drug",
					"Quantity",
					"Price",
					"Rate",
				]}
				printHeaders={[
					"ENC Date",
					"Date",
					"Hosp No",
					"Patient",
					"Drug",
					"Quantity",
					"Price",
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
				tableReport={`Prescriptions report detailed for ${
					filter || "all drugs"
				}`}
				tableFoot={
					<Table.Tr className='tableFoot'>
						<Table.Td></Table.Td>
						<Table.Td></Table.Td>
						<Table.Td></Table.Td>
						<Table.Td></Table.Td>
						<Table.Td>Total: </Table.Td>
						<Table.Td>
							<NumberFormatter value={quantity} thousandSeparator />
						</Table.Td>
						<Table.Td>
							<NumberFormatter prefix='NGN ' value={total} thousandSeparator />
						</Table.Td>
						<Table.Td></Table.Td>
					</Table.Tr>
				}
				metadata={
					<div className='text-lg font-semibold my-2'>
						<h2>Total Count: {sortedData.length}</h2>
					</div>
				}
			/>
		</main>
	);
};

export default Detailed;
