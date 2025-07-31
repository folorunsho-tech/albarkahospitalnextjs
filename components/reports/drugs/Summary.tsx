/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Text, NumberFormatter, Table } from "@mantine/core";
import { usePostNormal } from "@/queries";
import { useState } from "react";
import DataLoader from "@/components/DataLoader";

import ReportsTable from "@/components/ReportsTable";
const Summary = () => {
	const { post, loading } = usePostNormal();
	const [queryData, setQueryData] = useState<any[]>([]);
	const [sortedData, setSortedData] = useState<any[]>(queryData);
	const [loaded, setLoaded] = useState<any>("");

	const rows = sortedData?.map((row, i) => (
		<Table.Tr key={row?.name + i}>
			<Table.Td>{i + 1}</Table.Td>
			<Table.Td>{row?.name}</Table.Td>
			<Table.Td>
				<NumberFormatter value={row?._sum?.quantity} thousandSeparator />
			</Table.Td>
			<Table.Td>
				<NumberFormatter
					prefix='N '
					value={row?._sum?.price}
					thousandSeparator
				/>
			</Table.Td>
		</Table.Tr>
	));
	const printRows = sortedData?.map((row, i) => (
		<Table.Tr key={row?.name + i}>
			<Table.Td>{i + 1}</Table.Td>
			<Table.Td>{row?.name}</Table.Td>
			<Table.Td>
				<NumberFormatter value={row?._sum?.quantity} thousandSeparator />
			</Table.Td>
			<Table.Td>
				<NumberFormatter
					prefix='N '
					value={row?._sum?.price}
					thousandSeparator
				/>
			</Table.Td>
		</Table.Tr>
	));

	return (
		<main className='space-y-6'>
			<div className='flex justify-between items-end'>
				<DataLoader
					link='/reports/drugs/summary'
					post={post}
					setQueryData={setQueryData}
					setLoaded={setLoaded}
				/>

				<Text size='md' fw={600}>
					Prescriptions report summary
				</Text>
			</div>

			<ReportsTable
				headers={["S/N", "Drug", "Total prescription", "Total price"]}
				printHeaders={["S/N", "Drug", "Total prescription", "Total price"]}
				sortedData={sortedData}
				setSortedData={setSortedData}
				data={queryData}
				tableLoading={loading}
				rows={rows}
				printRows={printRows}
				tableReport='Prescriptions report summary'
				loaded={loaded}
			/>
		</main>
	);
};

export default Summary;
