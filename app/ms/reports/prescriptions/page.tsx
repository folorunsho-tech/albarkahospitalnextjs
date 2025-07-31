"use client";

import Detailed from "@/components/reports/drugs/Detailed";
import Summary from "@/components/reports/drugs/Summary";
import { Tabs } from "@mantine/core";

const page = () => {
	return (
		<Tabs defaultValue='summary' keepMounted={false} color='teal'>
			<Tabs.List grow justify='space-between'>
				<Tabs.Tab value='summary'>Summary</Tabs.Tab>
				<Tabs.Tab value='detailed'>Detailed</Tabs.Tab>
			</Tabs.List>
			<Tabs.Panel value='summary' className='py-4'>
				<Summary />
			</Tabs.Panel>
			<Tabs.Panel value='detailed' className='py-4'>
				<Detailed />
			</Tabs.Panel>
		</Tabs>
	);
};

export default page;
