/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useRef } from "react";
import { useFetch } from "@/queries";
import { ArrowLeft, Printer } from "lucide-react";
import {
	Select,
	Modal,
	Text,
	Button,
	NumberFormatter,
	Table,
} from "@mantine/core";
import { format } from "date-fns";
import { useReactToPrint } from "react-to-print";
import { DatePickerInput } from "@mantine/dates";
import PatientSearch from "@/components/PatientSearch";
import Link from "next/link";
import Others from "@/components/encounter/cares/Others";
import ANC from "@/components/encounter/cares/ANC";
import Delivery from "@/components/encounter/cares/Delivery";
import Immunization from "@/components/encounter/cares/Immunization";
import Operation from "@/components/encounter/cares/Operation";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import convert from "@/lib/numberConvert";
const Create = () => {
	const { fetch } = useFetch();

	const [patientData, setPatientData] = useState<any>(null);
	const [cares, setCares] = useState([]);
	const [care, setCare] = useState("");
	const [careId, setCareId] = useState<string | null>(null);
	const [follow_up_to, setFollowUPTo] = useState<string | null>(null);
	const [follow_ups, setFollowUps] = useState<any[]>([]);
	const [enc_date, setEncDate] = useState<any>(new Date());
	const [prescription, setPrescription] = useState<any>(null);
	const [opened, { open, close }] = useDisclosure(false);
	const contentRef = useRef<HTMLTableElement>(null);
	const reactToPrintFn = useReactToPrint({
		contentRef,
		bodyClass: "print",
		documentTitle: "prescription-list",
	});
	const getFollows = async () => {
		const { data } = await fetch(`/encounters/e/${patientData?.id}/followup`);
		const sorted = data.map((enc: any) => {
			return {
				value: enc?.id,
				label: `${enc?.care?.name} -- ${new Date(
					enc?.enc_date
				).toLocaleDateString()} at ${enc?.time}`,
			};
		});
		setFollowUps(sorted);
	};
	useEffect(() => {
		const getAll = async () => {
			const { data } = await fetch("/settings/care");
			const sorted = data.map((care: { id: string; name: string }) => {
				return {
					value: care.id,
					label: care.name,
				};
			});
			setCares(sorted);
		};
		getAll();
	}, []);

	const getUI = () => {
		if (patientData && careId) {
			if (care == "ANC") {
				return (
					<ANC
						careId={careId}
						patient_id={patientData?.id}
						follow_up_to={follow_up_to}
						enc_date={enc_date}
						setPrescription={setPrescription}
						openModal={open}
					/>
				);
			}
			if (care == "Operation") {
				return (
					<Operation
						careId={careId}
						patient_id={patientData?.id}
						follow_up_to={follow_up_to}
						enc_date={enc_date}
						setPrescription={setPrescription}
						openModal={open}
					/>
				);
			}
			if (care == "Delivery") {
				return (
					<Delivery
						careId={careId}
						patient_id={patientData?.id}
						follow_up_to={follow_up_to}
						enc_date={enc_date}
						setPrescription={setPrescription}
						openModal={open}
					/>
				);
			}
			if (care == "Immunization") {
				return (
					<Immunization
						careId={careId}
						patient_id={patientData?.id}
						follow_up_to={follow_up_to}
						enc_date={enc_date}
						setPrescription={setPrescription}
						openModal={open}
					/>
				);
			}
			return (
				<Others
					careId={careId}
					patient_id={patientData?.id}
					follow_up_to={follow_up_to}
					enc_date={enc_date}
					setPrescription={setPrescription}
					openModal={open}
				/>
			);
		} else {
			return (
				<h2 className='text-xl text-center font-bold'>
					Select patient and care type to continue
				</h2>
			);
		}
	};

	const total = prescription?.reduce(
		(prev: number, curr: { price: number }) => {
			return Number(prev) + Number(curr?.price);
		},
		0
	);
	useEffect(() => {
		if (patientData) {
			setCareId(null);
		}
	}, [patientData]);
	return (
		<section className='space-y-6'>
			<section>
				<div className='flex justify-between items-center'>
					<Link
						className='bg-blue-500 hover:bg-blue-600 p-1 px-2 rounded-lg text-white flex gap-3'
						href='/ms/encounters'
					>
						<ArrowLeft />
						Go back
					</Link>
					<Text size='xl'>Register new encounter</Text>
				</div>
			</section>
			<section className='flex gap-4'>
				<PatientSearch setPatient={setPatientData} />
				<Select
					label='Care type'
					placeholder='Select a care'
					data={cares}
					value={careId}
					onChange={(value: any) => {
						setCareId(value);
						const found: any = cares.find(
							(c: { value: string; label: string }) => c?.value == value
						);
						setCare(found?.label);
					}}
					required
				/>
				<DatePickerInput
					label='Regristration date'
					placeholder='Reg. date...'
					className='w-44'
					value={enc_date}
					onChange={setEncDate}
					required
				/>
				<Select
					placeholder='follow_up_to'
					label='Follow Up To'
					className='w-[20rem]'
					data={follow_ups}
					onFocus={() => {
						getFollows();
					}}
					allowDeselect
					clearable
					onChange={(value) => {
						setFollowUPTo(value);
					}}
					nothingFoundMessage='No previous encounters'
				/>
			</section>
			{patientData && (
				<section className='flex gap-4 flex-wrap items-center'>
					<div className='flex gap-3 items-center'>
						<h3 className='font-semibold'>Hospital No: </h3>
						<Text>{patientData?.hosp_no}</Text>
					</div>
					<div className='flex gap-3 items-center'>
						<h3 className='font-semibold'>Patient Name: </h3>
						<Text>{patientData?.name}</Text>
					</div>
					<div className='flex gap-3 items-center'>
						<h3 className='font-semibold'>Sex: </h3>
						<Text>{patientData?.sex}</Text>
					</div>
					<div className='flex gap-3 items-center'>
						<h3 className='font-semibold'>Age: </h3>
						<Text>{patientData?.age}</Text>
					</div>
					<div className='flex gap-3 items-center'>
						<h3 className='font-semibold'>Address: </h3>
						<Text>{patientData?.town?.name}</Text>
					</div>
					<div className='flex gap-3 items-center'>
						<h3 className='font-semibold'>Group: </h3>
						<Text>{patientData?.groups?.name}</Text>
					</div>
				</section>
			)}

			{getUI()}
			<Modal
				opened={opened}
				onClose={close}
				title='Print Prescription'
				size='auto'
				closeOnClickOutside={false}
			>
				<Button
					onClick={() => {
						reactToPrintFn();
					}}
				>
					<Printer />
				</Button>
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
						<p>{format(new Date(), "d/MM/Y , pp")}</p>
					</div>
					<label htmlFor='drugs' className='font-bold text-xs underline'>
						Prescriptions for {patientData?.name} on{" "}
						{format(new Date(), "dd/MM/yyyy, p")}
					</label>
					<section className='printable text-xs'>
						<Table id='drugs'>
							<Table.Thead>
								<Table.Tr>
									<Table.Th>Name</Table.Th>
									<Table.Th>Rate</Table.Th>
									<Table.Th>Quantity</Table.Th>
									<Table.Th>Price</Table.Th>
								</Table.Tr>
							</Table.Thead>
							<Table.Tbody>
								{prescription?.map((drug: any, i: number) => (
									<Table.Tr key={drug?.id}>
										<Table.Td>{drug?.name}</Table.Td>
										<Table.Td>
											<NumberFormatter
												value={Number(drug?.rate)}
												thousandSeparator
											/>
										</Table.Td>
										<Table.Td>{drug?.quantity}</Table.Td>
										<Table.Td>
											<NumberFormatter
												value={Number(drug?.rate) * Number(drug?.quantity)}
												thousandSeparator
											/>
										</Table.Td>
									</Table.Tr>
								))}
								<Table.Tr className='bg-gray-300 font-bold'>
									<Table.Td></Table.Td>
									<Table.Td></Table.Td>
									<Table.Td>Total: </Table.Td>
									<Table.Td>
										<NumberFormatter value={total} thousandSeparator />
									</Table.Td>
								</Table.Tr>
							</Table.Tbody>
						</Table>
						<Text fw={600}>
							Total amount in words:
							<i className='text-sm pl-2 capitalize'>
								{convert(Number(total))} Naira
							</i>
						</Text>
					</section>
				</div>
			</Modal>
		</section>
	);
};

export default Create;
