'use client'

import { Skeleton } from '@/app/components'
import { User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState, useEffect } from 'react'

// Because this component required user interaction, must convert to client component.
// Need to useEffects

// data:users is ANY, need to supply User array Type.
function AssigneeSelect() {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    // unique identifying piece of data in the cache.
    queryKey: ['users'],
    // queryFn will return a promise that resolves to data.
    queryFn: () => axios.get('/api/users').then((res) => res.data),
    /// users list will refresh in 60s
    staleTime: 60 * 1000,
    // retry up to 3 times to fetch data.
    retry: 3,
  })

  if (isLoading) return <Skeleton />

  if (error) return null

  // users map object is possibly undefined.
  // Because initially when this component is rendered, Users is undefined until
  // we fetch data from the backend.
  // So we have to use optional chaining to fix the issue.

  return (
    <Select.Root>
      <Select.Trigger placeholder={'Assign...'} />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestion</Select.Label>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
          <Select.Item value={'1'}>David Ho</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}
export default AssigneeSelect
