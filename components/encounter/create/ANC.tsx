import { Select } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useEffect, useState } from "react";

const ANC = ({ setANC }: { setANC: any }) => {
	const [ega, setEga] = useState<any>("");
	const [fe_diagnosis, setFDiag] = useState("");
	const [fe_no, setFeNo] = useState("");
	const [fe_liq_vol, setLiqVol] = useState("");
	const [fe_abnormality, setAbnormal] = useState("");
	const [fe_live, setLive] = useState("");
	const [placenta_pos, setPlacenta] = useState("");
	const [date, setDate] = useState<Date | null | string>(null);
	const [edd, setEDate] = useState<Date | null | string>(null);
	useEffect(() => {
		setANC({
			ega,
			fe_abnormality,
			fe_diagnosis,
			fe_no,
			fe_liq_vol,
			fe_live,
			placenta_pos,
			date,
			edd,
		});
	}, [
		ega,
		fe_abnormality,
		fe_diagnosis,
		fe_no,
		fe_liq_vol,
		fe_live,
		placenta_pos,
		date,
		edd,
	]);
	return (
		<main className='flex flex-wrap gap-3'>
			<DatePickerInput
				label='ANC Date'
				value={date}
				placeholder='anc date'
				className='w-44'
				onChange={setDate}
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
		</main>
	);
};

export default ANC;
