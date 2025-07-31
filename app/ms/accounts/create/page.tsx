/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import {
	Button,
	TextInput,
	Group,
	Checkbox,
	LoadingOverlay,
	PasswordInput,
	Select,
} from "@mantine/core";
import { usePost } from "@/queries";
import Link from "next/link";
const page = () => {
	const { post, loading } = usePost();

	const [username, setUsername] = useState("");
	const [role, setRole] = useState("user");
	const [password, setPassword] = useState("");
	const [menu, setMenu] = useState<{ label: string; link: string }[]>([]);
	const generateMenus = (links: string[]) => {
		return links.map((link) => {
			return {
				label: link,
				link,
			};
		});
	};
	return (
		<main className='w-max pt-12'>
			<form
				className='relative'
				onSubmit={async (e) => {
					e.preventDefault();
					await post("/accounts", {
						username,
						password,
						role,
						menu: JSON.stringify(
							menu.sort((a, b) => a.label.localeCompare(b.label))
						),
					});

					setUsername("");
					setPassword("");
					setMenu([]);
				}}
			>
				<TextInput
					label='Username'
					placeholder='username'
					value={username}
					autoComplete=''
					onChange={(e) => {
						setUsername(e.currentTarget.value);
					}}
					required
				/>
				<PasswordInput
					label='Password'
					placeholder='Your password'
					autoComplete=''
					value={password}
					onChange={(e) => {
						setPassword(e.currentTarget.value);
					}}
					required
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
				<Checkbox.Group
					label="Select account's menus"
					onChange={(values) => {
						const generated = generateMenus(values);
						setMenu(generated);
					}}
					withAsterisk
					mt={20}
				>
					<Group mt='xs'>
						<Checkbox value='accounts' label='Accounts' />
						<Checkbox value='backup' label='Backup' />
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
					<Button disabled={menu.length < 1} type='submit' color='teal'>
						Add new account
					</Button>
				</Group>
			</form>
			<LoadingOverlay visible={loading} />
		</main>
	);
};

export default page;
