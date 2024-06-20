import * as z from 'zod'
import { CommonDetailSchema } from './commonDetailType'
const CreatedBySchema = z.object({
  id: z.number(),
  credit_id: z.string(),
  name: z.string(),
  profile_path: z.string().nullable(),
})

const NetworkSchema = z.object({
  id: z.number(),
  name: z.string(),
  logo_path: z.string().nullable(),
  origin_country: z.string(),
})

const LastEpisodeToAirSchema = z
  .object({
    air_date: z.string(),
    episode_number: z.number(),
    id: z.number(),
    name: z.string(),
    overview: z.string().nullable(),
    production_code: z.string().nullable(),
    season_number: z.number(),
    still_path: z.string().nullable(),
    vote_average: z.number(),
    vote_count: z.number(),
  })
  .nullable()

const SeasonSchema = z.object({
  air_date: z.string(),
  episode_count: z.number(),
  id: z.number(),
  name: z.string(),
  overview: z.string().nullable(),
  poster_path: z.string().nullable(),
  season_number: z.number(),
})

export const TvDetailSchema = CommonDetailSchema.extend({
  created_by: z.array(CreatedBySchema),
  episode_run_time: z.array(z.number()),
  first_air_date: z.string(),
  in_production: z.boolean(),
  languages: z.array(z.string()),
  last_air_date: z.string(),
  last_episode_to_air: LastEpisodeToAirSchema,
  name: z.string(),
  networks: z.array(NetworkSchema),
  number_of_episodes: z.number(),
  number_of_seasons: z.number(),
  origin_country: z.array(z.string()),
  original_name: z.string(),
  seasons: z.array(SeasonSchema),
  type: z.string(),
})

export type TvDetailType = z.infer<typeof TvDetailSchema>
