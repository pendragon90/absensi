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
} from "@mantine/core";
import classes from "./css/Login.module.css";
import { Link, useForm } from "@inertiajs/react";
import { usePage } from "@inertiajs/inertia-react";
import { notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import moment from "moment-timezone";
import { DateInput } from "@mantine/dates";

export default function Reset() {
    const { errors } = usePage().props;
    const { data, patch, setData, processing } = useForm({
        username: "",
        birthdate: null,
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        patch("/reset", {
            onSuccess: () => {
                notifications.show({
                    title: `Reset password berhasil! 🎉`,
                    color: "green",
                });
            },
        });
    };

    return (
        <Container size={420} my={40}>
            <Title ta="center" className={classes.title}>
                Halaman Reset Password
            </Title>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                {errors.error && (
                    <div className="text-red-500 text-sm">{errors.error}</div>
                )}
                <form onSubmit={handleSubmit}>
                    <TextInput
                        label="Username"
                        placeholder="john123"
                        value={data.username}
                        onChange={(value) =>
                            setData("username", value.target.value)
                        }
                        required
                        searchable
                    />

                    <DateInput
                        mt={15}
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

                    <PasswordInput
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        label="Password"
                        placeholder="password123"
                        mt={15}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        mt="xl"
                        disabled={processing}
                        loading={processing}
                    >
                        Reset
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}
