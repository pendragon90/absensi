import React, { useEffect, useState } from "react";
import DashboardLayout from "../../Layouts/DashboardLayout";
import { Group, Input, Skeleton, Table } from "@mantine/core";
import { usePage } from "@inertiajs/inertia-react";
import { CiSearch } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import ConfirmEdit from "../../Components/ConfirmEdit";
import ConfirmDelete from "../../Components/ConfirmDelete";
import CreateModal from "../../Components/CreateModal";
import Pagination from "../../Components/Pagination";
import { useForm } from "@inertiajs/inertia-react";

function Teachers() {
    const { user,teachers } = usePage().props;
    const { data, setData, get } = useForm({
        search: "",
    });

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            get("/dashboard/teachers", {
                preserveState: true,
                preserveScroll: true,
            });
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [data.search]);

    const rows = teachers.data ? (
        teachers.data.map((val, index) => (
            <Table.Tr key={index}>
                <Table.Td>{index + 1}</Table.Td>
                <Table.Td>{val.name}</Table.Td>
            </Table.Tr>
        ))
    ) : (
        <Skeleton />
    );

    const handlePageChange = (page) => {
        get(`/dashboard/teachers?page=${page}`, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <DashboardLayout user={user}>
            <Group justify="start" mb={10}>
                <Input
                value={data.search}
                onChange={(e) => setData("search", e.target.value)}
                    placeholder="Search..."
                    leftSection={<CiSearch className="h-4" />}
                />
            </Group>
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>No</Table.Th>
                        <Table.Th>Nama Murid</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
            <Pagination
                meta={teachers.meta}
                onPageChange={handlePageChange}
            />
        </DashboardLayout>
    );
}

export default Teachers;
