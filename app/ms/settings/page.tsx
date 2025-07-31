"use client";
import Tests from "@/components/settings/Tests";
import Diagnosis from "@/components/settings/Diagnosis";
import Fees from "@/components/settings/Fees";
import Procedures from "@/components/settings/Procedures";
import { Tabs, rem } from "@mantine/core";
import {
	TestTubes,
	BriefcaseMedical,
	Scissors,
	Receipt,
	Group,
	List,
	LocateIcon,Pill
} from "lucide-react";
import Care from "@/components/settings/Care";
import Groups from "@/components/settings/Groups";
import Towns from "@/components/settings/Towns";
import Drugs from "@/components/settings/Drugs";
const Settings = () => {
	const iconStyle = { width: rem(22), height: rem(22) };
	return (
		<Tabs defaultValue='tests' keepMounted={false}>
			<Tabs.List>
				<Tabs.Tab value='tests' leftSection={<TestTubes style={iconStyle} />}>
					Tests List
				</Tabs.Tab>

				<Tabs.Tab
					value='diagnosis'
					leftSection={<BriefcaseMedical style={iconStyle} />}
				>
					Diagnosis List
				</Tabs.Tab>
				<Tabs.Tab
					value='procedures'
					leftSection={<Scissors style={iconStyle} />}
				>
					Procedures List
				</Tabs.Tab>
				<Tabs.Tab value='fees' leftSection={<Receipt style={iconStyle} />}>
					Fees List
				</Tabs.Tab>
				<Tabs.Tab value='care' leftSection={<List style={iconStyle} />}>
					Care List
				</Tabs.Tab>
				<Tabs.Tab value='groups' leftSection={<Group style={iconStyle} />}>
					Groups List
				</Tabs.Tab>
				<Tabs.Tab value='towns' leftSection={<LocateIcon style={iconStyle} />}>
					Towns List
				</Tabs.Tab>
				<Tabs.Tab value='drugs' leftSection={<Pill style={iconStyle} />}>
					Drugs List
				</Tabs.Tab>
			</Tabs.List>

			<Tabs.Panel value='tests'>
				<Tests />
			</Tabs.Panel>
			<Tabs.Panel value='diagnosis'>
				<Diagnosis />
			</Tabs.Panel>

			<Tabs.Panel value='procedures'>
				<Procedures />
			</Tabs.Panel>
			<Tabs.Panel value='fees'>
				<Fees />
			</Tabs.Panel>
			<Tabs.Panel value='care'>
				<Care />
			</Tabs.Panel>
			<Tabs.Panel value='groups'>
				<Groups />
			</Tabs.Panel>
			<Tabs.Panel value='towns'>
				<Towns />
			</Tabs.Panel>
			<Tabs.Panel value='drugs'>
				<Drugs />
			</Tabs.Panel>
		</Tabs>
	);
};

export default Settings;
