"use client";
import { useState, useEffect } from "react";
import {
	Button,
	Group,
	LoadingOverlay,
	NumberInput,
	Select,
	Text,
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
		<section className='space-y-4'>
			<div className='flex justify-between items-center'>
				<Link
					className='bg-blue-500 hover:bg-blue-600 p-1 px-2 rounded-md text-white flex gap-3'
					href='/ms/drugs'
				>
					<ArrowLeft />
					Go back
				</Link>
				<Text size='xl'>Add drug loss</Text>
			</div>
			<form
				className='relative w-1/3 space-y-8'
				onSubmit={async (e) => {
					e.preventDefault();
					await edit(`/drugsinventory/${drug?.id}/loss`, {
						added: -added,
						stock_qty: Number(drug?.stock_qty) - Number(added),
						prevStock: drug?.stock_qty,
					});
					setAdded(0);
					getAll();
				}}
			>
				<Select
					label='Drug'
					placeholder='Pick or Search for a drug'
					data={mapped}
					onChange={(value) => {
						const found = queryData?.find((d: any) => d?.id == value);
						setDrug(found);
					}}
					searchable
					nothingFoundMessage='No drug found'
					required
					value={drug?.id}
				/>
				<NumberInput
					label='Stock quantity'
					placeholder='Stock quantity...'
					min={0}
					value={Number(drug?.stock_qty) - Number(added)}
					hideControls={true}
					disabled
				/>
				<NumberInput
					label='Loss quantity'
					placeholder='Loss quantity...'
					value={added}
					required
					min={0}
					max={Number(drug?.stock_qty)}
					onChange={(value: any) => {
						setAdded(value);
					}}
				/>

				<Group mt={20} justify='end'>
					<Button href='/ms/drugs' component={Link} color='black'>
						Cancel
					</Button>
					<Button disabled={!added} color='red' type='submit'>
						Add loss
					</Button>
				</Group>
			</form>
			<LoadingOverlay visible={eLoading} />
		</section>
	);
};

export default page;
