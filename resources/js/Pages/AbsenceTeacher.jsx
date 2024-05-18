import {
    Paper,
    Title,
    Container,
    Button,
    Select,
    Group,
    FileInput,
} from "@mantine/core";
import classes from "./css/Absence.module.css";
import HomeLayout from "../Layouts/HomeLayout";
import { usePage } from "@inertiajs/inertia-react";
import { notifications } from "@mantine/notifications";
import { useForm } from "@inertiajs/inertia-react";
import { Link } from "@inertiajs/inertia-react";

export default function AbsenceTeacher() {
    const {
        user,
        classrooms,
        absenceStatuses,
        lessons,
        teachers,
        learningActivityStatuses,
    } = usePage().props;

    const { data, setData, post,processing } = useForm({
        teacher: "",
        classroom: "",
        lesson: "",
        learning_activity_status: "",
        absence_status: "",
        photo_start: null,
        photo_end: null,
        photo_assignment: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/dashboard/teachers/absence", {
            onSuccess: () => {
                notifications.show({
                    title: `Absensi berhasil! 🎉`,
                    color: "green",
                });
            },
            onError: () => {
                notifications.show({
                    title: `Absensi tidak berhasil, coba lagi! ❌`,
                    color: "green",
                });
            },
        });
    };

    const classroomOptions = classrooms.map((val) => ({
        label: val.name,
        value: val.slug,
    }));

    const teacherOptions = teachers.map((val) => ({
        label: val.name,
        value: val.slug,
    }));
    const lessonOptions = lessons.map((val) => ({
        label: val.name,
        value: val.slug,
    }));
    const absenceStatusOptions = absenceStatuses.map((val) => ({
        label: val.name,
        value: val.slug,
    }));

    const learningActivityStatusOptions = learningActivityStatuses.map(
        (val) => ({ label: val.name, value: val.slug })
    );

    return (
        <HomeLayout user={user}>
            <Container size={420} my={40}>
                <Group justify="center">
                    <Title ta="center" className={classes.title}>
                        Halaman Absensi Kehadiran Guru
                    </Title>
                    <Link
                        className="lowercase text-blue-500 cursor-pointer text-md"
                        href="/"
                    >
                        ke halaman absensi kehadiran Murid
                    </Link>
                </Group>

                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <form onSubmit={handleSubmit}>
                        <Select
                            label="Kelas"
                            placeholder="Pilih kelas"
                            data={classroomOptions}
                            onChange={(value) => setData("classroom", value)}
                            value={data.classroom}
                            required
                            searchable
                        />

                        <Select
                            mt={15}
                            label="Guru"
                            placeholder="Pilih Nama guru"
                            data={teacherOptions}
                            value={data.teacher}
                            onChange={(value) => setData("teacher", value)}
                            required
                            searchable
                        />

                        <Select
                            mt={15}
                            label="Mapel"
                            placeholder="Pilih Mapel"
                            data={lessonOptions}
                            value={data.lesson}
                            onChange={(value) => setData("lesson", value)}
                            required
                            searchable
                        />

                        <Select
                            mt={15}
                            label="Aktifitas Pembelajaran"
                            placeholder="Pilih Aktifitas Pembelajaran Saat Ini"
                            data={learningActivityStatusOptions}
                            onChange={(value) =>
                                setData("learning_activity_status", value)
                            }
                            required
                            searchable
                        />

                        <Select
                            mt={15}
                            label="Absensi Kehadiran"
                            placeholder="Pilih Absensi Kehadiran"
                            data={absenceStatusOptions}
                            onChange={(value) =>
                                setData("absence_status", value)
                            }
                            required
                            searchable
                        />

                        <FileInput
                            mt={15}
                            accept="image/png,image/jpeg"
                            label="Foto Masuk Pembelajaran"
                            placeholder="boleh kosong"
                            clearable
                            value={data.photo_start}
                            onChange={e => setData('photo_start', e)}
                        />

                        <FileInput
                            mt={15}
                            accept="image/png,image/jpeg"
                            label="Foto Tugas yang diberikan"
                            placeholder="boleh kosong"
                            clearable
                            value={data.photo_assignment}
                            onChange={e => setData('photo_assignment', e)}
                        />

                        <FileInput
                            mt={15}
                            accept="image/png,image/jpeg"
                            label="Foto Selesai Pembelajaran"
                            placeholder="boleh kosong"
                            clearable
                            value={data.photo_end}
                            onChange={e => setData('photo_end', e)}
                        />

                        <Button type="submit" fullWidth mt="xl"  disabled={processing}
    loading={processing}>
                            Send
                        </Button>
                    </form>
                </Paper>
            </Container>
        </HomeLayout>
    );
}
