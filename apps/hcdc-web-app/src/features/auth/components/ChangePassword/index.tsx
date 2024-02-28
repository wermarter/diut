import { toast } from 'react-toastify'

import { useUserUpdateByIdMutation } from 'src/infra/api/access-service/user'
import { SideAction } from 'src/components/ui'
import { useTypedSelector } from 'src/infra/redux'
import { authSlice } from 'src/features/auth'
import { ChangePasswordForm } from './form'

interface ChangePasswordProps {
  open: boolean
  onClose: Function
  userId?: string
}

export function ChangePassword({ open, onClose, userId }: ChangePasswordProps) {
  const [updateUser, { isLoading }] = useUserUpdateByIdMutation()
  const currentUserId = useTypedSelector(authSlice.selectors.selectUserId)

  const targetUserId = userId ?? currentUserId!

  const handleChangePassword = async (newPassword: string) => {
    return updateUser({
      id: targetUserId,
      userUpdateRequestDto: { password: newPassword },
    }).then(() => {
      toast.success('Thay đổi thành công!')
      onClose()
    })
  }

  return (
    <SideAction
      open={open}
      onClose={onClose}
      title="Đổi mật khẩu"
      disableClickOutside={isLoading}
    >
      <ChangePasswordForm onSubmit={handleChangePassword} />
    </SideAction>
  )
}