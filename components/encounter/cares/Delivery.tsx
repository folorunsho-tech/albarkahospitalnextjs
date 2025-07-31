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

const Delivery = ({
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
	const { post, loading } = usePostT();
	const [drugsGiven, setDrugsGiven] = useState<any[]>([]);
	const [labTest, setLabTest] = useState([]);
	const [diagnosis, setDiagnosis] = useState([]);
	const [outcome, setOutcome] = useState<null | string>(null);
	const [posted, setPosted] = useState(false);
	const [baby_outcome, setBOutcome] = useState("");
	const [mother_outcome, setMOutcome] = useState("");
	const [parity, setParity] = useState("");
	const [labour_duration, setDuration] = useState("");
	const [delivery_type, setDelivType] = useState("");
	const [placenta_delivery, setPlacenta] = useState("");
	const [apgar_score, setApgarScore] = useState("");
	const [baby_maturity, setBabyMaturity] = useState("");
	const [baby_weight, setBabyWeight] = useState("");
	const [baby_sex, setbabySex] = useState("");
	const [congenital_no, setCongenital] = useState<number | string>("");
	const [midwife, setMidWife] = useState("");
	const [mother_diag, setMDiag] = useState("");
	const [delivery_date, setDelveryDate] = useState<any>(null);
	const [diagnosisL, setDiagnosisL] = useState([]);
	const [adm_date, setAdmDate] = useState<any>(null);
	const [discharged_on, setDischargedOn] = useState<any>(null);
	const [nok_phone, setNokPhone] = useState<any>("");
	const [ward_matron, setMatron] = useState<any>("");
	const [admitted_for, setAdmittedFor] = useState<number | string>();
	const router = useRouter();
	const handleSubmit = async () => {
		await post("/encounters/create/delivery", {
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
			delivery: {
				baby_outcome,
				delivery_date,
				mother_outcome,
				parity,
				labour_duration,
				delivery_type,
				placenta_delivery,
				apgar_score,
				baby_maturity,
				baby_weight: String(baby_weight),
				baby_sex,
				congenital_no,
				midwife,
				mother_diag,
			},
		});
		setPosted(true);
		setDrugsGiven([]);
		setLabTest([]);
		setDiagnosis([]);
		setOutcome(null);
		setPosted(false);
	};
	const { fetch } = useFetch();
	useEffect(() => {
		const getAll = async () => {
			const { data } = await fetch("/settings/diagnosis");
			const mapped = data?.map((diag: any) => {
				return diag?.name;
			});
			setDiagnosisL(mapped);
		};
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
						<label className='font-bold underline'>Delivery</label>
						<div className='flex gap-4 flex-wrap'>
							<DatePickerInput
								label='Delivery date'
								placeholder='Delivery date...'
								className='w-44'
								value={delivery_date}
								onChange={setDelveryDate}
								allowDeselect
								clearable
								closeOnChange={false}
							/>
							<TextInput
								label='Parity'
								placeholder='parity'
								value={parity}
								onChange={(e) => {
									setParity(e.currentTarget.value);
								}}
							/>
							<TextInput
								label='Labour Duration'
								placeholder='labour duration'
								value={labour_duration}
								onChange={(e) => {
									setDuration(e.currentTarget.value);
								}}
							/>
							<TextInput
								label='Placenta deivery'
								placeholder='placenta delivery'
								value={placenta_delivery}
								onChange={(e) => {
									setPlacenta(e.currentTarget.value);
								}}
							/>
							<Select
								label='Delivery Type'
								placeholder='Select a type'
								data={[
									"Delivery breech",
									"Delivery multiple",
									"Delivery SVD",
									"Delivery Vacuum",
								]}
								className='w-[10rem]'
								clearable
								value={delivery_type}
								onChange={(value: any) => {
									setDelivType(value);
								}}
								nothingFoundMessage='Nothing found...'
							/>
							<Select
								label='Mother Diagnosis'
								placeholder='Select a diagnosis'
								data={diagnosisL}
								className='w-[20rem]'
								searchable
								clearable
								value={mother_diag}
								onChange={(value: any) => {
									setMDiag(value);
								}}
								nothingFoundMessage='Nothing found...'
							/>
							<Select
								label='Mother Outcome'
								placeholder='Select an outcome'
								data={["Alive", "Mat Death"]}
								className='w-[11rem]'
								clearable
								value={mother_outcome}
								onChange={(value: any) => {
									setMOutcome(value);
								}}
								nothingFoundMessage='Nothing found...'
							/>
							<Select
								label='Baby Outcome'
								placeholder='Select an outcome'
								data={["Live Birth", "Still Birth"]}
								className='w-[11rem]'
								clearable
								value={baby_outcome}
								onChange={(value: any) => {
									setBOutcome(value);
								}}
								nothingFoundMessage='Nothing found...'
							/>
							<Select
								label='Baby Sex'
								placeholder='Select a sex'
								data={["Male", "Female"]}
								className='w-[8rem]'
								clearable
								value={baby_sex}
								onChange={(value: any) => {
									setbabySex(value);
								}}
								nothingFoundMessage='Nothing found...'
							/>
							<NumberInput
								label='Baby Weight'
								placeholder='baby weight'
								value={baby_weight}
								min={0}
								suffix=' KG'
								onChange={(value: any) => {
									setBabyWeight(value);
								}}
							/>
							<TextInput
								label='Baby Maturity'
								placeholder='Baby Maturity'
								value={baby_maturity}
								onChange={(e) => {
									setBabyMaturity(e.currentTarget.value);
								}}
							/>
							<TextInput
								label='Baby Activity'
								placeholder='APGAR score'
								value={apgar_score}
								onChange={(e) => {
									setApgarScore(e.currentTarget.value);
								}}
							/>
							<TextInput
								label='Baby Congenital Malform'
								placeholder='Image No'
								value={congenital_no}
								onChange={(e) => {
									setCongenital(Number(e.currentTarget.value));
								}}
							/>
							<TextInput
								label='Midwife'
								placeholder='midwife'
								value={midwife}
								onChange={(e) => {
									setMidWife(e.currentTarget.value);
								}}
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

export default Delivery;
