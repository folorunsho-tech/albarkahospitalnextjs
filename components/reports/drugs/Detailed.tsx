/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Text, NumberFormatter, Table, Select, Button } from "@mantine/core";
import { usePostNormal, useFetch } from "@/queries";
import { useEffect, useState, useContext } from "react";
import DataLoader from "@/components/DataLoader";
import { userContext } from "@/context/User";
import ReportsTable from "@/components/ReportsTable";
import { format } from "date-fns";

const Detailed = () => {
	const { accounts } = useContext(userContext);
	const { post, loading } = usePostNormal();
	const { fetch } = useFetch();
	const [queryData, setQueryData] = useState<any[]>([]);
	const [drugs, setDrugs] = useState<any[]>([]);
	const [sortedData, setSortedData] = useState<any[]>(queryData);
	const [prevSorted, setPrevSorted] = useState<any[]>([]);
	const [value, setValue] = useState<any>("");
	const [criteria, setCriteria] = useState<string | null>("");
	const [loaded, setLoaded] = useState<any>("");
	const userFinder = (id: string | null) => {
		const found = accounts?.find((acc) => acc?.id == id);
		return found?.username;
	};
	const sortedAcc = accounts?.map((acc) => {
		return { value: acc?.id ?? "", label: acc?.username ?? "" };
	});
	const rows = sortedData?.map((row, i) => (
		<Table.Tr key={row?.id}>
			<Table.Td>
				{format(new Date(row?.encounter?.enc_date), "dd/MM/yyyy")}
			</Table.Td>
			<Table.Td>{format(new Date(row?.date), "dd/MM/yyyy")}</Table.Td>
			<Table.Td>{row?.encounter?.patient?.hosp_no}</Table.Td>
			<Table.Td>{row?.encounter?.patient?.name}</Table.Td>
			<Table.Td>{row?.name}</Table.Td>
			<Table.Td>
				<NumberFormatter value={row?.quantity} thousandSeparator />
			</Table.Td>
			<Table.Td>
				<NumberFormatter value={row?.price} prefix='N ' thousandSeparator />
			</Table.Td>
			<Table.Td>
				<NumberFormatter value={row?.rate} prefix='N ' thousandSeparator />
			</Table.Td>
			<Table.Td>
				{row?.encounter?.updatedBy?.username ||
					userFinder(row?.encounter?.createdById)}
			</Table.Td>
		</Table.Tr>
	));
	const printRows = sortedData?.map((row, i) => (
		<Table.Tr key={row?.id} className='text-[10px]'>
			<Table.Td>
				{format(new Date(row?.encounter?.enc_date), "dd/MM/yyyy")}
			</Table.Td>
			<Table.Td>{format(new Date(row?.date), "dd/MM/yyyy")}</Table.Td>
			<Table.Td>{row?.encounter?.patient?.hosp_no}</Table.Td>
			<Table.Td>{row?.encounter?.patient?.name}</Table.Td>
			<Table.Td>{row?.name}</Table.Td>
			<Table.Td>
				<NumberFormatter value={row?.quantity} thousandSeparator />
			</Table.Td>
			<Table.Td>
				<NumberFormatter value={row?.price} prefix='N ' thousandSeparator />
			</Table.Td>
			<Table.Td>
				<NumberFormatter value={row?.rate} prefix='N ' thousandSeparator />
			</Table.Td>

			<Table.Td>
				{row?.encounter?.updatedBy?.username ||
					userFinder(row?.encounter?.createdById)}
			</Table.Td>
		</Table.Tr>
	));
	const getValuesUI = () => {
		if (criteria == "Drug") {
			return (
				<Select
					label='Drug'
					placeholder='search for or select a value'
					data={drugs}
					className='w-[16rem]'
					searchable
					clearable
					value={value}
					onChange={(value) => {
						setValue(value);
					}}
				/>
			);
		}
		if (criteria == "Dispenser") {
			return (
				<Select
					label='Accounts'
					placeholder='search for or select a value'
					data={sortedAcc}
					className='w-[16rem]'
					searchable
					clearable
					value={value}
					onChange={(value) => {
						setValue(value);
					}}
				/>
			);
		}
	};
	const getFilter = async () => {
		if (criteria == "Drug") {
			const found = queryData?.filter((d: any) => d?.name == value);
			setSortedData(found);
		}
		if (criteria == "Dispenser") {
			const found = queryData?.filter(
				(d: any) =>
					d?.encounter?.updatedById == value ||
					d?.encounter?.createdById == value
			);
			setSortedData(found);
			setPrevSorted(found);
		}
	};

	const filters = (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				getFilter();
			}}
			className='w-full'
		>
			<label htmlFor='filters'>Filters</label>
			<div id='filters' className='flex gap-3 items-end flex-wrap'>
				<Select
					label='Criteria'
					placeholder='select a criteria'
					data={["Drug", "Dispenser"]}
					value={criteria}
					className='w-[16rem]'
					searchable
					clearable
					onChange={(value) => {
						setCriteria(value);
						setValue(null);
					}}
				/>
				{getValuesUI()}
				<Button type='submit' disabled={!value}>
					Filter
				</Button>
				<Button
					color='red'
					onClick={() => {
						setSortedData(queryData);
						setPrevSorted([]);
						setCriteria(null);
						setValue(null);
					}}
				>
					Clear Filter
				</Button>
			</div>
			{prevSorted.length > 0 && (
				<Select
					label='Drug'
					placeholder='search for or select a value'
					data={drugs}
					className='mt-3 w-54'
					searchable
					clearable
					onChange={(value) => {
						if (!value) {
							setSortedData(prevSorted);
						} else {
							const filtererd = prevSorted.filter(
								(prev) => prev?.name == value
							);
							setSortedData(filtererd);
						}
					}}
				/>
			)}
		</form>
	);
	useEffect(() => {
		const getD = async () => {
			const { data } = await fetch("/drugsinventory/report");
			const sorted = data.map((d: { drug: { name: string } }) => {
				return d.drug.name;
			});
			setDrugs(sorted);
		};
		getD();
	}, []);
	useEffect(() => {
		if (!value) setSortedData(queryData);
	}, [value]);

	const total = sortedData.reduce((prev, curr) => {
		return Number(prev) + Number(curr?.price);
	}, 0);
	const quantity = sortedData.reduce((prev, curr) => {
		return Number(prev) + Number(curr?.quantity);
	}, 0);

	return (
		<main className='space-y-6'>
			<div className='flex justify-between items-end'>
				<DataLoader
					link='/reports/drugs/detailed'
					post={post}
					setQueryData={setQueryData}
					setLoaded={setLoaded}
				/>

				<Text size='md' fw={600}>
					Prescriptions report detailed
				</Text>
			</div>

			<ReportsTable
				headers={[
					"ENC Date",
					"Date",
					"Hosp No",
					"Patient",
					"Drug",
					"Quantity",
					"Price",
					"Rate",
					"Dispenser",
				]}
				printHeaders={[
					"ENC Date",
					"Date",
					"Hosp No",
					"Patient",
					"Drug",
					"Quantity",
					"Price",
					"Rate",
					"Dispenser",
				]}
				sortedData={sortedData}
				setSortedData={setSortedData}
				data={queryData}
				tableLoading={loading}
				rows={rows}
				printRows={printRows}
				filters={filters}
				loaded={loaded}
				tableReport={`Prescriptions report detailed for ${
					userFinder(value) || value || "all drugs"
				}`}
				tableFoot={
					<Table.Tr className='tableFoot'>
						<Table.Td></Table.Td>
						<Table.Td></Table.Td>
						<Table.Td></Table.Td>
						<Table.Td></Table.Td>
						<Table.Td>Total: </Table.Td>
						<Table.Td>
							<NumberFormatter value={quantity} thousandSeparator />
						</Table.Td>
						<Table.Td>
							<NumberFormatter prefix='N' value={total} thousandSeparator />
						</Table.Td>
						<Table.Td></Table.Td>
						<Table.Td></Table.Td>
					</Table.Tr>
				}
				metadata={
					<div className='my-2 w-full flex justify-between'>
						<h2 className='text-lg font-semibold'>
							Total Count: {sortedData.length}
						</h2>
					</div>
				}
			/>
		</main>
	);
};

export default Detailed;
