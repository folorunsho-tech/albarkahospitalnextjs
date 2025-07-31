/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useFetch } from "@/queries";
import { MultiSelect } from "@mantine/core";
import { useEffect, useState } from "react";

const Diagnosis = ({
	setDiagnosis,
	diagnosis,
}: {
	setDiagnosis: any;
	diagnosis: string[];
}) => {
	const { fetch } = useFetch();
	const [diagnosisL, setDiagnosisL] = useState([]);
	useEffect(() => {
		const getAll = async () => {
			const { data } = await fetch("/settings/diagnosis");
			const mapped = data?.map((diag: any) => {
				return {
					value: diag?.id,
					label: diag?.name,
				};
			});
			setDiagnosisL(mapped);
		};
		getAll();
	}, []);
	return (
		<MultiSelect
			label='Diagnosis'
			placeholder='Search or Select one or more diagnosis'
			data={diagnosisL}
			hidePickedOptions
			clearable
			className='w-3/4'
			value={diagnosis}
			onChange={(value: any) => {
				setDiagnosis(value);
			}}
			searchable
			nothingFoundMessage='Nothing found...'
		/>
	);
};

export default Diagnosis;
