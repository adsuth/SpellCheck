interface Props {
  children: any
}

export default function CustomContextWrapper( {children}: Props ) {
  return (
    {children}
  )
}