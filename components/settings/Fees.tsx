/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import PaginatedTable from "../PaginatedTable";
import {
	Button,
	Table,
	rem,
	ActionIcon,
	Modal,
	TextInput,
	Group,
	LoadingOverlay,
	NumberInput,
} from "@mantine/core";
import { Pencil } from "lucide-react";
import { useDisclosure } from "@mantine/hooks";
import { useFetch, usePostNormal } from "@/queries";

const Fees = () => {
	const { loading, fetch, data } = useFetch();
	const { loading: pLoading, post } = usePostNormal();
	const [opened, { open, close }] = useDisclosure(false);
	const [queryData, setQueryData] = useState<any[]>(data);
	const [sortedData, setSortedData] = useState<any[]>([]);
	const [name, setName] = useState("");
	const [amount, setAmount] = useState(0);
	const [eID, setEID] = useState<string>("");
	const [Ename, setEName] = useState<string>("");
	const [Eamount, setEAmount] = useState<number>(0);
	const rows = sortedData?.map((row, i: number) => (
		<Table.Tr key={row?.id}>
			<Table.Td>{i + 1}</Table.Td>
			<Table.Td className='font-semibold'>{row?.name}</Table.Td>
			<Table.Td className='font-semibold'>{row?.amount}</Table.Td>

			<Table.Td>
				<ActionIcon
					onClick={() => {
						open();
						setEID(row?.id);
						setEName(row?.name);
					}}
				>
					<Pencil style={{ width: rem(14), height: rem(14) }} />
				</ActionIcon>
			</Table.Td>
		</Table.Tr>
	));
	useEffect(() => {
		async function getAll() {
			const { data } = await fetch("/settings/fees");
			setQueryData(data);
		}
		getAll();
	}, []);

	return (
		<main className='space-y-6 py-4'>
			<section className='flex items-end justify-between'>
				<h2 className='text-xl font-bold'>Fees</h2>
				<form
					className='flex gap-6'
					onSubmit={async (e) => {
						e.preventDefault();
						await post("/settings/fees", {
							name,
							amount,
						});
						const { data } = await fetch("/settings/fees");
						setQueryData(data);
						setName("");
					}}
				>
					<TextInput
						label='Name'
						placeholder='Fee name...'
						value={name}
						required
						onChange={(e) => {
							setName(e.currentTarget.value);
						}}
					/>
					<NumberInput
						label='Price'
						placeholder='Fee amount...'
						value={amount}
						min={0}
						required
						onChange={(value: any) => {
							setAmount(value);
						}}
					/>

					<Group mt={20} justify='end'>
						<Button disabled={!name} type='submit'>
							Add fee
						</Button>
					</Group>
				</form>
			</section>
			<PaginatedTable
				headers={["S/N", "Name", "Amount", "Actions"]}
				placeholder='Search by name'
				sortedData={sortedData}
				rows={rows}
				showSearch={true}
				showPagination={true}
				data={queryData}
				setSortedData={setSortedData}
				tableLoading={loading}
			/>

			<Modal opened={opened} onClose={close} title='Edit Fee'>
				<form
					className='relative'
					onSubmit={async (e) => {
						e.preventDefault();
						await post(`/settings/fees/edit/${eID}`, {
							name: Ename,
							amount: Eamount,
						});
						const { data } = await fetch("/settings/fees");
						setQueryData(data);
						close();
					}}
				>
					<TextInput
						label='Name'
						placeholder='Fees name...'
						value={Ename}
						onChange={(e) => {
							setEName(e.currentTarget.value);
						}}
					/>
					<NumberInput
						label='Price'
						placeholder='Fee amount...'
						value={Eamount}
						min={0}
						required
						onChange={(value: any) => {
							setEAmount(value);
						}}
					/>
					<Group mt={20} justify='end'>
						<Button onClick={close} color='black'>
							Cancel
						</Button>
						<Button disabled={!Ename} type='submit'>
							Update Fee
						</Button>
					</Group>
				</form>
				<LoadingOverlay visible={pLoading} />
			</Modal>
		</main>
	);
};

export default Fees;
