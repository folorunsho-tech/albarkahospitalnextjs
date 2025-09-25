"use client";
import { useEffect, useState } from "react";
import cx from "clsx";
import {
	Button,
	Checkbox,
	Group,
	LoadingOverlay,
	ScrollArea,
	Table,
	Text,
	TextInput,
} from "@mantine/core";
import classes from "./TableSelection.module.css";
import { useFetch, usePost } from "@/queries";
import { IconSearch } from "@tabler/icons-react";

export default function page() {
	const { fetch } = useFetch();
	const { post, loading } = usePost();
	const [data, setData] = useState<
		{
			sn: number;
			id: string;
			name: string;
		}[]
	>([]);
	const [drugs, setDrugs] = useState<
		{
			sn: number;
			id: string;
			name: string;
		}[]
	>([]);
	const [selection, setSelection] = useState<string[]>([]);
	const toggleRow = (id: string) =>
		setSelection((current) =>
			current.includes(id)
				? current.filter((item) => item !== id)
				: [...current, id]
		);
	const toggleAll = () => {
		setSelection((current) =>
			current.length === data.length ? [] : data.map((item) => item.id)
		);
	};
	const getDrugs = async () => {
		const { data } = await fetch("/settings/drugs");
		const sorted = data.map(
			(
				d: {
					id: string;
					name: string;
				},
				i
			) => {
				return {
					sn: i + 1,
					name: d.name,
					id: d.id,
				};
			}
		);
		setDrugs(sorted);
		setData(sorted);
	};
	const addToInv = async () => {
		const mapped = selection.map((sel) => {
			return { id: sel };
		});
		await post("/drugsinventory/many", { drugs: mapped });
	};
	useEffect(() => {
		getDrugs();
	}, []);
	const rows = data.map((item) => {
		const selected = selection.includes(item.id);
		return (
			<Table.Tr
				key={item.id}
				className={cx({ [classes.rowSelected]: selected })}
			>
				<Table.Td>
					<Checkbox
						checked={selection.includes(item.id)}
						onChange={() => toggleRow(item.id)}
					/>
				</Table.Td>
				<Table.Td>{item.sn}</Table.Td>
				<Table.Td>{item.id}</Table.Td>
				<Table.Td>
					<Text size='sm' fw={500}>
						{item.name}
					</Text>
				</Table.Td>
			</Table.Tr>
		);
	});
	return (
		<main className='space-y-6 relative'>
			<Text size='xl' fw={500}>
				Add drugs to Inventory - Init
			</Text>
			<Group>
				<TextInput
					placeholder='search for drug by name or id'
					className='w-2/3'
					rightSection={<IconSearch />}
					onChange={(e) => {
						const filtered = drugs.filter((drug) => {
							return (
								drug.name
									.toLocaleLowerCase()
									.includes(e.target.value.toLocaleLowerCase()) ||
								drug.id
									.toLocaleLowerCase()
									.includes(e.target.value.toLocaleLowerCase())
							);
						});
						setData(filtered);
					}}
				/>

				<Button
					onClick={() => {
						addToInv();
					}}
					color='teal'
				>
					Add {selection.length} drugs to inventory
				</Button>
			</Group>
			<ScrollArea>
				<Table miw={800} verticalSpacing='sm'>
					<Table.Thead>
						<Table.Tr>
							<Table.Th w={40}>
								<Checkbox
									onChange={toggleAll}
									checked={selection.length === drugs.length}
									indeterminate={
										selection.length > 0 && selection.length !== data.length
									}
								/>
							</Table.Th>
							<Table.Th>S/N</Table.Th>
							<Table.Th>id</Table.Th>
							<Table.Th>Name</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>{rows}</Table.Tbody>
				</Table>
			</ScrollArea>
			<LoadingOverlay visible={loading} />
		</main>
	);
}
