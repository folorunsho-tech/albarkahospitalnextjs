"use client";

import { useEffect, useState } from "react";
import {
	Button,
	Text,
	Group,
	LoadingOverlay,
	NumberInput,
	Select,
} from "@mantine/core";
import { useEdit, useFetch } from "@/queries";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
const page = () => {
	const { loading: eLoading, edit } = useEdit();
	const { fetch } = useFetch();
	const [added, setAdded] = useState(0);
	const [drug, setDrug] = useState<any>(null);
	const [mapped, setMapped] = useState<any[]>([]);
	const [queryData, setQueryData] = useState<any[]>([]);
	async function getAll() {
		const { data } = await fetch("/drugsinventory");
		setQueryData(data);
		const sorted = data?.map((d: any) => {
			return {
				value: d?.id,
				label: d?.drug?.name,
			};
		});
		setMapped(sorted);
	}
	useEffect(() => {
		getAll();
	}, []);
	return (
		<section className='space-y-4 '>
			<div className='flex justify-between items-center'>
				<Link
					className='bg-blue-500 hover:bg-blue-600 p-1 px-2 rounded-md text-white flex gap-3'
					href='/ms/drugs'
				>
					<ArrowLeft />
					Go back
				</Link>
				<Text size='xl'>Update drug stock</Text>
			</div>

			<form
				className='relative w-1/3 space-y-8'
				onSubmit={async (e) => {
					e.preventDefault();
					await edit(`/drugsinventory/${drug?.id}/gain`, {
						added: added,
						stock_qty: Number(drug?.stock_qty) + Number(added),
						prevStock: drug?.stock_qty,
					});
					setAdded(0);
					getAll();
				}}
			>
				<Select
					label='Drug'
					placeholder='Pick a drug'
					data={mapped}
					onChange={(value) => {
						const found = queryData.find((d: any) => d?.id == value);
						setDrug(found);
					}}
				/>
				<NumberInput
					label='Stock quantity'
					placeholder='Stock quantity...'
					min={0}
					value={Number(drug?.stock_qty) + Number(added)}
					hideControls={true}
					disabled
				/>
				<NumberInput
					label='Added quantity'
					placeholder='Added quantity...'
					value={added}
					required
					min={0}
					onChange={(value: any) => {
						setAdded(value);
					}}
				/>

				<Group mt={20}>
					<Button href='/ms/drugs' component={Link} color='black'>
						Cancel
					</Button>
					<Button disabled={!added} color='teal' type='submit'>
						Update stock
					</Button>
				</Group>
			</form>
			<LoadingOverlay visible={eLoading} />
		</section>
	);
};

export default page;
