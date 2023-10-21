import { Text } from '@radix-ui/themes'
import { PropsWithChildren } from 'react'

function ErrorMessage({ children }: PropsWithChildren) {
  if (!children) return null // do not render if no children

  return (
    <Text color='red' as='p'>
      {children}
    </Text>
  )
}

export default ErrorMessage
