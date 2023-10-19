'use client'
// because got onChange event

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons'
import { Button, Flex, Text } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

interface Props {
  itemCount: number // Total number of items
  pageSize: number // The number of item to show on each page
  currentPage: number // The current page number
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  // use to access the current URL
  const router = useRouter()

  // use to access the current query params
  const searchParams = useSearchParams()

  // When do division my have floating point. Here we use math.set to properly
  // calculate the total number of pages.
  const pageCount = Math.ceil(itemCount / pageSize)

  // pagination will not render if pageCount =< 1
  if (pageCount <= 1) return null

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams)

    // page=2
    params.set('page', page.toString())
    // <url>/?page=2
    // Push will do re-render?
    router.push('?' + params.toString())
  }

  return (
    <Flex align='center' gap='2'>
      <Text size='2'>
        Page {currentPage} of {pageCount}
      </Text>

      <Button
        color='gray'
        variant='soft'
        disabled={currentPage === 1}
        onClick={() => changePage(1)}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        color='gray'
        variant='soft'
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        color='gray'
        variant='soft'
        disabled={currentPage === pageCount}
        onClick={() => changePage(currentPage + 1)}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        color='gray'
        variant='soft'
        disabled={currentPage === pageCount}
        onClick={() => changePage(pageCount)}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  )
}

export default Pagination
