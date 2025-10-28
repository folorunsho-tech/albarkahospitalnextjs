/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useFetch, useEdit } from "@/queries";
import {
	ActionIcon,
	Button,
	LoadingOverlay,
	NumberFormatter,
	NumberInput,
	ScrollArea,
	Select,
	Table,
	TextInput,
} from "@mantine/core";
import { IconPencil, IconX } from "@tabler/icons-react";
import { useContext, useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import { userContext } from "@/context/User";
import { Printer } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";
import { useReactToPrint } from "react-to-print";

const Labtest = ({ enc_id }: { enc_id: string | null }) => {
	const [labTest, setLabTest] = useState<any[]>([]);
	const { user } = useContext(userContext);
	const [enc, setEnc] = useState<any | null | undefined>(null);

	const { fetch } = useFetch();
	const { edit, loading } = useEdit();
	const [testId, setTestId] = useState("");
	const [testInfo, setTestInfo] = useState("");
	const [testName, setTestName] = useState("");
	const [testResult, setTestResult] = useState("");
	const [testsList, setTestsList] = useState([]);
	const [search, setSearch] = useState("");
	const [testRate, setTestRate] = useState<number | string>();
	const [testUnit, setTestUnit] = useState("");
	const contentRef = useRef<HTMLTableElement>(null);
	const reactToPrintFn = useReactToPrint({
		contentRef,
		bodyClass: "print",
		documentTitle: "labtest-list",
	});
	useEffect(() => {
		const getAll = async () => {
			const { data: found } = await fetch("/settings/tests");
			const { data: enc } = await fetch(`/encounters/e/${enc_id}`);
			setEnc(enc);

			const mapped = found?.map((test: any) => {
				return {
					value: test?.id,
					label: test?.name,
				};
			});
			setTestsList(mapped);
			setLabTest(
				enc?.labTest?.map((test: any) => {
					return {
						lab_id: test?.id,
						id: test?.test_id,
						name: test?.testType?.name,
						result: test?.result,
						info: test?.info,
						unit: test?.unit,
						rate: test?.rate,
					};
				})
			);
		};
		getAll();
	}, []);

	return (
		<form
			className='space-y-6 my-4'
			onSubmit={async (e) => {
				e.preventDefault();
				await edit(`/encounters/edit/${enc_id}/labs`, {
					labs: labTest,
				});
			}}
		>
			<section className='flex items-end gap-4'>
				<Select
					label='Lab Test'
					placeholder='Select or search test'
					data={testsList}
					className='w-[18rem]'
					value={testId}
					clearable
					onSearchChange={setSearch}
					searchValue={search}
					onChange={(value: any) => {
						const found: any = testsList.find(
							(drug: any) => drug?.value == value
						);
						setTestId(value);
						setTestName(found?.label);
					}}
					searchable
					nothingFoundMessage='Nothing found...'
				/>
				<TextInput
					label='Test Result'
					placeholder='Input test result'
					value={testResult}
					onChange={(e) => {
						setTestResult(e.target.value);
					}}
				/>
				<Select
					label='Test Unit'
					placeholder='Select test unit'
					data={["%", "mmol/L", "g/dl", "IU", "kg", " x10^9/L"]}
					className='w-40'
					value={testUnit}
					onChange={(value: any) => {
						setTestUnit(value);
					}}
					clearable
					nothingFoundMessage='Nothing found...'
				/>
				<Select
					label='Test Info'
					placeholder='Select test info'
					data={["High", "Low", "Negative", "Positive"]}
					className='w-40'
					clearable
					value={testInfo}
					onChange={(value: any) => {
						setTestInfo(value);
					}}
					nothingFoundMessage='Nothing found...'
				/>
				<NumberInput
					thousandSeparator
					prefix='N '
					label='Test Rate'
					placeholder='Input test rate'
					className='w-40'
					value={testResult}
					onChange={(value: any) => {
						setTestRate(value);
					}}
				/>
				<Button
					disabled={!(testInfo && testId)}
					onClick={() => {
						const filtered = labTest.filter((t: any) => testId !== t?.id);
						setLabTest([
							{
								lab_id: nanoid(10),
								id: testId,
								name: testName,
								result: testResult,
								info: testInfo,
								unit: testUnit,
								rate: testRate,
							},
							...filtered,
						]);
						setTestId("");
						setSearch("");
						setTestResult("");
						setTestUnit("");
						setTestRate(0);
						setTestInfo("");
					}}
				>
					Add to list
				</Button>
			</section>
			<div className='flex justify-between'>
				<ScrollArea mah={200} w={900}>
					<Table>
						<Table.Thead>
							<Table.Tr>
								<Table.Th>S/N</Table.Th>
								<Table.Th>Name</Table.Th>
								<Table.Th>Result</Table.Th>
								<Table.Th>Unit</Table.Th>
								<Table.Th>Info</Table.Th>
								<Table.Th>Rate</Table.Th>
								<Table.Th></Table.Th>
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>
							{labTest?.map((test: any, i: number) => (
								<Table.Tr key={test?.lab_id}>
									<Table.Td>{i + 1}</Table.Td>
									<Table.Td>{test?.name}</Table.Td>
									<Table.Td>{test?.result}</Table.Td>
									<Table.Td>{test?.unit}</Table.Td>
									<Table.Td>{test?.info}</Table.Td>
									<Table.Td>
										<NumberFormatter
											prefix='N '
											value={test?.rate}
											thousandSeparator
										/>
									</Table.Td>

									<Table.Td className='flex items-center gap-2'>
										<ActionIcon
											color='teal'
											onClick={() => {
												setTestId(test?.id);
												setTestInfo(test?.info);
												setTestResult(test?.result);
												setTestName(test?.name);
												setTestRate(test?.rate);
												setTestUnit(test?.unit);
											}}
										>
											<IconPencil />
										</ActionIcon>
										{user?.role == "admin" && (
											<ActionIcon
												color='red'
												onClick={() => {
													const filtered = labTest.filter(
														(t: any) => test?.id !== t?.id
													);

													setLabTest(filtered);
												}}
											>
												<IconX />
											</ActionIcon>
										)}
									</Table.Td>
								</Table.Tr>
							))}
						</Table.Tbody>
					</Table>
				</ScrollArea>
				<Button leftSection={<Printer size={16} />} onClick={reactToPrintFn}>
					Print
				</Button>
			</div>
			<Button color='teal' w={200} type='submit'>
				Update labs
			</Button>
			<LoadingOverlay visible={loading} />
			<div style={{ display: "none" }}>
				<div id='labtest' ref={contentRef}>
					<div className='flex gap-1 justify-between w-full text-xs mt-4'>
						<Image
							src='/hospital.svg'
							height={45}
							width={50}
							alt='Albarka logo'
							loading='eager'
						/>
						<div className='w-full'>
							<h2 className='font-extrabold font-serif '>ALBARKA HOSPITAL</h2>
							<p className=''>Tel: 08056713362, 08080854480</p>
							<p className='italic'>E-mail: hospitalalbarka@gmail.com</p>
							<p className='italic'>
								Malale road, Off Rofia road, Wawa New Bussa Niger state Nigeria.
							</p>
						</div>
						<p>{format(new Date(), "dd/MM/yyyy , p")}</p>
					</div>
					<label htmlFor='drugs' className='font-bold text-xs underline'>
						Labtest for {enc?.patient?.name} on{" "}
						{format(new Date(), "dd/MM/yyyy, p")}
					</label>
					{
						<section className='printable text-xs'>
							<Table>
								<Table.Thead>
									<Table.Tr>
										<Table.Th>S/N</Table.Th>
										<Table.Th>Name</Table.Th>
										<Table.Th>Result</Table.Th>
										<Table.Th>Unit</Table.Th>
										<Table.Th>Info</Table.Th>
										<Table.Th>Rate</Table.Th>
									</Table.Tr>
								</Table.Thead>
								<Table.Tbody>
									{labTest?.map((test: any, i: number) => (
										<Table.Tr key={test?.lab_id}>
											<Table.Td>{i + 1}</Table.Td>
											<Table.Td>{test?.name}</Table.Td>
											<Table.Td>{test?.result}</Table.Td>
											<Table.Td>{test?.unit}</Table.Td>
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
						</section>
					}
				</div>
			</div>
		</form>
	);
};

export default Labtest;
