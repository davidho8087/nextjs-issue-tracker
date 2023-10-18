import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

// The 1st item doesn't represent any status.
// So , don't insert value and then set optional for types
const statuses: { label: string; value?: Status }[] = [
  { label: 'All' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' },
]

// 1. Map the statues
// 2. Use reactRouter to redirect the user.
function IssueStatusFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()

  return (
    <Select.Root
      defaultValue={searchParams.get('status') || ''}
      onValueChange={(status) => {
        let query = ''

        const params = new URLSearchParams()
        if (status && status !== 'ALL') {
          params.append('status', status)
          query = `?status=${status}`
        }
        
        router.push('/issues/list' + query)
      }}
    >
      <Select.Trigger placeholder={'Filter by status ...'} />
      <Select.Content>
        {statuses.map((status, index) => (
          <Select.Item
            key={status.value || index}
            value={status.value ?? 'ALL'}
          >
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter

// import { Status } from '@prisma/client'
// import { Select } from '@radix-ui/themes'
// import { useRouter } from 'next/navigation'
//
// const statuses: { label: string; value?: Status }[] = [
//   { label: 'All' },
//   { label: 'Open', value: 'OPEN' },
//   { label: 'In Progress', value: 'IN_PROGRESS' },
//   { label: 'Closed', value: 'CLOSED' },
// ]

// const IssueStatusFilter = () => {
//   const router = useRouter()
//
//   return (
//     <Select.Root
//       onValueChange={(status) => {
//         const query = status === 'ALL' ? '' : `?status=${status}`
//         router.push(`/issues/list${query}`)
//       }}
//     >
//       <Select.Trigger placeholder='Filter by status...' />
//       <Select.Content>
//         {statuses.map((status) => (
//           <Select.Item
//             key={status.value}
//             value={status.value ?? 'ALL'}
//           >
//             {status.label}
//           </Select.Item>
//         ))}
//       </Select.Content>
//     </Select.Root>
//   )
// }
//
// export default IssueStatusFilter
