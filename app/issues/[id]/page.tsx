import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
// import delay from 'delay'
import { notFound } from 'next/navigation'

import IssueDetails from './IssueDetails'
import EditIssueButton from './EditIssueButton'
import DeleteIssueButton from '@/app/issues/[id]/DeleteIssueButton'

interface Props {
  params: { id: string }
}

async function IssueDetailsPage({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  })

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
      <Box>
        <Flex direction='column' gap='4'>
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Flex>
      </Box>
    </Grid>
  )
}

export default IssueDetailsPage
