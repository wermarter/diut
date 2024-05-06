import { AutocompleteDialog } from 'src/components/ui'
import { useUserSearchQuery } from 'src/infra/api/access-service/user'

type UserSelectDialogProps = {
  open: boolean
  onClose: () => void
  onSubmit: (userIds: string[]) => void
  excludeBranchId?: string
}

export function UserSelectDialog(props: UserSelectDialogProps) {
  const { data, isFetching } = useUserSearchQuery({
    filter: props.excludeBranchId
      ? { branchIds: { $ne: props.excludeBranchId } }
      : undefined,
    projection: {
      _id: 1,
      name: 1,
      phoneNumber: 1,
    },
  })

  return (
    !isFetching && (
      <AutocompleteDialog
        title="Chọn người dùng"
        open={props.open}
        onClose={props.onClose}
        selectedOptionValues={[]}
        onSubmit={props.onSubmit}
        fullWidth
        maxWidth="sm"
        FormAutocompleteProps={{
          preserveInputOrder: true,
          size: 'medium',
          label: 'Tìm kiếm',
          options: data?.items!,
          getOptionValue(option) {
            return option._id
          },
          getOptionLabel(option) {
            return `${option.name} (${option.phoneNumber})`
          },
        }}
      />
    )
  )
}
