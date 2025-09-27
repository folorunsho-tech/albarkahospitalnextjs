"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
	ActionIcon,
	Button,
	Divider,
	Drawer,
	LoadingOverlay,
	NumberFormatter,
	NumberInput,
	ScrollArea,
	Select,
	Table,
	Text,
	TextInput,
} from "@mantine/core";
import { useReactToPrint } from "react-to-print";
import { useFetch, usePost } from "@/queries";
import { IconReceipt, IconX } from "@tabler/icons-react";
import { format } from "date-fns";
import Image from "next/image";
import PatientSearch from "@/components/PatientSearch";
import ReportsTable from "@/components/ReportsTable";
import { useDisclosure } from "@mantine/hooks";
import convert from "@/lib/numberConvert";
const page = () => {
	const [opened, { open, close }] = useDisclosure(false);
	const [tnxOpened, { open: openTnx, close: closeTnx }] = useDisclosure(false);
	const { fetch } = useFetch();
	const { post, loading } = usePost();
	const [fee, setFee] = useState<{
		value: string;
		label: string;
	} | null>(null);
	const [reciept, setReciept] = useState<any | null>(null);
	const [status, setStatus] = useState<{
		color: string;
		label: string;
	} | null>(null);
	const [feeId, setFeeId] = useState<string | null>(null);
	const [method, setMethod] = useState<string | null>(null);
	const [price, setPrice] = useState<string | number>("");
	const [paid, setPaid] = useState<string | number>("");
	const [fees, setFees] = useState<{ value: string; label: string }[]>([]);
	const [patientData, setPatientData] = useState<{
		hosp_no: string;
		name: string;
		id: string;
		age: string;
		phone_no: string;
		sex: string;
		town: { name: string };
		no: number;
	} | null>(null);
	const [outstanding, setOutstanding] = useState<any[]>([]);
	const [prevTnx, setPrevTnx] = useState<any[]>([]);

	const [cleared, setCleared] = useState<boolean>(false);
	const [items, setItems] = useState<
		{
			name: string | undefined;
			price: number | string;
			paid: number | string;
			balance: number;
			method: string | null;
			feeId: string | null;
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
	const reset = () => {
		setPatientData(null);
		setFeeId(null);
		setFee(null);
		setPrice("");
		setPaid("");
		setMethod(null);
		setItems([]);
		setPrevTnx([]);
		setOutstanding([]);
	};
	useEffect(() => {
		if (totalBalance == 0) {
			setStatus({
				color: "teal",
				label: "Fully Paid",
			});
		} else if (totalPrice > 0 && totalPay < totalPrice) {
			setStatus({
				color: "orange",
				label: "Partly Paid",
			});
		}
	}, [totalBalance]);
	useEffect(() => {
		const getAll = async () => {
			const { data } = await fetch("/settings/fees");
			const sorted = data.map((fee: { id: string; name: string }) => {
				return {
					value: fee.id,
					label: fee.name,
				};
			});
			setFees(sorted);
		};
		getAll();
	}, []);
	useEffect(() => {
		setPrice("");
		setPaid("");
		setMethod(null);
	}, [feeId]);
	const setData = async () => {
		const { data } = await fetch(`/patients/p/${patientData?.id}/outstanding`);
		const { data: prevtnx } = await fetch(
			`/patients/p/${patientData?.id}/prevtnx`
		);
		setPrevTnx(prevtnx);
		setOutstanding(data);
	};
	useEffect(() => {
		if (patientData) {
			setData();
		}
	}, [patientData]);
	return (
		<main className='space-y-4'>
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
								<div className='flex items-center'>
									<h2 className='font-extrabold uppercase font-serif '>
										Hosp No:
									</h2>
									<p className='underline pl-1.5'>
										{reciept?.transaction?.patient?.hosp_no}
									</p>
								</div>
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
			<header className='flex justify-between items-end'>
				<Link
					className='bg-blue-500 hover:bg-blue-600 p-1 px-2 rounded-lg text-white flex gap-3'
					href='/ms/transactions'
				>
					<ArrowLeft />
					Go back
				</Link>
				<Text size='xl'>Initiate a transaction</Text>
				<div className='flex gap-3 items-end'>
					<Button color={"orange"} onClick={openTnx}>
						{prevTnx.length} Previous tnx
					</Button>
					<Button color={outstanding.length ? "red" : "green"} onClick={open}>
						{outstanding.length} Outstanding tnx
					</Button>
					<div className='flex flex-col gap-1 w-max pointer-events-none'>
						<label htmlFor='status'>Transaction status</label>
						<Button id='status' color={status?.color}>
							{status?.label}
						</Button>
					</div>
				</div>
			</header>
			<section className='space-y-4'>
				<div className='flex gap-2 justify-between'>
					<PatientSearch setPatient={setPatientData} patient={patientData} />
					<TextInput
						disabled
						label='Hosp No'
						placeholder='hosp no'
						value={patientData?.hosp_no || ""}
					/>
					<TextInput
						disabled
						label='Name'
						placeholder='name'
						value={patientData?.name || ""}
					/>
					<TextInput
						disabled
						label='Phone No'
						placeholder='phone no'
						value={patientData?.phone_no || ""}
					/>
					<TextInput
						disabled
						label='Address'
						placeholder='address'
						value={patientData?.town?.name || ""}
					/>
				</div>

				<>
					<form
						className='flex flex-wrap gap-2 items-end'
						onSubmit={async (e) => {
							e.preventDefault();
							const { data } = await post("/transactions", {
								total: totalPrice,
								balance: totalBalance,
								paid: totalPrice - totalBalance,
								items,
								status: status?.label,
								patientId: patientData?.id,
							});
							const rec = data?.reciepts[0];

							setReciept({ ...rec, items: JSON.parse(rec?.items) });
							setItems([]);
							setData();
						}}
					>
						<Select
							label='Item'
							placeholder='Select an Item'
							data={fees}
							value={feeId}
							disabled={!patientData?.hosp_no}
							clearable
							error={
								!patientData?.hosp_no ? "Select patient to continue" : null
							}
							searchable
							className='w-40'
							onChange={(value: any) => {
								setFeeId(value);
								const found: any = fees.find(
									(f: { value: string; label: string }) => f?.value == value
								);
								setFee(found);
							}}
						/>
						<NumberInput
							label='Price'
							placeholder='item price'
							thousandSeparator
							value={price}
							min={0}
							prefix='NGN '
							disabled={!fee}
							className='w-32'
							onChange={(value) => {
								setPrice(value);
							}}
						/>
						<NumberInput
							label='Paid'
							placeholder='amount paid'
							thousandSeparator
							value={paid}
							min={0}
							prefix='NGN '
							disabled={!price}
							max={Number(price)}
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
								const filtered = items.filter(
									(item) => item.name !== fee?.label
								);
								setItems([
									{
										name: fee?.label,
										method,
										price,
										paid,
										balance: Number(price) - Number(paid),
										feeId,
									},
									...filtered,
								]);
								setFeeId(null);
								setFee(null);
								setPrice("");
								setPaid("");
								setMethod(null);
							}}
						>
							Add to List
						</Button>

						<Button type='submit' color='teal' disabled={items.length < 1}>
							Complete transaction
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
						<Button color='red' onClick={reset}>
							Reset
						</Button>
					</form>

					<ScrollArea h={700}>
						<Table>
							<Table.Thead>
								<Table.Tr>
									<Table.Th>S/N</Table.Th>
									<Table.Th>Name</Table.Th>
									<Table.Th>Price</Table.Th>
									<Table.Th>Paid</Table.Th>
									<Table.Th>Balance</Table.Th>
									<Table.Th>Method</Table.Th>
									<Table.Th></Table.Th>
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
					</ScrollArea>
				</>

				<LoadingOverlay visible={loading} />
			</section>
			<Drawer
				opened={tnxOpened}
				onClose={closeTnx}
				offset={8}
				position='right'
				title={
					<div className='flex items-center gap-2'>
						<Text className='text-lg'>
							Previous tnx for {patientData?.hosp_no} - {patientData?.name}
						</Text>
					</div>
				}
				size='2xl'
			>
				<ReportsTable
					headers={[
						"Date",
						"Tnx Id",
						"Year",
						"Month",
						"Fee",
						"Amount",
						"Paid",
						"Balance",
					]}
					sortedData={prevTnx}
					data={prevTnx}
					showPrint={false}
					rows={prevTnx?.map((row) => (
						<Table.Tr key={row?.id}>
							<Table.Td>
								{new Date(row?.updatedAt).toLocaleDateString()}
							</Table.Td>
							<Table.Td>{row?.transactionId}</Table.Td>
							<Table.Td>{row?.year}</Table.Td>
							<Table.Td>{row?.month}</Table.Td>
							<Table.Td>{row?.fee?.name}</Table.Td>
							<Table.Td>
								<NumberFormatter
									prefix='NGN '
									value={row?.price}
									thousandSeparator
								/>
							</Table.Td>
							<Table.Td>
								<NumberFormatter
									prefix='NGN '
									value={row?.paid}
									thousandSeparator
								/>
							</Table.Td>
							<Table.Td>
								<NumberFormatter
									prefix='NGN '
									value={row?.balance}
									thousandSeparator
								/>
							</Table.Td>
						</Table.Tr>
					))}
				/>
			</Drawer>
			<Drawer
				opened={opened}
				onClose={close}
				offset={8}
				position='right'
				title={
					<div className='flex items-center gap-2'>
						<Text className='text-lg'>
							Outstanding tnx for {patientData?.hosp_no} - {patientData?.name}
						</Text>
					</div>
				}
				size='2xl'
			>
				<ReportsTable
					headers={[
						"Date",
						"Tnx Id",
						"Year",
						"Month",
						"Fee",
						"Amount",
						"Paid",
						"Balance",
					]}
					sortedData={outstanding}
					data={outstanding}
					showPrint={false}
					rows={outstanding?.map((row) => (
						<Table.Tr key={row?.id}>
							<Table.Td>
								{new Date(row?.updatedAt).toLocaleDateString()}
							</Table.Td>
							<Table.Td>{row?.transactionId}</Table.Td>
							<Table.Td>{row?.year}</Table.Td>
							<Table.Td>{row?.month}</Table.Td>
							<Table.Td>{row?.fee?.name}</Table.Td>
							<Table.Td>
								<NumberFormatter
									prefix='NGN '
									value={row?.price}
									thousandSeparator
								/>
							</Table.Td>
							<Table.Td>
								<NumberFormatter
									prefix='NGN '
									value={row?.paid}
									thousandSeparator
								/>
							</Table.Td>
							<Table.Td>
								<NumberFormatter
									prefix='NGN '
									value={row?.balance}
									thousandSeparator
								/>
							</Table.Td>
						</Table.Tr>
					))}
				/>
			</Drawer>
		</main>
	);
};

export default page;
