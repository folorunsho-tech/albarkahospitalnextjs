import { Select } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useEffect, useState } from "react";

const Immunization = ({ setImmunization }: { setImmunization: any }) => {
	const [date, setDate] = useState<Date | null | string>(null);
	const [next_date, setNDate] = useState<Date | null | string>(null);
	const [type, setType] = useState<any>("");
	useEffect(() => {
		setImmunization({
			date,
			type,
			next_date,
		});
	}, [date, type, next_date]);
	return (
		<main className='flex gap-4'>
			<DatePickerInput
				label='Immunization Date'
				value={date}
				placeholder='imm date'
				className='w-44'
				onChange={setDate}
				clearable
				required
			/>
			<Select
				label='Type'
				placeholder='Select a value'
				data={["TT", "EPI"]}
				className='w-[12rem]'
				clearable
				value={type}
				onChange={(value: any) => {
					setType(value);
				}}
				nothingFoundMessage='Nothing found...'
			/>
			<DatePickerInput
				label='Next Appt Date'
				value={next_date}
				placeholder='next date'
				className='w-44'
				onChange={setNDate}
				clearable
			/>
		</main>
	);
};

export default Immunization;
