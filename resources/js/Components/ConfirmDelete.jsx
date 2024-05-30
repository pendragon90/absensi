import { useDisclosure } from '@mantine/hooks'
import { Modal, Button, Group, Text } from '@mantine/core'
import { useForm } from '@inertiajs/inertia-react'
import { notifications } from '@mantine/notifications'
import { MdDelete } from 'react-icons/md'

export default function ConfirmDelete({ val, title, url }) {
  const [opened, { open, close }] = useDisclosure(false)
  const {
    data,
    setData,
    delete: destroy
  } = useForm({
    name: val.name
  })

  const handleDelete = () => {
    destroy(url, {
      onSuccess: () => {
        notifications.show({
          message: `berhasil dihapus! 🎉`,
          color: 'green'
        })
        close()
      },
      onError: () => {
        notifications.show({
          message: 'Gagal hapus, coba lagi! ❌',
          color: 'red'
        })
      }
    })
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title={`Hapus ${title}`}>
        <Text>Yakin ingin Hapus?</Text>
        <Group justify="flex-end" gap="sm" mt={20}>
          <Button variant="filled" color="red" onClick={() => close()}>
            Tidak
          </Button>
          <Button variant="filled" color="green" onClick={() => handleDelete()}>
            Ya
          </Button>
        </Group>
      </Modal>
      <Button
        onClick={open}
        variant="filled"
        color="red"
        leftSection={<MdDelete className="h-4" />}
      >
        Hapus
      </Button>
    </>
  )
}
