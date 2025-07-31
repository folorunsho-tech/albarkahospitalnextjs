/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useState, useContext } from "react";
import { Combobox, Loader, TextInput, useCombobox } from "@mantine/core";
import axios from "@/lib/config";
import { IconSearch } from "@tabler/icons-react";
import Link from "next/link";
import { userContext } from "@/context/User";

function getAsyncData(
	searchQuery: string,
	signal: AbortSignal,
	token: string | null
) {
	return new Promise<string[]>((resolve, reject) => {
		signal.addEventListener("abort", () => {
			reject(new Error("Request aborted"));
		});
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
	});
}

export default function GlobalPatientSearch() {
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
		<Link href={`patients/view/?id=${item?.id}`} key={item?.hosp_no}>
			<Combobox.Option value={item?.hosp_no}>
				{item?.hosp_no} - {item?.name}
			</Combobox.Option>
		</Link>
	));
	const right = (
		<div className='flex gap-2 items-center'>
			{loading && <Loader size={18} />}
			<IconSearch />
		</div>
	);

	return (
		<Combobox
			onOptionSubmit={(optionValue) => {
				setValue(optionValue);

				combobox.closeDropdown();
			}}
			withinPortal={false}
			store={combobox}
		>
			<Combobox.Target>
				<TextInput
					label='Global patient search'
					placeholder='Search for patient by hosp no or name'
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
					rightSection={right}
				/>
			</Combobox.Target>

			<Combobox.Dropdown
				hidden={data === null}
				style={{ border: "1px solid grey", marginTop: "-4px" }}
			>
				<Combobox.Options>
					{options}
					{empty && <Combobox.Empty>No results found</Combobox.Empty>}
				</Combobox.Options>
			</Combobox.Dropdown>
		</Combobox>
	);
}
