import {
  Autocomplete,
  AutocompleteProps,
  Popper,
  styled,
  TextField,
} from '@mui/material'
import { Control, Controller, Path, FieldValues } from 'react-hook-form'

export type FormAutocompleteProps<
  T extends FieldValues = FieldValues,
  OptionType = any,
> = {
  name: Path<T>
  label: string
  control: Control<T>

  options: OptionType[]
  getOptionLabel: (option: OptionType) => string
  getOptionValue: (option: OptionType) => unknown

  disableError?: boolean
  groupBy?: AutocompleteProps<
    OptionType,
    undefined,
    undefined,
    undefined
  >['groupBy']
}

export function FormAutocomplete<
  TFieldValues extends FieldValues = FieldValues,
  OptionType = any,
>({
  name,
  label,
  control,
  options,
  getOptionLabel,
  getOptionValue,
  groupBy,
  disableError = false,
}: FormAutocompleteProps<TFieldValues, OptionType>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, ref, value }, fieldState: { error } }) => {
        const errorProps = !disableError
          ? {
              error: Boolean(error),
              helperText: error?.message,
            }
          : {}

        return (
          <Autocomplete
            fullWidth
            multiple
            options={options}
            groupBy={groupBy}
            PopperComponent={StyledPopper}
            getOptionLabel={getOptionLabel}
            onChange={(event, value, reason) => {
              onChange(value.map(getOptionValue))
            }}
            value={options.filter((option) =>
              value?.includes(getOptionValue(option)),
            )}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                {...errorProps}
                inputRef={ref}
                InputLabelProps={{
                  shrink: true,
                }}
                label={label}
              />
            )}
          />
        )
      }}
    />
  )
}

const StyledPopper = styled(Popper)(({ theme }) => ({
  '& .MuiAutocomplete-groupLabel': {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
}))
