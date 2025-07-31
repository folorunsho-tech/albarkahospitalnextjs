"use client";

import { useEffect, useState } from "react";
import { useFetch, usePostT } from "@/queries";
import {
	Button,
	Group,
	LoadingOverlay,
	NumberInput,
	ScrollArea,
	Select,
	TextInput,
} from "@mantine/core";
import { months } from "@/lib/ynm";
import { useRouter } from "next/navigation";
import Diagnosis from "../create/Diagnosis";
import DrugsGiven from "../create/DrugsGiven";
import Labtest from "../create/Labtest";

import { format } from "date-fns";
import { DatePickerInput } from "@mantine/dates";
const Operation = ({
	careId,
	patient_id,
	follow_up_to,
	enc_date,
}: {
	careId: string;
	patient_id: string;
	follow_up_to: string | null;
	enc_date: Date | null;
}) => {
	const { fetch } = useFetch();
	const { post, loading } = usePostT();
	const [drugsGiven, setDrugsGiven] = useState<any[]>([]);
	const [labTest, setLabTest] = useState([]);
	const [diagnosis, setDiagnosis] = useState([]);
	const [outcome, setOutcome] = useState<null | string>(null);
	const [posted, setPosted] = useState(false);
	const [proceduresList, setProceduresList] = useState([]);
	const [procedureId, setProcedureId] = useState("");
	const [anaesthesia, setAnaesthesia] = useState("");
	const [Opoutcome, setOpOutcome] = useState("");
	const [surgeon, setSurgeon] = useState("");
	const [assistant, setAssistant] = useState("");
	const [proc_date, setOpDate] = useState<any>(null);
	const [adm_date, setAdmDate] = useState<any>(null);
	const [discharged_on, setDischargedOn] = useState<any>(null);
	const [nok_phone, setNokPhone] = useState<any>("");
	const [ward_matron, setMatron] = useState<any>("");
	const [admitted_for, setAdmittedFor] = useState<number | string>();
	const router = useRouter();

	const handleSubmit = async () => {
		await post("/encounters/create/operation", {
			careId,
			patient_id,
			month: months[new Date().getMonth()],
			year: new Date().getFullYear(),
			time: format(new Date(), "p"),
			diagnosis,
			drugsGiven,
			labTest,
			enc_date,
			outcome,
			follow_up_to,
			admission: {
				adm_date,
				nok_phone,
				admitted_for,
				discharged_on,
				ward_matron,
			},
			admitted: outcome == "Admitted" ? true : false,
			stock_updates: drugsGiven.map((drug) => {
				return {
					id: drug?.id,
					stock_qty: drug?.curr_stock,
				};
			}),
			operation: {
				procedureId,
				proc_date,
				anaesthesia,
				outcome: Opoutcome,
				surgeon,
				assistant,
			},
		});
		setPosted(true);
		setDrugsGiven([]);
		setLabTest([]);
		setDiagnosis([]);
		setOutcome(null);
		setPosted(false);
	};
	const getAll = async () => {
		const { data } = await fetch("/settings/procedures");
		const mapped = data?.map((proc: any) => {
			return {
				value: proc?.id,
				label: proc?.name,
			};
		});
		setProceduresList(mapped);
	};
	useEffect(() => {
		getAll();
	}, []);
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				handleSubmit();
			}}
		>
			<ScrollArea h={500}>
				<section className='space-y-4'>
					<Diagnosis setDiagnosis={setDiagnosis} diagnosis={diagnosis} />
					<div className='flex flex-col gap-2'>
						<label className='font-bold underline'>Opeartion</label>
						<div className='flex gap-4 flex-wrap'>
							<Select
								label='Operation Type'
								placeholder='Select a type'
								data={proceduresList}
								value={procedureId}
								clearable
								onFocus={getAll}
								onChange={(value: any) => {
									setProcedureId(value);
								}}
								searchable
								required
								nothingFoundMessage='Nothing found...'
							/>
							<DatePickerInput
								label='Operation date'
								placeholder='proc. date...'
								className='w-44'
								value={proc_date}
								onChange={setOpDate}
								clearable
								required
							/>
							<Select
								label='Anaesthesia'
								placeholder='Select a type'
								data={["GA", "LA"]}
								value={anaesthesia}
								clearable
								onChange={(value: any) => {
									setAnaesthesia(value);
								}}
								nothingFoundMessage='Nothing found...'
							/>
							<Select
								label='Operation Outcome'
								placeholder='Select an outcome'
								data={["Alive", "Dead"]}
								value={Opoutcome}
								clearable
								onChange={(value: any) => {
									setOpOutcome(value);
								}}
								nothingFoundMessage='Nothing found...'
							/>
							<TextInput
								label='Surgeon'
								placeholder='surgeon'
								onChange={(e) => {
									setSurgeon(e.currentTarget.value);
								}}
								value={surgeon}
							/>
							<TextInput
								label='Assistant'
								placeholder='assistant'
								onChange={(e) => {
									setAssistant(e.currentTarget.value);
								}}
								value={assistant}
							/>
						</div>
					</div>
					<div className='flex flex-col gap-2'>
						<label className='font-bold underline'>Pharmacy</label>
						<DrugsGiven
							setDrugsGiven={setDrugsGiven}
							drugsGiven={drugsGiven}
							posted={posted}
						/>
					</div>
					<div className='flex flex-col gap-2'>
						<label className='font-bold underline'>Lab</label>
						<Labtest setLabTest={setLabTest} labTest={labTest} />
					</div>

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
						onChange={(value) => {
							setOutcome(value);
						}}
					/>
					{outcome == "Admitted" && (
						<div className='flex flex-col gap-2'>
							<label className='font-bold underline'>Admission</label>
							<div className='flex flex-wrap gap-4'>
								<DatePickerInput
									value={adm_date}
									onChange={setAdmDate}
									label='Admission date'
									placeholder='adm date'
									className='w-44'
									allowDeselect
									clearable
									closeOnChange={false}
								/>
								<TextInput
									label='NOK Phone'
									placeholder='phone number'
									value={nok_phone}
									onChange={(e) => {
										setNokPhone(e.currentTarget.value);
									}}
								/>
								<NumberInput
									label='Days of Admission'
									placeholder='Days of Admission'
									value={admitted_for}
									suffix=' Days'
									onChange={(value) => {
										setAdmittedFor(value);
									}}
								/>
								<DatePickerInput
									value={discharged_on}
									onChange={setDischargedOn}
									label='Date of Discharge'
									placeholder='Discharged date'
									className='w-44'
									allowDeselect
									clearable
									closeOnChange={false}
								/>
								<TextInput
									label='Ward Matron'
									placeholder='Ward Matron'
									value={ward_matron}
									onChange={(e) => {
										setMatron(e.currentTarget.value);
									}}
								/>
							</div>
						</div>
					)}
				</section>
			</ScrollArea>
			<Group mt={20} justify='start'>
				<Button
					onClick={() => {
						router.push("/ms/encounters");
					}}
					color='black'
				>
					Cancel
				</Button>
				<Button type='submit'>Add encounter</Button>
			</Group>
			<LoadingOverlay visible={loading} />
		</form>
	);
};

export default Operation;
