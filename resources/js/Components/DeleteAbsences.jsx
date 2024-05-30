import { useForm } from '@inertiajs/inertia-react'
import { Button, Modal } from '@mantine/core'
import { DatesProvider, MonthPicker } from '@mantine/dates'
import { useDisclosure } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import React from 'react'
import { MdDelete } from 'react-icons/md'
import dayjs from 'dayjs'
import 'dayjs/locale/id'

function DeleteAbsences({ minDate, maxDate, url }) {
  const [monthOpened, { open: monthOpen, close: monthClose }] =
    useDisclosure(false)

  const {
    data,
    setData,
    delete: destroy
  } = useForm({
    deleteByMonth: [null, null]
  })
  console.log(data.deleteByMonth)

  const handleDelete = () => {
    destroy(url, {
      onSuccess: () => {
        notifications.show({
          message: `berhasil dihapus! 🎉`,
          color: 'green'
        })
        monthClose()
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
      <Modal opened={monthOpened} onClose={monthClose}>
        <div className="flex flex-col gap-5 justify-center items-center">
          <h1 className="text-lg text-center">
            {dayjs(data.deleteByMonth[0]).format('D MMMM YYYY')} -{' '}
            {dayjs(data.deleteByMonth[1]).format('D MMMM YYYY')}
          </h1>
          <MonthPicker
            placeholder="Pilih bulan"
            value={data.deleteByMonth}
            type="range"
            onChange={e => setData('deleteByMonth', e)}
            minDate={new Date(minDate)}
            maxDate={new Date(maxDate)}
          />
        </div>

        <div className="mt-5">
          <Button
            fullWidth
            leftSection={<MdDelete className="h-5" />}
            color="red"
            onClick={handleDelete}
          >
            Hapus
          </Button>
        </div>
      </Modal>
      <Button
        leftSection={<MdDelete className="h-5" />}
        color="red"
        onClick={monthOpen}
      >
        Hapus Absensi
      </Button>
    </>
  )
}

export default DeleteAbsences
