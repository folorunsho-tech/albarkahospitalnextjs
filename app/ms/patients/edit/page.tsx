/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, Suspense } from "react";
import { useEdit, useFetch } from "@/queries";
import { ArrowLeft } from "lucide-react";
import {
	Button,
	Group,
	LoadingOverlay,
	Select,
	Text,
	TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DatePickerInput } from "@mantine/dates";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
const Edit = () => {
	const searchParams = useSearchParams();
	const id = searchParams.get("id");
	const { fetch } = useFetch();
	const { edit, loading } = useEdit();
	const [groupsList, setGroupsList] = useState([]);
	const [townsList, setTownsList] = useState([]);
	const [group_id, setGroupId] = useState("");
	const [sex, setSex] = useState("");
	const [reg_date, setRegDate] = useState<any>(new Date());
	const [religion, setReligion] = useState("");
	const [townId, setTownId] = useState<any>("");
	const [age, setAge] = useState<string | null>("");
	const ages = [
		"1d",
		"2d",
		"3d",
		"4d",
		"5d",
		"6d",
		"7d",
		"8d",
		"9d",
		"10d",
		"11d",
		"12d",
		"13d",
		"2w",
		"3w",
		"4w",
		"5w",
		"6w",
		"7w",
		"2m",
		"3m",
		"4m",
		"5m",
		"6m",
		"7m",
		"8m",
		"9m",
		"10m",
		"11m",
		"1y",
		"1y 6m",
		"2y",
		"2y 6m",
		"3y",
		"3y 6m",
		"4y",
		"4y 6m",
		"5y",
		"6y",
		"7y",
		"8y",
		"9y",
		"10y",
		"11y",
		"12y",
		"13y",
		"14y",
		"15y",
		"16y",
		"17y",
		"18y",
		"19y",
		"20y",
		"21y",
		"22y",
		"23y",
		"24y",
		"25y",
		"26y",
		"27y",
		"28y",
		"29y",
		"30y",
		"31y",
		"32y",
		"33y",
		"34y",
		"35y",
		"36y",
		"37y",
		"38y",
		"39y",
		"40y",
		"41y",
		"42y",
		"43y",
		"44y",
		"45y",
		"46y",
		"47y",
		"48y",
		"49y",
		"50y",
		"51y",
		"52y",
		"53y",
		"54y",
		"55y",
		"56y",
		"57y",
		"58y",
		"59y",
		"60y",
		"61y",
		"62y",
		"63y",
		"64y",
		"65y",
		"66y",
		"67y",
		"68y",
		"69y",
		"70y",
		"75y",
		"80y",
		"85y",
		"90y",
	];
	const form = useForm({
		mode: "uncontrolled",
		initialValues: {
			name: "",
			hosp_no: "",
			phone_no: "",
			occupation: "",
		},
	});
	const router = useRouter();

	useEffect(() => {
		const getAll = async () => {
			const { data: found } = await fetch(`/patients/p/${id}`);
			const { data } = await fetch("/patients/groups");
			const { data: towns } = await fetch("/settings/town");
			const sortedT = towns.map((town: { id: string; name: string }) => {
				return {
					value: town.id,
					label: town.name,
				};
			});
			setTownsList(sortedT);
			const sortedG = data.map((group: { id: string; name: string }) => {
				return {
					value: group.id,
					label: group.name,
				};
			});
			form.setValues({
				name: found?.name,
				hosp_no: found?.hosp_no,
				phone_no: found?.phone_no,
				occupation: found?.occupation,
			});
			setAge(found?.age);
			setSex(found?.sex);
			setReligion(found?.religion);
			setTownId(found?.townId);
			setRegDate(new Date(found?.reg_date));
			setGroupId(found?.group_id || null);
			setGroupsList(sortedG);
		};
		getAll();
	}, []);
	const handleSubmit = async (values: typeof form.values) => {
		await edit(`/patients/edit/${id}`, {
			...values,
			sex,
			reg_date,
			group_id,
			religion,
			townId,
			age,
		});
		// form.reset();
	};

	return (
		<Suspense>
			<main className='space-y-6'>
				<div className='flex justify-between items-center'>
					<Link
						className='bg-blue-500 hover:bg-blue-600 p-1 px-2 rounded-lg text-white flex gap-3'
						href='/ms/patients'
					>
						<ArrowLeft />
						Go back
					</Link>
					<Text size='xl'>Update patient data</Text>
				</div>
				<form
					className='flex gap-4 flex-wrap'
					onSubmit={form.onSubmit(handleSubmit)}
				>
					<DatePickerInput
						label='Regristration date'
						placeholder='Reg. date...'
						className='w-44'
						value={reg_date}
						onChange={setRegDate}
					/>
					<TextInput
						label='Patient Name'
						placeholder='name...'
						className='w-60'
						key={form.key("name")}
						{...form.getInputProps("name")}
					/>
					<Select
						label='Sex'
						placeholder='Select patient sex'
						data={["Male", "Female"]}
						allowDeselect={false}
						value={sex}
						onChange={(value: any) => {
							setSex(value);
						}}
						searchable
						nothingFoundMessage='Nothing found...'
					/>
					<TextInput
						label='Card No'
						placeholder='hospital card no...'
						disabled
						key={form.key("hosp_no")}
						{...form.getInputProps("hosp_no")}
					/>
					<Select
						label='Address'
						placeholder='Select patient addres'
						data={townsList}
						allowDeselect={false}
						value={townId}
						onChange={(value: any) => {
							setTownId(value);
						}}
						required
						searchable
						nothingFoundMessage='Nothing found...'
					/>
					<TextInput
						label='Phone No'
						placeholder='phone no...'
						key={form.key("phone_no")}
						{...form.getInputProps("phone_no")}
					/>
					<Select
						label='Age'
						placeholder='age...'
						data={ages}
						value={age}
						onChange={(value) => {
							setAge(value);
						}}
					/>
					<TextInput
						label='Occupation'
						placeholder='occupation...'
						key={form.key("occupation")}
						{...form.getInputProps("occupation")}
					/>

					<Select
						label='Religion'
						placeholder='Select patient religion'
						data={["Islam", "Christianity", "Others"]}
						value={religion}
						onChange={(value: any) => {
							setReligion(value);
						}}
					/>
					<Select
						label='Group'
						placeholder='Select patient group'
						data={groupsList}
						allowDeselect={false}
						value={group_id}
						onChange={(value: any) => {
							setGroupId(value);
						}}
						required
						searchable
						nothingFoundMessage='Nothing found...'
					/>

					<Group mt={20} justify='end'>
						<Button
							onClick={() => {
								router.push("/ms/patients");
							}}
							color='black'
						>
							Cancel
						</Button>
						<Button type='submit'>Update patient</Button>
					</Group>
					<LoadingOverlay visible={loading} />
				</form>
			</main>
		</Suspense>
	);
};

export default Edit;
