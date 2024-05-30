import {
  PasswordInput,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Select,
  Input,
  TextInput
} from '@mantine/core'
import classes from './css/Login.module.css'
import { useEffect, useState } from 'react'
import { useToggle } from '@mantine/hooks'
import { Link, useForm } from '@inertiajs/react'
import { router } from '@inertiajs/react'
import HomeLayout from './../../Layouts/HomeLayout'
import { usePage } from '@inertiajs/inertia-react'
import { notifications } from '@mantine/notifications'
import '@mantine/notifications/styles.css'
import { DateInput } from '@mantine/dates'
import MonthInput from '../../Components/MonthInput'

export default function Register() {
  const { classrooms, errors } = usePage().props

  const roles = [
    { label: 'Guru', value: '1' },
    { label: 'Murid', value: '2' }
  ]

  const { data, post, setData, processing } = useForm({
    role: '',
    username: '',
    name: '',
    birthdate: null,
    classroom: '',
    password: ''
  })

  const handleSubmit = async e => {
    e.preventDefault()
    post('/register', {
      onSuccess: () => {
        notifications.show({
          title: 'Default notification'
        })
      }
    })
  }

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Halaman Register
      </Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        {errors.error && (
          <div className="text-red-500 text-sm">{errors.error}</div>
        )}
        <form onSubmit={handleSubmit}>
          <Select
            mt="md"
            label="Jenis Akun"
            placeholder="Pilih Jenis Akun"
            data={roles}
            value={data.role}
            onChange={value => {
              setData('role', value)
            }}
            searchable
          />

          {data.role != '' && (
            <>
              {data.role === '2' && (
                <Select
                  mt="md"
                  label="Kelas"
                  placeholder="Pilih kelas"
                  data={
                    Array.isArray(classrooms) &&
                    classrooms.map(classroom => ({
                      value: classroom.slug,
                      label: classroom.name
                    }))
                  }
                  value={data.classroom}
                  onChange={value => {
                    setData('classroom', value)
                  }}
                  searchable
                />
              )}

              <TextInput
                mt="md"
                label="Nama"
                placeholder="john doe"
                value={data.name}
                onChange={value => setData('name', value.target.value)}
                required
                searchable
              />

              <TextInput
                mt="md"
                label="Username"
                placeholder="john123"
                value={data.username}
                onChange={value => setData('username', value.target.value)}
                required
                searchable
              />

              <MonthInput
                mt="md"
                value={data.birthdate}
                onChange={e => setData('birthdate', e)}
              />

              <PasswordInput
                value={data.password}
                onChange={e => setData('password', e.target.value)}
                label="Password"
                placeholder="password123"
                mt="md"
              />
              <Group justify="end" mt="lg">
                <Link href="/reset" className="text-blue-500">
                  Forgot password?
                </Link>
              </Group>
            </>
          )}

          <Button
            type="submit"
            fullWidth
            mt="xl"
            disabled={processing}
            loading={processing} // Set loading prop based on processing state
          >
            Sign
          </Button>
        </form>
      </Paper>
    </Container>
  )
}
