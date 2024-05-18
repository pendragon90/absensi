import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Input, Group } from "@mantine/core";
import { useForm } from "@inertiajs/inertia-react";
import { AiFillEdit } from "react-icons/ai";
import { notifications } from "@mantine/notifications";

export default function ConfirmlEdit({
    val,
    title,
    url
}) {
    const [opened, { open, close }] = useDisclosure(false);
    const { data, setData, patch } = useForm({
        name: val.name,
    });

    const handleEdit = () => {
        patch(url, {
            onSuccess: () => {
                notifications.show({
                    message: `Edit ${title} berhasil diedit! 🎉`,
                    color: "green",
                });
                close()
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
            <Modal opened={opened} onClose={close} title={`Edit ${title}`}>
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
                        Ya
                    </Button>
                </Group>
            </Modal>
            <Button onClick={open} variant="filled" color="yellow" leftSection={<AiFillEdit className="h-4" />}>
                Edit
            </Button>
        </>
    );
}
