/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import PaginatedTable from "../PaginatedTable";
import { ActionIcon, Button, Menu, rem, Table } from "@mantine/core";
import { format } from "date-fns";
import { CircleEllipsis, Eye, Printer } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { usePostNormal } from "@/queries";
import Link from "next/link";
const Encounters = ({ hosp_no, id }: { hosp_no: string; id: string }) => {
	const { post, loading, data } = usePostNormal();
	const [queryData, setQueryData] = useState<any[]>(data);
	const [printData, setPrintData] = useState<any[]>(queryData);
	const [sortedData, setSortedData] = useState<any[]>([]);
	const contentRef = useRef<HTMLDivElement>(null);
	const reactToPrintFn = useReactToPrint({
		contentRef,
		bodyClass: "print",
		documentTitle: `${hosp_no} - encounters-list`,
	});
	const rows = sortedData?.map((row, i: number) => (
		<Table.Tr key={row?.id}>
			<Table.Td>{i + 1}</Table.Td>

			<Table.Td>{row?.patient?.hosp_no}</Table.Td>
			<Table.Td>{row?.patient?.name}</Table.Td>
			<Table.Td>{row?.care?.name}</Table.Td>
			<Table.Td>{row?._count?.diagnosis}</Table.Td>
			<Table.Td>{row?._count?.drugsGiven}</Table.Td>
			<Table.Td>{format(new Date(row?.enc_date), "dd/MM/yyyy")}</Table.Td>
			<Table.Td>
				<Menu shadow='md' width={200}>
					<Menu.Target>
						<ActionIcon variant='subtle'>
							<CircleEllipsis />
						</ActionIcon>
					</Menu.Target>
					<Menu.Dropdown>
						<Link href={`/ms/encounters/view/?id=${row?.id}`}>
							<Menu.Item
								leftSection={
									<Eye style={{ width: rem(14), height: rem(14) }} />
								}
								color='blue'
							>
								View
							</Menu.Item>
						</Link>
					</Menu.Dropdown>
				</Menu>
			</Table.Td>
		</Table.Tr>
	));
	const printRows = printData?.map((row, i: number) => (
		<Table.Tr key={row?.id}>
			<Table.Td>{i + 1}</Table.Td>

			<Table.Td>{row?.patient?.hosp_no}</Table.Td>
			<Table.Td>{row?.patient?.name}</Table.Td>
			<Table.Td>{row?.care?.name}</Table.Td>
			<Table.Td>{row?._count?.diagnosis}</Table.Td>
			<Table.Td>{row?._count?.drugsGiven}</Table.Td>
			<Table.Td>{format(new Date(row?.enc_date), "dd/MM/yyyy")}</Table.Td>
		</Table.Tr>
	));
	useEffect(() => {
		const getAll = async () => {
			const { data: found } = await post(`/patients/encounters`, { id });
			setQueryData(found);
		};
		getAll();
	}, []);
	return (
		<main className='space-y-4 mt-3'>
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
			<PaginatedTable
				headers={[
					"S/N",

					"Hosp No",
					"Name",
					"Care",
					"Diag Count",
					"Drugs Count",
					"Enc Date",
					"Actions",
				]}
				placeholder='Search by name or hospital no'
				sortedData={sortedData}
				rows={rows}
				showSearch={false}
				showPagination={true}
				data={queryData}
				setSortedData={setSortedData}
				tableLoading={loading}
				depth='patient'
				ref={contentRef}
				printHeaders={[
					"S/N",

					"Hosp No",
					"Name",
					"Care",
					"Diag Count",
					"Drugs Count",
					"Enc Date",
				]}
				printRows={printRows}
				tableReport={`Patient - ${hosp_no} encounters record`}
				setPrintData={setPrintData}
			/>
		</main>
	);
};

export default Encounters;
