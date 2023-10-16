import IssueFormSkeleton from '@/app/issues/_components/IssueFormSkeleton'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'

import dynamic from 'next/dynamic'

const IssueForm = dynamic(() => import('@/app/issues/_components/IssueForm'), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
})
interface Props {
  params: { id: string }
}

async function EditIssuePage({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  })

  if (!issue) notFound()

  // Load this component dynamically, like how we did on the new issue page.
  return <IssueForm issue={issue} />
}

export default EditIssuePage
