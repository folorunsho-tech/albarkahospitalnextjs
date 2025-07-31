import { NumberInput, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useEffect, useState } from "react";

const Admission = ({ setAdmission }: { setAdmission: any }) => {
	const [adm_date, setAdmDate] = useState<any>(null);
	const [discharged_on, setDischargedOn] = useState<any>(null);
	const [nok_phone, setNokPhone] = useState<any>("");
	const [ward_matron, setMatron] = useState<any>("");
	const [admitted_for, setAdmittedFor] = useState<number | string>();
	useEffect(() => {
		setAdmission({
			adm_date,
			nok_phone,
			admitted_for,
			discharged_on,
			ward_matron,
		});
	}, [adm_date, nok_phone, admitted_for, discharged_on, ward_matron]);
	return (
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
	);
};

export default Admission;
