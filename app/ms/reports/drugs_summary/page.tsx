/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
	Text,
	NumberFormatter,
	Table,
	ScrollArea,
	LoadingOverlay,
	Box,
	Button,
} from "@mantine/core";
import { usePostNormal } from "@/queries";
import { useRef, useState } from "react";
import Image from "next/image";
import { useReactToPrint } from "react-to-print";
import { format } from "date-fns";
import { Printer } from "lucide-react";
import DataLoader from "@/components/DataLoader";
const page = () => {
	const { post, loading } = usePostNormal();

	const [queryData, setQueryData] = useState([] as any[]);
	const [loaded, setLoaded] = useState("");
	const contentRef = useRef<HTMLDivElement>(null);
	const reactToPrintFn = useReactToPrint({
		contentRef,
		bodyClass: "print",
		documentTitle: `Drugs Tally Sheet for ${loaded}`,
	});

	const rows = queryData?.map((row, i) => (
		<Table.Tr key={row?.name + i}>
			<Table.Td>{i + 1}</Table.Td>
			<Table.Td>{row?.name}</Table.Td>
			<Table.Td>
				<NumberFormatter value={row?.stockStart || 0} thousandSeparator />
			</Table.Td>
			<Table.Td>
				<NumberFormatter value={row?.totalSGain || 0} thousandSeparator />
			</Table.Td>

			<Table.Td>
				<NumberFormatter value={row?.prescriptions || 0} thousandSeparator />
			</Table.Td>
			<Table.Td>
				<NumberFormatter value={row?.totalSLoss || 0} thousandSeparator />
			</Table.Td>
			<Table.Td>
				<NumberFormatter
					value={
						row?.totalSGain +
						row?.stockStart +
						(row?.totalSLoss - row?.prescriptions)
					}
					thousandSeparator
				/>
			</Table.Td>
			<Table.Td>
				<NumberFormatter value={row?.encounters} thousandSeparator />
			</Table.Td>
			<Table.Td></Table.Td>
		</Table.Tr>
	));
	const printRows = queryData?.map((row, i) => (
		<Table.Tr key={row?.name + i}>
			<Table.Td>{i + 1}</Table.Td>
			<Table.Td>{row?.name}</Table.Td>
			<Table.Td>
				<NumberFormatter value={row?.stockStart || 0} thousandSeparator />
			</Table.Td>
			<Table.Td>
				<NumberFormatter value={row?.totalSGain || 0} thousandSeparator />
			</Table.Td>
			<Table.Td>
				<NumberFormatter value={row?.prescriptions || 0} thousandSeparator />
			</Table.Td>
			<Table.Td>
				<NumberFormatter value={row?.totalSLoss || 0} thousandSeparator />
			</Table.Td>
			<Table.Td>
				<NumberFormatter
					value={
						row?.totalSGain +
						row?.stockStart +
						(row?.totalSLoss - row?.prescriptions)
					}
					thousandSeparator
				/>
			</Table.Td>
			<Table.Td>
				<NumberFormatter value={row?.encounters} thousandSeparator />
			</Table.Td>
			<Table.Td w={100}></Table.Td>
		</Table.Tr>
	));
	return (
		<main className='space-y-6'>
			<div className='flex justify-between items-end'>
				<DataLoader
					link='/reports/drugsummary'
					setQueryData={setQueryData}
					post={post}
					setLoaded={setLoaded}
				/>
			</div>

			<Box pos='relative'>
				<section style={{ display: "none" }}>
					<div ref={contentRef} className='printable text-[12px]'>
						<div className='flex items-start gap-4 mb-2'>
							<Image
								src='/hospital.svg'
								height={60}
								width={60}
								alt='Albarka logo'
								loading='eager'
							/>
							<div className='space-y-1 w-full'>
								<div className='flex items-center w-full justify-between'>
									<h2 className='text-xl font-extrabold font-serif '>
										ALBARKA HOSPITAL
									</h2>
									<p>{format(new Date(), "PPPpp")}</p>
								</div>
								<h3 className=''>Tel: 08056713362, 08080854480</h3>
								<p className='italic'>E-mail: hospitalalbarka@gmail.com</p>
								<p className='italic'>
									<b>Address:</b> Malale road, Off Rofia road, Wawa, New Bussa
									Niger state Nigeria.
								</p>
								<p className='font-extrabold bg-black text-white p-1 px-2 text-center uppercase'>
									Drugs Tally Sheet for {loaded}
								</p>
							</div>
						</div>

						<Table fz={12} verticalSpacing={2}>
							<Table.Thead>
								<Table.Tr>
									{[
										"S/N",
										"Drug",
										"Start stock",
										"Input",
										"Prescriptions",
										"Loss",
										"Avl Bal.",
										"Patients",
										"",
									].map((head: string, index: number) => (
										<Table.Th key={head + index + 1}>{head}</Table.Th>
									))}
								</Table.Tr>
							</Table.Thead>
							<Table.Tbody>{printRows}</Table.Tbody>
						</Table>
					</div>
				</section>
				<section className='flex flex-col gap-2'>
					<div className='flex gap-3 items-end justify-between'>
						<Button
							onClick={() => {
								reactToPrintFn();
							}}
						>
							<Printer />
						</Button>
						<p className='font-semibold text-lg '>
							Drugs Tally Sheet for {loaded}
						</p>
					</div>

					<ScrollArea h={700}>
						<Table
							miw={700}
							striped
							highlightOnHover
							withTableBorder
							withColumnBorders
							verticalSpacing={2}
							layout='fixed'
							fz={12}
						>
							<Table.Thead>
								<Table.Tr>
									{[
										"S/N",
										"Drug",
										"Start stock",
										"Input",
										"Prescriptions",
										"Loss",
										"Avl Bal.",
										"Patients",
										"",
									].map((head: string, index: number) => (
										<Table.Th key={head + index}>{head}</Table.Th>
									))}
								</Table.Tr>
							</Table.Thead>
							<Table.Tbody>
								{!queryData ? (
									<Table.Tr>
										<Table.Td>
											<Text fw={500} ta='center'>
												Nothing found
											</Text>
										</Table.Td>
									</Table.Tr>
								) : (
									rows
								)}
							</Table.Tbody>
						</Table>
					</ScrollArea>

					<LoadingOverlay visible={loading} />
				</section>
			</Box>
		</main>
	);
};

export default page;
