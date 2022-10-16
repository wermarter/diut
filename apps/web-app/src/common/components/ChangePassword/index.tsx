import * as React from 'react'

import { useUserUpdateByIdMutation } from 'src/api/user'
import { SideAction } from 'src/common/components/SideAction'
import { Snackbar } from 'src/common/components/Snackbar'
import { useTypedSelector } from 'src/core'
import { selectUserId } from 'src/modules/auth'
import { ChangePasswordForm } from './form'

interface ChangePasswordProps {
  open: boolean
  onClose: Function
  userId?: string
}

export function ChangePassword({ open, onClose, userId }: ChangePasswordProps) {
  const [showMessage, setShowMessage] = React.useState('')
  const [updateUser, { isLoading }] = useUserUpdateByIdMutation()
  const currentUserId = useTypedSelector(selectUserId)

  const targetId = userId ?? currentUserId!

  const handleChangePassword = async (newPassword: string) => {
    return updateUser({
      id: targetId,
      updateUserRequestDto: { password: newPassword },
    }).then(() => {
      setShowMessage('Thay đổi thành công!')
      onClose()
    })
  }

  return (
    <>
      <SideAction
        open={open}
        onClose={onClose}
        title="Đổi mật khẩu"
        disableClickOutside={isLoading}
      >
        <ChangePasswordForm onSubmit={handleChangePassword} />
      </SideAction>
      <Snackbar showMessage={showMessage} setShowMessage={setShowMessage} />
    </>
  )
}
