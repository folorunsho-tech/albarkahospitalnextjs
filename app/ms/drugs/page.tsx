/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState, useContext } from "react";
import PaginatedTable from "@/components/PaginatedTable";
import { Button, Table, Group, NumberFormatter } from "@mantine/core";
import { Printer } from "lucide-react";
import { useFetch } from "@/queries";
import { useReactToPrint } from "react-to-print";
import { format } from "date-fns";
import Link from "next/link";
import AddInventory from "@/components/AddInventory";
import { userContext } from "@/context/User";

const DrugsInventory = () => {
	const { user } = useContext(userContext);
	const { loading, fetch, data } = useFetch();
	const [queryData, setQueryData] = useState<any[]>(data);
	const [printData, setPrintData] = useState<any[]>(queryData);
	const [sortedData, setSortedData] = useState<any[]>([]);

	const rows = sortedData?.map((row, i: number) => (
		<Table.Tr key={row?.id}>
			<Table.Td>{i + 1}</Table.Td>
			<Table.Td>{row?.drug?.name}</Table.Td>
			<Table.Td>
				<NumberFormatter value={row?.stock_qty} thousandSeparator />
			</Table.Td>
			<Table.Td>
				<NumberFormatter value={row?.added} thousandSeparator />
			</Table.Td>
			<Table.Td>{format(new Date(row?.updatedAt), "dd/MM/yyyy, p")}</Table.Td>
		</Table.Tr>
	));
	const printRows = printData?.map((row, i: number) => (
		<Table.Tr key={row?.id}>
			<Table.Td>{i + 1}</Table.Td>
			<Table.Td>{row?.drug?.name}</Table.Td>
			<Table.Td>
				<NumberFormatter value={row?.stock_qty} thousandSeparator />
			</Table.Td>
			<Table.Td>
				<NumberFormatter value={row?.added} thousandSeparator />
			</Table.Td>
			<Table.Td>{format(new Date(row?.updatedAt), "dd/MM/yyyy, p")}</Table.Td>
		</Table.Tr>
	));
	const contentRef = useRef<HTMLDivElement>(null);
	const reactToPrintFn = useReactToPrint({
		contentRef,
		bodyClass: "print",
		documentTitle: "drugs-inventory",
	});
	async function getAll() {
		const { data } = await fetch("/drugsinventory");
		setQueryData(data);
	}
	useEffect(() => {
		getAll();
	}, []);
	return (
		<main className='space-y-6 py-4'>
			<section className='flex items-end justify-between'>
				<h2 className='text-xl font-bold'>Drugs Inventory</h2>
				<Group>
					<Button
						leftSection={<Printer />}
						onClick={() => {
							reactToPrintFn();
						}}
					>
						Print
					</Button>
					<Link
						className='bg-blue-500 hover:bg-blue-600 text-white p-2 text-sm rounded-sm transition duration-300'
						href='drugs/history'
					>
						Stock Update History
					</Link>
					<Link
						className='bg-blue-500 hover:bg-blue-600 text-white p-2 text-sm rounded-sm transition duration-300'
						href='drugs/purchase'
					>
						Drug Purchase Record
					</Link>
				</Group>
			</section>
			<section className='flex items-end gap-6 w-full'>
				<Button href='drugs/stock' color='teal' component={Link}>
					Add to stock
				</Button>
				<Button href='drugs/loss' color='red' component={Link}>
					Add loss
				</Button>
				{user?.role == "admin" && <AddInventory />}
			</section>
			<PaginatedTable
				headers={[
					"S/N",
					"Name",
					"Current Stock Quantity",
					"Last added amount",
					"Last Updated on",
				]}
				printRows={printRows}
				printHeaders={[
					"S/N",
					"Name",
					"Current Stock Quantity",
					"Last added amount",
					"Last Updated on",
				]}
				placeholder='Search by drug name'
				sortedData={sortedData}
				rows={rows}
				showSearch={true}
				showPagination={true}
				data={queryData}
				setSortedData={setSortedData}
				tableLoading={loading}
				depth='drug'
				tableReport='Drugs Inventory record'
				ref={contentRef}
				setPrintData={setPrintData}
			/>
		</main>
	);
};

export default DrugsInventory;
