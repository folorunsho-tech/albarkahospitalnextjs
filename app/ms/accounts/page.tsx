/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import PaginatedTable from "@/components/PaginatedTable";
import { Button, Table } from "@mantine/core";
import { useFetch } from "@/queries";
import Link from "next/link";
import { format } from "date-fns";

const Accounts = () => {
	const { loading, fetch, data } = useFetch();
	const [queryData, setQueryData] = useState<any[]>(data);
	const [sortedData, setSortedData] = useState<any[]>([]);

	const rows = sortedData?.map((row, i: number) => (
		<Table.Tr key={row?.id}>
			<Table.Td>{i + 1}</Table.Td>
			<Table.Td>{row?.username}</Table.Td>
			<Table.Td>{row?.role}</Table.Td>
			<Table.Td
				className={
					row?.active
						? "bg-green-500 text-white font-semibold"
						: "bg-red-400 text-white font-semibold"
				}
			>
				{row?.active ? "Active" : "Inactive"}
			</Table.Td>
			<Table.Td>{format(row?.createdAt, "dd/MM/yyyy, p")}</Table.Td>
			<Table.Td>{format(row?.updatedAt, "dd/MM/yyyy, p")}</Table.Td>
		</Table.Tr>
	));
	useEffect(() => {
		async function getAll() {
			const { data } = await fetch("/accounts");
			setQueryData(data);
		}
		getAll();
	}, []);

	return (
		<main className='space-y-6 py-4'>
			<div className='flex items-center justify-between'>
				<h2 className='text-xl font-bold'>Accounts</h2>
				<div className='flex items-center gap-3'>
					<Button component={Link} href='accounts/create' color='teal'>
						Add new account
					</Button>
					<Button component={Link} href='accounts/edit'>
						Update an account
					</Button>
				</div>
			</div>

			<PaginatedTable
				headers={[
					"S/N",
					"Username",
					"Role",
					"Status",
					"Createad At",
					"Last Updated At",
				]}
				placeholder=''
				sortedData={sortedData}
				rows={rows}
				showSearch={false}
				showPagination={true}
				data={queryData}
				setSortedData={setSortedData}
				tableLoading={loading}
			/>
		</main>
	);
};

export default Accounts;
