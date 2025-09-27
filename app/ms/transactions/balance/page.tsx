"use client";
import { useEffect, useRef, useState, Suspense } from "react";
import {
	ActionIcon,
	Button,
	Divider,
	LoadingOverlay,
	NumberFormatter,
	NumberInput,
	Select,
	Table,
	Text,
	TextInput,
} from "@mantine/core";
import { ArrowBigRight, ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import { useReactToPrint } from "react-to-print";
import { useEdit, useFetch } from "@/queries";
import { IconPencil, IconReceipt, IconX } from "@tabler/icons-react";
import { format } from "date-fns";
import Image from "next/image";
import convert from "@/lib/numberConvert";
import TnxSearch from "@/components/TnxSearch";

const page = () => {
	const { fetch, loading: Floading } = useFetch();
	const { edit, loading } = useEdit();
	const [reciept, setReciept] = useState<any | null>(null);
	const [status, setStatus] = useState<{
		color: string;
		label: string;
	} | null>(null);
	const [method, setMethod] = useState<string | null>(null);
	const [paid, setPaid] = useState<string | number>("");
	const [id, setId] = useState("");
	const [criteria, setCriteria] = useState<
		"Reciept / Tnx No" | "Hosp No" | null | string
	>("Hosp No");
	const [tnx, setTnx] = useState<any | null>(null);
	const [item, setItem] = useState<any | null>(null);
	const [items, setItems] = useState<
		{
			id: string | undefined;
			name: string | undefined;
			price: number | string;
			paid: number | string;
			mpaid: number | string;
			balance: number;
			method: string | null;
		}[]
	>([]);
	const contentRef = useRef<HTMLTableElement>(null);
	const reactToPrintFn = useReactToPrint({
		contentRef,
		bodyClass: "print",
		documentTitle: `reciept no ${Number(reciept?.id)} for tnx no ${Number(
			reciept?.tnxId
		)}`,
	});
	const itemPrice = tnx?.items?.reduce((prev: any, curr: { price: any }) => {
		return Number(prev) + Number(curr.price);
	}, 0);
	const itemPay = tnx?.items?.reduce((prev: any, curr: { paid: any }) => {
		return Number(prev) + Number(curr.paid);
	}, 0);
	const itemBalance = itemPrice - itemPay;

	const totalPrice = items.reduce((prev, curr) => {
		return Number(prev) + Number(curr.price);
	}, 0);
	const totalPay = items.reduce((prev, curr) => {
		return Number(prev) + Number(curr.paid);
	}, 0);
	const totalBalance = items.reduce((prev, curr) => {
		return prev + curr.balance;
	}, 0);
	const rPay = reciept?.items?.reduce((prev: any, curr: { paid: number }) => {
		return Number(prev) + Number(curr.paid);
	}, 0);
	const rAmount = reciept?.items?.reduce(
		(prev: any, curr: { price: number }) => {
			return prev + curr.price;
		},
		0
	);
	const getStatus = (status: string | any) => {
		if (status == "Fully Paid") {
			setStatus({
				color: "teal",
				label: "Fully Paid",
			});
		} else if (status == "Partly Paid") {
			setStatus({
				color: "orange",
				label: "Partly Paid",
			});
		} else if (status == "Partly Reversed") {
			setStatus({
				color: "pink",
				label: "Partly Reversed",
			});
		} else if (status == "Fully Reversed") {
			setStatus({
				color: "red",
				label: "Fully Reversed",
			});
		}
	};
	useEffect(() => {
		getStatus(tnx?.status);
	}, [tnx]);
	const loadTnx = async () => {
		setItem(null);
		setReciept(null);
		setItems([]);
		const { data } = await fetch(`/transactions/t/${id}`);
		setTnx(data);
	};
	useEffect(() => {
		if (totalPrice > 0 && totalPay < totalPrice) {
			setStatus({
				color: "orange",
				label: "Partly Paid",
			});
		} else if (items.length == 0) {
			getStatus(tnx?.status);
		} else if (totalBalance == 0) {
			setStatus({
				color: "teal",
				label: "Fully Paid",
			});
		}
	}, [items.length, totalBalance]);

	return (
		<main className='space-y-12'>
			{reciept && (
				<section style={{ display: "none" }}>
					<div ref={contentRef} className='printable text-xs'>
						<div className='flex justify-between gap-1 w-full'>
							<Image
								src='/hospital.svg'
								height={50}
								width={50}
								alt='Albarka logo'
								loading='eager'
							/>
							<div className='w-full'>
								<h2 className='font-extrabold font-serif '>ALBARKA HOSPITAL</h2>
								<p className='italic'>Tel: 08056713362, 08080854480</p>
								<p className='italic'>E-mail: hospitalalbarka@gmail.com</p>
								<p className='italic'>
									Malale road, Off Rofia road, Wawa New Bussa Niger state
									Nigeria.
								</p>
							</div>
							<p>{format(new Date(), "d/MM/Y , pp")}</p>
						</div>
						<div className='flex flex-wrap gap-2 my-1 text-xs'>
							<div className='flex items-center'>
								<h2 className='font-extrabold uppercase font-serif '>
									Receipt No:
								</h2>
								<p className='underline pl-1.5'>{reciept?.id}</p>
							</div>
							<div className='flex items-center'>
								<h2 className='font-extrabold uppercase font-serif '>
									Tnx Date:
								</h2>
								<p className='underline pl-1.5'>
									{format(new Date(reciept?.createdAt), "d/MM/Y , pp")}
								</p>
							</div>
							<div className='flex items-center'>
								<h2 className='font-extrabold uppercase font-serif '>
									Hosp No:
								</h2>
								<p className='underline pl-1.5'>
									{reciept?.transaction?.patient?.hosp_no}
								</p>
							</div>
							<div className='flex items-center'>
								<h2 className='font-extrabold uppercase font-serif '>
									Patient name:
								</h2>
								<p className='underline pl-1.5'>
									{reciept?.transaction?.patient?.name}
								</p>
							</div>

							<div className='flex items-center'>
								<h2 className='font-extrabold uppercase font-serif '>
									Address:
								</h2>
								<p className='underline pl-1.5'>
									{reciept?.transaction?.patient?.town?.name}
								</p>
							</div>

							<div className='flex items-center '>
								<h2 className='font-extrabold uppercase font-serif '>
									Cashier:
								</h2>
								<p className='underline pl-1.5'>
									{reciept?.createdBy?.username}
								</p>
							</div>
						</div>
						<Table fz={12}>
							<Table.Thead>
								<Table.Tr>
									<Table.Th>Item</Table.Th>
									<Table.Th>Amount</Table.Th>
									<Table.Th>Paid</Table.Th>
								</Table.Tr>
							</Table.Thead>
							<Table.Tbody>
								{reciept?.items?.map((item: any, i: number) => (
									<Table.Tr key={i + 1}>
										<Table.Td>{item?.name}</Table.Td>
										<Table.Td>
											<NumberFormatter
												value={Number(item?.price)}
												thousandSeparator
											/>
										</Table.Td>
										<Table.Td>
											<NumberFormatter
												value={Number(item?.paid)}
												thousandSeparator
											/>
										</Table.Td>
									</Table.Tr>
								))}
							</Table.Tbody>
							<Table.Tfoot className='font-semibold border bg-gray-200'>
								<Table.Tr>
									<Table.Td>Total: </Table.Td>
									<Table.Td>
										<NumberFormatter value={rAmount} thousandSeparator />
									</Table.Td>
									<Table.Td>
										<NumberFormatter value={rPay} thousandSeparator />
									</Table.Td>
								</Table.Tr>
							</Table.Tfoot>
						</Table>
						<div className='flex justify-between items-center px-2 py-2'>
							<Text fw={600} fz={12}>
								Total amount in words:
								<i className='pl-2 capitalize'>{convert(Number(rPay))} Naira</i>
							</Text>
						</div>
						<Divider my='sm' size='xs' color='black' />
						<div className='text-center mt-3'>
							<Text fw={600} fz={12} className='italic'>
								*** Thanks. And when I am ill it is God who heals me.***
							</Text>
						</div>
					</div>
				</section>
			)}
			<header className='flex justify-between items-center'>
				<Link
					className='bg-blue-500 hover:bg-blue-600 p-1 px-2 rounded-lg text-white flex gap-3'
					href='/ms/transactions'
				>
					<ArrowLeft />
					Go back
				</Link>
				<div className='flex gap-2 items-end'>
					<Select
						label='Tnx search criteria'
						placeholder='search criteria'
						value={criteria}
						data={["Reciept / Tnx No", "Hosp No"]}
						onChange={(value) => {
							setTnx(null);
							setCriteria(value);
						}}
					/>
					{criteria == "Hosp No" && <TnxSearch setTnx={setTnx} />}
					{criteria == "Reciept / Tnx No" && (
						<>
							<TextInput
								label='Receipt / Tnx No'
								placeholder='load tnx by reciept no or tnx id'
								// className='w-52'
								rightSection={<Search size={20} />}
								value={id}
								onChange={(e) => {
									setId(e.currentTarget.value);
								}}
							/>
							<Button disabled={!id} onClick={loadTnx}>
								load transaction
							</Button>
						</>
					)}
				</div>

				<div className='flex flex-col gap-1 w-max pointer-events-none'>
					<label htmlFor='status'>Transaction status</label>
					<Button id='status' color={status?.color}>
						{status?.label}
					</Button>
				</div>
			</header>
			<section>
				<div className='flex gap-3 items-center mb-3'>
					<h3>
						Name: <span>{tnx?.patient?.name}</span>
					</h3>
					<h3>
						Hosp No: <span>{tnx?.patient?.hosp_no}</span>
					</h3>
				</div>
				<form
					className='flex flex-wrap gap-2 items-end'
					onSubmit={async (e) => {
						e.preventDefault();
						const { data } = await edit(`/transactions/t/${tnx?.id}/balance`, {
							balance: itemBalance - totalPay,
							status: status?.label,
							items,
						});
						const rec = data?.reciepts[0];

						setReciept({ ...rec, items: JSON.parse(rec?.items) });
						setItems([]);
						const { data: t } = await fetch(`/transactions/t/${tnx?.id}`);
						setTnx(t);
					}}
				>
					<TextInput
						placeholder='name'
						label='Item Name'
						value={item?.fee?.name || ""}
						disabled
					/>
					<NumberInput
						label='Amount'
						placeholder='balance amount'
						thousandSeparator
						value={Number(item?.price) - Number(item?.paid)}
						prefix='NGN '
						disabled
						className='w-32'
					/>
					<NumberInput
						label='To balance'
						placeholder='balance'
						thousandSeparator
						value={paid}
						prefix='NGN '
						disabled={!item?.price}
						min={0}
						max={Number(item?.price) - Number(item?.paid)}
						className='w-32'
						onChange={(value) => {
							setPaid(value);
						}}
					/>
					<Select
						label='Method'
						placeholder='method'
						disabled={!paid}
						value={method}
						data={["Cash", "Bank TRF", "POS", "MD Collect"]}
						className='w-32'
						onChange={(value) => {
							setMethod(value);
						}}
					/>
					<Button
						disabled={!(paid && method)}
						onClick={() => {
							const filtered = items.filter((i) => i.id !== item?.id);
							setItems([
								{
									name: item?.fee?.name,
									method,
									price: Number(item?.price) - Number(item?.paid),
									paid,
									mpaid: Number(item?.paid) + Number(paid),
									balance:
										Number(item?.price) - Number(item?.paid) - Number(paid),
									id: item?.id,
								},
								...filtered,
							]);
							setItem(null);
							setPaid("");
							setMethod(null);
						}}
					>
						Add to List
					</Button>

					<Button type='submit' color='teal' disabled={items.length == 0}>
						Complete Balance payment
					</Button>
					<Button
						leftSection={<IconReceipt />}
						disabled={!reciept}
						onClick={() => {
							reactToPrintFn();
						}}
					>
						Reciept
					</Button>
				</form>

				<div className='flex gap-1 items-center'>
					<Table>
						<Table.Thead>
							<Table.Tr>
								<Table.Th>S/N</Table.Th>
								<Table.Th>Name</Table.Th>
								<Table.Th>Price</Table.Th>
								<Table.Th>Paid</Table.Th>
								<Table.Th>Balance</Table.Th>
								<Table.Th></Table.Th>
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>
							{tnx?.items?.map((item: any, i: number) => (
								<Table.Tr key={item?.id}>
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
											value={Number(item?.price) - Number(item?.paid)}
											thousandSeparator
										/>
									</Table.Td>
									<Table.Td>
										<ActionIcon
											color='teal'
											disabled={Number(item?.price) - Number(item?.paid) < 1}
											onClick={() => {
												setItem(item);
											}}
										>
											<IconPencil />
										</ActionIcon>
									</Table.Td>
								</Table.Tr>
							))}
						</Table.Tbody>
						<Table.Tfoot className='bg-gray-300 font-bold'>
							<Table.Tr>
								<Table.Td></Table.Td>
								<Table.Td>Total: </Table.Td>
								<Table.Td>
									<NumberFormatter
										prefix='NGN '
										value={itemPrice}
										thousandSeparator
									/>
								</Table.Td>
								<Table.Td>
									<NumberFormatter
										prefix='NGN '
										value={itemPay}
										thousandSeparator
									/>
								</Table.Td>
								<Table.Td>
									<NumberFormatter
										prefix='NGN '
										value={itemBalance}
										thousandSeparator
									/>
								</Table.Td>
								<Table.Th></Table.Th>
							</Table.Tr>
						</Table.Tfoot>
					</Table>
					<ArrowBigRight size={60} />
					<Table>
						<Table.Thead>
							<Table.Tr>
								<Table.Th>S/N</Table.Th>
								<Table.Th>Name</Table.Th>
								<Table.Th>Amount</Table.Th>
								<Table.Th>Paid</Table.Th>
								<Table.Th>Balance</Table.Th>
								<Table.Th>Method</Table.Th>
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>
							{items.map((item: any, i: number) => (
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
									<Table.Td>
										<NumberFormatter
											prefix='NGN '
											value={Number(item?.balance)}
											thousandSeparator
										/>
									</Table.Td>
									<Table.Td>{item?.method}</Table.Td>
									<Table.Td>
										<ActionIcon
											color='red'
											onClick={() => {
												const filtered = items.filter(
													(i) => item.name !== i?.name
												);
												setItems(filtered);
											}}
										>
											<IconX />
										</ActionIcon>
									</Table.Td>
								</Table.Tr>
							))}
						</Table.Tbody>
						<Table.Tfoot className='bg-gray-300 font-bold'>
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
								<Table.Td></Table.Td>
							</Table.Tr>
						</Table.Tfoot>
					</Table>
				</div>
			</section>
			<LoadingOverlay visible={Floading || loading} />
		</main>
	);
};

export default page;
