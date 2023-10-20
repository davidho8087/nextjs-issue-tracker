import authOptions from '@/app/auth/authOptions'
import AssigneeSelect from '@/app/issues/[id]/AssigneeSelect'
import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import IssueDetails from './IssueDetails'
import EditIssueButton from './EditIssueButton'
import DeleteIssueButton from '@/app/issues/[id]/DeleteIssueButton'
import { cache } from 'react'

// We are querying the db twice to get exact same piece of data.
// Use cache function in react to reduce the extra load on our db.
interface Props {
  params: { id: string }
}

// no need await as there is no other loads.
const fetchUser = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
)

async function IssueDetailsPage({ params }: Props) {
  const session = await getServerSession(authOptions)

  // 1st time call this function to inner function the call-back function
  // will get executed. 2nd time will return result from its cache.
  const issue = await fetchUser(parseInt(params.id))

  // issue not exist
  if (!issue) {
    notFound()
  }
  // await delay(2000)

  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap='5'>
      {/*Took 4 column out of 5*/}
      {/*only allow to take 4 columns on medium devices*/}
      <Box className='md:col-span-4'>
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction='column' gap='4'>
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  )
}

// To make dynamic metadata based on the title of the issue page.
export async function generateMetadata({ params }: Props) {
  const issue = await fetchUser(parseInt(params.id))

  return {
    title: issue?.title,
    description: 'Details of issue ' + issue?.id,
  }
}

export default IssueDetailsPage
