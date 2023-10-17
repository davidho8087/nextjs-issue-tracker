'use client'

import { Select } from '@radix-ui/themes'
import React from 'react'

// because this component required user interaction, must convert to client component.
function AssigneeSelect() {
  return (
    <Select.Root>
      <Select.Trigger placeholder={'Assign...'} />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestion</Select.Label>
          <Select.Item value={'1'}>David Ho</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}
export default AssigneeSelect
