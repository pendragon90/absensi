import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Input, Group } from "@mantine/core";
import { useForm } from "@inertiajs/inertia-react";
import { notifications } from "@mantine/notifications";

export default function CreateModal({ icon, url }) {
    const [opened, { open, close }] = useDisclosure(false);
    const { data, setData, post } = useForm({
        name: "",
    });

    const handleEdit = () => {
        post(url, {
            onSuccess: () => {
                notifications.show({
                    message: `Data berhasil ditambahkan! 🎉`,
                    color: "green",
                });
                close();
            },
            onError: () => {
                notifications.show({
                    message: "Gagal edit, coba lagi! ❌",
                    color: "red",
                });
            },
        });
    };

    return (
        <>
            <Modal opened={opened} onClose={close} title={`Buat Data Baru`}>
                <Input
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                />
                <Group justify="flex-end" gap="sm" mt={20}>
                    <Button
                        variant="filled"
                        color="red"
                        onClick={() => close()}
                    >
                        Tidak
                    </Button>
                    <Button
                        variant="filled"
                        color="green"
                        onClick={() => handleEdit()}
                    >
                        Tambah
                    </Button>
                </Group>
            </Modal>
            <Button
                onClick={open}
                variant="filled"
                color="blue"
                leftSection={icon}
            >
                Create
            </Button>
        </>
    );
}
