import { useDisclosure } from "@mantine/hooks";
import { Drawer, Button, MultiSelect } from "@mantine/core";
import { useFetch, useCreate } from "@/queries";
import { useEffect, useState } from "react";

const AddInventory = () => {
	const { fetch } = useFetch();
	const { post, loading } = useCreate();
	const [opened, { open, close }] = useDisclosure(false);
	const [drugsList, setDrugsList] = useState([]);
	const [drugs, setDrugs] = useState<string[]>([]);
	const getDrugs = async () => {
		const { data } = await fetch("/settings/drugs");
		const { data: ids } = await fetch("/drugsinventory/ids");
		const sortedIds = ids.map((drug: { drugId: string }) => {
			return drug.drugId;
		});
		const sorted = data.map((drug: { name: string; id: string }) => {
			return {
				label: drug.name,
				value: drug.id,
			};
		});
		setDrugsList(sorted);
		setDrugs(sortedIds);
	};
	useEffect(() => {
		if (opened) {
			getDrugs();
		}
	}, [opened]);
	return (
		<>
			<Drawer opened={opened} onClose={close} title='Add drug to inventory'>
				<form
					onSubmit={async (e) => {
						e.preventDefault();
						await post("/drugsinventory", { drugs });
						getDrugs();
						// setDrugs([]);
					}}
					className='space-y-6'
				>
					<MultiSelect
						label='Drug(s)'
						data={drugsList}
						value={drugs}
						onChange={(value) => {
							setDrugs(value);
						}}
						placeholder='select drug(s)...'
						hidePickedOptions
					/>
					<Button type='submit' color='teal'>
						Add to inventory
					</Button>
				</form>
			</Drawer>

			<Button color='teal' onClick={open}>
				Add to inventory
			</Button>
		</>
	);
};

export default AddInventory;
