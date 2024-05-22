import React, { useEffect, useRef } from "react";
import { usePage, useForm } from "@inertiajs/inertia-react";
import {
    Group,
    Table,
    Select,
    Modal,
    Button,
    Image,
    Skeleton,
} from "@mantine/core";
import DashboardLayout from "../../../Layouts/DashboardLayout";
import { DateInput } from "@mantine/dates";
import moment from "moment-timezone";
import Pagination from "../../../Components/Pagination";
import { useDisclosure } from "@mantine/hooks";
import { MdFilterListAlt } from "react-icons/md";
import { IoPrint } from "react-icons/io5";
import {useReactToPrint} from "react-to-print"

function DashboardStudents() {
    const {
        user,
        studentAbsences,
        classrooms,
        lessons,
        students,
        studentsFilter,
        teachers,
        absenceStatuses,
    } = usePage().props;
    const { data, setData, get } = useForm({
        date: "",
        classroom: "",
        lesson: "",
        student: "",
        teacher: "",
        absenceStatus: "",
        perpage: "20",
    });
    const [opened, { open, close }] = useDisclosure(false);
    const componentPdf = useRef()

    const handleFilterChange = (name, value) => {
        if (name === "date" && value) {
            const jakartaDate = moment(value)
                .tz("Asia/Jakarta")
                .format("YYYY-MM-DD HH:mm:ss");
            setData(name, jakartaDate);
        } else {
            setData(name, value);
        }
    };

    useEffect(() => {
        if (
            data.absenceStatus !== "" ||
            data.student !== "" ||
            data.teacher !== "" ||
            data.teacher !== "" ||
            data.classroom !== "" ||
            data.lesson !== "" ||
            data.date !== "" ||
            data.perpage !== "20"
        ) {
            get("/dashboard/students/absence", {
                preserveState: true,
                preserveScroll: true,
            });
        }
    }, [
        data.student,
        data.teacher,
        data.absenceStatus,
        data.classroom,
        data.lesson,
        data.date,
        data.perpage,
    ]);

    const handlePrint = useReactToPrint({
        content: () => componentPdf.current,
        documentTitle: "Table Absence",
    })

    const rows = studentAbsences.data ? (
        studentAbsences.data.map((val, index) => (
            <Table.Tr key={index}>
                <Table.Td>{val.date}</Table.Td>
                <Table.Td>{val.student}</Table.Td>
                <Table.Td>{val.classroom}</Table.Td> 
                <Table.Td>{val.teacher}</Table.Td>
                <Table.Td>{val.lesson}</Table.Td>
                <Table.Td>{val.absence_status}</Table.Td>
            </Table.Tr>
        ))
    ) : (
        <Skeleton />
    );

    const handlePageChange = (page) => {
        get(`/dashboard/students/absence?page=${page}`, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <DashboardLayout user={user}>
                <Modal
                    opened={opened}
                    onClose={close}
                    title="Filter Table"
                    centered
                >
                    <DateInput
                        value={data.date ? new Date(data.date) : null}
                        onChange={(value) => handleFilterChange("date", value)}
                        label="Date input"
                        placeholder="Date input"
                    />

                    <Select
                        label="Kelas"
                        placeholder="Pilih kelas"
                        data={classrooms.map((classroom) => ({
                            value: classroom.slug,
                            label: classroom.name,
                        }))}
                        value={data.classroom}
                        onChange={(value) =>
                            handleFilterChange("classroom", value)
                        }
                        searchable
                        clearable
                        nothingFoundMessage="Nothing found..."
                    />

                    <Select
                        label="Status Absensi"
                        placeholder="Pilih Status Absensi"
                        data={absenceStatuses.map((absenceStatus) => ({
                            value: absenceStatus.slug,
                            label: absenceStatus.name,
                        }))}
                        value={data.absenceStatus}
                        onChange={(value) =>
                            handleFilterChange("absenceStatus", value)
                        }
                        searchable
                        clearable
                        nothingFoundMessage="Nothing found..."
                    />

                    <Select
                        label="Murid"
                        placeholder="Pilih Nama Murid"
                        data={studentsFilter.map((student) => ({
                            value: student.slug,
                            label: student.name,
                        }))}
                        value={data.student}
                        onChange={(value) =>
                            handleFilterChange("student", value)
                        }
                        searchable
                        clearable
                        nothingFoundMessage="Nothing found..."
                    />

                    <Select
                        label="Guru"
                        placeholder="Pilih Nama Guru"
                        data={teachers.map((teacher) => ({
                            value: teacher.slug,
                            label: teacher.name,
                        }))}
                        value={data.teacher}
                        onChange={(value) =>
                            handleFilterChange("teacher", value)
                        }
                        searchable
                        clearable
                        nothingFoundMessage="Nothing found..."
                    />

                    <Select
                        label="Mapel"
                        placeholder="Pilih Mapel"
                        data={lessons.map((lesson) => ({
                            value: lesson.slug,
                            label: lesson.name,
                        }))}
                        value={data.lesson}
                        onChange={(value) =>
                            handleFilterChange("lesson", value)
                        }
                        searchable
                        clearable
                        nothingFoundMessage="Nothing found..."
                    />
                </Modal>

                <Group mb={10} justify="space-between">
                <Select
                    label="Pilih jumlah data perhalaman"
                    placeholder=""
                    data={[10, 20, 50, 100].map((value) => ({
                        value: value.toString(),
                        label: value.toString(),
                    }))}
                    value={data.perpage}
                    onChange={(e) => handleFilterChange("perpage", e)}
                />

                    <Group>
                        <Button
                            leftSection={<IoPrint className="h-5" />}
                            variant="default"
                            onClick={handlePrint}
                        >
                            Print
                        </Button>

                        <Button
                            onClick={open}
                            leftSection={<MdFilterListAlt className="h-5" />}
                            variant="default"
                        >
                            Filter
                        </Button>
                    </Group>
                </Group>
            <div ref={componentPdf}>
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Tanggal</Table.Th>
                            <Table.Th>Murid</Table.Th>
                            <Table.Th>Kelas</Table.Th>
                            <Table.Th>Guru</Table.Th>
                            <Table.Th>Mapel</Table.Th>
                            <Table.Th>Status Absensi</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </div>
            <Pagination
                meta={studentAbsences.meta}
                onPageChange={handlePageChange}
            />
        </DashboardLayout>
    );
}

export default DashboardStudents;
