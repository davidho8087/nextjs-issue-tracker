import { IssueStatusBadge } from '@/app/components'
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons'
import { Table } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import NextLink from 'next/link'
import { Issue, Status } from '@prisma/client'

export interface IssueQuery {
  status: Status
  orderBy: keyof Issue
  sortDirection?: 'asc' | 'desc'
  page: string
}

interface Props {
  searchParams: IssueQuery
  issues: Issue[]
  newSortDirection: string
}

const IssueTable = ({ searchParams, issues, newSortDirection }: Props) => {
  return (
    <Table.Root variant='surface'>
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
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
                  {searchParams.sortDirection === 'asc' ? (
                    <ArrowUpIcon className={'inline'} />
                  ) : (
                    <ArrowDownIcon className={'inline'} />
                  )}
                </>
              )}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {/* Array map the issues */}
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
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
  )
}

// This definition of this module is represented a component IssueTable.
// So move this column definition down here.
const columns: {
  label: string
  value: keyof Issue
  className?: string
}[] = [
  { label: 'Issue', value: 'title' },
  {
    label: 'Status',
    value: 'status',
    className: 'hidden md:table-cell',
  },
  {
    label: 'Created',
    value: 'createdAt',
    className: 'hidden md:table-cell',
  },
]

export const columnNames = columns.map((column) => column.value)

export default IssueTable
