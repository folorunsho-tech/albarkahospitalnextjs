/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button, NumberFormatter, Table, Text } from "@mantine/core";
import { ArrowLeft, Printer } from "lucide-react";
import DataLoader from "@/components/DataLoader";
import { format } from "date-fns";
import PaginatedTable from "@/components/PaginatedTable";
import { useRef, useState } from "react";
import { usePostNormal } from "@/queries";
import { useReactToPrint } from "react-to-print";
import Link from "next/link";
const Drughistory = () => {
	const [queryData, setQueryData] = useState<any[]>([]);
	const [sortedData, setSortedData] = useState<any[]>([]);
	const [printData, setPrintData] = useState<any[]>(queryData);
	const { post, loading } = usePostNormal();
	const contentRef = useRef<HTMLDivElement>(null);
	const reactToPrintFn = useReactToPrint({
		contentRef,
		bodyClass: "print",
		documentTitle: "drugs-stock-history",
	});
	const rows = sortedData?.map((row, i: number) => (
		<Table.Tr key={row?.id + String(i)}>
			<Table.Td>{i + 1}</Table.Td>
			<Table.Td>{row?.name}</Table.Td>

			<Table.Td>
				<NumberFormatter value={row?.stock_qty} thousandSeparator />
			</Table.Td>
			<Table.Td>{row?.type}</Table.Td>
			<Table.Td>
				<NumberFormatter value={row?.added} thousandSeparator />
			</Table.Td>

			<Table.Td>{format(new Date(row?.updatedAt), "dd/MM/yyyy, p")}</Table.Td>
		</Table.Tr>
	));
	const printRows = printData?.map((row, i: number) => (
		<Table.Tr key={row?.id + String(i)}>
			<Table.Td>{i + 1}</Table.Td>
			<Table.Td>{row?.name}</Table.Td>

			<Table.Td>
				<NumberFormatter value={row?.stock_qty} thousandSeparator />
			</Table.Td>
			<Table.Td>{row?.type}</Table.Td>
			<Table.Td>
				<NumberFormatter value={row?.added} thousandSeparator />
			</Table.Td>

			<Table.Td>{format(new Date(row?.updatedAt), "dd/MM/yyyy, p")}</Table.Td>
		</Table.Tr>
	));
	return (
		<main className='space-y-4'>
			<div className='flex justify-between items-center'>
				<Link
					className='bg-blue-500 hover:bg-blue-600 p-1 px-2 rounded-md text-white flex gap-3'
					href='/ms/drugs'
				>
					<ArrowLeft />
					Go back
				</Link>
				<Text size='xl'>Stock updates record</Text>
			</div>
			<div className='flex items-end justify-between w-full'>
				<DataLoader
					post={post}
					setQueryData={setQueryData}
					link='/drugsinventory/stocks'
				/>
				<div className='flex gap-3 items-end'>
					<Button
						leftSection={<Printer />}
						onClick={() => {
							reactToPrintFn();
						}}
					>
						Print
					</Button>
				</div>
			</div>

			<PaginatedTable
				headers={[
					"S/N",
					"Name",
					"Stock Quantity",
					"Type",
					"Amount added",
					"Date",
				]}
				sortedData={sortedData}
				rows={rows}
				showSearch={true}
				showPagination={true}
				data={queryData}
				setSortedData={setSortedData}
				tableLoading={loading}
				ref={contentRef}
				printHeaders={[
					"S/N",
					"Name",
					"Quantity",
					"Type",
					"Amount added",
					"Date",
				]}
				printRows={printRows}
				tableReport='Drugs Stock record'
				placeholder='Search by drug name'
				setPrintData={setPrintData}
			/>
		</main>
	);
};

export default Drughistory;
