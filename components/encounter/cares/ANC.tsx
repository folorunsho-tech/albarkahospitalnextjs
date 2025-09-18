"use client";

import { useState } from "react";
import { usePostT } from "@/queries";
import {
	Button,
	Group,
	LoadingOverlay,
	NumberInput,
	ScrollArea,
	Select,
	TextInput,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { months } from "@/lib/ynm";
import { useRouter } from "next/navigation";
import Diagnosis from "../create/Diagnosis";
import DrugsGiven from "../create/DrugsGiven";
import Labtest from "../create/Labtest";
import { format, set } from "date-fns";

const ANC = ({
	careId,
	patient_id,
	follow_up_to,
	enc_date,
	setPrescription,
	openModal,
}: {
	careId: string;
	patient_id: string;
	follow_up_to: string | null;
	enc_date: Date | null;
	setPrescription: React.Dispatch<React.SetStateAction<any>>;
	openModal: () => void;
}) => {
	const { post, loading } = usePostT();
	const [drugsGiven, setDrugsGiven] = useState<any[]>([]);
	const [labTest, setLabTest] = useState([]);
	const [diagnosis, setDiagnosis] = useState([]);
	const [outcome, setOutcome] = useState<null | string>(null);
	const [posted, setPosted] = useState(false);
	const [ega, setEga] = useState<any>("");
	const [fe_diagnosis, setFDiag] = useState("");
	const [fe_no, setFeNo] = useState("");
	const [fe_liq_vol, setLiqVol] = useState("");
	const [fe_abnormality, setAbnormal] = useState("");
	const [fe_live, setLive] = useState("");
	const [placenta_pos, setPlacenta] = useState("");
	const [anc_date, setADate] = useState<Date | null | string>(null);
	const [edd, setEDate] = useState<Date | null | string>(null);
	const [adm_date, setAdmDate] = useState<any>(null);
	const [discharged_on, setDischargedOn] = useState<any>(null);
	const [nok_phone, setNokPhone] = useState<any>("");
	const [ward_matron, setMatron] = useState<any>("");
	const [admitted_for, setAdmittedFor] = useState<number | string>();
	const router = useRouter();
	const handleSubmit = async () => {
		const encounter = await post("/encounters/create/anc", {
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
			anc: {
				ega,
				fe_abnormality,
				fe_diagnosis,
				fe_no,
				fe_liq_vol,
				fe_live,
				placenta_pos,
				date: anc_date,
				edd,
			},
		});
		setPrescription(encounter.data?.drugsGiven);
		openModal();
		setPosted(true);
		setDrugsGiven([]);
		setLabTest([]);
		setDiagnosis([]);
		setOutcome(null);
		setPosted(false);
	};
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				handleSubmit();
			}}
		>
			<section className='space-y-4'>
				<Diagnosis setDiagnosis={setDiagnosis} diagnosis={diagnosis} />
				<div className='flex flex-col gap-2'>
					<label className='font-bold underline'>ANC</label>
					<div className='flex flex-wrap gap-3'>
						<DatePickerInput
							label='ANC Date'
							value={anc_date}
							placeholder='anc date'
							className='w-44'
							onChange={setADate}
							required
							withAsterisk
						/>
						<DatePickerInput
							label='EDD Date'
							value={edd}
							placeholder='edd date'
							className='w-44'
							onChange={setEDate}
							required
							withAsterisk
						/>
						<Select
							label='ANC EGA'
							placeholder='Select week(s)'
							data={[
								"1W",
								"2W",
								"3W",
								"4W",
								"5W",
								"6W",
								"7W",
								"8W",
								"9W",
								"10W",
								"11W",
								"12W",
								"13W",
								"14W",
								"15W",
								"16W",
								"17W",
								"18W",
								"19W",
								"20W",
								"21W",
								"22W",
								"23W",
								"24W",
								"25W",
								"26W",
								"27W",
								"28W",
								"29W",
								"30W",
								"31W",
								"32W",
								"33W",
								"34W",
								"35W",
								"36W",
								"37W",
								"38W",
								"39W",
								"40W",
								"Postdate",
							]}
							searchable
							clearable
							className='w-36'
							value={ega}
							onChange={setEga}
							nothingFoundMessage='Nothing found...'
						/>
						<Select
							label='Foetal Presentation'
							placeholder='Select a value'
							data={["Breech", "Cephalic", "Multiple", "Transverse"]}
							className='w-[12rem]'
							clearable
							value={fe_diagnosis}
							onChange={(value: any) => {
								setFDiag(value);
							}}
							nothingFoundMessage='Nothing found...'
						/>
						<Select
							label='Foetal No'
							placeholder='Select a no'
							data={["Singleton", "Twins", "Triplet"]}
							className='w-[12rem]'
							clearable
							value={fe_no}
							onChange={(value: any) => {
								setFeNo(value);
							}}
							nothingFoundMessage='Nothing found...'
						/>
						<Select
							label='Foetal Live'
							placeholder='Select a value'
							data={["Alive", "IUFD"]}
							className='w-[12rem]'
							clearable
							value={fe_live}
							onChange={(value: any) => {
								setLive(value);
							}}
							nothingFoundMessage='Nothing found...'
						/>
						<Select
							label='Foetal Abnormallity'
							placeholder='Select a value'
							data={["Present", "Absent"]}
							className='w-[12rem]'
							clearable
							value={fe_abnormality}
							onChange={(value: any) => {
								setAbnormal(value);
							}}
							nothingFoundMessage='Nothing found...'
						/>
						<Select
							label='Foetal Liquid Vol.'
							placeholder='Select a value'
							data={["Adequate", "Reduced"]}
							className='w-[12rem]'
							clearable
							value={fe_liq_vol}
							onChange={(value: any) => {
								setLiqVol(value);
							}}
							nothingFoundMessage='Nothing found...'
						/>
						<Select
							label='Placenta Position'
							placeholder='Select a value'
							data={["Anterior", "Posterior", "Praevia"]}
							className='w-[12rem]'
							clearable
							value={placenta_pos}
							onChange={(value: any) => {
								setPlacenta(value);
							}}
							nothingFoundMessage='Nothing found...'
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

			<Group mt={10} justify='start'>
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

export default ANC;
