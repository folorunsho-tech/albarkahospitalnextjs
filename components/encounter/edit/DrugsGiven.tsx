/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useFetch, useEditT } from "@/queries";
import { userContext } from "@/context/User";

import {
	ActionIcon,
	Button,
	LoadingOverlay,
	NumberFormatter,
	NumberInput,
	ScrollArea,
	Select,
	Table,
} from "@mantine/core";
import { IconPencil, IconReload } from "@tabler/icons-react";
import { useEffect, useState, useContext } from "react";
import { curYear, curMonth } from "@/lib/ynm";

const DrugsGiven = ({ enc_id }: { enc_id: string | null }) => {
	const { user } = useContext(userContext);
	const { fetch } = useFetch();
	const { edit, loading } = useEditT();
	const [drugsGiven, setDrugsGiven] = useState<any[]>([]);
	const [drugId, setDrugId] = useState("");
	const [drugName, setDrugName] = useState("");
	const [selectedDrug, setSelectedDrug] = useState<any | null | undefined>(
		null
	);
	const [toEdit, setToEdit] = useState<any | null | undefined>(null);
	const [data, setData] = useState<any | null | undefined>(null);
	const [drugQnty, setDrugQnty] = useState(0);
	const [drugRate, setDrugRate] = useState(0);
	const [drugsList, setDrugsList] = useState([]);
	const [drugM, setDrugM] = useState([]);
	const getAll = async () => {
		const { data } = await fetch("/drugsinventory");
		const { data: enc } = await fetch(`/encounters/${enc_id}`);
		setDrugsList(data);
		const sorted = data?.map((drug: any) => {
			return {
				value: drug?.id,
				label: `${drug?.drug?.name}`,
				disabled: drug?.stock_qty < 1 ? true : false,
			};
		});
		setDrugM(sorted);
		const sortedDrug = enc?.drugsGiven?.map((d: any) => {
			return {
				id: d?.id,
				inv: d?.drug_id,
				name: d?.name,
				rate: d?.rate,
				prev: d?.quantity,
				added: 0,
				quantity: d?.quantity,
				price: Number(d?.rate) * Number(d?.quantity),
			};
		});
		setData(enc?.drugsGiven);
		setDrugsGiven(sortedDrug);
	};
	useEffect(() => {
		getAll();
	}, []);
	const total = drugsGiven?.reduce((prev, curr) => {
		return Number(prev) + Number(curr?.price);
	}, 0);
	return (
		<form
			className='space-y-6 my-4'
			onSubmit={async (e) => {
				e.preventDefault();
				await edit("/encounters/edit/drugs/" + enc_id, {
					drugs: drugsGiven,
					stock_updates: drugsGiven.map((drug) => {
						return {
							id: drug?.inv,
							stock_qty: drug?.curr_stock,
						};
					}),
					month: curMonth,
					year: curYear,
				});
			}}
		>
			{user?.role == "admin" && (
				<section className='flex items-end gap-4'>
					<Select
						label='Drugs Given'
						placeholder='Select one or more drugs given'
						data={drugM}
						className='w-[20rem]'
						value={selectedDrug?.id}
						disabled
					/>
					<NumberInput
						label='Current Stock'
						placeholder='stock'
						value={selectedDrug?.stock_qty}
						thousandSeparator
						disabled
						className='w-24'
					/>
					<NumberInput
						label='Added Quantity'
						placeholder='quantity'
						min={-toEdit?.quantity}
						max={selectedDrug?.stock_qty}
						stepHoldDelay={500}
						disabled={!toEdit?.id}
						stepHoldInterval={100}
						thousandSeparator
						className='w-32'
						value={drugQnty}
						onChange={(value) => {
							setDrugQnty(Number(value));
						}}
					/>
					<NumberInput
						label='Rate'
						thousandSeparator
						placeholder='rate'
						min={1}
						disabled={!toEdit?.id}
						prefix='NGN '
						stepHoldDelay={500}
						stepHoldInterval={100}
						value={drugRate}
						onChange={(value) => {
							setDrugRate(Number(value));
						}}
					/>
					<Button
						disabled={!selectedDrug?.id}
						color='teal'
						onClick={() => {
							const filtered = drugsGiven.filter((d: any) => drugId !== d?.id);
							setDrugsGiven([
								{
									id: drugId,
									inv: toEdit?.drug_id,
									name: drugName,
									rate: drugRate,
									added: drugQnty,
									prev: toEdit?.quantity,
									quantity: toEdit?.quantity + drugQnty,
									curr_stock:
										Number(selectedDrug?.stock_qty) - Number(drugQnty),
									price:
										Number(drugRate) * (Number(toEdit?.quantity) + drugQnty),
								},
								...filtered,
							]);
						}}
					>
						Update list
					</Button>
					<Button
						color='orange'
						leftSection={<IconReload />}
						onClick={() => {
							getAll();
							setDrugRate(0);
							setDrugQnty(0);
							setSelectedDrug(null);
							setToEdit(null);
						}}
					>
						Reset
					</Button>
				</section>
			)}
			<ScrollArea h={250}>
				<Table>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>S/N</Table.Th>
							<Table.Th>Name</Table.Th>
							<Table.Th>Rate</Table.Th>
							<Table.Th>Prev Quantity</Table.Th>
							<Table.Th>Added Quantity</Table.Th>
							<Table.Th>Total Quantity</Table.Th>
							<Table.Th>Price</Table.Th>
							<Table.Th></Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>
						{drugsGiven?.map((drug: any, i: number) => (
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
								<Table.Td>{drug?.prev}</Table.Td>
								<Table.Td>{drug?.added}</Table.Td>
								<Table.Td>{drug?.quantity}</Table.Td>
								<Table.Td>
									<NumberFormatter
										prefix='NGN '
										value={Number(drug?.rate) * Number(drug?.quantity)}
										thousandSeparator
									/>
								</Table.Td>
								{user?.role == "admin" && (
									<Table.Td>
										<ActionIcon
											color='teal'
											onClick={() => {
												const found = drugsList?.find(
													(d: any) => d?.drug?.name == drug?.name
												);
												const foundE = data?.find(
													(d: any) => d?.id == drug?.id
												);
												setSelectedDrug(found);
												setToEdit(foundE);
												setDrugId(drug?.id);
												setDrugName(drug?.name);
												setDrugRate(drug?.rate);
											}}
										>
											<IconPencil />
										</ActionIcon>
									</Table.Td>
								)}
							</Table.Tr>
						))}
					</Table.Tbody>
					<Table.Tfoot className='bg-gray-300 font-bold'>
						<Table.Tr>
							<Table.Td></Table.Td>
							<Table.Td></Table.Td>
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
			{user?.role == "admin" && (
				<Button disabled={!toEdit?.id} color='teal' w={200} type='submit'>
					Update drugs
				</Button>
			)}
			<LoadingOverlay visible={loading} />
		</form>
	);
};

export default DrugsGiven;
