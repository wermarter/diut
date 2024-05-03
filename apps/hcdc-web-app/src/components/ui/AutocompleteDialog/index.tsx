import { FieldValues, useForm } from 'react-hook-form'
import { DialogProps } from '@mui/material'

import { FormAutocomplete, FormAutocompleteProps } from 'src/components/form'
import { ConfirmDialog } from '../ConfirmDialog'
import { useEffect } from 'react'

type RequiredProps = Pick<FormAutocompleteProps, 'getOptionLabel' | 'options'>
type RequiredPropNames = keyof RequiredProps

type ExcludedProps = Pick<
  FormAutocompleteProps,
  'name' | 'control' | 'multiple' | 'getOptionValue'
>
type ExcludedPropNames = keyof ExcludedProps

type OptionalPropNames = Exclude<
  keyof FormAutocompleteProps,
  RequiredPropNames | ExcludedPropNames
>

export type AutocompleteDialogProps<TOption> = {
  title: string
  contentText?: string
  open: boolean
  onClose: Function
  onSubmit: (selectedOptions: TOption[]) => unknown
  selectedOptions: TOption[]
  maxWidth?: DialogProps['maxWidth']
  fullWidth?: boolean

  FormAutocompleteProps: Partial<
    Pick<FormAutocompleteProps<FieldValues, TOption>, OptionalPropNames>
  > &
    Required<
      Pick<FormAutocompleteProps<FieldValues, TOption>, RequiredPropNames>
    >
}

export function AutocompleteDialog<TOption>(
  props: AutocompleteDialogProps<TOption>,
) {
  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      optionValues: props.selectedOptions,
    },
  })

  useEffect(() => {
    if (props.open) {
      setValue('optionValues', props.selectedOptions)
    }
  }, [props.open])

  const value = watch('optionValues')
  useEffect(() => {
    console.log(value)
  }, [value])

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
        getOptionValue={(option) => option}
        multiple
      />
    </ConfirmDialog>
  )
}
