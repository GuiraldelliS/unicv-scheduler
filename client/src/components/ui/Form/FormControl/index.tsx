import {
  FormControl as BaseFormControl,
  FormControlProps,
} from 'baseui/form-control'

const FormControl = ({ children, ...rest }: FormControlProps) => {
  return (
    <BaseFormControl
      {...rest}
      overrides={{
        Label: {
          style: ({ $disabled }) => ({
            fontSize: '16px',
            fontWeight: 600,
            marginBottom: '4px',
            color: 'black',
            opacity: $disabled ? 0.2 : 1,
          }),
        },
        Caption: {
          style: ({ $disabled }) => ({
            fontSize: '14px',
            marginTop: '4px',
            color: 'black',
            opacity: $disabled ? 0.2 : 1,
          }),
        },
      }}>
      {children}
    </BaseFormControl>
  )
}

export default FormControl
