/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useFetch } from "@/queries";
import { ArrowLeft } from "lucide-react";
import { Select, Text } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import PatientSearch from "@/components/PatientSearch";
import Link from "next/link";
import Others from "@/components/encounter/cares/Others";
import ANC from "@/components/encounter/cares/ANC";
import Delivery from "@/components/encounter/cares/Delivery";
import Immunization from "@/components/encounter/cares/Immunization";
import Operation from "@/components/encounter/cares/Operation";

const Create = () => {
	const { fetch } = useFetch();
	const [patientData, setPatientData] = useState<any>(null);
	const [cares, setCares] = useState([]);
	const [care, setCare] = useState("");
	const [careId, setCareId] = useState("");
	const [follow_up_to, setFollowUPTo] = useState<string | null>(null);
	const [follow_ups, setFollowUps] = useState<any[]>([]);
	const [enc_date, setEncDate] = useState<any>(new Date());

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
					/>
				);
			}
			return (
				<Others
					careId={careId}
					patient_id={patientData?.id}
					follow_up_to={follow_up_to}
					enc_date={enc_date}
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
					allowDeselect={false}
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

			{getUI()}
		</section>
	);
};

export default Create;
