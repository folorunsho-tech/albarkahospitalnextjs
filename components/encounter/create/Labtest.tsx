/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useFetch } from "@/queries";
import {
	ActionIcon,
	Button,
	NumberFormatter,
	NumberInput,
	ScrollArea,
	Select,
	Table,
	TextInput,
} from "@mantine/core";
import { IconPencil, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
const Labtest = ({
	setLabTest,
	labTest,
}: {
	setLabTest: any;
	labTest: any[];
}) => {
	const { fetch } = useFetch();
	const [testId, setTestId] = useState("");
	const [testInfo, setTestInfo] = useState("");
	const [testName, setTestName] = useState("");
	const [testResult, setTestResult] = useState("");
	const [testUnit, setTestUnit] = useState("");
	const [testRate, setTestRate] = useState<number | string>();
	const [search, setSearch] = useState("");

	const [testsList, setTestsList] = useState([]);
	useEffect(() => {
		const getAll = async () => {
			const { data } = await fetch("/settings/tests");
			const mapped = data?.map((test: any) => {
				return {
					value: test?.id,
					label: test?.name,
				};
			});
			setTestsList(mapped);
		};
		getAll();
	}, []);

	return (
		<main className='space-y-4'>
			<form
				className='flex items-end gap-4'
				onSubmit={(e) => {
					e.preventDefault();
					const filtered = labTest.filter((t: any) => testId !== t?.id);
					setLabTest([
						{
							lab_id: nanoid(10),
							id: testId,
							name: testName,
							result: testResult,
							rate: testRate,
							info: testInfo,
							unit: testUnit,
						},
						...filtered,
					]);
					setTestId("");
					setSearch("");
					setTestUnit("");
					setTestResult("");
				}}
			>
				<Select
					label='Test'
					placeholder='Select test'
					data={testsList}
					className='w-[16rem]'
					clearable
					searchable
					searchValue={search}
					onSearchChange={setSearch}
					value={testId}
					onChange={(value: any) => {
						const found: any = testsList.find(
							(test: any) => test?.value == value
						);
						setTestId(value);
						setTestName(found?.label);
					}}
					nothingFoundMessage='Nothing found...'
					required
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
					nothingFoundMessage='Nothing found...'
				/>
				<Select
					label='Test Info'
					placeholder='Select test info'
					data={["High", "Low", "Negative", "Positive"]}
					className='w-40'
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
					onChange={(value) => {
						setTestRate(value);
					}}
				/>

				<Button disabled={!testId} type='submit'>
					Add to list
				</Button>
			</form>
			<ScrollArea h={200} maw={900}>
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
						{labTest.map((test: any, i: number) => (
							<Table.Tr key={test?.id}>
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

								<Table.Td className='flex items-center gap-4'>
									<ActionIcon
										color='green'
										onClick={() => {
											setTestId(test?.id);
											setTestName(test?.name);
											setTestResult(test?.result);
											setTestUnit(test?.unit);
											setTestInfo(test?.info);
											setTestRate(test?.rate);
										}}
									>
										<IconPencil />
									</ActionIcon>
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
								</Table.Td>
							</Table.Tr>
						))}
					</Table.Tbody>
				</Table>
			</ScrollArea>
		</main>
	);
};

export default Labtest;
