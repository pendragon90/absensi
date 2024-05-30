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
import MonthInput from "../../Components/MonthInput";

export default function Reset() {
    const { errors } = usePage().props;
    const { data, patch, setData, processing } = useForm({
        username: "",
        birthdate: null,
        password: "",
    });

    const handleSubmit = async (e) => {
        console.log(data);
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

                    <MonthInput
                        value={data.birthdate}
                        onChange={(e) => setData("birthdate", e)}
                    />
                    <PasswordInput
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        label="Password Baru"
                        placeholder="password123"
                        mt="md"
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
