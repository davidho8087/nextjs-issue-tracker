import { Skeleton } from '@/app/components'
import IssueAction from '@/app/issues/IssueAction'
import { Table } from '@radix-ui/themes'

function LoadingIssuesPage() {
  //  render 5 rows of skeletons as replacing issues array as mock
  const issues = [1, 2, 3, 4, 5]

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
          {/* Array map the mock as issues */}
          {issues.map((issue) => (
            <Table.Row key={issue}>
              <Table.Cell>
                <Skeleton />
                <div className='block md:hidden'>
                  <Skeleton />
                </div>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                <Skeleton />
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                <Skeleton />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}

export default LoadingIssuesPage
