/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
	ActionIcon,
	Button,
	LoadingOverlay,
	Modal,
	rem,
	Table,
	Text,
	TextInput,
	Group,
	NumberInput,
	NumberFormatter,
	Select,
} from "@mantine/core";
import { ArrowLeft, Pencil, Printer } from "lucide-react";
import { useFetch, usePost, usePostNormal } from "@/queries";
import { useEffect, useState, useRef } from "react";
import DataLoader from "@/components/DataLoader";
import { format } from "date-fns";
import PaginatedTable from "@/components/PaginatedTable";
import { useDisclosure } from "@mantine/hooks";
import { months } from "@/lib/ynm";
import { DatePickerInput } from "@mantine/dates";
import { useReactToPrint } from "react-to-print";
import Link from "next/link";

const DrugPurchase = () => {
	const { fetch } = useFetch();
	const { post: dPost, loading: pLoading } = usePost();
	const { post, loading } = usePostNormal();
	const [queryData, setQueryData] = useState<any[]>([]);
	const [sortedData, setSortedData] = useState<any[]>([]);
	const [printData, setPrintData] = useState<any[]>(queryData);
	const [eData, setEdata] = useState<any>(null);
	const [drug_id, setDrugId] = useState<string>("");
	const [drugName, setDrugName] = useState<string>("");
	const [drugsList, setDrugsList] = useState<any[]>([]);
	const [quantity, setQuantity] = useState<number>(0);
	const [price, setPrice] = useState<number>(0);
	const [date, setDate] = useState<Date | string | number>(new Date());
	const [Equantity, setEquantity] = useState<number>(0);
	const [eprice, setEPrice] = useState<number>(0);
	const [edate, setEDate] = useState<Date | string | number>(new Date());
	const [opened, { open, close }] = useDisclosure(false);
	const [eOpened, { open: eOpen, close: eClose }] = useDisclosure(false);
	const [updated, setUpdated] = useState(false);
	const contentRef = useRef<HTMLDivElement>(null);
	const reactToPrintFn = useReactToPrint({
		contentRef,
		bodyClass: "print",
		documentTitle: "drugs-purchase-list",
	});
	const rows = sortedData?.map((row, i: number) => (
		<Table.Tr key={row?.id + String(i)}>
			<Table.Td>{i + 1}</Table.Td>
			<Table.Td>{format(new Date(row?.date), "dd/MM/yyyy")}</Table.Td>
			<Table.Td>{row?.name}</Table.Td>
			<Table.Td>
				<NumberFormatter value={row?.quantity} thousandSeparator />
			</Table.Td>
			<Table.Td>
				<NumberFormatter prefix='N ' value={row?.price} thousandSeparator />
			</Table.Td>

			<Table.Td>
				<ActionIcon
					onClick={() => {
						eOpen();
						setEdata(row);
						setEquantity(row?.quantity);
						setEPrice(row?.price);
						setEDate(row?.date);
					}}
				>
					<Pencil style={{ width: rem(14), height: rem(14) }} />
				</ActionIcon>
			</Table.Td>
		</Table.Tr>
	));
	const printRows = printData?.map((row, i: number) => (
		<Table.Tr key={row?.id + +String(i)}>
			<Table.Td>{i + 1}</Table.Td>
			<Table.Td>{format(new Date(row?.date), "dd/MM/yyyy")}</Table.Td>
			<Table.Td>{row?.name}</Table.Td>
			<Table.Td>
				<NumberFormatter value={row?.quantity} thousandSeparator />
			</Table.Td>
			<Table.Td>
				<NumberFormatter prefix='N ' value={row?.price} thousandSeparator />
			</Table.Td>
		</Table.Tr>
	));
	const total = printData?.reduce((prev, curr) => prev + curr?.price, 0);

	useEffect(() => {
		async function getAll() {
			const { data: drugs } = await fetch("/drugsinventory");
			const drugsSorted = drugs?.map(
				(d: { drug: { name: string }; id: string }) => {
					return {
						label: d.drug?.name,
						value: d.id,
					};
				}
			);

			setDrugsList(drugsSorted);
		}
		getAll();
	}, []);
	return (
		<main className='space-y-6'>
			<div className='flex justify-between items-center'>
				<Link
					className='bg-blue-500 hover:bg-blue-600 p-1 px-2 rounded-lg text-white flex gap-3'
					href='/ms/drugs'
				>
					<ArrowLeft />
					Go back
				</Link>
				<Text size='xl'>Drugs Purchases</Text>
			</div>
			<div className='flex items-end justify-between w-full'>
				<DataLoader
					post={post}
					setQueryData={setQueryData}
					link='/drugsinventory/purchases'
					updated={updated}
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
					<Button onClick={open}>Add purchase</Button>
				</div>
			</div>

			<PaginatedTable
				headers={["S/N", "Date", "Name", "Quantity", "Price", "Actions"]}
				placeholder='Search by drug name'
				sortedData={sortedData}
				rows={rows}
				showSearch={true}
				showPagination={true}
				data={queryData}
				setSortedData={setSortedData}
				tableLoading={loading}
				depth='drug'
				ref={contentRef}
				printHeaders={["S/N", "Date", "Name", "Quantity", "Price"]}
				printRows={printRows}
				tableReport='Drugs purchase record'
				tableFoot={
					<Table.Tr>
						<Table.Td>Total</Table.Td>
						<Table.Td></Table.Td>
						<Table.Td></Table.Td>
						<Table.Td></Table.Td>
						<Table.Td>
							<NumberFormatter prefix='N ' value={total} thousandSeparator />
						</Table.Td>
					</Table.Tr>
				}
				setPrintData={setPrintData}
			/>

			<Modal
				opened={opened}
				onClose={() => {
					setQuantity(0);
					setPrice(0);
					setDrugId("");
					close();
				}}
				title='Add drug purchase'
			>
				<form
					className='relative gap-2 flex flex-wrap'
					onSubmit={async (e) => {
						e.preventDefault();
						await dPost(`/drugsinventory/purchases`, {
							drug_id,
							quantity,
							price,
							name: drugName,
							date: new Date(date).toISOString(),
							month: months[new Date(date).getMonth()],
							year: new Date(date).getFullYear(),
						});
						setQuantity(0);
						setPrice(0);
						setDrugId("");
						setUpdated(!updated);
						close();
					}}
				>
					<Select
						label='Drugs List'
						placeholder='Select a drug'
						data={drugsList}
						allowDeselect={false}
						className='w-full'
						value={drug_id}
						onChange={(value: any) => {
							const found = drugsList?.find((d) => {
								return d?.value == value;
							});
							setDrugId(value);
							setDrugName(found?.label);
						}}
						required
						searchable
						nothingFoundMessage='Nothing found...'
					/>
					<DatePickerInput
						label='Purchase date'
						placeholder='Pick date'
						value={new Date()}
						onChange={(value: any) => {
							setDate(new Date(value).toISOString());
						}}
					/>
					<NumberInput
						label='Quantity'
						placeholder='quantity bought...'
						value={quantity}
						className='w-24'
						required
						onChange={(value) => {
							setQuantity(Number(value));
						}}
						thousandSeparator
					/>
					<NumberInput
						label='Price'
						placeholder='price bought...'
						value={price}
						required
						prefix='N '
						thousandSeparator
						className='w-32'
						onChange={(value) => {
							setPrice(Number(value));
						}}
					/>

					<Group mt={20} justify='end'>
						<Button
							onClick={() => {
								setQuantity(0);
								setPrice(0);
								setDrugId("");
								close();
							}}
							color='black'
						>
							Cancel
						</Button>
						<Button
							disabled={drug_id == "" && quantity < 1 && price < 1}
							type='submit'
						>
							Add purchase
						</Button>
					</Group>
				</form>
				<LoadingOverlay visible={pLoading} />
			</Modal>
			<Modal
				opened={eOpened}
				onClose={() => {
					setEPrice(0);
					setEquantity(0);
					eClose();
				}}
				title='Edit Purchase'
			>
				<form
					className='relative space-y-2'
					onSubmit={async (e) => {
						e.preventDefault();
						await dPost(`/drugsinventory/purchases/edit/${eData?.id}`, {
							quantity: Equantity,
							price: eprice,
							date: new Date(edate).toISOString(),
						});
						setEPrice(0);
						setEquantity(0);
						setUpdated(!updated);
						eClose();
					}}
				>
					<TextInput
						label='Name'
						placeholder='Drug name...'
						defaultValue={eData?.drug?.name}
						disabled
					/>
					<DatePickerInput
						label='Purchase date'
						placeholder='Pick date'
						value={new Date(edate)}
						onChange={(value: any) => {
							setEDate(new Date(value).toISOString());
						}}
					/>
					<NumberInput
						label='Quantity'
						placeholder='quantity bought...'
						value={Equantity}
						onChange={(value) => {
							setEquantity(Number(value));
						}}
						thousandSeparator
					/>
					<NumberInput
						label='Price'
						placeholder='price bought...'
						value={eprice}
						onChange={(value) => {
							setEPrice(Number(value));
						}}
						prefix='N '
						thousandSeparator
					/>

					<Group mt={20} justify='end'>
						<Button
							onClick={() => {
								setEPrice(0);
								setEquantity(0);
								eClose();
							}}
							color='black'
						>
							Cancel
						</Button>
						<Button type='submit'>Update purchase</Button>
					</Group>
				</form>
				<LoadingOverlay visible={pLoading} />
			</Modal>
		</main>
	);
};

export default DrugPurchase;
