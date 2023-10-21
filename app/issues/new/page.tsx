// We're going to do lazy loading ('../_components/IssueForm')
import IssueFormSkeleton from '@/app/issues/_components/IssueFormSkeleton'
// So we use dynamic function loader.
// import IssueForm from '../_components/IssueForm'
import dynamic from 'next/dynamic'

const IssueForm = dynamic(() => import('@/app/issues/_components/IssueForm'), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
})
function NewIssuePage() {
  return (
    <div>
      <IssueForm />
    </div>
  )
}

export default NewIssuePage
