import { toast } from 'react-toastify'
import { SideAction } from 'src/components/ui'
import { authSlice } from 'src/features/auth'
import { useUserChangePasswordMutation } from 'src/infra/api/access-service/user'
import { useTypedSelector } from 'src/infra/redux'
import { ChangePasswordForm } from './form'

type ChangePasswordProps = {
  open: boolean
  onClose: Function
  userId?: string
}

export function ChangePassword(props: ChangePasswordProps) {
  const [changePassword, { isLoading }] = useUserChangePasswordMutation()
  const currentUserId = useTypedSelector(authSlice.selectors.selectUserId)

  const targetUserId = props.userId ?? currentUserId!

  const handleChangePassword = async (newPassword: string) => {
    return changePassword({
      id: targetUserId,
      userChangePasswordRequestDto: { password: newPassword },
    }).then(() => {
      toast.success('Thay đổi thành công!')
      props.onClose()
    })
  }

  return (
    <SideAction
      open={props.open}
      onClose={props.onClose}
      title="Đổi mật khẩu"
      disableClickOutside={isLoading}
    >
      <ChangePasswordForm onSubmit={handleChangePassword} />
    </SideAction>
  )
}
