'use client'

import { User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import axios from 'axios'
import React, { useState, useEffect } from 'react'

// Because this component required user interaction, must convert to client component.
// Need to useEffects
function AssigneeSelect() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    // defined fetchUsers function
    const fetchUsers = async () => {
      // data return is Type Any , so we need Type User[]
      const { data } = await axios.get<User[]>('/api/users')
      setUsers(data)
    }

    // Call fetchUsers function
    fetchUsers()
  }, [])
  return (
    <Select.Root>
      <Select.Trigger placeholder={'Assign...'} />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestion</Select.Label>
          {users.map((user) => (
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
