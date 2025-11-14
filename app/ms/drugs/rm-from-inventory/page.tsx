/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import PaginatedTable from "@/components/PaginatedTable";
import {
	Button,
	Table,
	Modal,
	LoadingOverlay,
	Checkbox,
	Text,
	Group,
	Stack,
} from "@mantine/core";
import { ArrowLeft, Trash2Icon } from "lucide-react";
import { useFetch, useDelete } from "@/queries";
import Link from "next/link";
import { useDisclosure } from "@mantine/hooks";
const page = () => {
	const { loading, fetch } = useFetch();
	const { loading: dLoading, remove } = useDelete();
	const [opened, { open, close }] = useDisclosure(false);
	const [queryData, setQueryData] = useState<any[]>([]);
	const [sortedData, setSortedData] = useState<any[]>(queryData);
	const [ids, setIds] = useState<string[]>([]);
	const filter = (checked: boolean, id: string) => {
		const filtered = ids.filter((i) => i !== id);
		if (checked) {
			setIds([...filtered, id]);
		} else {
			setIds(filtered);
		}
	};
	const rows = sortedData?.map((row, i: number) => (
		<Table.Tr key={row?.id}>
			<Table.Td className='bg-gray-300'>
				<Checkbox
					onChange={(e) => {
						filter(e.currentTarget.checked, row?.id);
					}}
					checked={ids.includes(row?.id)}
				/>
			</Table.Td>
			<Table.Td>{i + 1}</Table.Td>
			<Table.Td className='font-semibold'>{row?.drug?.name}</Table.Td>
			<Table.Td className='font-semibold'>{row?._count?.givenHistory}</Table.Td>
		</Table.Tr>
	));
	async function getAll() {
		const { data }: { data: any[] | null } = await fetch(
			"/drugsinventory/remove"
		);
		data?.sort((a, b) => b?._count?.givenHistory - a?._count?.givenHistory);
		setQueryData(data ?? []);
	}
	useEffect(() => {
		getAll();
	}, []);
	const deleteFromInv = async (ids: string[]) => {
		await remove("/drugsinventory/remove/many", {
			drugs: ids,
		});
		close();
		setIds([]);
		getAll();
	};
	return (
		<main className='space-y-6'>
			<div className='flex gap-4 items-center  w-full '>
				<Link
					className='bg-blue-500 w-48 hover:bg-blue-600 p-1 px-2 rounded-md text-white flex gap-3'
					href='/ms/drugs'
				>
					<ArrowLeft />
					Go back
				</Link>
				<div className='flex justify-between w-full items-center'>
					<h2 className='text-xl font-bold'>Remove from Inventory</h2>
					<Button leftSection={<Trash2Icon />} color='red' onClick={open}>
						Remove {ids.length} from inventory
					</Button>
				</div>
			</div>
			<PaginatedTable
				headers={["", `S/N (${queryData.length})`, "Name", "Prescriptions"]}
				placeholder='Search by name'
				sortedData={sortedData}
				depth='drug'
				rows={rows}
				showSearch={true}
				showPagination={false}
				data={queryData}
				setSortedData={setSortedData}
				tableLoading={loading}
				display={400}
			/>
			<Modal
				opened={opened}
				onClose={close}
				title='Remove drugs from inventory'
			>
				<Stack>
					<Text size='lg' fw={600} c='red'>
						Are you sure you want to remove {ids.length} drugs from inventory?
					</Text>
					<Text>This action is irreversible !!!!</Text>
					<Group>
						<Button
							leftSection={<Trash2Icon />}
							color='red'
							onClick={() => {
								deleteFromInv(ids);
							}}
							disabled={ids.length < 1}
						>
							Delete {ids.length} drugs
						</Button>
						<Button
							onClick={() => {
								close();
								setIds([]);
							}}
							color='black'
						>
							Cancel
						</Button>
					</Group>
				</Stack>
			</Modal>
			<LoadingOverlay visible={dLoading} />
		</main>
	);
};

export default page;
