export enum IconKind {
  FILLED = 'filled',
  OUTLINED = 'outlined',
}

export type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number | string
  color?: string

  kind?: IconKind
}
