import prisma from '@/prisma/client'
import { Table } from '@radix-ui/themes'
import { IssueStatusBadge, Link } from '@/app/components'
import IssueAction from '@/app/issues/list/IssueAction'
import { Issue, Status } from '@prisma/client'
import NextLink from 'next/link'
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons'
import Pagination from '@/app/components/Pagination'

// use Link from radixUI will lose client side navigation ( full reload )
// Therefore we need custom component to combine both next Link and radix Link.

// has prisma fetch, use async

interface Props {
  searchParams: {
    status: Status
    orderBy?: string
    sortDirection?: 'asc' | 'desc'
    page: string
  }
}

async function IssuesPage({ searchParams }: Props) {
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: 'Issue', value: 'title' },
    { label: 'Status', value: 'status', className: ' hidden md:table-cell' },
    {
      label: 'Created',
      value: 'createdAt',
      className: ' hidden md:table-cell',
    },
  ]

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
  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy as keyof Issue)
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
    <div>
      <IssueAction />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            {columns.map((column) => {
              return (
                <Table.ColumnHeaderCell
                  key={column.value}
                  className={column.className}
                >
                  {/*Append orderBy into existing searchParams*/}
                  <NextLink
                    href={{
                      query: {
                        ...searchParams,
                        orderBy: column.value,
                        sortDirection: newSortDirection,
                      },
                    }}
                  >
                    {column.label}
                  </NextLink>

                  {column.value === searchParams.orderBy && (
                    <>
                      {sortDirection === 'asc' ? (
                        <ArrowUpIcon className={'inline'} />
                      ) : (
                        <ArrowDownIcon className={'inline'} />
                      )}
                    </>
                  )}
                </Table.ColumnHeaderCell>
              )
            })}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {/* Array map the issues */}
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                {/* Pass the issue.id as param into link */}
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>

                <div className='block md:hidden'>
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </div>
  )
}

export const dynamic = 'force-dynamic'

export default IssuesPage
