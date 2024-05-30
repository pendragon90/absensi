import { Paper, Title, Container, Button, Select, Group } from '@mantine/core'
import classes from './css/Absence.module.css'
import HomeLayout from '../Layouts/HomeLayout'
import { usePage } from '@inertiajs/inertia-react'
import { notifications } from '@mantine/notifications'
import { useEffect, useState } from 'react'
import { useForm } from '@inertiajs/inertia-react'
import { Link } from '@inertiajs/inertia-react'

export default function AbsenceStudent() {
  const { user, classrooms, absenceStatuses, lessons, teachers, students } =
    usePage().props

  console.log(students)

  const { data, setData, get, post, processing } = useForm({
    student: '',
    teacher: '',
    classroom: '',
    lesson: '',
    absence_status: ''
  })

  useEffect(() => {
    if (data.classroom !== '') {
      get('/', {
        preserveState: true,
        preserveScroll: true
      })
    }
  }, [data.classroom])

  const handleSubmit = e => {
    e.preventDefault()
    post('/dashboard/students/absence', {
      onSuccess: () => {
        notifications.show({
          title: `Absensi berhasil! 🎉`,
          color: 'green'
        })
      },
      onError: () => {
        notifications.show({
          title: `Absensi tidak berhasil, coba lagi! ❌`,
          color: 'green'
        })
      }
    })
  }

  const classroomOptions = classrooms.map(val => ({
    label: val.name,
    value: val.slug
  }))
  const studentOptions = students.map(val => ({
    label: val.name,
    value: val.slug
  }))
  const teacherOptions = teachers.map(val => ({
    label: val.name,
    value: val.slug
  }))
  const lessonOptions = lessons.map(val => ({
    label: val.name,
    value: val.slug
  }))
  const absenceStatusOptions = absenceStatuses.map(val => ({
    label: val.name,
    value: val.slug
  }))

  return (
    <HomeLayout user={user}>
      <Container size={420} my={40}>
        <Group justify="center">
          <Title ta="center" className={classes.title}>
            Halaman Absensi Kehadiran Murid
          </Title>
          <Link
            className="lowercase text-blue-500 cursor-pointer text-md"
            href="/absence/teacher"
          >
            ke halaman absensi kehadiran Guru
          </Link>
        </Group>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={handleSubmit}>
            <Select
              label="Kelas"
              placeholder="Pilih kelas"
              data={classroomOptions}
              onChange={value => {
                setData('classroom', value)
              }}
              value={data.classroom}
              required
              searchable
            />

            <Select
              mt={15}
              label="Siswa"
              placeholder="Pilih Nama siswa"
              data={studentOptions}
              value={data.student}
              onChange={value => {
                setData('student', value)
              }}
              required
              searchable
            />

            <Select
              mt={15}
              label="Guru"
              placeholder="Pilih Nama guru"
              data={teacherOptions}
              value={data.teacher}
              onChange={value => {
                setData('teacher', value)
              }}
              required
              searchable
            />

            <Select
              mt={15}
              label="Mapel"
              placeholder="Pilih Mapel"
              data={lessonOptions}
              value={data.lesson}
              onChange={value => {
                setData('lesson', value)
              }}
              required
              searchable
            />

            <Select
              mt={15}
              label="Absensi Kehadiran"
              placeholder="Pilih Absensi Kehadiran"
              data={absenceStatusOptions}
              onChange={value => setData('absence_status', value)}
              required
              searchable
            />

            <Button
              type="submit"
              fullWidth
              mt="xl"
              disabled={processing || user.data.role == 'teacher'}
              loading={processing}
            >
              Send
            </Button>
          </form>
        </Paper>
      </Container>
    </HomeLayout>
  )
}
