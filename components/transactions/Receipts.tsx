"use client";
import { useEffect, useRef, useState } from "react";
import PaginatedTable from "../PaginatedTable";
import { useFetch } from "@/queries";
import {
	LoadingOverlay,
	NumberFormatter,
	Drawer,
	Table,
	ActionIcon,
	Text,
} from "@mantine/core";
import { format } from "date-fns";
import { useReactToPrint } from "react-to-print";
import Image from "next/image";
import { IconReceipt } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { Eye } from "lucide-react";
import convert from "@/lib/numberConvert";

const Receipts = ({ id }: { id: string }) => {
	const { loading, fetch, data } = useFetch();
	const [queryData, setQueryData] = useState<any[]>(data);
	const [sortedData, setSortedData] = useState<any[]>(queryData);
	const [opened, { open, close }] = useDisclosure(false);
	const [selected, setSelected] = useState<any>(null);
	const [items, setItems] = useState<any[]>([]);
	const contentRef = useRef<HTMLTableElement>(null);
	const reactToPrintFn = useReactToPrint({
		contentRef,
		bodyClass: "print",
		documentTitle: `reciept no ${Number(selected?.id)} for tnx no ${Number(
			selected?.tnxId
		)}`,
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
			<Table.Td>{JSON.parse(row?.items).length}</Table.Td>
			<Table.Td>{row?.createdBy?.username}</Table.Td>
			<Table.Td className={getStatus(row?.status)}>{row?.status}</Table.Td>
			<Table.Td>
				<ActionIcon
					onClick={() => {
						setSelected(row);
						setItems(JSON.parse(row?.items));
						open();
					}}
				>
					<Eye />
				</ActionIcon>
			</Table.Td>
		</Table.Tr>
	));

	useEffect(() => {
		async function getAll() {
			const { data } = await fetch(`/transactions/t/${id}/reciepts`);
			setQueryData(data);
		}
		getAll();
	}, []);
	return (
		<main>
			<Drawer
				opened={opened}
				onClose={close}
				title={`Reciept no: ${selected?.id}`}
				size='xl'
			>
				{selected && (
					<div ref={contentRef} className='printable text-sm'>
						<div className='flex items-start gap-4 mb-1'>
							<Image
								src='/hospital.svg'
								height={100}
								width={100}
								alt='Albarka logo'
								loading='eager'
							/>
							<div className='space-y-1 w-full'>
								<div className='flex items-center w-full justify-between'>
									<h2 className='text-xl font-extrabold font-serif '>
										AL-BARKA HOSPITAL, WAWA
									</h2>
									<p>{format(new Date(), "PPPpp")}</p>
									<ActionIcon
										size={35}
										mt={6}
										onClick={() => {
											reactToPrintFn();
										}}
									>
										<IconReceipt />
									</ActionIcon>
								</div>
								<h3 className='text-lg '>P.O. Box 169 Tel: 08056713322</h3>
								<p className='text-md  italic'>
									E-mail: hospitalalbarka@gmail.com
								</p>
							</div>
						</div>
						<div className='flex flex-wrap gap-2 mb-1'>
							<div className='flex items-center'>
								<h2 className='text-sm font-extrabold font-serif '>
									Receipt No:
								</h2>
								<p className='underline pl-1.5'>{selected?.id}</p>
							</div>
							{selected && (
								<div className='flex items-center'>
									<h2 className='text-sm font-extrabold font-serif '>
										Tnx Date:
									</h2>
									<p className='underline pl-1.5'>
										{format(new Date(selected?.createdAt), "PPPpp")}
									</p>
								</div>
							)}
							<div className='flex items-center'>
								<h2 className='text-sm font-extrabold font-serif '>
									Patient name:
								</h2>
								<p className='underline pl-1.5'>
									{selected?.transaction?.patient?.name}
								</p>
							</div>
							<div className='flex items-center'>
								<h2 className='text-sm font-extrabold font-serif '>Hosp No:</h2>
								<p className='underline pl-1.5'>
									{selected?.transaction?.patient?.hosp_no}
								</p>
							</div>
							<div className='flex items-center'>
								<h2 className='text-sm font-extrabold font-serif '>Address:</h2>
								<p className='underline pl-1.5'>
									{selected?.transaction?.patient?.town?.name}
								</p>
							</div>
							<div className='flex items-center'>
								<h2 className='text-sm font-extrabold font-serif '>
									Phone No:
								</h2>
								<p className='underline pl-1.5'>
									{selected?.transaction?.patient?.phone_no}
								</p>
							</div>
							<div className='flex items-center '>
								<h2 className='text-sm font-extrabold font-serif '>Cashier:</h2>
								<p className='underline pl-1.5'>
									{selected?.createdBy?.username}
								</p>
							</div>
						</div>
						<Table>
							<Table.Thead>
								<Table.Tr>
									<Table.Th>S/N</Table.Th>
									<Table.Th>Name</Table.Th>
									<Table.Th>Amount</Table.Th>
									<Table.Th>Paid</Table.Th>

									<Table.Th>Method</Table.Th>
								</Table.Tr>
							</Table.Thead>
							<Table.Tbody>
								{items?.map((item: any, i: number) => (
									<Table.Tr key={i + 1}>
										<Table.Td>{i + 1}</Table.Td>
										<Table.Td>{item?.name}</Table.Td>
										<Table.Td>
											<NumberFormatter
												prefix='NGN '
												value={Number(item?.price)}
												thousandSeparator
											/>
										</Table.Td>
										<Table.Td>
											<NumberFormatter
												prefix='NGN '
												value={Number(item?.paid)}
												thousandSeparator
											/>
										</Table.Td>

										<Table.Td>{item?.method}</Table.Td>
									</Table.Tr>
								))}
							</Table.Tbody>
							<Table.Tfoot className='font-semibold border bg-gray-200'>
								<Table.Tr>
									<Table.Td></Table.Td>
									<Table.Td>Total: </Table.Td>
									<Table.Td>
										<NumberFormatter
											prefix='NGN '
											value={items?.reduce(
												(prev: any, curr: { paid: number }) => {
													return Number(prev) + Number(curr.paid);
												},
												0
											)}
											thousandSeparator
										/>
									</Table.Td>
									<Table.Td>
										<NumberFormatter
											prefix='NGN '
											value={items?.reduce(
												(prev: any, curr: { price: number }) => {
													return prev + curr.price;
												},
												0
											)}
											thousandSeparator
										/>
									</Table.Td>
								</Table.Tr>
							</Table.Tfoot>
						</Table>
						<div className='flex justify-between items-center px-2 py-2'>
							<Text fw={600}>
								Total amount paid:
								<b className='text-sm pl-2'>
									<NumberFormatter
										prefix='NGN '
										value={items?.reduce(
											(prev: any, curr: { price: number }) => {
												return prev + curr.price;
											},
											0
										)}
										thousandSeparator
									/>
								</b>
							</Text>
							<Text fw={600}>
								Total amount paid in words:
								<i className='text-sm pl-2 capitalize'>
									{convert(
										Number(
											items?.reduce((prev: any, curr: { price: number }) => {
												return prev + curr.price;
											}, 0)
										)
									)}{" "}
									Naira
								</i>
							</Text>
						</div>
					</div>
				)}
			</Drawer>
			<PaginatedTable
				headers={[
					"S/N",
					"Id",
					"Date",
					"Items",
					"CreatedBy",
					"Status",
					"Action",
				]}
				sortedData={sortedData}
				rows={rows}
				showSearch={false}
				showPagination={true}
				data={queryData}
				setSortedData={setSortedData}
				tableLoading={loading}
				depth=''
			/>
			<LoadingOverlay visible={loading} />
		</main>
	);
};

export default Receipts;
