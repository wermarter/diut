import { useEffect } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { DialogProps } from '@mui/material'

import { FormAutocomplete, FormAutocompleteProps } from 'src/components/form'
import { ConfirmDialog } from '../ConfirmDialog'

type RequiredProps = Pick<
  FormAutocompleteProps,
  'getOptionLabel' | 'getOptionValue' | 'options'
>
type RequiredPropNames = keyof RequiredProps

type ExcludedProps = Pick<
  FormAutocompleteProps,
  'name' | 'control' | 'multiple'
>
type ExcludedPropNames = keyof ExcludedProps

type OptionalPropNames = Exclude<
  keyof FormAutocompleteProps,
  RequiredPropNames | ExcludedPropNames
>

export type AutocompleteDialogProps<TOption, TValue> = {
  title: string
  contentText?: string
  open: boolean
  onClose: Function
  onSubmit: (selectedOptionValues: TValue[]) => unknown
  selectedOptionValues: TValue[]
  maxWidth?: DialogProps['maxWidth']
  fullWidth?: boolean

  FormAutocompleteProps: Partial<
    Pick<FormAutocompleteProps<FieldValues, TOption>, OptionalPropNames>
  > &
    Required<
      Pick<FormAutocompleteProps<FieldValues, TOption>, RequiredPropNames>
    >
}

export function AutocompleteDialog<TOption, TValue>(
  props: AutocompleteDialogProps<TOption, TValue>,
) {
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      optionValues: props.selectedOptionValues,
    },
  })

  useEffect(() => {
    if (props.open) {
      setValue('optionValues', props.selectedOptionValues)
    }
  }, [props.open])

  return (
    <ConfirmDialog
      onClose={props.onClose}
      onConfirm={handleSubmit(({ optionValues }) => {
        props.onSubmit(optionValues)
      })}
      open={props.open}
      title={props.title}
      maxWidth={props.maxWidth}
      fullWidth={props.fullWidth}
      contentText={props.contentText}
    >
      <FormAutocomplete
        label="Chọn"
        size="medium"
        {...props.FormAutocompleteProps}
        control={control}
        name="optionValues"
        multiple
      />
    </ConfirmDialog>
  )
}
