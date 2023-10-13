import React from 'react'
import { Status } from '.prisma/client'
import { Badge } from '@radix-ui/themes'

// interface Props {
//   status: Status
// }

// Record is utility in typescript to define key values pair
// key is Status , values is object with 2 properties

// no need to render everytime. therefore is out of component. Render once.
const statusMap: Record<
  Status,
  { label: string; color: 'red' | 'violet' | 'green' }
> = {
  OPEN: { label: 'Open', color: 'red' },
  IN_PROGRESS: { label: 'In Progress', color: 'violet' },
  CLOSED: { label: 'Closed', color: 'green' },
}

function IssueStatusBadge({ status }: { status: Status }) {
  // not a good way!
  // if (status == 'OPEN') {
  //   return <Badge color='red'>Open</Badge>
  // }

  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  )
}

export default IssueStatusBadge
