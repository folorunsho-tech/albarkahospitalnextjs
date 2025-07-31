/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ReactElement, useEffect, useState } from "react";
import {
	ScrollArea,
	Table,
	TextInput,
	Pagination,
	Text,
	keys,
	LoadingOverlay,
	Box,
} from "@mantine/core";
import { Search } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";
function chunk<T>(array: T[], size: number): T[][] {
	if (!array?.length) {
		return [];
	}
	const head = array?.slice(0, size);
	const tail = array?.slice(size);
	return [head, ...chunk(tail, size)];
}
const PaginatedTable = ({
	showSearch = true,
	showPagination = true,
	headers,
	rows,
	data = [],
	setSortedData,
	sortedData,
	placeholder,
	tableLoading,
	depth = "",
	ref,
	printHeaders,
	printRows,
	tableReport = "",
	tableFoot,
	setPrintData,
}: {
	showSearch?: boolean;
	showPagination?: boolean;
	headers: string[];
	rows: ReactElement[];
	printHeaders?: string[];
	printRows?: ReactElement[];
	data: any[];
	setSortedData: any;
	sortedData: any[];
	placeholder?: string;
	tableLoading?: boolean;
	depth?: string;
	ref?: any;
	tableReport?: string;
	tableFoot?: ReactElement;
	setPrintData?: any;
}) => {
	const chunkAmnt = 200;
	const [total, setTotal] = useState(1);
	const [activePage, setPage] = useState(1);
	const [search, setSearch] = useState("");
	function filterData(data: any[], search: string) {
		const query = search.toLowerCase().trim();
		const filtered = data.filter((item: any) =>
			keys(data[0]).some((key) =>
				String(item[key]).toLowerCase().includes(query)
			)
		);

		return filtered;
	}
	const mappedData = data?.map((mDtata) => {
		return {
			...mDtata,
			...mDtata[depth],
		};
	});
	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.currentTarget;
		setSearch(value);
		const filtered = filterData(mappedData, value);
		const chunked = chunk(filtered, chunkAmnt);
		setPage(1);
		setSortedData(chunked[activePage - 1]);
		setPrintData(filtered);
		setTotal(chunked?.length);
	};
	useEffect(() => {
		const chunked = chunk(sortedData, chunkAmnt);
		setTotal(chunked?.length);
		setSortedData(chunked[activePage - 1]);
		if (printRows) {
			setPrintData(sortedData);
		}
	}, []);
	useEffect(() => {
		const chunked = chunk(data, chunkAmnt);
		setTotal(chunked?.length);
		setSortedData(chunked[activePage - 1]);
		if (printHeaders?.length) {
			setPrintData(data);
		}
	}, [tableLoading]);
	return (
		<Box pos='relative'>
			<section style={{ display: "none" }}>
				<div ref={ref} className='printable'>
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
							<p className='text-md font-extrabold bg-black text-white p-1 px-2 text-center uppercase'>
								{tableReport}
							</p>
						</div>
					</div>
					<Table miw={700}>
						<Table.Thead>
							<Table.Tr>
								{printHeaders?.map((head: string, index: number) => (
									<Table.Th key={head + index + 1}>{head}</Table.Th>
								))}
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>{printRows}</Table.Tbody>
						<Table.Tfoot className='font-semibold border border-black'>
							{tableFoot}
						</Table.Tfoot>
					</Table>
				</div>
			</section>
			<section className='flex flex-col gap-2'>
				{showSearch && (
					<TextInput
						placeholder={placeholder}
						leftSection={<Search size={16} />}
						value={search}
						onChange={handleSearchChange}
					/>
				)}
				<ScrollArea h={700}>
					<Table
						miw={700}
						striped
						highlightOnHover
						withTableBorder
						withColumnBorders
					>
						<Table.Thead>
							<Table.Tr>
								{headers?.map((head: string, index: number) => (
									<Table.Th key={head + index}>{head}</Table.Th>
								))}
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>
							{sortedData?.length > 0 ? (
								rows
							) : (
								<Table.Tr>
									<Table.Td>
										<Text fw={500} ta='center'>
											Nothing found
										</Text>
									</Table.Td>
								</Table.Tr>
							)}
						</Table.Tbody>
					</Table>
				</ScrollArea>
				{showPagination && (
					<Pagination
						total={total}
						value={activePage}
						onChange={(value: number) => {
							setPage(value);
							const chunked = chunk(data, chunkAmnt);
							setSortedData(chunked[value - 1]);
						}}
					/>
				)}
				<LoadingOverlay visible={tableLoading} />
			</section>
		</Box>
	);
};

export default PaginatedTable;
