import { Button, LoadingOverlay, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useEffect, useState } from "react";

const Admission = ({ admission }: { admission: any }) => {
	const [adm_date, setAdmDate] = useState<any>(null);
	const [discharged_on, setDischargedOn] = useState<any>(null);
	const [nok_phone, setNokPhone] = useState<any>("");
	const [ward_matron, setMatron] = useState<any>("");
	const [admitted_for, setAdmittedFor] = useState<any>("");
	useEffect(() => {
		setAdmDate(admission?.adm_date);
		setDischargedOn(admission?.discharged_on);
		setAdmittedFor(admission?.admitted_for);
		setNokPhone(admission?.nok_phone);
		setMatron(admission?.matron);
	}, []);
	return (
		<form
			className='flex flex-wrap gap-4 relative items-end'
			onSubmit={(e) => {
				e.preventDefault();
				console.log({
					adm_date,
					nok_phone,
					admitted_for,
					discharged_on,
					ward_matron,
				});
			}}
		>
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
			<TextInput
				label='Days of Admission'
				placeholder='Days of Admission'
				value={admitted_for}
				onChange={(e) => {
					setAdmittedFor(e.currentTarget.value);
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
			<Button color='teal' w={200} type='submit'>
				Update admission
			</Button>
			<LoadingOverlay visible={false} />
		</form>
	);
};

export default Admission;
