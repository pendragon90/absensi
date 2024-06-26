import React, { useEffect, useRef, useState } from 'react'
import { usePage, useForm } from '@inertiajs/inertia-react'
import {
  Group,
  Table,
  Select,
  Modal,
  Button,
  Image,
  Skeleton
} from '@mantine/core'
import DashboardLayout from '../../../Layouts/DashboardLayout'
import { DateInput, MonthPicker, MonthPickerInput } from '@mantine/dates'
import Pagination from '../../../Components/Pagination'
import { useDisclosure } from '@mantine/hooks'
import { MdDelete, MdFilterListAlt } from 'react-icons/md'
import { IoPrint } from 'react-icons/io5'
import { useReactToPrint } from 'react-to-print'
import DeleteAbsences from '../../../Components/DeleteAbsences'
import MonthInput from '../../../Components/MonthInput'

function DashboardTeachers() {
  const {
    user,
    teacherAbsences,
    classrooms,
    lessons,
    teachers,
    absenceStatuses,
    learningActivityStatuses,
    minDate,
    maxDate
  } = usePage().props
  const { data, setData, get } = useForm({
    date: '',
    classroom: '',
    lesson: '',
    teacher: '',
    absenceStatus: '',
    learningActivityStatus: '',
    perpage: '20'
  })
  const [opened, { open, close }] = useDisclosure(false)

  const componentPdf = useRef()

  const handleFilterChange = (name, value) => {
    setData(name, value)
  }

  useEffect(() => {
    if (
      data.absenceStatus !== '' ||
      data.learningActivityStatus !== '' ||
      data.teacher !== '' ||
      data.classroom !== '' ||
      data.lesson !== '' ||
      data.date !== '' ||
      data.perpage !== '20'
    ) {
      get('/dashboard/teachers/absence', {
        preserveState: true,
        preserveScroll: true
      })
    }
  }, [
    data.teacher,
    data.absenceStatus,
    data.learningActivityStatus,
    data.classroom,
    data.lesson,
    data.date,
    data.perpage
  ])

  const handlePrint = useReactToPrint({
    content: () => componentPdf.current,
    documentTitle: 'Table Absence'
  })

  const rows = teacherAbsences.data ? (
    teacherAbsences.data.map((val, index) => (
      <Table.Tr key={index}>
        <Table.Td>{val.date}</Table.Td>
        <Table.Td>{val.status_acivity_learning}</Table.Td>
        <Table.Td>{val.classroom}</Table.Td>
        <Table.Td>{val.lesson}</Table.Td>
        <Table.Td>{val.name}</Table.Td>
        <Table.Td>{val.absence_status}</Table.Td>
        <Table.Td>
          <Image radius="md" src={val.photo_start} />
        </Table.Td>
        <Table.Td>
          <Image radius="md" src={val.photo_assignment} />
        </Table.Td>
        <Table.Td>
          <Image radius="md" src={val.photo_end} />
        </Table.Td>
      </Table.Tr>
    ))
  ) : (
    <Skeleton />
  )

  const handlePageChange = page => {
    get(`/dashboard/teachers/absence?page=${page}`, {
      preserveState: true,
      preserveScroll: true
    })
  }

  return (
    <DashboardLayout user={user}>
      <Modal opened={opened} onClose={close} title="Filter Table" centered>
        <div className="flex flex-col gap-5">
          <MonthInput
            value={data.date ? new Date(data.date) : null}
            onChange={value => handleFilterChange('date', value)}
            label="Date input"
            placeholder="Date input"
          />
          <Select
            label="Kelas"
            placeholder="Pilih kelas"
            data={classrooms.map(classroom => ({
              value: classroom.slug,
              label: classroom.name
            }))}
            value={data.classroom}
            onChange={value => handleFilterChange('classroom', value)}
            searchable
            clearable
            nothingFoundMessage="Nothing found..."
          />

          <Select
            label="Status Absensi"
            placeholder="Pilih Status Absensi"
            data={absenceStatuses.map(absenceStatus => ({
              value: absenceStatus.slug,
              label: absenceStatus.name
            }))}
            value={data.absenceStatus}
            onChange={value => handleFilterChange('absenceStatus', value)}
            searchable
            clearable
            nothingFoundMessage="Nothing found..."
          />

          <Select
            label="Guru"
            placeholder="Pilih Nama Guru"
            data={teachers.map(teacher => ({
              value: teacher.slug,
              label: teacher.name
            }))}
            value={data.teacher}
            onChange={value => handleFilterChange('teacher', value)}
            searchable
            clearable
            nothingFoundMessage="Nothing found..."
          />

          <Select
            label="Status Aktifitas Pembelajaran"
            placeholder="Pilih Status"
            data={learningActivityStatuses.map(learningActivityStatus => ({
              value: learningActivityStatus.slug,
              label: learningActivityStatus.name
            }))}
            value={data.learningActivityStatus}
            onChange={value =>
              handleFilterChange('learningActivityStatus', value)
            }
            searchable
            clearable
            nothingFoundMessage="Nothing found..."
          />
          <Select
            label="Mapel"
            placeholder="Pilih Mapel"
            data={lessons.map(lesson => ({
              value: lesson.slug,
              label: lesson.name
            }))}
            value={data.lesson}
            onChange={value => handleFilterChange('lesson', value)}
            searchable
            clearable
            nothingFoundMessage="Nothing found..."
          />
        </div>
      </Modal>

      <Group mb={10} justify="space-between">
        <Select
          label="Pilih jumlah data perhalaman"
          placeholder=""
          data={[10, 20, 50, 100].map(value => ({
            value: value.toString(),
            label: value.toString()
          }))}
          value={data.perpage}
          onChange={e => handleFilterChange('perpage', e)}
        />

        <Group>
          <DeleteAbsences
            minDate={minDate}
            maxDate={maxDate}
            url="/dashboard/teachers/absence"
          />
          <Button
            leftSection={<IoPrint className="h-5" />}
            variant="default"
            onClick={handlePrint}
          >
            Print
          </Button>

          <Button
            onClick={open}
            leftSection={<MdFilterListAlt className="h-5" />}
            variant="default"
          >
            Filter
          </Button>
        </Group>
      </Group>
      <div ref={componentPdf}>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Tanggal</Table.Th>
              <Table.Th>Aktifitas Pembelajaran</Table.Th>
              <Table.Th>Kelas</Table.Th>
              <Table.Th>Mapel</Table.Th>
              <Table.Th>Guru</Table.Th>
              <Table.Th>Status Absensi</Table.Th>
              <Table.Th>Foto Masuk Pembelajaran</Table.Th>
              <Table.Th>Bukti Tugas yang diberikan</Table.Th>
              <Table.Th>Foto Selesai Pembelajaran</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </div>
      <Pagination meta={teacherAbsences.meta} onPageChange={handlePageChange} />
    </DashboardLayout>
  )
}

export default DashboardTeachers
