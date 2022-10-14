import { Button, Stack } from '@mui/material'
import { useEffect } from 'react'

import { useDoctorSearchMutation } from 'src/api/doctor'
import { DoctorTable } from './components/DoctorTable'

export function ManageDoctorPage() {
  const [searchDoctors, { data, isLoading }] = useDoctorSearchMutation()
  useEffect(() => {
    searchDoctors({ searchDoctorRequestDto: {} })
  }, [])

  return (
    <>
      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
        <Button
          variant="outlined"
          onClick={() => searchDoctors({ searchDoctorRequestDto: {} })}
        >
          Refresh
        </Button>
        <Button>Update a row</Button>
        <Button>Update all rows</Button>
        <Button>Delete a row</Button>
        <Button>Add a row</Button>
      </Stack>
      <DoctorTable
        items={data?.items ?? []}
        isLoading={isLoading}
        onUpdate={(...props: any) => {
          console.log({ props })
        }}
      />
    </>
  )
}
