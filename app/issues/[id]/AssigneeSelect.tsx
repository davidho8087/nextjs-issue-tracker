'use client'

import { Skeleton } from '@/app/components'
import { User, Issue } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'

// Because this component required user interaction, must convert to client component.
// Need to useEffects but ...

// data:users is ANY, need to supply User array Type.
// Also need to pass issue data as props
function AssigneeSelect({ issue }: { issue: Issue }) {
  const { data: users, error, isLoading } = useUsers()

  if (isLoading) return <Skeleton />
  if (error) return null

  const assignIssue = (userId: string) => {
    axios
      .patch('/api/issues/' + issue.id, {
        assignedToUserId: userId === 'Unassigned' ? null : userId,
      })
      .catch(() => {
        toast.error('Changes could not be saved.')
      })
  }

  // users map object is possibly undefined.
  // Because initially when this component is rendered, Users is undefined until
  // we fetch data from the backend.
  // So we have to use optional chaining to fix the issue.

  return (
    // select user and patch api update
    // Patch on select Change.
    // if user is null then empty string, if empty string will auto select Unassigned.
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || 'Unassigned'}
        onValueChange={assignIssue}
      >
        <Select.Trigger placeholder={'Assign...'} />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestion</Select.Label>
            <Select.Item value='Unassigned'>Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  )
}

// custom user hook
const useUsers = () =>
  useQuery<User[]>({
    // unique identifying piece of data in the cache.
    queryKey: ['users'],
    // queryFn will return a promise that resolves to data.
    queryFn: () => axios.get('/api/users').then((res) => res.data),
    /// users list will refresh in 60s
    staleTime: 60 * 1000,
    // retry up to 3 times to fetch data.
    retry: 3,
  })
export default AssigneeSelect
