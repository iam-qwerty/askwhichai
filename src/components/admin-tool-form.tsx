'use client'
import React, { useState } from 'react'
import { Field, FieldGroup } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { insertTool } from '@/lib/admin.functions'
import { toast } from 'sonner'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function AdminToolForm() {
  const [isPending, setIsPending] = useState(false)
  const [pricingModel, setPricingModel] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPending(true)

    const formData = new FormData(e.currentTarget)
    const rawTags = formData.get('tags') as string | null
    const tags = rawTags ? rawTags.split(',').map((tag: string) => tag.trim()) : []

    try {
      const result = await insertTool({
        data: {
          name: formData.get('name') as string,
          description: formData.get('description') as string,
          tool_url: formData.get('tool_url') as string,
          slug: formData.get('slug') as string,
          category: formData.get('category') as string,
          pricing: pricingModel || (formData.get('pricing_model') as string),
          tags,
        },
      })

      if (result.success) {
        toast.success('Tool inserted successfully')
        e.currentTarget.reset()
      } else {
        toast.error(result.message || 'Error submitting tool')
      }
    } catch {
      toast.error('Error submitting tool')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input type="text" name="name" placeholder="Tool name" required />
        <Input type="text" name="slug" placeholder="slug (seo-friendly)" required />
        <Input type="text" name="category" placeholder="category" />
        <Select name="pricing_model" required onValueChange={setPricingModel}>
          <SelectTrigger>
            <SelectValue placeholder="Select pricing model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="free">Free</SelectItem>
            <SelectItem value="freemium">Freemium</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
          </SelectContent>
        </Select>
      </FieldGroup>
      <Field>
        <Input name="tool_url" placeholder="https://example.com" required />
      </Field>
      <Field>
        <Textarea name="description" placeholder="Tool description" className="min-h-[120px]" />
      </Field>
      <Field>
        <Input name="tags" placeholder="comma separated tags" />
      </Field>
      <Button type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Insert Tool'}
      </Button>
    </form>
  )
}
