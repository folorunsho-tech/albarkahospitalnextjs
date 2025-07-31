/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import PaginatedTable from "../PaginatedTable";
import { ActionIcon, NumberFormatter, rem, Table } from "@mantine/core";
import { format } from "date-fns";
import { Eye } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useFetch } from "@/queries";
import Link from "next/link";

const Transactions = ({ hosp_no, id }: { hosp_no: string; id: string }) => {
	const { fetch, loading, data } = useFetch();
	const [queryData, setQueryData] = useState<any[]>(data);
	const [sortedData, setSortedData] = useState<any[]>([]);
	const contentRef = useRef<HTMLDivElement>(null);
	const reactToPrintFn = useReactToPrint({
		contentRef,
		bodyClass: "print",
		documentTitle: `${hosp_no} - transactions-list`,
	});
	const getStatus = (status: string | any) => {
		if (status == "Fully Paid") {
			return "bg-green-500 text-white";
		} else if (status == "Partly Paid") {
			return "bg-orange-500 text-white";
		} else if (status == "Partly Reversed") {
			return "bg-pink-500 text-white";
		} else if (status == "Fully Reversed") {
			return "bg-red-500 text-white";
		}
	};
	const rows = sortedData?.map((row, i: number) => (
		<Table.Tr key={row?.id}>
			<Table.Td>{i + 1}</Table.Td>
			<Table.Td>{row?.id}</Table.Td>
			<Table.Td>{format(new Date(row?.createdAt), "Pp")}</Table.Td>
			<Table.Td>{row?.patient?.hosp_no}</Table.Td>
			<Table.Td>{row?.patient?.name}</Table.Td>
			<Table.Td>
				<NumberFormatter value={row?.total} prefix='NGN ' thousandSeparator />
			</Table.Td>
			<Table.Td>
				<NumberFormatter
					value={
						row?.status == "Fully Reversed"
							? -(Number(row?.total) - Number(row?.balance))
							: Number(row?.total) - Number(row?.balance)
					}
					prefix='NGN '
					thousandSeparator
				/>
			</Table.Td>
			<Table.Td>
				<NumberFormatter value={row?.balance} prefix='NGN ' thousandSeparator />
			</Table.Td>
			<Table.Td>{row?._count?.items}</Table.Td>
			<Table.Td className={getStatus(row?.status)}>{row?.status}</Table.Td>
			<Table.Td>
				<ActionIcon component={Link} href={`/ms/transactions/${row?.id}`}>
					<Eye style={{ width: rem(14), height: rem(14) }} />
				</ActionIcon>
			</Table.Td>
		</Table.Tr>
	));
	useEffect(() => {
		const getAll = async () => {
			const { data: found } = await fetch(`/patients/transactions/${id}`);
			setQueryData(found);
		};
		getAll();
	}, []);
	return (
		<main className='space-y-4 mt-3'>
			{/* <div className='flex gap-3 items-end'>
				<Button
					leftSection={<Printer />}
					onClick={() => {
						reactToPrintFn();
					}}
				>
					Print
				</Button>
			</div> */}
			<PaginatedTable
				headers={[
					"S/N",
					"Tnx Id",
					"Date",
					"Hosp No",
					"Name",
					"Total",
					"Paid",
					"Balance",
					"Items",
					"Status",
					"Action",
				]}
				placeholder='Search by transaction Id'
				sortedData={sortedData}
				rows={rows}
				showSearch={true}
				showPagination={true}
				data={queryData}
				setSortedData={setSortedData}
				tableLoading={loading}
				depth=''
				// ref={contentRef}
			/>
		</main>
	);
};

export default Transactions;
