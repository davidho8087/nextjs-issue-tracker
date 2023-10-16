'use client'
import classNames from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AiFillBug } from 'react-icons/ai'
import { useSession } from 'next-auth/react'
import { Box } from '@radix-ui/themes'

function NavBar() {
  const currentPath = usePathname()
  const { status, data } = useSession()

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues/list' },
  ]

  return (
    <nav className='mb-5 flex h-14 items-center space-x-6 border-b px-5'>
      <Link href='/'>
        <AiFillBug />
      </Link>
      <ul className='flex space-x-6'>
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className={classNames({
                'text-zinc-900': link.href === currentPath,
                'text-zinc-500': link.href !== currentPath,
                'transition-colors hover:text-zinc-800': true,
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <Box>
        {status === 'authenticated' && (
          <Link href={`/api/auth/signout`}>Log Out</Link>
        )}
        {status === 'unauthenticated' && (
          <Link href={`/api/auth/signin`}>Login</Link>
        )}
      </Box>
    </nav>
  )
}

export default NavBar
