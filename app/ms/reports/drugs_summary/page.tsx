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
	Select,
} from "@mantine/core";
import { useFetch } from "@/queries";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReactToPrint } from "react-to-print";
import { format } from "date-fns";
import { Printer } from "lucide-react";
import { curMonth, curYear, months, nyears } from "@/lib/ynm";
const page = () => {
	const { fetch, loading } = useFetch();
	const [queryData, setQueryData] = useState<{
		id: string;
		type: string;
		data: {
			name: string;
			curr_stock: number;
			prescriptions: number;
			totalPurchaseQty: number;
			totalSGain: number;
			totalSLoss: number;
		}[];
		createdAt: Date | string;
		updatedAt: Date | string;
	} | null>(null);
	const [month, setMonth] = useState<string | null>(curMonth);
	const [year, setYear] = useState<string | null>(curYear);
	const contentRef = useRef<HTMLDivElement>(null);
	const reactToPrintFn = useReactToPrint({
		contentRef,
		bodyClass: "print",
		documentTitle: `Monthly Drugs Report for ${month} - ${year}`,
	});

	const rows = queryData?.data?.map((row, i) => (
		<Table.Tr key={row?.name + i}>
			<Table.Td>{i + 1}</Table.Td>
			<Table.Td>{row?.name}</Table.Td>
			<Table.Td>
				<NumberFormatter value={row?.totalPurchaseQty} thousandSeparator />
			</Table.Td>
			<Table.Td>
				<NumberFormatter value={row?.curr_stock} thousandSeparator />
			</Table.Td>
			<Table.Td>
				<NumberFormatter value={row?.prescriptions} thousandSeparator />
			</Table.Td>
			<Table.Td>
				<NumberFormatter value={row?.totalSGain} thousandSeparator />
			</Table.Td>
			<Table.Td>
				<NumberFormatter value={row?.totalSLoss} thousandSeparator />
			</Table.Td>
			<Table.Td>
				<NumberFormatter
					value={row?.totalSGain + row?.totalSLoss - row?.prescriptions}
					thousandSeparator
				/>
			</Table.Td>
		</Table.Tr>
	));
	const printRows = queryData?.data?.map((row, i) => (
		<Table.Tr key={row?.name + i}>
			<Table.Td>{i + 1}</Table.Td>
			<Table.Td>{row?.name}</Table.Td>
			<Table.Td>
				<NumberFormatter value={row?.totalPurchaseQty} thousandSeparator />
			</Table.Td>
			<Table.Td>
				<NumberFormatter value={row?.curr_stock} thousandSeparator />
			</Table.Td>
			<Table.Td>
				<NumberFormatter value={row?.prescriptions} thousandSeparator />
			</Table.Td>
			<Table.Td>
				<NumberFormatter value={row?.totalSGain} thousandSeparator />
			</Table.Td>
			<Table.Td>
				<NumberFormatter value={row?.totalSLoss} thousandSeparator />
			</Table.Td>
			<Table.Td>
				<NumberFormatter
					value={row?.totalSGain + row?.totalSLoss - row?.prescriptions}
					thousandSeparator
				/>
			</Table.Td>
		</Table.Tr>
	));

	useEffect(() => {
		const fetchData = async () => {
			const { data } = await fetch(`/snapshot/drugs/${year}n${month}`);
			setQueryData(data);
		};
		fetchData();
	}, [month]);
	return (
		<main className='space-y-6'>
			<div className='flex justify-between items-end'>
				<div className='flex gap-3 items-center'>
					<Select
						label='Year'
						placeholder='Select a year'
						value={year}
						data={nyears}
						allowDeselect={false}
						onChange={(value) => {
							setYear(value);
						}}
					/>
					<Select
						label='Month'
						placeholder='Select a month'
						value={month}
						data={months}
						allowDeselect={false}
						onChange={(value) => {
							setMonth(value);
						}}
					/>
				</div>

				<Text size='md' fw={600}>
					Monthly Drugs Report for {month} - {year}
				</Text>
			</div>

			<Box pos='relative'>
				<section style={{ display: "none" }}>
					<div ref={contentRef} className='printable'>
						<div className='flex items-start gap-4 mb-2'>
							<Image
								src='/hospital.svg'
								height={120}
								width={120}
								alt='Albarka logo'
								loading='eager'
							/>
							<div className='space-y-1 w-full'>
								<div className='flex items-center w-full justify-between'>
									<h2 className='text-xl font-extrabold font-serif '>
										AL-BARKA HOSPITAL, WAWA
									</h2>
									<p>{format(new Date(), "PPPpp")}</p>
								</div>
								<h3 className='text-lg '>P.O. Box 169 Tel: 08056713322</h3>
								<p className='text-md  italic'>
									E-mail: hospitalalbarka@gmail.com
								</p>
								<p className='text-sm font-extrabold bg-black text-white p-1 px-2 text-center uppercase'>
									Monthly Drugs Report for {month} - {year}
								</p>
							</div>
						</div>

						<Table miw={700} fz={13}>
							<Table.Thead>
								<Table.Tr>
									{[
										"S/N",
										"Drug",
										"Purchases",
										"Current Stock",
										"Prescriptions(P)",
										"Gain(G)",
										"Loss(L)",
										"(G+L)-P",
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
					</div>

					<ScrollArea h={700}>
						<Table
							miw={700}
							striped
							highlightOnHover
							withTableBorder
							withColumnBorders
							fz={13}
						>
							<Table.Thead>
								<Table.Tr>
									{[
										"S/N",
										"Drug",
										"Purchases",
										"Current Stock",
										"Prescriptions(P)",
										"Gain(G)",
										"Loss(L)",
										"(G+L)-P",
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
