/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useState } from "react";
import PaginatedTable from "@/components/PaginatedTable";
import { CircleEllipsis, Eye, Pencil, Printer } from "lucide-react";
import { usePostNormal } from "@/queries";
import DataLoader from "@/components/DataLoader";
import { useReactToPrint } from "react-to-print";
import { format } from "date-fns";
import { ActionIcon, rem, Table, Menu, Button } from "@mantine/core";
import Link from "next/link";
const Encounter = () => {
	const { post, loading } = usePostNormal();
	const [queryData, setQueryData] = useState<any[]>([]);
	const [sortedData, setSortedData] = useState<any[]>([]);
	const [printData, setPrintData] = useState<any[]>(queryData);
	const contentRef = useRef<HTMLDivElement>(null);
	const reactToPrintFn = useReactToPrint({
		contentRef,
		bodyClass: "print",
		documentTitle: "encounters-list",
	});
	const rows = sortedData?.map((row, i: number) => (
		<Table.Tr key={row?.id + i}>
			<Table.Td>{i + 1}</Table.Td>
			<Table.Td>{row?.patient?.hosp_no}</Table.Td>
			<Table.Td>{row?.patient?.name}</Table.Td>
			<Table.Td>{row?.care?.name}</Table.Td>
			<Table.Td>{row?._count?.diagnosis}</Table.Td>
			<Table.Td>{row?._count?.drugsGiven}</Table.Td>
			<Table.Td>{row?._count?.labTest}</Table.Td>
			<Table.Td>{format(new Date(row?.enc_date), "dd/MM/yyyy")}</Table.Td>
			<Table.Td>{format(new Date(row?.updatedAt), "dd/MM/yyyy, p")}</Table.Td>
			<Table.Td>
				<Menu shadow='md' width={200}>
					<Menu.Target>
						<ActionIcon variant='subtle'>
							<CircleEllipsis />
						</ActionIcon>
					</Menu.Target>
					<Menu.Dropdown>
						<Link href={`encounters/view/?id=${row?.id}`}>
							<Menu.Item
								leftSection={
									<Eye style={{ width: rem(14), height: rem(14) }} />
								}
								color='blue'
							>
								View
							</Menu.Item>
						</Link>
						<Link href={`encounters/edit/?id=${row?.id}`}>
							<Menu.Item
								color='teal'
								leftSection={
									<Pencil style={{ width: rem(14), height: rem(14) }} />
								}
							>
								Edit
							</Menu.Item>
						</Link>
					</Menu.Dropdown>
				</Menu>
			</Table.Td>
		</Table.Tr>
	));
	const printRows = printData?.map((row, i: number) => (
		<Table.Tr key={row?.id + i}>
			<Table.Td>{i + 1}</Table.Td>
			<Table.Td>{row?.patient?.hosp_no}</Table.Td>
			<Table.Td>{row?.patient?.name}</Table.Td>
			<Table.Td>{row?.care?.name}</Table.Td>
			<Table.Td>{row?._count?.diagnosis}</Table.Td>
			<Table.Td>{row?._count?.drugsGiven}</Table.Td>
			<Table.Td>{row?._count?.labTest}</Table.Td>
			<Table.Td>{format(new Date(row?.enc_date), "dd/MM/yyyy")}</Table.Td>
		</Table.Tr>
	));

	return (
		<main className='space-y-6'>
			<div className='flex items-end justify-between w-full'>
				<DataLoader
					post={post}
					setQueryData={setQueryData}
					link='/encounters'
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
					<Button component={Link} href='encounters/create'>
						Add a new encounter
					</Button>
				</div>
			</div>
			<PaginatedTable
				headers={[
					"S/N",
					"Hosp No",
					"Name",
					"Care",
					"Diag Count",
					"Drugs Count",
					"Tests Count",
					"Enc Date",
					"Last UpdatedAt",
					"Actions",
				]}
				placeholder='Search by name or hospital no'
				sortedData={sortedData}
				rows={rows}
				showSearch={true}
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
					"Tests Count",
					"Enc Date",
				]}
				printRows={printRows}
				tableReport='Patients encounter record'
				setPrintData={setPrintData}
			/>
		</main>
	);
};

export default Encounter;
