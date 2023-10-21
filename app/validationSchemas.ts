import { z } from 'zod'

// We want the Patch endpoint to be flexible to receive difference kind of data.
// ( title, description ), (title, description, assignedToUserId) , (status)
// Need to create separate schema for difference data.

export const issueSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  description: z.string().min(1, 'Description is required').max(65535),
})

export const patchIssueSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255).optional(),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(65535)
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, 'AssignedToUserId is required')
    .max(255)
    .optional()
    .nullable(), // explicitly provide null value
})
