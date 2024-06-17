import * as z from 'zod'

const VideoResultSchema = z.object({
  iso_639_1: z.string(),
  iso_3166_1: z.string(),
  name: z.string(),
  key: z.string(),
  site: z.string(),
  size: z.number(),
  type: z.string(),
  official: z.boolean(),
  published_at: z.string(),
  id: z.string(),
})

export const VideoResponseSchema = z.object({
  id: z.number(),
  results: z.array(VideoResultSchema),
})

export type VideoResponseType = z.infer<typeof VideoResponseSchema>

export type VideoResultType = z.infer<typeof VideoResultSchema>
