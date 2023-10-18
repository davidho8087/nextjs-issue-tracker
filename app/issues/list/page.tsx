import prisma from '@/prisma/client'
import { Table } from '@radix-ui/themes'
import { IssueStatusBadge, Link } from '@/app/components'
import IssueAction from '@/app/issues/list/IssueAction'
import { Status } from '@prisma/client'

// import Link from 'next/link'
// use Link from radixUI will lose client side navigation ( full reload )
// Therefore we need custom component to combine both next Link and radix Link.

// has prisma fetch, use async

interface Props {
  searchParams: { status: Status }
}

async function IssuesPage({ searchParams }: Props) {
  const { status: incomingStatus } = searchParams
  const statuses = Object.values(Status)

  const validStatus = statuses.includes(incomingStatus)
    ? incomingStatus
    : undefined

  console.log(searchParams)
  const issues = await prisma.issue.findMany({
    where: {
      status: validStatus,
    },
  })

  // To filter issue by status, We pass the status as a query parameter to this page.

  return (
    <div>
      <IssueAction />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>
              Created
            </Table.ColumnHeaderCell>
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
    </div>
  )
}

export const dynamic = 'force-dynamic'

export default IssuesPage
