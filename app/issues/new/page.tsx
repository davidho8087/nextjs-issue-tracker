'use client'

import { Button, TextArea, TextField } from '@radix-ui/themes'
import SimpleMDE from 'react-simplemde-editor'
import { useForm, Controller } from 'react-hook-form'
import 'easymde/dist/easymde.min.css'
import axios from 'axios'
import { useRouter } from 'next/navigation'

interface IssueForm {
  title: string
  description: string
}

function NewIssuePage() {
  // Redirect user to issue page
  const router = useRouter()

  const { register, control, handleSubmit } = useForm<IssueForm>()

  // SimpleMDE cannot direct do rendering with register, so we render controller component
  return (
    <form
      className='max-w-xl space-y-3'
      onSubmit={handleSubmit(async (data) => {
        await axios.post('/api/issues', data)
        router.push('/issues')
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
  )
}

export default NewIssuePage
