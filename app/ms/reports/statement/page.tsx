"use client";
import React from "react";
import { usePostNormal } from "@/queries";
import PatientSearch from "@/components/PatientSearch";
import StatementsT from "@/components/reports/StatementsT";

const page = () => {
	const { loading, post } = usePostNormal();
	const [patient, setPatient] = React.useState<{
		id: string;
		hosp_no: string;
		name: string;
	} | null>(null);
	const [queryData, setQueryData] = React.useState<any[]>([]);
	const getData = async () => {
		if (patient) {
			const res = await post("/transactions/search", { value: patient.id });
			setQueryData(res.data);
		}
	};
	React.useEffect(() => {
		if (patient) {
			getData();
		}
	}, [patient]);
	return (
		<main className='space-y-6'>
			<PatientSearch setPatient={setPatient} />
			<StatementsT queryData={queryData} loading={loading} patient={patient} />
		</main>
	);
};

export default page;
