/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ArrowLeft, Pencil, Printer } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useFetch } from "@/queries";
import { Button, NumberFormatter, Pill, Table, Text } from "@mantine/core";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { useReactToPrint } from "react-to-print";
import Image from "next/image";
import convert from "@/lib/numberConvert";

const View = () => {
	const { id } = useParams<{ id: string }>();

	const { fetch } = useFetch();
	const [queryData, setQueryData] = useState<any>(null);
	const [createdBy, setCreatedBy] = useState<any>(null);
	const router = useRouter();
	const contentRef = useRef<HTMLTableElement>(null);
	const reactToPrintFn = useReactToPrint({
		contentRef,
		bodyClass: "print",
		documentTitle: "prescription-list",
	});
	useEffect(() => {
		const getAll = async () => {
			const { data: found } = await fetch(`/encounters/e/${id}`);
			const { data: created } = await fetch(`/accounts/${found?.createdById}`);
			setQueryData(found);
			setCreatedBy(created);
		};
		getAll();
	}, []);
	const total = queryData?.drugsGiven?.reduce(
		(prev: any, curr: { price: any }) => {
			return Number(prev) + Number(curr?.price);
		},
		0
	);
	return (
		<main>
			<section>
				<div className='flex justify-between items-center'>
					<Link
						className='bg-blue-500 hover:bg-blue-600 p-1 px-2 rounded-lg text-white flex gap-3'
						href='/ms/encounters'
					>
						<ArrowLeft />
						Go back
					</Link>
					<Button
						justify='end'
						color='teal'
						onClick={() => {
							router.push(`/ms/encounters/edit/${id}`);
						}}
						leftSection={<Pencil />}
					>
						Edit data
					</Button>
					<div className='flex items-center gap-2'>
						<h3 className='text-lg'>
							Created by: <i className='underline'>{createdBy?.username}</i>
						</h3>
						{queryData?.updatedBy?.username && (
							<h3 className='text-lg'>
								Last updated by:{" "}
								<i className='underline'>{queryData?.updatedBy?.username}</i>
							</h3>
						)}
					</div>
				</div>
			</section>
			<section className='space-y-6 py-4 enc_data '>
				<div className='space-y-3 pt-5'>
					<label htmlFor='info' className='font-bold underline'>
						Personal Info
					</label>
					<div id='info' className='flex gap-3 flex-wrap'>
						<Text className='flex gap-1 items-center'>
							Enc Date:{" "}
							<i className='text-sm'>
								{new Date(queryData?.enc_date).toLocaleDateString()}
							</i>
						</Text>
						<Text className='flex gap-1 items-center'>
							Enc time: <i className='text-sm'>{queryData?.time}</i>
						</Text>
						<Text className='flex gap-1 items-center'>
							Hosp No: <i className='text-sm'>{queryData?.patient?.hosp_no}</i>
						</Text>
						<Text className='flex gap-1 items-center'>
							Name:
							<i className='text-sm'>{queryData?.patient?.name}</i>
						</Text>
						<Text className='flex gap-1 items-center'>
							Age:
							<i className='text-sm'>{queryData?.patient?.age}</i>
						</Text>
						<Text className='flex gap-1 items-center'>
							Sex:
							<i className='text-sm'>{queryData?.patient?.sex}</i>
						</Text>
						<Text className='flex gap-1 items-center'>
							Phone Number:
							<i className='text-sm'>{queryData?.patient?.phone_no}</i>
						</Text>
						<Text className='flex gap-1 items-center'>
							Address:
							<i className='text-sm'>{queryData?.patient?.town?.name}</i>
						</Text>
						<Text className='flex gap-1 items-center'>
							Care type:
							<i className='text-sm'>{queryData?.care?.name}</i>
						</Text>
						<Text className='flex gap-1 items-center'>
							Outcome:
							<i className='text-sm'>{queryData?.outcome}</i>
						</Text>
					</div>
				</div>
				{queryData?.admission && (
					<div className='space-y-3 pt-5'>
						<label htmlFor='info' className='font-bold underline'>
							Admission Info
						</label>
						<div id='admission' className='flex gap-3 flex-wrap'>
							<Text className='flex gap-1 items-center'>
								Admission Date:
								<i className='text-sm'>
									{queryData?.admission?.adm_date
										? format(queryData?.admission?.adm_date, "Pp")
										: null}
								</i>
							</Text>

							<Text className='flex gap-1 items-center'>
								NOK Phone:{" "}
								<i className='text-sm'>{queryData?.admission?.nok_phone}</i>
							</Text>
							<Text className='flex gap-1 items-center'>
								Days of Admission:
								<i className='text-sm'>{queryData?.admission?.admitted_for}</i>
							</Text>
							<Text className='flex gap-1 items-center'>
								Date of Discharge:
								<i className='text-sm'>
									{queryData?.admission?.discharged_on
										? format(queryData?.admission?.discharged_on, "Pp")
										: null}
								</i>
							</Text>
							<Text className='flex gap-1 items-center'>
								Ward Matron:
								<i className='text-sm'>{queryData?.admission?.ward_matron}</i>
							</Text>
						</div>
					</div>
				)}
				<div className='space-y-6 '>
					<label htmlFor='data' className='font-bold underline'>
						Encounter Data
					</label>
					<div id='diagnosis' className='flex gap-2 flex-wrap'>
						<div>
							<label htmlFor='diag' className='font-bold'>
								Diagnosis
							</label>
							{queryData?.diagnosis?.length > 0 ? (
								<ul id='diag' className='pl-4 mt-3 flex-wrap flex gap-2'>
									{queryData?.diagnosis?.map((diag: any) => (
										<Pill key={diag?.id}>{diag?.name}</Pill>
									))}
								</ul>
							) : (
								<p className='text-center font-light'>Empty</p>
							)}
						</div>
					</div>
					{queryData?.care?.name == "Delivery" && (
						<div id='delivery' className='flex flex-col gap-2 flex-wrap'>
							<label htmlFor='del' className='font-bold'>
								Delivery
							</label>
							<div id='del' className='pl-4 flex-wrap flex gap-3'>
								<Text className='flex gap-1 items-center'>
									Delivery date:
									<i className='text-sm'>
										{queryData?.delivery[0]?.delivery_date
											? format(queryData?.delivery[0]?.delivery_date, "P")
											: null}
									</i>
								</Text>
								<Text>
									Parity: <i>{queryData?.delivery[0]?.parity}</i>
								</Text>
								<Text>
									Labour Duration:{" "}
									<i>{queryData?.delivery[0]?.labour_duration}</i>
								</Text>
								<Text>
									Placenta deivery:{" "}
									<i>{queryData?.delivery[0]?.placenta_delivery}</i>
								</Text>
								<Text>
									Delivery Type: <i>{queryData?.delivery[0]?.delivery_type}</i>
								</Text>
								<Text>
									Mother Diagnosis: <i>{queryData?.delivery[0]?.mother_diag}</i>
								</Text>
								<Text>
									Mother Outcome:{" "}
									<i>{queryData?.delivery[0]?.mother_outcome}</i>
								</Text>
								<Text>
									Baby Outcome: <i>{queryData?.delivery[0]?.baby_outcome}</i>
								</Text>
								<Text>
									Baby Weight: <i>{queryData?.delivery[0]?.baby_weight} KG</i>
								</Text>
								<Text>
									Baby Sex: <i>{queryData?.delivery[0]?.baby_sex}</i>
								</Text>
								<Text>
									Baby Activity (APGAR Score):{" "}
									<i>{queryData?.delivery[0]?.apgar_score}</i>
								</Text>
								<Text>
									Baby Congenital Malform (Image No.):{" "}
									<i>{queryData?.delivery[0]?.congenital_no}</i>
								</Text>
								<Text>
									Midwife: <i>{queryData?.delivery[0]?.midwife}</i>
								</Text>
							</div>
						</div>
					)}
					{queryData?.care?.name == "Operation" && (
						<div id='operation' className='flex gap-2 flex-wrap'>
							<div>
								<label htmlFor='op' className='font-bold'>
									Operation
								</label>
								<div id='op' className='pl-4 flex-wrap flex gap-6'>
									<Text>
										Operation Type:{" "}
										<i>{queryData?.operations[0]?.procedure?.name}</i>
									</Text>
									<Text className='flex gap-1 items-center'>
										Operation date:
										<i className='text-sm'>
											{queryData?.operations[0]?.proc_date
												? format(queryData?.operations[0]?.proc_date, "P")
												: null}
										</i>
									</Text>
									<Text>
										Anaesthesia: <i>{queryData?.operations[0]?.anaesthesia}</i>
									</Text>
									<Text>
										Operation Outcome:{" "}
										<i>{queryData?.operations[0]?.outcome}</i>
									</Text>
									<Text>
										Surgeon: <i>{queryData?.operations[0]?.surgeon}</i>
									</Text>
									<Text>
										Assistant: <i>{queryData?.operations[0]?.assistant}</i>
									</Text>
								</div>
							</div>
						</div>
					)}
					{queryData?.care?.name == "Immunization" && (
						<div id='Immunization' className='flex gap-2 flex-wrap'>
							<div>
								<label htmlFor='imm' className='font-bold'>
									Immunization
								</label>
								<div id='imm' className='pl-4 flex-wrap flex gap-6'>
									<Text className='flex gap-1 items-center'>
										Date:
										<i className='text-sm'>
											{queryData?.immunization[0]?.date
												? format(queryData?.immunization[0]?.date, "P")
												: null}
										</i>
									</Text>
									<Text className='flex gap-1 items-center'>
										Next Appt Date:
										<i className='text-sm'>
											{queryData?.immunization[0]?.next_date
												? format(queryData?.immunization[0]?.next_date, "P")
												: null}
										</i>
									</Text>
									<Text>
										Type: <i>{queryData?.immunization[0]?.type}</i>
									</Text>
								</div>
							</div>
						</div>
					)}
					{queryData?.care?.name == "ANC" && (
						<div id='ANC' className='flex gap-2 flex-wrap'>
							<div>
								<label htmlFor='anc' className='font-bold'>
									ANC
								</label>
								<div id='anc' className='pl-4 flex-wrap flex gap-6'>
									<Text className='flex gap-1 items-center'>
										ANC Date:
										<i className='text-sm'>
											{queryData?.anc[0]?.date
												? format(queryData?.anc[0]?.date, "P")
												: null}
										</i>
									</Text>
									<Text className='flex gap-1 items-center'>
										EDD:
										<i className='text-sm'>
											{queryData?.anc[0]?.edd
												? format(queryData?.anc[0]?.edd, "P")
												: null}
										</i>
									</Text>
									<Text>
										EGA: <i>{queryData?.anc[0]?.ega}</i>
									</Text>
									<Text>
										Foetal Presentation:{" "}
										<i>{queryData?.anc[0]?.fe_diagnosis}</i>
									</Text>
									<Text>
										Foetal No: <i>{queryData?.anc[0]?.fe_no}</i>
									</Text>
									<Text>
										Foetal Live: <i>{queryData?.anc[0]?.fe_live}</i>
									</Text>
									<Text>
										Foetal Abnormallity:{" "}
										<i>{queryData?.anc[0]?.fe_abnormallity}</i>
									</Text>
									<Text>
										Foetal Liquid Vol.: <i>{queryData?.anc[0]?.fe_liq_vol}</i>
									</Text>
									<Text>
										Placenta Position: <i>{queryData?.anc[0]?.placenta_pos}</i>
									</Text>
								</div>
							</div>
						</div>
					)}
					<div id='prescription'>
						<label htmlFor='drugs' className='font-bold mr-12'>
							Prescriptions
						</label>
						<Button
							onClick={() => {
								reactToPrintFn();
							}}
						>
							<Printer />
						</Button>
						<Table id='drugs'>
							<Table.Thead>
								<Table.Tr>
									<Table.Th>S/N</Table.Th>
									<Table.Th>Name</Table.Th>
									<Table.Th>Rate</Table.Th>
									<Table.Th>Quantity</Table.Th>
									<Table.Th>Price</Table.Th>
								</Table.Tr>
							</Table.Thead>
							<Table.Tbody>
								{queryData?.drugsGiven?.map((drug: any, i: number) => (
									<Table.Tr key={drug?.id}>
										<Table.Td>{i + 1}</Table.Td>
										<Table.Td>{drug?.name}</Table.Td>
										<Table.Td>
											<NumberFormatter
												prefix='NGN '
												value={Number(drug?.rate)}
												thousandSeparator
											/>
										</Table.Td>
										<Table.Td>{drug?.quantity}</Table.Td>
										<Table.Td>
											<NumberFormatter
												prefix='NGN '
												value={Number(drug?.rate) * Number(drug?.quantity)}
												thousandSeparator
											/>
										</Table.Td>
									</Table.Tr>
								))}
							</Table.Tbody>
							<Table.Tfoot className='bg-gray-300 font-bold'>
								<Table.Tr>
									<Table.Td></Table.Td>
									<Table.Td></Table.Td>
									<Table.Td></Table.Td>
									<Table.Td>Total: </Table.Td>
									<Table.Td>
										<NumberFormatter
											prefix='NGN '
											value={total}
											thousandSeparator
										/>
									</Table.Td>
								</Table.Tr>
							</Table.Tfoot>
						</Table>
					</div>
					<section style={{ display: "none" }}>
						<div ref={contentRef} className='printable'>
							<div className='flex items-start gap-4 mb-2'>
								<Image
									src='/hospital.svg'
									height={120}
									width={120}
									alt='Albarka logo'
								/>
								<div className='space-y-1 w-full'>
									<div className='flex items-center w-full justify-between'>
										<h2 className='text-xl font-extrabold font-serif '>
											AL-BARKA HOSPITAL
										</h2>
										<p>{format(new Date(), "PPPpp")}</p>
									</div>
									<h3 className='text-lg '>P.O. Box 169 Tel: 08056713322</h3>
									<p className='text-md  italic'>
										E-mail: hospitalalbarka@gmail.com
									</p>
									<p className='text-lg font-extrabold bg-black text-white p-1 px-2 text-center uppercase'>
										Prescriptions for Hosp No: {queryData?.patient?.hosp_no} on{" "}
										{new Date(queryData?.enc_date).toLocaleDateString()},{" "}
										{queryData?.time}
									</p>
								</div>
							</div>
							<Table id='drugs'>
								<Table.Thead>
									<Table.Tr>
										<Table.Th>S/N</Table.Th>
										<Table.Th>Name</Table.Th>
										<Table.Th>Rate</Table.Th>
										<Table.Th>Quantity</Table.Th>
										<Table.Th>Price</Table.Th>
									</Table.Tr>
								</Table.Thead>
								<Table.Tbody>
									{queryData?.drugsGiven?.map((drug: any, i: number) => (
										<Table.Tr key={drug?.id}>
											<Table.Td>{i + 1}</Table.Td>
											<Table.Td>{drug?.name}</Table.Td>
											<Table.Td>
												<NumberFormatter
													prefix='NGN '
													value={Number(drug?.rate)}
													thousandSeparator
												/>
											</Table.Td>
											<Table.Td>{drug?.quantity}</Table.Td>
											<Table.Td>
												<NumberFormatter
													prefix='NGN '
													value={Number(drug?.rate) * Number(drug?.quantity)}
													thousandSeparator
												/>
											</Table.Td>
										</Table.Tr>
									))}
								</Table.Tbody>
								<Table.Tfoot className='bg-gray-300 font-bold'>
									<Table.Tr>
										<Table.Td></Table.Td>
										<Table.Td></Table.Td>
										<Table.Td></Table.Td>
										<Table.Td>Total: </Table.Td>
										<Table.Td>
											<NumberFormatter
												prefix='NGN '
												value={total}
												thousandSeparator
											/>
										</Table.Td>
									</Table.Tr>
								</Table.Tfoot>
							</Table>
							<div className='flex justify-between items-center px-2 py-2'>
								<Text fw={600}>
									Total amount paid:
									<b className='text-sm pl-2'>
										<NumberFormatter
											prefix='NGN '
											value={total}
											thousandSeparator
										/>
									</b>
								</Text>
								<Text fw={600}>
									Total amount paid in words:
									<i className='text-sm pl-2 capitalize'>
										{convert(Number(total))} Naira
									</i>
								</Text>
							</div>
						</div>
					</section>
					<div id='labs' className='flex gap-2 flex-wrap'>
						<label htmlFor='diag' className='font-bold'>
							Labs
						</label>
						<Table>
							<Table.Thead className='bg-gray-200'>
								<Table.Tr>
									<Table.Th>S/N</Table.Th>
									<Table.Th>Name</Table.Th>
									<Table.Th>Result</Table.Th>
									<Table.Th>Info</Table.Th>
									<Table.Th>Rate</Table.Th>
								</Table.Tr>
							</Table.Thead>
							<Table.Tbody>
								{queryData?.labTest?.map((test: any, i: number) => (
									<Table.Tr key={test?.id}>
										<Table.Td>{i + 1}</Table.Td>
										<Table.Td>{test?.testType?.name}</Table.Td>
										<Table.Td>{test?.result}</Table.Td>
										<Table.Td>{test?.info}</Table.Td>
										<Table.Td>
											<NumberFormatter
												prefix='N '
												value={test?.rate}
												thousandSeparator
											/>
										</Table.Td>
									</Table.Tr>
								))}
							</Table.Tbody>
						</Table>
					</div>
				</div>
			</section>
		</main>
	);
};
export default View;
