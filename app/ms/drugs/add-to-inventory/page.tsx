/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import PaginatedTable from "@/components/PaginatedTable";
import {
	Button,
	Table,
	rem,
	ActionIcon,
	Modal,
	TextInput,
	Group,
	LoadingOverlay,
	// Drawer,
	// MultiSelect,
} from "@mantine/core";
import { ArrowLeft, Pencil } from "lucide-react";
import { useDisclosure } from "@mantine/hooks";
import { useFetch, usePostNormal } from "@/queries";
import Link from "next/link";
const page = () => {
	const { loading, fetch, data } = useFetch();
	const { loading: pLoading, post } = usePostNormal();
	const [opened, { open, close }] = useDisclosure(false);
	// const [dOpened, { open: dOpen, close: dClose }] = useDisclosure(false);
	const [queryData, setQueryData] = useState<any[]>(data);
	const [sortedData, setSortedData] = useState<any[]>([]);
	const [name, setName] = useState("");
	const [eID, setEID] = useState<string>("");
	const [Ename, setEName] = useState<string>("");
	// const [selectedDrugs, setSelectedDrugs] = useState<string[]>([]);
	// const [drugs, setDrugs] = useState<{ value: string; label: string }[]>([]);
	const rows = sortedData?.map((row, i: number) => (
		<Table.Tr key={row?.id}>
			<Table.Td>{i + 1}</Table.Td>
			<Table.Td className='font-semibold'>{row?.id}</Table.Td>
			<Table.Td className='font-semibold'>{row?.drug?.name}</Table.Td>
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
			const { data } = await fetch("/drugsinventory");
			// const { data: drugs } = await fetch("/settings/drugs");
			// setDrugs(
			// 	drugs?.map((d: { id: string; name: string }) => ({
			// 		value: d.id,
			// 		label: d.name,
			// 	}))
			// );
			setQueryData(data);
		}
		getAll();
	}, []);

	return (
		<main className=''>
			<section className='flex flex-wrap gap-2 items-end justify-between mb-3'>
				<div className='flex gap-4 items-center'>
					<Link
						className='bg-blue-500 hover:bg-blue-600 p-1 px-2 rounded-md text-white flex gap-3'
						href='/ms/drugs'
					>
						<ArrowLeft />
						Go back
					</Link>
					<h2 className='text-xl font-bold'>Add to Inventory</h2>
				</div>
				{/* <Button onClick={dOpen} className='bg-green-600 hover:bg-green-700'>
					Add Existing Drug
				</Button> */}
				<form
					className='flex gap-6 '
					onSubmit={async (e) => {
						e.preventDefault();
						await post("/drugsinventory/single", {
							name,
						});
						const { data } = await fetch("/drugsinventory");
						setQueryData(data);
						setName("");
					}}
				>
					<TextInput
						label='Name'
						placeholder='Drug name...'
						value={name}
						required
						onChange={(e) => {
							setName(e.currentTarget.value);
						}}
					/>

					<Group mt={20} justify='end'>
						<Button disabled={!name} type='submit'>
							Add to Inventory
						</Button>
					</Group>
				</form>
			</section>
			<PaginatedTable
				headers={["S/N", "Id", "Name", "Actions"]}
				placeholder='Search by name'
				sortedData={sortedData}
				depth='drug'
				rows={rows}
				showSearch={true}
				showPagination={true}
				data={queryData}
				setSortedData={setSortedData}
				tableLoading={loading}
			/>

			<Modal opened={opened} onClose={close} title='Edit Drug'>
				<form
					className='relative'
					onSubmit={async (e) => {
						e.preventDefault();
						await post(`/settings/drugs/edit/${eID}`, {
							name: Ename,
						});
						const { data } = await fetch("/settings/drugs");
						setQueryData(data);
						close();
					}}
				>
					<TextInput
						label='Name'
						placeholder='drug name...'
						value={Ename}
						onChange={(e) => {
							setEName(e.currentTarget.value);
						}}
					/>

					<Group mt={20} justify='end'>
						<Button onClick={close} color='black'>
							Cancel
						</Button>
						<Button disabled={!Ename} type='submit'>
							Update Name
						</Button>
					</Group>
				</form>
				<LoadingOverlay visible={pLoading} />
			</Modal>
			{/* <Drawer opened={dOpened} onClose={dClose} title='Add existing Drug'>
				<form
					className='relative'
					onSubmit={async (e) => {
						e.preventDefault();
						await post(`/drugsinventory/many`, {
							drugs: selectedDrugs.map((id) => ({ id })),
						});
						const { data } = await fetch("/drugsinventory");
						setQueryData(data);
						dClose();
					}}
				>
					<MultiSelect
						data={drugs}
						label='Select Drugs'
						placeholder='Search for drugs...'
						value={selectedDrugs}
						onChange={setSelectedDrugs}
						searchable
						nothingFoundMessage='No options'
						maxDropdownHeight={rem(200)}
					/>
					<Button
						className='mt-4'
						disabled={selectedDrugs.length === 0}
						type='submit'
					>
						Add to Inventory
					</Button>
				</form>
			</Drawer> */}
		</main>
	);
};

export default page;
