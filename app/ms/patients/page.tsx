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
import GlobalPatientSearch from "@/components/GlobalPatientSearch";
import Link from "next/link";
const Patients = () => {
	const { post, loading } = usePostNormal();
	const [queryData, setQueryData] = useState<any[]>([]);
	const [sortedData, setSortedData] = useState<any[]>([]);
	const [printData, setPrintData] = useState<any[]>(queryData);
	const contentRef = useRef<HTMLDivElement>(null);
	const reactToPrintFn = useReactToPrint({
		contentRef,
		bodyClass: "print",
		documentTitle: "patients-list",
	});
	const rows = sortedData?.map((row, i: number) => (
		<Table.Tr key={row?.id + i}>
			<Table.Td>{i + 1}</Table.Td>
			<Table.Td>{row?.name}</Table.Td>
			<Table.Td>{row?.hosp_no}</Table.Td>
			<Table.Td>{row?.groups?.name}</Table.Td>
			<Table.Td>{row?.sex}</Table.Td>
			<Table.Td>{row?.age}</Table.Td>
			<Table.Td>{row?.town?.name}</Table.Td>
			<Table.Td>{row?.phone_no}</Table.Td>
			<Table.Td>{row?.religion}</Table.Td>
			<Table.Td>{format(new Date(row?.reg_date), "dd/MM/yyyy")}</Table.Td>
			<Table.Td>
				<Menu shadow='md' width={200}>
					<Menu.Target>
						<ActionIcon variant='subtle'>
							<CircleEllipsis />
						</ActionIcon>
					</Menu.Target>
					<Menu.Dropdown>
						<Link href={`patients/view/?id=${row?.id}`}>
							<Menu.Item
								leftSection={
									<Eye style={{ width: rem(14), height: rem(14) }} />
								}
								color='blue'
							>
								View
							</Menu.Item>
						</Link>
						<Link href={`patients/edit/?id=${row?.id}`}>
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
			<Table.Td>{row?.name}</Table.Td>
			<Table.Td>{row?.hosp_no}</Table.Td>
			<Table.Td>{row?.groups?.name}</Table.Td>
			<Table.Td>{row?.sex}</Table.Td>
			<Table.Td>{row?.age}</Table.Td>
			<Table.Td>{row?.town?.name}</Table.Td>
			<Table.Td>{row?.phone_no}</Table.Td>
			<Table.Td>{row?.religion}</Table.Td>
			<Table.Td>{format(new Date(row?.reg_date), "dd/MM/yyyy")}</Table.Td>
		</Table.Tr>
	));

	return (
		<main className='space-y-6'>
			<GlobalPatientSearch />
			<div className='flex items-end justify-between w-full'>
				<DataLoader post={post} setQueryData={setQueryData} link='/patients' />
				<div className='flex gap-3 items-end'>
					<Button
						leftSection={<Printer />}
						onClick={() => {
							reactToPrintFn();
						}}
					>
						Print
					</Button>
					<Button component={Link} href='patients/create'>
						Add new patient
					</Button>
				</div>
			</div>
			<PaginatedTable
				headers={[
					"S/N",
					"Name",
					"Hosp No",
					"Group",
					"Sex",
					"Age",
					"Address",
					"Phone No",
					"Religion",
					"Reg date",
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
				depth=''
				ref={contentRef}
				printHeaders={[
					"S/N",
					"Name",
					"Hosp No",
					"Group",
					"Sex",
					"Age",
					"Address",
					"Phone No",
					"Religion",
					"Reg date",
				]}
				printRows={printRows}
				tableReport='Patients Registration record'
				setPrintData={setPrintData}
			/>
		</main>
	);
};

export default Patients;
