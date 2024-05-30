import { Link } from '@inertiajs/inertia-react'
import { Menu, Button, Text, Modal, Avatar, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useForm } from '@inertiajs/inertia-react'
import { notifications } from '@mantine/notifications'
import { IoIosLogOut } from 'react-icons/io'
import { MdDashboard } from 'react-icons/md'
import { RiProfileLine } from 'react-icons/ri'

export default function Profile({ user }) {
  const [openedModal, { open, close }] = useDisclosure()

  const { data, post } = useForm({
    user: ''
  })

  const handleLogout = () => {
    post('/logout', {
      onSuccess: () => {
        notifications.show({
          message: `berhasil logout! 🎉`,
          color: 'green'
        })
        close()
      },
      onError: () => {
        notifications.show({
          message: 'Gagal logout, coba lagi! ❌',
          color: 'red'
        })
      }
    })
  }
  return (
    <>
      <Menu shadow="md" className="cursor-pointer">
        <Menu.Target>
          <Group>
            <Avatar src="" />
            <Text>{user.data.name}</Text>
          </Group>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item leftSection={<RiProfileLine className="h-4" />}>
            <Link href="/profile">Profile</Link>
          </Menu.Item>

          <Menu.Item leftSection={<MdDashboard className="h-4" />}>
            {user.data.role == 'student' ? (
              <Link href="/dashboard/teachers/absence">Dashboard</Link>
            ) : (
              <Link href="/dashboard/students/absence">Dashboard</Link>
            )}
          </Menu.Item>

          <Menu.Item
            onClick={open}
            color="red"
            leftSection={<IoIosLogOut className="h-4" />}
          >
            <div>Logout</div>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <Modal opened={openedModal} withCloseButton={false}>
        <p className="text-center">AndaYakin ingin Logout?</p>
        <Group justify="center" gap="sm" mt={20}>
          <Button variant="filled" color="red" onClick={() => close()}>
            Tidak
          </Button>
          <Button variant="filled" color="green" onClick={() => handleLogout()}>
            Ya
          </Button>
        </Group>
      </Modal>
    </>
  )
}
