/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { NumberInput, Select, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useEffect, useState } from "react";

const Delivery = ({
	setDelivery,
	diagnosis,
}: {
	setDelivery: any;
	diagnosis: any[];
}) => {
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

	useEffect(() => {
		setDelivery({
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
		});
	}, [
		baby_outcome,
		delivery_date,
		mother_outcome,
		parity,
		labour_duration,
		delivery_type,
		placenta_delivery,
		apgar_score,
		baby_maturity,
		baby_weight,
		baby_sex,
		congenital_no,
		midwife,
		mother_diag,
	]);

	return (
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
				data={diagnosis}
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
	);
};

export default Delivery;
