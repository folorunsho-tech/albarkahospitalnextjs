/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, Suspense } from "react";
import { useFetch } from "@/queries";
import {
	ArrowLeft,
	BriefcaseMedical,
	Cross,
	Hospital,
	Scissors,
	Syringe,
	TestTubes,
} from "lucide-react";
import { Select, Text, Tabs, rem } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import Diagnosis from "@/components/encounter/edit/Diagnosis";
import DrugsGiven from "@/components/encounter/edit/DrugsGiven";
import Labtest from "@/components/encounter/edit/Labtest";
import Delivery from "@/components/encounter/edit/Delivery";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Admission from "@/components/encounter/edit/Admission";
import { IconWoman } from "@tabler/icons-react";
import Operations from "@/components/encounter/edit/Operations";
import Immunization from "@/components/encounter/edit/Immunization";
import ANC from "@/components/encounter/edit/ANC";

const Edit = () => {
	const { fetch } = useFetch();
	const [patientData, setPatientData] = useState<any>(null);
	const [cares, setCares] = useState([]);
	const [care, setCare] = useState("");
	const [careN, setCareN] = useState("");
	const [outcome, setOutcome] = useState("");
	const [enc_date, setDate] = useState<Date | null | string>(null);
	const [admission, setAdmission] = useState(null);
	const [diags, setDiags] = useState<any[]>([]);

	const searchParams = useSearchParams();
	const id = searchParams.get("id");
	const router = useRouter();
	const getAll = async () => {
		const { data } = await fetch("/settings/care");
		const { data: diags } = await fetch("/settings/diagnosis");
		const sortedD = diags.map((diag: { id: string; name: string }) => {
			return diag.name;
		});
		setDiags(sortedD);
		const { data: found } = await fetch(`/encounters/e/${id}`);
		const sorted = data.map((care: { id: string; name: string }) => {
			return {
				value: care.id,
				label: care.name,
			};
		});
		setPatientData(found?.patient);
		setDate(new Date(found?.enc_date));
		setCares(sorted);
		setCare(found?.care?.id);
		setCareN(found?.care?.name);
		setOutcome(found?.outcome);
		setAdmission(found?.admission);
	};
	useEffect(() => {
		if (id !== "" || id !== null) {
			getAll();
		} else {
			router.push("/ms/encounters");
		}
	}, []);

	const iconStyle = { width: rem(22), height: rem(22) };

	return (
		<Suspense>
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
					</div>
				</section>
				<section className='flex justify-between gap-3'>
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
					</section>

					<Select
						label='Care type'
						placeholder='Select a care'
						data={cares}
						allowDeselect={false}
						value={care}
						disabled
						onChange={(value: any) => {
							setCare(value);
						}}
						nothingFoundMessage='Nothing found...'
					/>
					<DatePickerInput
						label='Regristration date'
						placeholder='Reg. date...'
						className='w-44'
						disabled
						value={enc_date}
						onChange={setDate}
					/>
				</section>
				<section className='flex gap-6'>
					<Select
						placeholder='outcome'
						label='Outcome'
						className='w-max'
						data={[
							"Admitted",
							"DAMA",
							"Dead",
							"Discharged",
							"Police Case",
							"ReferGH",
							"ReferFMC",
							"ReferUITH",
							"Treated",
						]}
						value={outcome}
						disabled
						onChange={(value: any) => {
							setOutcome(value);
						}}
					/>
					{outcome == "Admitted" && (
						<div className='flex flex-col gap-2'>
							<label className='font-bold underline'>Admission</label>
							<Admission admission={admission} />
						</div>
					)}
				</section>
				<main>
					<Tabs defaultValue='diagnosis' keepMounted={false}>
						<Tabs.List>
							<Tabs.Tab
								value='diagnosis'
								leftSection={<BriefcaseMedical style={iconStyle} />}
							>
								Diagnosis
							</Tabs.Tab>
							<Tabs.Tab
								value='drugs'
								leftSection={<Hospital style={iconStyle} />}
							>
								Prescriptions
							</Tabs.Tab>
							<Tabs.Tab
								value='tests'
								leftSection={<TestTubes style={iconStyle} />}
							>
								Lab tests
							</Tabs.Tab>
							{careN == "Delivery" && (
								<Tabs.Tab
									value='delivery'
									leftSection={<Cross style={iconStyle} />}
								>
									Delivery
								</Tabs.Tab>
							)}
							{careN == "Operation" && (
								<Tabs.Tab
									value='operation'
									leftSection={<Scissors style={iconStyle} />}
								>
									Operation
								</Tabs.Tab>
							)}

							{careN == "Immunization" && (
								<Tabs.Tab
									value='immunization'
									leftSection={<Syringe style={iconStyle} />}
								>
									Immunization
								</Tabs.Tab>
							)}
							{careN == "ANC" && (
								<Tabs.Tab
									value='anc'
									leftSection={<IconWoman style={iconStyle} />}
								>
									Antinatal Care
								</Tabs.Tab>
							)}
						</Tabs.List>
						<Tabs.Panel value='diagnosis'>
							<Diagnosis enc_id={id} />
						</Tabs.Panel>
						<Tabs.Panel value='drugs'>
							<DrugsGiven enc_id={id} />
						</Tabs.Panel>
						<Tabs.Panel value='tests'>
							<Labtest enc_id={id} />
						</Tabs.Panel>
						<Tabs.Panel value='delivery'>
							<Delivery enc_id={id} diagnosis={diags} />
						</Tabs.Panel>
						<Tabs.Panel value='operation'>
							<Operations enc_id={id} />
						</Tabs.Panel>
						<Tabs.Panel value='immunization'>
							<Immunization enc_id={id} />
						</Tabs.Panel>
						<Tabs.Panel value='anc'>
							<ANC enc_id={id} />
						</Tabs.Panel>
					</Tabs>
				</main>
			</section>
		</Suspense>
	);
};

export default Edit;
