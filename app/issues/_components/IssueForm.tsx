'use client'

import { ErrorMessage, Spinner } from '@/app/components'
import { Button, Callout, TextField } from '@radix-ui/themes'
// import SimpleMDE from 'react-simplemde-editor'
import { issueSchema } from '@/app/validationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import 'easymde/dist/easymde.min.css'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Issue } from '@prisma/client'

// Navigator is not defined Error (server side error) because of React Markdown editor)
// Use lazy loading your components.
// We can disable SSR as part of lazy loading our components.
// Tt is necessary when we have client side component that access browser APIs.

// We dynamically load this component called lazy loading.
// Tell next.js not to render this component on the server.

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
})

type IssueFormData = z.infer<typeof issueSchema>

function IssueForm({ issue }: { issue?: Issue }) {
  // Redirect user to issue page
  const router = useRouter()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  })
  const [error, setError] = useState('')
  const [isSubmitting, setSubmitting] = useState(false)

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true)

      // if receiving issue by props, means edit issue
      if (issue) {
        await axios.patch('/api/issues/' + issue.id, data)
      } else {
        await axios.post('/api/issues', data)
      }
      router.push('/issues')
    } catch (error) {
      setSubmitting(false)
      setError('An unexpected error occurred')
    }
  })

  // SimpleMDE cannot direct do rendering with register, so we render controller component
  return (
    <div className='max-w-xl'>
      {error && (
        <Callout.Root color='red' className='mb-5'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className='space-y-3' onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input
            defaultValue={issue?.title}
            placeholder='Title'
            {...register('title')}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name='description'
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder='Description' {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          {issue ? 'Update Issue' : 'Submit New Issue'}{' '}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  )
}

export default IssueForm
