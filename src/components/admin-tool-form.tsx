// ============================================================
// AskWhichAI — Admin tool submission form
// ============================================================
// Form for admin users to add a new AI tool to the database.
// Collects: name, slug, category, pricing model, URL,
// description, and comma-separated tags.
//
// On submit, calls the insertTool server function and shows
// a success/error toast notification.
// ============================================================

'use client'
import React, { useState } from 'react'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { insertTool } from '@/lib/admin.functions'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function AdminToolForm() {
  const [isPending, setIsPending] = useState(false)  // Loading state for submit button
  const [pricingModel, setPricingModel] = useState('')  // Controlled Select value

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Capture the form element now — e.currentTarget is null after an await
    const form = e.currentTarget
    setIsPending(true)

    const formData = new FormData(form)
    // Parse comma-separated tags into an array (e.g. "writing, images" → ["writing", "images"])
    const rawTags = formData.get('tags') as string | null
    const tags = rawTags
      ? rawTags.split(',').map((tag: string) => tag.trim()).filter(Boolean)
      : []

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
        toast.success('Tool added — it’s live on the home page')
        form.reset()  // Clear the form
        setPricingModel('')  // Reset the controlled Select too
      } else {
        toast.error(result.message || 'Couldn’t add the tool. Check the fields and try again.')
      }
    } catch {
      toast.error('Couldn’t add the tool. Check your connection and try again.')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Row 1: name, slug, category, pricing (2x2 grid) */}
      <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field>
          <FieldLabel htmlFor="tool-name">Name</FieldLabel>
          <Input id="tool-name" type="text" name="name" placeholder="e.g. Claude" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="tool-slug">Slug</FieldLabel>
          <Input id="tool-slug" type="text" name="slug" placeholder="e.g. claude" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="tool-category">Category</FieldLabel>
          <Input id="tool-category" type="text" name="category" placeholder="e.g. writing" />
        </Field>
        <Field>
          <FieldLabel htmlFor="tool-pricing">Pricing model</FieldLabel>
          <Select name="pricing_model" required value={pricingModel} onValueChange={setPricingModel}>
            <SelectTrigger id="tool-pricing" className="w-full">
              <SelectValue placeholder="Select pricing model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="free">Free</SelectItem>
              <SelectItem value="open-source">Open source</SelectItem>
              <SelectItem value="freemium">Freemium</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </FieldGroup>

      {/* Row 2: URL */}
      <Field>
        <FieldLabel htmlFor="tool-url">Website URL</FieldLabel>
        <Input id="tool-url" type="url" name="tool_url" placeholder="https://example.com" required />
      </Field>

      {/* Row 3: Description */}
      <Field>
        <FieldLabel htmlFor="tool-description">Description</FieldLabel>
        <Textarea id="tool-description" name="description" placeholder="What does this tool do, and for whom?" className="min-h-[120px]" />
      </Field>

      {/* Row 4: Tags (comma separated) */}
      <Field>
        <FieldLabel htmlFor="tool-tags">Tags</FieldLabel>
        <Input id="tool-tags" name="tags" placeholder="writing, images, video (comma separated)" />
      </Field>

      <Button type="submit" disabled={isPending}>
        {isPending && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
        {isPending ? 'Adding…' : 'Add tool'}
      </Button>
    </form>
  )
}
