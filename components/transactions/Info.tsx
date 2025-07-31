"use client";
import { LoadingOverlay, NumberFormatter, Table, Text } from "@mantine/core";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useFetch } from "@/queries";
import Image from "next/image";
import convert from "@/lib/numberConvert";
const Info = ({ tnx }: { tnx: any }) => {
	const { fetch } = useFetch();
	const [createdBy, setCreatedBy] = useState<any>(null);
	const totalPrice = tnx?.items.reduce((prev: any, curr: { price: any }) => {
		return Number(prev) + Number(curr.price);
	}, 0);
	const totalPay = tnx?.items.reduce((prev: any, curr: { paid: any }) => {
		return Number(prev) + Number(curr.paid);
	}, 0);
	const totalBalance = tnx?.items.reduce(
		(prev: any, curr: { balance: any }) => {
			return prev + curr.balance;
		},
		0
	);
	useEffect(() => {
		async function getAll() {
			const { data } = await fetch(`/accounts/${tnx?.createdById}/`);
			setCreatedBy(data);
		}
		getAll();
	}, []);
	return (
		<main>
			<div className='printable text-sm'>
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
						</div>
						<h3 className='text-lg '>P.O. Box 169 Tel: 08056713322</h3>
						<p className='text-md  italic'>E-mail: hospitalalbarka@gmail.com</p>
					</div>
				</div>
				<div className='flex flex-wrap gap-2 mb-1'>
					<div className='flex items-center'>
						<h2 className='text-sm font-extrabold font-serif '>
							Transaction No:
						</h2>
						<p className='underline pl-1.5'>{tnx?.id}</p>
					</div>
					{tnx && (
						<div className='flex items-center'>
							<h2 className='text-sm font-extrabold font-serif '>Tnx Date:</h2>
							<p className='underline pl-1.5'>
								{format(new Date(tnx?.createdAt), "PPPpp")}
							</p>
						</div>
					)}
					<div className='flex items-center'>
						<h2 className='text-sm font-extrabold font-serif '>
							Patient name:
						</h2>
						<p className='underline pl-1.5'>{tnx?.patient?.name}</p>
					</div>
					<div className='flex items-center'>
						<h2 className='text-sm font-extrabold font-serif '>Hosp No:</h2>
						<p className='underline pl-1.5'>{tnx?.patient?.hosp_no}</p>
					</div>
					<div className='flex items-center'>
						<h2 className='text-sm font-extrabold font-serif '>Address:</h2>
						<p className='underline pl-1.5'>{tnx?.patient?.town?.name}</p>
					</div>
					<div className='flex items-center'>
						<h2 className='text-sm font-extrabold font-serif '>Phone No:</h2>
						<p className='underline pl-1.5'>{tnx?.patient?.phone_no}</p>
					</div>
					<div className='flex items-center '>
						<h2 className='text-sm font-extrabold font-serif '>Created By:</h2>
						<p className='underline pl-1.5'>{createdBy?.username}</p>
					</div>
					{tnx?.updatedBy && (
						<div className='flex items-center '>
							<h2 className='text-sm font-extrabold font-serif '>
								Last Updated By:
							</h2>
							<p className='underline pl-1.5'>{tnx?.updatedBy?.username}</p>
						</div>
					)}
				</div>
				<Table>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>S/N</Table.Th>
							<Table.Th>Name</Table.Th>
							<Table.Th>Amount</Table.Th>
							<Table.Th>Paid</Table.Th>
							<Table.Th>Balance</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>
						{tnx?.items?.map((item: any, i: number) => (
							<Table.Tr key={i + 1}>
								<Table.Td>{i + 1}</Table.Td>
								<Table.Td>{item?.fee?.name}</Table.Td>
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
								<Table.Td>
									<NumberFormatter
										prefix='NGN '
										value={Number(item?.balance)}
										thousandSeparator
									/>
								</Table.Td>
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
									value={totalPrice}
									thousandSeparator
								/>
							</Table.Td>
							<Table.Td>
								<NumberFormatter
									prefix='NGN '
									value={totalPay}
									thousandSeparator
								/>
							</Table.Td>
							<Table.Td>
								<NumberFormatter
									prefix='NGN '
									value={totalBalance}
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
								value={totalPay}
								thousandSeparator
							/>
						</b>
					</Text>
					<Text fw={600}>
						Total amount paid in words:
						<i className='text-sm pl-2 capitalize'>
							{convert(Number(totalPay))} Naira
						</i>
					</Text>
				</div>
			</div>

			<LoadingOverlay visible={!tnx} />
		</main>
	);
};

export default Info;
