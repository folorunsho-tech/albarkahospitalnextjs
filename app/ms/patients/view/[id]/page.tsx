/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useFetch } from "@/queries";
import { Button, Text, Tabs, rem, Group } from "@mantine/core";
import {
	ArrowLeft,
	FileSpreadsheet,
	Info,
	Pencil,
	Receipt,
} from "lucide-react";
import Encounters from "@/components/patients/Encounters";
import Transactions from "@/components/patients/Transactions";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
const View = () => {
	const iconStyle = { width: rem(20), height: rem(20) };
	const { id } = useParams<{ id: string }>();

	const { fetch } = useFetch();
	const [queryData, setQueryData] = useState<any>(null);
	const router = useRouter();
	const [createdBy, setCreatedBy] = useState<any>(null);

	useEffect(() => {
		const getAll = async () => {
			const { data: found } = await fetch(`/patients/p/${id}`);
			const { data: created } = await fetch(`/accounts/${found?.createdById}`);
			setQueryData(found);
			setCreatedBy(created);
		};
		getAll();
	}, []);
	return (
		<main className='space-y-6'>
			<div className='flex justify-between items-end'>
				<Link
					className='bg-blue-500 hover:bg-blue-600 p-1 px-2 rounded-lg text-white flex gap-3'
					href='/ms/patients'
				>
					<ArrowLeft />
					Go back
				</Link>
				<div className='flex items-center gap-4'>
					<Button
						justify='end'
						color='teal'
						onClick={() => {
							router.push(`/ms/patients/edit/${id}`);
						}}
						leftSection={<Pencil style={{ width: rem(16), height: rem(16) }} />}
					>
						Edit data
					</Button>
					<Text size='xl'>Viewing patient's data</Text>
				</div>
			</div>
			<Tabs defaultValue='info' keepMounted={false}>
				<Tabs.List>
					<Tabs.Tab value='info' leftSection={<Info style={iconStyle} />}>
						Info
					</Tabs.Tab>
					<Tabs.Tab
						value='encounter'
						leftSection={<FileSpreadsheet style={iconStyle} />}
					>
						Encounters
					</Tabs.Tab>
					<Tabs.Tab
						value='transactions'
						leftSection={<Receipt style={iconStyle} />}
					>
						Transactions
					</Tabs.Tab>
				</Tabs.List>

				<Tabs.Panel value='info'>
					<main className='flex flex-wrap w-full gap-4 mt-3'>
						<Group>
							<Text fw={600}>Hospital No:</Text>
							<Text>{queryData?.hosp_no}</Text>
						</Group>
						<Group>
							<Text fw={600}>Name:</Text>
							<Text>{queryData?.name}</Text>
						</Group>
						<Group>
							<Text fw={600}>Sex:</Text>
							<Text>{queryData?.sex}</Text>
						</Group>
						<Group>
							<Text fw={600}>Age:</Text>
							<Text>{queryData?.age}</Text>
						</Group>
						<Group>
							<Text fw={600}>Address:</Text>
							<Text>{queryData?.town?.name}</Text>
						</Group>
						<Group>
							<Text fw={600}>Group:</Text>
							<Text>{queryData?.groups?.name}</Text>
						</Group>
						<Group>
							<Text fw={600}>Registration date:</Text>
							<Text>{new Date(queryData?.reg_date).toLocaleDateString()}</Text>
						</Group>
						<Group>
							<Text fw={600}>Created By:</Text>
							<i className='underline'>{createdBy?.username}</i>
						</Group>
						<Group>
							<Text fw={600}>Last Updated By:</Text>
							<i className='underline'>{queryData?.updatedBy?.username}</i>
						</Group>
					</main>
				</Tabs.Panel>

				<Tabs.Panel value='encounter'>
					<Encounters id={queryData?.id} hosp_no={queryData?.hosp_no} />
				</Tabs.Panel>

				<Tabs.Panel value='transactions'>
					<Transactions id={queryData?.id} hosp_no={queryData?.hosp_no} />
				</Tabs.Panel>
			</Tabs>
		</main>
	);
};

export default View;
