/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import PaginatedTable from "../PaginatedTable";
import {
    Button,
    Table,
    rem,
    ActionIcon,
    Modal,
    TextInput,
    Group,
    LoadingOverlay,
} from "@mantine/core";
import { Pencil } from "lucide-react";
import { useDisclosure } from "@mantine/hooks";
import { useFetch, usePostNormal } from "@/queries";
const Drugs = () => {
    const { loading, fetch, data } = useFetch();
    const { loading: pLoading, post } = usePostNormal();
    const [opened, { open, close }] = useDisclosure(false);
    const [queryData, setQueryData] = useState<any[]>(data);
    const [sortedData, setSortedData] = useState<any[]>([]);
    const [name, setName] = useState("");
    const [eID, setEID] = useState<string>("");
    const [Ename, setEName] = useState<string>("");
    const rows = sortedData?.map((row, i: number) => (
        <Table.Tr key={row?.id}>
            <Table.Td>{i + 1}</Table.Td>
            <Table.Td className='font-semibold'>{row?.name}</Table.Td>

            <Table.Td>
                <ActionIcon
                    onClick={() => {
                        open();
                        setEID(row?.id);
                        setEName(row?.name);
                    }}
                >
                    <Pencil style={{ width: rem(14), height: rem(14) }} />
                </ActionIcon>
            </Table.Td>
        </Table.Tr>
    ));
    useEffect(() => {
        async function getAll() {
            const { data } = await fetch("/settings/drugs");
            setQueryData(data);
        }
        getAll();
    }, []);

    return (
        <main className='space-y-6 py-4'>
            <section className='flex items-end justify-between'>
                <h2 className='text-xl font-bold'>Drugs</h2>
                <form
                    className='flex gap-6'
                    onSubmit={async (e) => {
                        e.preventDefault();
                        await post("/settings/drugs", {
                            name,
                        });
                        const { data } = await fetch("/settings/drugs");
                        setQueryData(data);
                        setName("");
                    }}
                >
                    <TextInput
                        label='Name'
                        placeholder='Drug name...'
                        value={name}
                        required
                        onChange={(e) => {
                            setName(e.currentTarget.value);
                        }}
                    />

                    <Group mt={20} justify='end'>
                        <Button disabled={!name} type='submit'>
                            Add drug
                        </Button>
                    </Group>
                </form>
            </section>
            <PaginatedTable
                headers={["S/N", "Name", "Actions"]}
                placeholder='Search by name'
                sortedData={sortedData}
                rows={rows}
                showSearch={true}
                showPagination={true}
                data={queryData}
                setSortedData={setSortedData}
                tableLoading={loading}
            />

            <Modal opened={opened} onClose={close} title='Edit Drug'>
                <form
                    className='relative'
                    onSubmit={async (e) => {
                        e.preventDefault();
                        await post(`/settings/drugs/edit/${eID}`, {
                            name: Ename,
                        });
                        const { data } = await fetch("/settings/drugs");
                        setQueryData(data);
                        close();
                    }}
                >
                    <TextInput
                        label='Name'
                        placeholder='drug name...'
                        value={Ename}
                        onChange={(e) => {
                            setEName(e.currentTarget.value);
                        }}
                    />

                    <Group mt={20} justify='end'>
                        <Button onClick={close} color='black'>
                            Cancel
                        </Button>
                        <Button disabled={!Ename} type='submit'>
                            Update Drug
                        </Button>
                    </Group>
                </form>
                <LoadingOverlay visible={pLoading} />
            </Modal>
        </main>
    );
};

export default Drugs;
