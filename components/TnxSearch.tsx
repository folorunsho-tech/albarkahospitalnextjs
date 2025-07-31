/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { userContext } from "@/context/User";
import { useEffect, useRef, useState, useContext } from "react";
import {
	Combobox,
	Loader,
	NumberFormatter,
	Table,
	TextInput,
	useCombobox,
} from "@mantine/core";
import axios from "@/lib/config";

function getAsyncData(
	searchQuery: string,
	signal: AbortSignal,
	token: string | null
) {
	return new Promise<string[]>((resolve, reject) => {
		signal.addEventListener("abort", () => {
			reject(new Error("Request aborted"));
		});
		if (searchQuery !== "") {
			axios
				.post(
					"/transactions/byPatient",
					{ value: searchQuery },
					{
						headers: {
							Authorization: token,
						},
					}
				)
				.then((result: any) => {
					resolve(result.data);
				});
		} else {
			return resolve([]); // Return an empty array if searchQuery is empty
		}
	});
}

export default function TnxSearch({
	setTnx,
	cleared = false,
}: {
	setTnx: any;
	cleared?: boolean;
}) {
	const { token } = useContext(userContext);
	const combobox = useCombobox({
		onDropdownClose: () => combobox.resetSelectedOption(),
	});

	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<any[] | null>(null);
	const [value, setValue] = useState("");
	const [empty, setEmpty] = useState(false);
	const abortController = useRef<AbortController | undefined>(null);

	const fetchOptions = (query: string) => {
		abortController.current?.abort();
		abortController.current = new AbortController();
		setLoading(true);

		getAsyncData(query, abortController.current.signal, token)
			.then((result) => {
				setData(result);
				setLoading(false);
				setEmpty(result.length === 0);
				abortController.current = undefined;
			})
			.catch(() => {});
	};

	const options = (data || []).map((item) => (
		<Combobox.Option value={item?.id} key={item?.id}>
			<div className='p-1 rounded text-xs' key={item?.id}>
				<h3 className='text-xs font-semibold'>
					<span>Tnx Id: {item?.id}</span> /{" "}
					<span>
						Update Date: {new Date(item?.updatedAt).toLocaleDateString()}
					</span>{" "}
					/ <span>Year: {item?.year}</span> / <span>Month: {item?.month}</span>{" "}
					/{" "}
					<span>
						Balance: <NumberFormatter value={item?.balance} />
					</span>{" "}
					/{" "}
					<span>
						Total: <NumberFormatter value={item?.total} />
					</span>
				</h3>
				<p>Items:</p>
				<Table>
					<Table.Thead className='text-xs'>
						<Table.Tr>
							<Table.Th>S/N</Table.Th>
							<Table.Th>Fee</Table.Th>
							<Table.Th>Amount</Table.Th>
							<Table.Th>Paid</Table.Th>
							<Table.Th>Balance</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>
						{item?.items?.map(
							(
								tnxItem: {
									id: string;
									paid: number;
									price: number;
									balance: number;
									fee: {
										name: string;
									};
								},
								i: number
							) => (
								<Table.Tr key={tnxItem.id} className='text-xs'>
									<Table.Td>{i + 1}</Table.Td>
									<Table.Td>{tnxItem.fee.name}</Table.Td>
									<Table.Td>{tnxItem.price}</Table.Td>
									<Table.Td>{tnxItem.paid}</Table.Td>
									<Table.Td>{tnxItem.balance}</Table.Td>
								</Table.Tr>
							)
						)}
					</Table.Tbody>
				</Table>
			</div>
		</Combobox.Option>
	));
	useEffect(() => {
		if (value == "") {
			setTnx(null);
		}
	}, [value]);
	useEffect(() => {
		if (cleared) {
			setValue("");
		}
	}, [cleared]);
	return (
		<Combobox
			onOptionSubmit={(optionValue) => {
				const found = data?.find((tnx: any) => tnx?.id == optionValue);
				setValue(found?.patient?.hosp_no);
				setTnx(found);
				combobox.closeDropdown();
			}}
			withinPortal={false}
			store={combobox}
		>
			<Combobox.Target>
				<TextInput
					label='Search for outstanding tnx by Hosp No'
					placeholder='Search by hosp no '
					value={value}
					onChange={(event) => {
						setValue(event.currentTarget.value);
						fetchOptions(event.currentTarget.value);
						combobox.resetSelectedOption();
						combobox.openDropdown();
					}}
					onClick={() => combobox.openDropdown()}
					onFocus={() => {
						combobox.openDropdown();
						if (data === null) {
							fetchOptions(value);
						}
					}}
					onBlur={() => combobox.closeDropdown()}
					rightSection={loading && <Loader size={18} />}
					className='w-[25rem]'
				/>
			</Combobox.Target>

			<Combobox.Dropdown hidden={data === null}>
				<Combobox.Options>
					{options}
					{empty && <Combobox.Empty>No results found</Combobox.Empty>}
				</Combobox.Options>
			</Combobox.Dropdown>
		</Combobox>
	);
}
