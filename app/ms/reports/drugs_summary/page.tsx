"use client";
import Dispenser from "@/components/reports/tally/Dispenser";
import DrugsTally from "@/components/reports/tally/Drugs";
import { Tabs } from "@mantine/core";
const page = () => {
	return (
		<Tabs defaultValue='tally' keepMounted={false} color='teal'>
			<Tabs.List grow justify='space-between'>
				<Tabs.Tab value='tally'>Drugs Tally</Tabs.Tab>
				<Tabs.Tab value='dispenser'>Dispenser Tally</Tabs.Tab>
			</Tabs.List>
			<Tabs.Panel value='tally' className='py-4'>
				<DrugsTally />
			</Tabs.Panel>
			<Tabs.Panel value='dispenser' className='py-4'>
				<Dispenser />
			</Tabs.Panel>
		</Tabs>
	);
};

export default page;
