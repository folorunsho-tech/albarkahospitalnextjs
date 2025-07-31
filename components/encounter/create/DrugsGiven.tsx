/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useFetch } from "@/queries";
import {
	ActionIcon,
	Button,
	NumberFormatter,
	NumberInput,
	ScrollArea,
	Select,
	Table,
} from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
const DrugsGiven = ({
	setDrugsGiven,
	drugsGiven,
	posted,
}: {
	setDrugsGiven: any;
	drugsGiven: any[];
	posted: boolean;
}) => {
	const { fetch } = useFetch();
	const [drugId, setDrugId] = useState("");
	const [search, setSearch] = useState("");
	const [drugName, setDrugName] = useState("");
	const [selectedDrug, setSelectedDrug] = useState<any | null | undefined>(
		null
	);
	const [drugQnty, setDrugQnty] = useState(0);
	const [drugRate, setDrugRate] = useState(0);
	const [drugsList, setDrugsList] = useState([]);
	const getAll = async () => {
		const { data } = await fetch("/drugsinventory");
		setDrugsList(data);
	};
	useEffect(() => {
		getAll();
	}, [posted]);
	const total = drugsGiven.reduce((prev, curr) => {
		return Number(prev) + Number(curr?.price);
	}, 0);
	return (
		<main className='space-y-4'>
			<section className='flex items-end gap-4'>
				<Select
					label='Drugs Given'
					placeholder='Search and select for drugs given'
					data={drugsList?.map((drug: any) => {
						return {
							value: drug?.id,
							label: `${drug?.drug?.name} `,
						};
					})}
					className='w-[18rem]'
					clearable
					onFocus={() => {
						getAll();
					}}
					value={drugId}
					onSearchChange={setSearch}
					onChange={(value: any) => {
						const found: any = drugsList.find((drug: any) => drug?.id == value);
						setDrugId(value);
						setDrugName(found.drug?.name);
						setSelectedDrug(found);
					}}
					searchValue={search}
					searchable
					nothingFoundMessage='Nothing found...'
				/>
				<NumberInput
					label='Stock'
					placeholder='stock'
					value={selectedDrug?.stock_qty}
					thousandSeparator
					disabled
					className='w-24'
				/>
				<NumberInput
					label='Quantity'
					placeholder='quantity'
					min={0}
					max={selectedDrug?.stock_qty}
					stepHoldDelay={500}
					stepHoldInterval={100}
					thousandSeparator
					className='w-32'
					defaultValue={0}
					value={drugQnty}
					onChange={(value) => {
						setDrugQnty(Number(value));
					}}
				/>
				<NumberInput
					label='Rate'
					thousandSeparator
					placeholder='rate'
					min={0}
					prefix='NGN '
					// className='w-32'
					stepHoldDelay={500}
					stepHoldInterval={100}
					value={drugRate}
					defaultValue={0}
					onChange={(value) => {
						setDrugRate(Number(value));
					}}
				/>
				<Button
					disabled={!drugId}
					onClick={() => {
						const filtered = drugsGiven.filter((d: any) => drugId !== d?.id);
						setDrugsGiven([
							{
								id: drugId,
								name: drugName,
								rate: drugRate,
								quantity: drugQnty,
								curr_stock: Number(selectedDrug?.stock_qty) - Number(drugQnty),
								price: Number(drugRate) * Number(drugQnty),
							},
							...filtered,
						]);
						setDrugQnty(0);
						setDrugRate(0);
						setDrugId("");
						setSearch("");
						setSelectedDrug(null);
					}}
				>
					Add to list
				</Button>
			</section>
			<ScrollArea h={200}>
				<Table>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>S/N</Table.Th>
							<Table.Th>Name</Table.Th>
							<Table.Th>Rate</Table.Th>
							<Table.Th>Quantity</Table.Th>
							<Table.Th>Price</Table.Th>
							<Table.Th></Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>
						{drugsGiven.map((drug: any, i: number) => (
							<Table.Tr key={drug?.id}>
								<Table.Td>{i + 1}</Table.Td>
								<Table.Td>{drug?.name}</Table.Td>
								<Table.Td>
									<NumberFormatter
										prefix='NGN '
										value={Number(drug?.rate)}
										thousandSeparator
									/>
								</Table.Td>
								<Table.Td>{drug?.quantity}</Table.Td>
								<Table.Td>
									<NumberFormatter
										prefix='NGN '
										value={Number(drug?.rate) * Number(drug?.quantity)}
										thousandSeparator
									/>
								</Table.Td>
								<Table.Td>
									<ActionIcon
										color='red'
										onClick={() => {
											const filtered = drugsGiven.filter(
												(d: any) => drug?.id !== d?.id
											);
											setDrugsGiven(filtered);
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
							<Table.Td></Table.Td>
							<Table.Td></Table.Td>
							<Table.Td>Total: </Table.Td>
							<Table.Td>
								<NumberFormatter
									prefix='NGN '
									value={total}
									thousandSeparator
								/>
							</Table.Td>
						</Table.Tr>
					</Table.Tfoot>
				</Table>
			</ScrollArea>
		</main>
	);
};

export default DrugsGiven;
