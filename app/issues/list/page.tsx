import prisma from '@/prisma/client'

import IssueAction from '@/app/issues/list/IssueAction'
import { Issue, Status } from '@prisma/client'

import Pagination from '@/app/components/Pagination'
import IssueTable, {
  columnNames,
  IssueQuery,
} from '@/app/issues/list/IssueTable'
import { Flex } from '@radix-ui/themes'
import { Metadata } from 'next'

// use Link from radixUI will lose client side navigation ( full reload )
// Therefore we need custom component to combine both next Link and radix Link.

// has prisma fetch, use async
interface Props {
  searchParams: IssueQuery
}

async function IssuesPage({ searchParams }: Props) {
  const sortDirection: 'asc' | 'desc' =
    searchParams.sortDirection &&
    ['asc', 'desc'].includes(searchParams.sortDirection)
      ? searchParams.sortDirection
      : 'asc'

  // Generate the new sort direction based on the current one
  const newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc'

  const statuses = Object.values(Status)

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined

  const where = { status }

  /* orderBy object has to be created before pass to prisma because is dynamic / type error.
   typeScript error indicates that the type of searchParams.orderBy could be undefined,
   which is not allowed for the orderBy field.
   telling TypeScript to treat searchParams.orderBy as if it's one
   of the keys of the Issue type, even if its original type was more generic (like a string or undefined)
   This is useful when you're sure that the value you're working with fits the more specific type,
   even if TypeScript can't automatically infer this.*/
  const orderBy = columnNames.includes(searchParams.orderBy as keyof Issue)
    ? { [searchParams.orderBy as keyof Issue]: sortDirection }
    : undefined

  const page: number = parseInt(searchParams.page) || 1
  const pageSize = 10

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize, // Number of records we should skip
    take: pageSize, // number of records we want to fetch
  })

  const issueCount: number = await prisma.issue.count({ where })

  // To filter issue by status, We pass the status as a query parameter to this page.
  return (
    <Flex direction={'column'} gap={'5'}>
      <IssueAction />
      <IssueTable
        searchParams={searchParams}
        issues={issues}
        newSortDirection={newSortDirection}
      />
      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </Flex>
  )
}

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Issue Tracker - Issue List',
  description: 'View all project issues',
}

export default IssuesPage
