/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEdit, useFetch } from "@/queries";
import { Button, LoadingOverlay, MultiSelect } from "@mantine/core";
import { useEffect, useState } from "react";

const Diagnosis = ({ enc_id }: { enc_id: string | null }) => {
	const { fetch } = useFetch();
	const { edit, loading } = useEdit();
	const [diagnosisL, setDiagnosisL] = useState([]);
	const [diagnosis, setDiagnosis] = useState<any[]>([]);
	const getAll = async () => {
		const { data: found } = await fetch("/settings/diagnosis");
		const { data: enc } = await fetch(`/encounters/${enc_id}`);

		const mapped = found?.map((diag: any) => {
			return {
				value: diag?.id,
				label: diag?.name,
			};
		});
		setDiagnosisL(mapped);
		setDiagnosis(
			enc?.diagnosis?.map((diag: any) => {
				return diag?.id;
			})
		);
	};
	useEffect(() => {
		getAll();
	}, []);

	return (
		<form
			className='space-y-6 my-4'
			onSubmit={async (e) => {
				e.preventDefault();
				const { data: res } = await edit(
					"/encounters/edit/diagnosis/" + enc_id,
					{
						diagnosis,
					}
				);

				setDiagnosis(
					res?.diagnosis?.map((diag: any) => {
						return diag?.id;
					})
				);
			}}
		>
			<MultiSelect
				label='Diagnosis'
				placeholder='Search or Select one or more diagnosis'
				data={diagnosisL}
				value={diagnosis}
				hidePickedOptions
				clearable
				className='w-3/4'
				onChange={(value: any) => {
					setDiagnosis(value);
				}}
				searchable
				nothingFoundMessage='Nothing found...'
			/>
			<Button color='teal' w={200} type='submit'>
				Update diagnosis
			</Button>
			<LoadingOverlay visible={loading} />
		</form>
	);
};

export default Diagnosis;
