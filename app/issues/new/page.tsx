'use client'

import { Button, Callout, TextField } from '@radix-ui/themes'
import SimpleMDE from 'react-simplemde-editor'
import { useForm, Controller } from 'react-hook-form'
import 'easymde/dist/easymde.min.css'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface IssueForm {
  title: string
  description: string
}

function NewIssuePage() {
  // Redirect user to issue page
  const router = useRouter()

  const { register, control, handleSubmit } = useForm<IssueForm>()
  const [error, setError] = useState('')

  // SimpleMDE cannot direct do rendering with register, so we render controller component
  return (
    <div className='max-w-xl'>
      {error && (
        <Callout.Root color='red' className='mb-5'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className='space-y-3'
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post('/api/issues', data)
            router.push('/issues')
          } catch (error) {
            setError('An unexpected error occurred')
          }
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder='Title' {...register('title')} />
        </TextField.Root>
        <Controller
          render={({ field }) => (
            <SimpleMDE placeholder='Description' {...field} />
          )}
          name='description'
          control={control}
        />

        <Button>Submit new issue</Button>
      </form>
    </div>
  )
}

export default NewIssuePage
