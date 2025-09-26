"use client";
import { usePostNormal } from "@/queries";
import {
	Button,
	Container,
	LoadingOverlay,
	Paper,
	PasswordInput,
	TextInput,
	Title,
} from "@mantine/core";
import { useState, useContext } from "react";
import { notifications } from "@mantine/notifications";
import { IconX, IconServerOff } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { userContext } from "@/context/User";

const Login = () => {
	const { setUser, setPerm } = useContext(userContext);
	const { post, loading } = usePostNormal();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();
	return (
		<Container size={420} my={100}>
			<Title ta='center' className='text-xl'>
				Welcome back!
			</Title>

			<Paper
				component='form'
				withBorder
				shadow='md'
				p={30}
				mt={30}
				radius='md'
				className='relative'
				onSubmit={async (e) => {
					e.preventDefault();
					const res = await post("/auth/login", { username, password });

					if (res?.status === 200) {
						setUser(res.data);
						setPerm(JSON.parse(res.data?.menu));
						notifications.show({
							id: "AuthLogin",
							withCloseButton: false,
							onClose: () => {
								router.push("/ms");
							},
							autoClose: 1000,
							withBorder: true,
							title: "Login successful !!!",
							message: "Redirecting you to the homepage...",
							color: "teal",
							loading: true,
						});
					} else if (res?.status === 404 || res?.status === 401) {
						notifications.show({
							id: "AuthInvalid",
							withCloseButton: true,
							autoClose: 1000,
							withBorder: true,
							title: "Login error !!!",
							message:
								"Invalid credentials or account does not exist. Kindly contact admin for correction",
							color: "red",
							icon: <IconX />,
						});
					} else {
						notifications.show({
							id: "AuthServerError",
							withCloseButton: true,
							autoClose: 1000,
							withBorder: true,
							title: "Server error !!!",
							message:
								"Internal server error. Kindly contact admin for correction",
							color: "red",
							icon: <IconServerOff />,
						});
					}
				}}
			>
				<TextInput
					label='Username'
					placeholder='username'
					value={username}
					onChange={(e) => {
						setUsername(e.currentTarget.value);
					}}
					required
				/>
				<PasswordInput
					label='Password'
					placeholder='Your password'
					value={password}
					onChange={(e) => {
						setPassword(e.currentTarget.value);
					}}
					required
					mt='md'
				/>

				<Button type='submit' fullWidth mt='xl'>
					Sign in
				</Button>
				<LoadingOverlay visible={loading} />
			</Paper>
		</Container>
	);
};

export default Login;
