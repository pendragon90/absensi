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
import {  useForm } from "@inertiajs/react";
import { usePage } from "@inertiajs/inertia-react";
import { notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { Link } from "@inertiajs/inertia-react";

export default function Login() {
    const { errors } = usePage().props;
    const { data,post ,setData, processing } = useForm({
        username: '',
        password: '',
      })
      

    const handleSubmit = async (e) => {
        e.preventDefault();
        post('/login',{
            onSuccess: () => {
                notifications.show({
                    title: `Login berhasil! 🎉`,
                    color: "green",
                });
            },
        });
    }

    return (
        <Container size={420} my={40}>
            <Title ta="center" className={classes.title}>
                Halaman Login
            </Title>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            {errors.error && <div className="text-red-500 text-sm">{errors.error}</div>}
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

                    <PasswordInput
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                        label="Password"
                        placeholder="password123"
                        mt={15}
                    />
                    <Group justify="space-between" mt="lg">
                    <Link
                        className="lowercase text-blue-500 cursor-pointer text-md"
                        href="/register"
                    >
                       belum punya akun?
                    </Link>
                        <Link href="/reset" className="text-blue-500">
                            Forgot password?
                        </Link>
                    </Group>

                    <Button
    type="submit"
    fullWidth
    mt="xl"
    disabled={processing}
    loading={processing}
>
    Sign
</Button>

                </form>
            </Paper>
        </Container>
    );
}
