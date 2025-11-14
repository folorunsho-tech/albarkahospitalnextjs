/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useFetch, useEditT } from "@/queries";

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
import { useEffect, useState, useRef } from "react";
import { curYear, curMonth } from "@/lib/ynm";
import { Printer } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";
import { useReactToPrint } from "react-to-print";

const DrugsGiven = ({ enc_id }: { enc_id: string | null }) => {
	const { fetch } = useFetch();
	const { edit, loading } = useEditT();
	const [drugsGiven, setDrugsGiven] = useState<any[]>([]);
	const [prescription, setPrescription] = useState<any[]>([]);
	const [invId, setInvId] = useState<string | null>(null);
	const [drugName, setDrugName] = useState("");
	const [enc, setEnc] = useState<any | null | undefined>(null);
	const [drugQnty, setDrugQnty] = useState(0);
	const [drugStock, setDrugStock] = useState<number>(0);
	const [givenId, setGivenId] = useState<string | null>(null);
	const [drugPrevQnty, setDrugPrevQnty] = useState(0);
	const [drugRate, setDrugRate] = useState<number | undefined | string>(0);
	const [drugPackage, setDrugPackage] = useState<string | null>("");
	const [drugsList, setDrugsList] = useState([]);
	const [drugM, setDrugM] = useState<any>([]);
	const contentRef = useRef<HTMLTableElement>(null);
	const reactToPrintFn = useReactToPrint({
		contentRef,
		bodyClass: "print",
		documentTitle: "labtest-list",
	});
	const getAll = async () => {
		const { data } = await fetch("/drugsinventory");
		setDrugsList(data);
		const { data: enc } = await fetch(`/encounters/e/${enc_id}`);
		setEnc(enc);
		const sortedDrug: any[] = enc?.drugsGiven?.map((d: any) => {
			return {
				id: d?.id,
				inv: d?.drug_id,
				name: d?.name,
				rate: d?.rate,
				prev: d?.quantity,
				package: d?.package,
				added: 0,
				quantity: d?.quantity,
				price: Number(d?.rate) * Number(d?.quantity),
			};
		});
		const filtered: any[] = data?.map((drug: any) => {
			const isExist = sortedDrug.find((d) => d?.inv == drug?.id);
			return {
				value: drug?.id,
				label: `${drug?.drug?.name}`,
				disabled: isExist || drug?.stock_qty < 1 ? true : false,
			};
		});
		const sorted = filtered.sort((a, b) => a?.disabled - b?.disabled);
		setDrugM(sorted);
		setDrugsGiven(sortedDrug);
		return enc;
	};
	useEffect(() => {
		getAll();
	}, []);
	const total = drugsGiven?.reduce((prev, curr) => {
		return Number(prev) + Number(curr?.price);
	}, 0);
	const handleSubmit = async () => {
		await edit(`/encounters/edit/${enc_id}/drugs`, {
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
		const pres = await getAll();
		setPrescription(pres?.drugsGiven);
	};

	return (
		<section className='space-y-6 my-4'>
			<section className='flex items-end gap-4'>
				<form
					className='flex items-end gap-4'
					onSubmit={(e) => {
						e.preventDefault();
						const filtered = drugsGiven.filter((d: any) => invId !== d?.inv);
						setDrugsGiven([
							{
								id: givenId,
								inv: invId,
								name: drugName,
								rate: drugRate,
								added: drugQnty,
								prev: drugPrevQnty,
								quantity: drugPrevQnty + drugQnty,
								curr_stock: drugStock - drugQnty,
								price: Number(drugRate) * (drugPrevQnty + drugQnty),
								package: drugPackage,
							},
							...filtered,
						]);
						setDrugRate(0);
						setDrugQnty(0);
						setDrugPrevQnty(0);
						setGivenId(null);
						setInvId(null);
						setDrugPackage(null);
						setDrugStock(0);
						setDrugName("");
					}}
				>
					<Select
						label='Drugs Given'
						placeholder='Select one or more drugs given'
						data={drugM}
						className='w-52'
						value={invId}
						onChange={(value) => {
							const found: any = drugsList?.find((d: any) => d?.id == value);
							setInvId(value);
							setDrugName(found?.drug?.name);
							setDrugStock(Number(found?.stock_qty));
						}}
						searchable
						clearable
						required
					/>
					<NumberInput
						label='Current Stock'
						placeholder='stock'
						value={drugStock}
						thousandSeparator
						disabled
						className='w-24'
					/>
					<NumberInput
						label='Added Quantity'
						placeholder='quantity'
						min={-drugQnty}
						max={drugStock}
						stepHoldDelay={500}
						stepHoldInterval={100}
						thousandSeparator
						className='w-32'
						value={drugQnty}
						onChange={(value) => {
							setDrugQnty(Number(value));
						}}
					/>
					<Select
						label='Drug package'
						placeholder='Select package'
						data={[
							"pieces",
							"satchet ",
							"bottle",
							"tin",
							"tube",
							"roll",
							"carton",
						]}
						className='w-40'
						required
						value={drugPackage}
						onChange={(value: any) => {
							setDrugPackage(value);
						}}
						clearable
						searchable
						nothingFoundMessage='Nothing found...'
					/>
					<NumberInput
						label='Rate'
						thousandSeparator
						placeholder='rate'
						min={1}
						prefix='NGN '
						stepHoldDelay={500}
						stepHoldInterval={100}
						value={drugRate}
						onChange={(value) => {
							setDrugRate(Number(value));
						}}
					/>
					<Button disabled={!invId} color='teal' type='submit'>
						Update / add to list
					</Button>
				</form>
				<Button
					color='orange'
					leftSection={<IconReload />}
					onClick={() => {
						getAll();
						setDrugRate(0);
						setDrugQnty(0);
						setDrugPrevQnty(0);
						setGivenId(null);
						setInvId(null);
						setDrugPackage(null);
					}}
				>
					Reset
				</Button>
			</section>

			<div className='flex justify-between'>
				<ScrollArea mah={150}>
					<Table>
						<Table.Thead>
							<Table.Tr>
								<Table.Th>S/N</Table.Th>
								<Table.Th>Name</Table.Th>
								<Table.Th>Rate</Table.Th>
								<Table.Th>Prev Quantity</Table.Th>
								<Table.Th>Added Quantity</Table.Th>
								<Table.Th>New Quantity</Table.Th>
								<Table.Th>Package</Table.Th>
								<Table.Th>Price</Table.Th>
								<Table.Th></Table.Th>
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>
							{drugsGiven?.map((drug: any, i: number) => (
								<Table.Tr key={drug?.inv}>
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
									<Table.Td>{drug?.package}</Table.Td>
									<Table.Td>
										<NumberFormatter
											prefix='NGN '
											value={Number(drug?.rate) * Number(drug?.quantity)}
											thousandSeparator
										/>
									</Table.Td>

									<Table.Td>
										<ActionIcon
											color='teal'
											onClick={() => {
												const found: any = drugsList?.find(
													(d: any) => d?.drug?.name == drug?.name
												);

												setDrugStock(found?.stock_qty);
												setDrugPrevQnty(drug?.prev);
												setDrugQnty(drug?.added);
												setInvId(drug?.inv);
												setGivenId(drug?.id);
												setDrugName(drug?.name);
												setDrugRate(drug?.rate);
												setDrugPackage(drug?.package);
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
				<Button
					leftSection={<Printer size={16} />}
					onClick={reactToPrintFn}
					disabled={prescription.length < 1}
				>
					Print
				</Button>
			</div>
			<Button
				color='teal'
				w={200}
				onClick={() => {
					handleSubmit();
				}}
			>
				Update prescriptions
			</Button>
			<div style={{ display: "none" }}>
				<div id='prescription' ref={contentRef}>
					<div className='flex gap-1 justify-between w-full text-xs mt-4'>
						<Image
							src='/hospital.svg'
							height={45}
							width={50}
							alt='Albarka logo'
							loading='eager'
						/>
						<div className='w-full'>
							<h2 className='font-extrabold font-serif '>ALBARKA HOSPITAL</h2>
							<p className=''>Tel: 08056713362, 08080854480</p>
							<p className='italic'>E-mail: hospitalalbarka@gmail.com</p>
							<p className='italic'>
								Malale road, Off Rofia road, Wawa New Bussa Niger state Nigeria.
							</p>
						</div>
						<p>{format(new Date(), "dd/MM/yyyy , p")}</p>
					</div>
					<label htmlFor='drugs' className='font-bold text-xs underline'>
						Labtest for {enc?.patient?.name} on{" "}
						{format(new Date(), "dd/MM/yyyy, p")}
					</label>
					<section className='printable text-xs'>
						<Table>
							<Table.Thead>
								<Table.Tr>
									<Table.Th>S/N</Table.Th>
									<Table.Th>Name</Table.Th>
									<Table.Th>Package</Table.Th>
									<Table.Th>Quantity</Table.Th>
									<Table.Th>Rate</Table.Th>
									<Table.Th>Price</Table.Th>
								</Table.Tr>
							</Table.Thead>
							<Table.Tbody>
								{prescription?.map((drug: any, i: number) => (
									<Table.Tr key={drug?.id}>
										<Table.Td>{i + 1}</Table.Td>
										<Table.Td>{drug?.name}</Table.Td>
										<Table.Td>{drug?.package}</Table.Td>
										<Table.Td>{drug?.quantity}</Table.Td>
										<Table.Td>
											<NumberFormatter
												prefix='NGN '
												value={Number(drug?.rate)}
												thousandSeparator
											/>
										</Table.Td>

										<Table.Td>
											<NumberFormatter
												prefix='NGN '
												value={Number(drug?.rate) * Number(drug?.quantity)}
												thousandSeparator
											/>
										</Table.Td>
									</Table.Tr>
								))}
							</Table.Tbody>
							<Table.Tfoot>
								<Table.Tr>
									<Table.Td></Table.Td>
									<Table.Td></Table.Td>
									<Table.Td></Table.Td>
									<Table.Td></Table.Td>
									<Table.Td fw={600}>Total: </Table.Td>
									<Table.Td fw={600}>
										<NumberFormatter
											prefix='NGN '
											value={total}
											thousandSeparator
										/>
									</Table.Td>
								</Table.Tr>
							</Table.Tfoot>
						</Table>
					</section>
				</div>
			</div>
			<LoadingOverlay visible={loading} />
		</section>
	);
};

export default DrugsGiven;
