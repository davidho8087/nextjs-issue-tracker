'use client'

import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import IssueStatusFilter from '@/app/issues/list/IssueStatusFilter'

// Moved from left to right using flex and IssueStatusFilter on the right
// Select.root cannot access on the server.
// need "use client"
function IssueAction() {
  return (
    <Flex justify={'between'}>
      <IssueStatusFilter />
      <Button>
        <Link href={'/issues/new'}>New Issue</Link>
      </Button>
    </Flex>
  )
}

export default IssueAction

// function IssueAction() {
//   return (
//     <div className='mb-5'>
//       <Button>
//         <Link href={'/issues/new'}>New Issue</Link>
//       </Button>
//     </div>
//   )
// }
//
// export default IssueAction
