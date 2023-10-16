'use client'
import { Skeleton } from '@/app/components'
import classNames from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AiFillBug } from 'react-icons/ai'
import { useSession } from 'next-auth/react'
import {
  Box,
  Flex,
  Container,
  DropdownMenu,
  Avatar,
  Text,
} from '@radix-ui/themes'

function NavBar() {
  return (
    <nav className='mb-5 border-b px-5 py-3'>
      <Container>
        <Flex justify='between'>
          <Flex align='center' gap='3'>
            <Link href='/'>
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  )
}

function NavLinks() {
  const currentPath = usePathname()

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues/list' },
  ]
  return (
    <ul className='flex space-x-6'>
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={classNames({
              'nav-link': true,
              '!text-zinc-900': link.href === currentPath,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

function AuthStatus() {
  const { status, data: session } = useSession()

  if (status === 'loading') {
    return <Skeleton width='3rem' />
  }

  if (status === 'unauthenticated') {
    return (
      <Link className='nav-link' href={`/api/auth/signin`}>
        Login
      </Link>
    )
  }

  // below code means "authenticated"
  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback='?'
            size='2'
            radius='full'
            referrerPolicy='no-referrer'
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size={'2'}>{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href={`/api/auth/signout`}>Log Out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  )
}

export default NavBar
