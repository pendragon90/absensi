import {
    PasswordInput,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
    Select,
    TextInput,
    Avatar,
    Modal,
} from "@mantine/core";
import classes from "./Auth/css/Login.module.css";
import { useEffect, useState } from "react";
import { useDisclosure, useToggle } from "@mantine/hooks";
import { useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { usePage } from "@inertiajs/inertia-react";
import { notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import moment from "moment-timezone";
import { Link } from "@inertiajs/inertia-react";
import { DateInput } from "@mantine/dates";
import { AiFillEdit } from "react-icons/ai";

export default function ProfilePage() {
    const { user, classrooms, errors } = usePage().props;
    const [opened, { open, close }] = useDisclosure(false);
    const { classroom } = user.data;

    const userClassroom = {
        label: classroom.name,
        value: classroom.slug,
    };

    const { data, patch, setData, processing } = useForm({
        username: user.data.username,
        name: user.data.name,
        classroom: userClassroom.value,
        birthdate: user.data.birthdate,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        patch(`/profile/${user.data.slug}`, {
            onSuccess: () => {
                notifications.show({
                    title: `Profil berhasil diperbarui! 🎉`,
                    color: "green",
                });
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
                        value={data.username}
                        onChange={(value) =>
                            setData("username", value.target.value)
                        }
                        defaultValue="a"
                        required
                        searchable
                    />
                    <TextInput
                        mt="lg"
                        label="Nama"
                        placeholder="john123"
                        value={data.name}
                        onChange={(value) =>
                            setData("name", value.target.value)
                        }
                        defaultValue="a"
                        required
                        searchable
                    />

                    {user.data.role == "student" && (
                        <Select
                            mt="lg"
                            label="Kelas"
                            placeholder="Pilih kelas"
                            data={classroomOptions}
                            onChange={(value) => setData("classroom", value)}
                            value={data.classroom}
                            required
                            searchable
                        />
                    )}

                    <DateInput
                        mt="lg"
                        value={data.birthdate ? new Date(data.birthdate) : null} // Convert data.birthdate to Date object if it's not null
                        onChange={(value) => {
                            // Check if value is provided and format it accordingly
                            const jakartaDate = value
                                ? moment(value)
                                      .tz("Asia/Jakarta")
                                      .format("YYYY-MM-DD")
                                : null;
                            setData("birthdate", jakartaDate);
                        }}
                        label="Tanggal Lahir"
                        placeholder="Pilih Tanggal Lahir"
                    />

                    <Group justify="space-between" mt="lg">
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
                        <Text className="text-center">
                            Yakin ingin Edit Profil?
                        </Text>
                        <Group justify="flex-end" gap="sm" mt={20}>
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
                    <Button
                        mt="md"
                        onClick={open}
                        variant="filled"
                        color="yellow"
                        leftSection={<AiFillEdit className="h-4" />}
                    >
                        Ubah Profile
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}
