/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { userContext } from "@/context/User";
import { useEffect, useRef, useState, useContext } from "react";
import { Combobox, Loader, TextInput, useCombobox } from "@mantine/core";
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
					"/patients/search",
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

export default function PatientSearch({
	setPatient,
	cleared = false,
}: {
	setPatient: any;
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
		<Combobox.Option value={item?.hosp_no} key={item?.hosp_no}>
			{item?.hosp_no} - {item?.name}
		</Combobox.Option>
	));
	useEffect(() => {
		if (value == "") {
			setPatient(null);
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
				setValue(optionValue);

				setPatient(
					data?.find((patient: any) => patient?.hosp_no == optionValue)
				);
				combobox.closeDropdown();
			}}
			withinPortal={false}
			store={combobox}
		>
			<Combobox.Target>
				<TextInput
					label='Patient Hosp No'
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
