/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import {
	Button,
	TextInput,
	Group,
	Checkbox,
	LoadingOverlay,
	PasswordInput,
	Select,
} from "@mantine/core";
import { usePost, useFetch } from "@/queries";
import Link from "next/link";
const page = () => {
	const { post, loading } = usePost();
	const { fetch } = useFetch();
	const [id, setId] = useState("");
	const [username, setUsername] = useState("");
	const [role, setRole] = useState("user");
	const [active, setActive] = useState("");
	const [password, setPassword] = useState("");
	const [menus, setMenus] = useState<string[]>([]);
	const [accts, setAccts] = useState<[]>([]);

	const menuExist = (list: string) => {
		return JSON.parse(list).map((m: any) => {
			return m.link;
		});
	};
	const generateMenus = (links: string[]) => {
		return links.map((link) => {
			return {
				label: link,
				link,
			};
		});
	};
	const getAcct = async () => {
		const { data } = await fetch(`/accounts/${id}`);
		setUsername(data?.username);
		setRole(data?.role);
		setActive(String(data?.active));
		const m = menuExist(data?.menu);
		setMenus(m);
	};
	const getAccts = async () => {
		const { data } = await fetch(`/accounts`);
		const sorted = data?.map((acc: any) => {
			return {
				value: acc?.id,
				label: acc?.username,
			};
		});

		setAccts(sorted);
	};
	useEffect(() => {
		if (id !== "") getAcct();
	}, [id]);
	useEffect(() => {
		getAccts();
	}, []);
	return (
		<main className='w-max pt-12 space-y-6'>
			<Select
				label='Account'
				placeholder='Select account to edit'
				data={accts}
				onChange={(value: any) => {
					setId(value);
				}}
			/>
			<form
				className='relative'
				onSubmit={async (e) => {
					e.preventDefault();
					await post(`/accounts/edit/${id}`, {
						password: password !== "" ? password : null,
						role,
						menu: JSON.stringify(
							generateMenus(menus).sort((a, b) =>
								a.label.localeCompare(b.label)
							)
						),
						menus,
						active: Boolean(active),
					});

					setUsername("");
					setPassword("");
					setMenus([]);
				}}
			>
				<TextInput
					label='Username'
					placeholder='username'
					value={username}
					disabled
				/>
				<PasswordInput
					label='Password'
					placeholder='Your password'
					value={password}
					onChange={(e) => {
						setPassword(e.currentTarget.value);
					}}
				/>
				<Select
					label='Role'
					data={["admin", "user"]}
					value={role}
					onChange={(value: any) => {
						setRole(value);
					}}
					allowDeselect={false}
				/>
				<Select
					label='Status'
					data={[
						{
							value: "true",
							label: "Active",
						},
						{
							value: "false",
							label: "Inactive",
						},
					]}
					placeholder='status'
					value={active}
					onChange={(value: any) => {
						setActive(value);
					}}
					allowDeselect={false}
				/>
				<Checkbox.Group
					label="Select account's menus"
					onChange={setMenus}
					value={menus}
					withAsterisk
					mt={20}
				>
					<Group mt='xs'>
						<Checkbox value='accounts' label='Accounts' />
						<Checkbox value='drugs' label='Drugs' />
						<Checkbox value='encounters' label='Encounters' />
						<Checkbox value='patients' label='Patients' />
						<Checkbox value='reports' label='Reports' />
						<Checkbox value='settings' label='Settings' />
						<Checkbox value='transactions' label='Transactions' />
					</Group>
				</Checkbox.Group>
				<Group mt={20} justify='end'>
					<Button component={Link} href={`/ms/accounts`} color='black'>
						Cancel
					</Button>
					<Button disabled={menus.length < 1} type='submit' color='teal'>
						Update account
					</Button>
				</Group>
			</form>
			<LoadingOverlay visible={loading} />
		</main>
	);
};

export default page;
