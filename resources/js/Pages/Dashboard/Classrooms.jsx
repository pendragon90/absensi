import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../Layouts/DashboardLayout'
import { Group, Input, Skeleton, Table } from '@mantine/core'
import { usePage } from '@inertiajs/inertia-react'
import { CiSearch } from 'react-icons/ci'
import { IoMdAdd } from 'react-icons/io'
import ConfirmEdit from '../../Components/ConfirmEdit'
import ConfirmDelete from '../../Components/ConfirmDelete'
import CreateModal from '../../Components/CreateModal'
import Pagination from '../../Components/Pagination'
import { useForm } from '@inertiajs/inertia-react'

function Classrooms() {
  const { classrooms, user } = usePage().props
  const { data, setData, get } = useForm({
    search: ''
  })
  console.log(user.data)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      get('/dashboard/classrooms', {
        preserveState: true,
        preserveScroll: true
      })
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [data.search])

  const rows = classrooms.data ? (
    classrooms.data.map((val, index) => (
      <Table.Tr key={index}>
        <Table.Td>{index + 1}</Table.Td>
        <Table.Td>{val.name}</Table.Td>
        <Table.Td>
          <Group>
            <ConfirmEdit
              url={`/dashboard/classrooms/${val.slug}`}
              val={val}
              title="Kelas"
            />
            <ConfirmDelete
              url={`/dashboard/classrooms/${val.slug}`}
              val={val}
              title="Kelas"
            />
          </Group>
        </Table.Td>
      </Table.Tr>
    ))
  ) : (
    <Skeleton />
  )

  const handlePageChange = page => {
    get(`/dashboard/classrooms?page=${page}`, {
      preserveState: true,
      preserveScroll: true
    })
  }
  console.log(user)
  return (
    <DashboardLayout user={user}>
      <Group mb={10} justify="start">
        {user.data.role !== 'student' && (
          <CreateModal
            url="/dashboard/classrooms"
            icon={<IoMdAdd className="h-4" />}
          />
        )}
        <Input
          value={data.search}
          onChange={e => setData('search', e.target.value)}
          placeholder="Search..."
          leftSection={<CiSearch className="h-4" />}
        />
      </Group>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>No</Table.Th>
            <Table.Th>Nama Kelas</Table.Th>
            <Table.Th>Opsi</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <Pagination meta={classrooms.meta} onPageChange={handlePageChange} />
    </DashboardLayout>
  )
}

export default Classrooms
