import NextLink from 'next/link'
import { Link as RadixLink } from '@radix-ui/themes'

interface Props {
  href: string
  children: string
}

const Link = ({ href, children }: Props) => {
  return (
    // Use next Link for client side navigation
    <NextLink href={href} passHref legacyBehavior>
      {/*  RadixLink for styling only
           Add the children which is the label inside radix link tag
      */}
      <RadixLink>{children}</RadixLink>
    </NextLink>
  )
}

export default Link
