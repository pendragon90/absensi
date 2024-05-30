import {
    Paper,
    Title,
    Container,
    Group,
    Button,
    Select,
    TextInput,
    Avatar,
    Modal,
    Text,
} from "@mantine/core";
import classes from "./Auth/css/Login.module.css";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@inertiajs/react";
import { usePage } from "@inertiajs/inertia-react";
import { notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { Link } from "@inertiajs/inertia-react";
import { AiFillEdit } from "react-icons/ai";
import MonthInput from "../Components/MonthInput";
import { useState } from "react";
import { ImCancelCircle } from "react-icons/im";

export default function ProfilePage() {
    const { user, classrooms, errors } = usePage().props;
    const [opened, { open, close }] = useDisclosure(false);
    const { classroom } = user.data;

    const userClassroom = {
        label: classroom.name,
        value: classroom.slug,
    };

    const { data,get, patch, setData, processing } = useForm({
        username: user.data.username,
        name: user.data.name,
        classroom: userClassroom.value,
        birthdate: user.data.birthdate,
    });

    const [isDataChanged, setIsDataChanged] = useState(false);

    const clearData = () => {
        get('/profile')
    };

    const checkDataChanged = (newData) => {
        const isChanged =
            newData.username !== user.data.username ||
            newData.name !== user.data.name ||
            newData.classroom !== userClassroom.value ||
            newData.birthdate !== user.data.birthdate;

        setIsDataChanged(isChanged);
    };

    const handleChange = (field, value) => {
        const newData = { ...data, [field]: value };
        setData(field, value);
        checkDataChanged(newData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        patch(`/profile/${user.data.slug}`, {
            onSuccess: () => {
                notifications.show({
                    title: `Profil berhasil diperbarui! 🎉`,
                    color: "green",
                });
                setIsDataChanged(false); // Reset isDataChanged setelah submit
            },
        });
    };

    const classroomOptions = classrooms.map((val) => ({
        label: val.name,
        value: val.slug,
    }));

    return (
        <Container size={420} my={40}>
            <Title ta="center" className={classes.title}>
                Halaman Profile
            </Title>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <Avatar
                    className="mx-auto mb-5"
                    variant="light"
                    radius="xl"
                    size="xl"
                    src=""
                />
                {errors.error && (
                    <div className="text-red-500 text-sm">{errors.error}</div>
                )}
                <form>
                    <TextInput
                        label="Username"
                        placeholder="john123"
                        defaultValue={data.username}
                        onChange={(e) => handleChange("username", e.target.value)}
                        required
                    />
                    <TextInput
                        mt="md"
                        label="Nama"
                        placeholder="john123"
                        defaultValue={data.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        required
                    />

                    {user.data.role === "student" && (
                        <Select
                            mt="md"
                            label="Kelas"
                            placeholder="Pilih kelas"
                            data={classroomOptions}
                            onChange={(value) => handleChange("classroom", value)}
                            defaultValue={data.classroom}
                            required
                            searchable
                        />
                    )}

                    <MonthInput
                        value={data.birthdate}
                        onChange={(e) => handleChange("birthdate", e)}
                    />
                </form>
                <Group justify="space-between" mt="md">
                    <Link
                        className="lowercase text-blue-500 cursor-pointer text-md"
                        href="/"
                    >
                        kembali ke home
                    </Link>
                    <Link
                        className="lowercase text-blue-500 cursor-pointer text-md"
                        href="/reset"
                    >
                        reset password
                    </Link>
                </Group>
                <Modal
                    opened={opened}
                    onClose={close}
                    withCloseButton={false}
                >
                    <h1 className="text-xl text-center font-bold">Konfirmasi</h1>
                    <Group justify="center" gap="sm" mt={20}>
                        <Button
                            variant="filled"
                            color="red"
                            onClick={() => close()}
                        >
                            Tidak
                        </Button>
                        <Button
                            type="submit"
                            variant="filled"
                            color="green"
                            onClick={(e) => handleSubmit(e)}
                            disabled={processing}
                            loading={processing}
                        >
                            Ya
                        </Button>
                    </Group>
                </Modal>
                {isDataChanged && (
                    <Group>
                        <Button
                            mt="md"
                            onClick={open}
                            variant="filled"
                            color="yellow"
                            leftSection={<AiFillEdit className="h-4" />}
                        >
                            Ubah Profile
                        </Button>
                        <Button
                            mt="md"
                            onClick={clearData}
                            variant="filled"
                            color="red"
                            leftSection={<ImCancelCircle className="h-4" />}
                        >
                            Batal
                        </Button>
                    </Group>
                )}
            </Paper>
        </Container>
    );
}
