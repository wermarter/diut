import { DoctorResponseDto } from 'src/api/doctor'
import { DataTable } from 'src/common/components/DataTable'
import { doctorColumns } from './columns'

interface DoctorTableProps {
  items: DoctorResponseDto[]
  isLoading: boolean
  onUpdate: Function
}

export function DoctorTable({ items, isLoading, onUpdate }: DoctorTableProps) {
  return (
    <DataTable
      rows={items}
      columns={doctorColumns}
      loading={isLoading}
      editMode="row"
    />
  )
}
