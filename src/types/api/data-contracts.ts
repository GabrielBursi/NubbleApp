/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** Any JSON object not defined as schema */
export type Any = any

/** Model */
export interface Message {
  /** @example "string" */
  static_table_messages?: string
  /** @example 399 */
  id?: number
  /** @example 96 */
  sender_id?: number
  /** @example 104 */
  recipient_id?: number
  /** @example "string" */
  message?: string
  /**
   * @format date-time
   * @example "2021-03-23T16:13:08.489+01:00"
   */
  created_at?: string
  /**
   * Model
   * @example "string"
   */
  sender?: User
  /**
   * Model
   * @example "string"
   */
  recipient?: User
}

/** Model */
export interface Post {
  /** @example "string" */
  static_table_posts?: string
  /** @example 946 */
  id?: number
  /** @example "string" */
  text?: string
  /** @example 175 */
  user_id?: number
  /** @example "string" */
  image_url?: string
  /** @example "string" */
  status?: string
  /** @example true */
  is_fixed?: boolean
  /** @example true */
  is_activated?: boolean
  /**
   * @format date-time
   * @example "2021-03-23T16:13:08.489+01:00"
   */
  created_at?: string
  /**
   * @format date-time
   * @example "2021-03-23T16:13:08.489+01:00"
   */
  updated_at?: string
  /**
   * Model
   * @example "string"
   */
  user?: User
  contents?: PostContent[]
  reactions?: PostReaction[]
  reaction_count?: PostReaction[]
  comments?: PostComment[]
  /** @example "string" */
  serialize_extras_true?: string
}

/** Model */
export interface PostComment {
  /** @example "string" */
  static_table_post_comments?: string
  /** @example 342 */
  id?: number
  /** @example "string" */
  message?: string
  /** @example 118 */
  user_id?: number
  /** @example 141 */
  post_id?: number
  /** @example 219 */
  reply_comment_id?: number
  /** @example 797 */
  hub_event_id?: number
  /**
   * @format date-time
   * @example "2021-03-23T16:13:08.489+01:00"
   */
  created_at?: string
  /**
   * @format date-time
   * @example "2021-03-23T16:13:08.489+01:00"
   */
  updated_at?: string
  /**
   * Model
   * @example "string"
   */
  user?: User
  /**
   * Model
   * @example "string"
   */
  post?: Post
  /**
   * Model
   * @example "string"
   */
  replied?: PostComment
  replies?: PostComment[]
  reactions?: PostCommentReaction[]
  reaction_count?: PostCommentReaction[]
  /** @example "string" */
  serialize_extras_true?: string
}

/** Model */
export interface PostCommentReaction {
  /** @example "string" */
  static_table_post_comment_reactions?: string
  /** @example 168 */
  id?: number
  /** @example "string" */
  emoji_type?: string
  /** @example 195 */
  user_id?: number
  /** @example 857 */
  post_comment_id?: number
  /** @example 790 */
  hub_event_id?: number
  /**
   * @format date-time
   * @example "2021-03-23T16:13:08.489+01:00"
   */
  created_at?: string
  /**
   * @format date-time
   * @example "2021-03-23T16:13:08.489+01:00"
   */
  updated_at?: string
  /**
   * Model
   * @example "string"
   */
  user?: User
  /**
   * Model
   * @example "string"
   */
  comment?: PostComment
  /** @example "string" */
  serialize_extras_true?: string
}

/** Model */
export interface PostContent {
  /** @example "string" */
  static_table_post_contents?: string
  /** @example 471 */
  id?: number
  /** @example "string" */
  content_url?: string
  /** @example "string" */
  content_thumb_url?: string
  /** @example "string" */
  type?: string
  /** @example "string" */
  subtype?: string
  /** @example 174 */
  width?: number
  /** @example 827 */
  height?: number
  /** @example 79 */
  hub_event_id?: number
  /**
   * Model
   * @example "string"
   */
  user?: User
  /**
   * Model
   * @example "string"
   */
  post?: Post
}

/** Model */
export interface PostReaction {
  /** @example "string" */
  static_table_post_reactions?: string
  /** @example 326 */
  id?: number
  /** @example "string" */
  emoji_type?: string
  /** @example 860 */
  user_id?: number
  /** @example 404 */
  post_id?: number
  /** @example 238 */
  hub_event_id?: number
  /**
   * @format date-time
   * @example "2021-03-23T16:13:08.489+01:00"
   */
  created_at?: string
  /**
   * @format date-time
   * @example "2021-03-23T16:13:08.489+01:00"
   */
  updated_at?: string
  /**
   * Model
   * @example "string"
   */
  user?: User
  /**
   * Model
   * @example "string"
   */
  post?: Post
  /** @example "string" */
  serialize_extras_true?: string
}

/** Model */
export interface User {
  /** @example "string" */
  static_table_users?: string
  /** @example "string" */
  id?: string
  /** @example "string" */
  full_name?: string
  /** @example "string" */
  first_name?: string
  /** @example "string" */
  last_name?: string
  /** @example "string" */
  username?: string
  /** @example "string" */
  profile_url?: string
  /**
   * @format email
   * @example "johndoe@example.com"
   */
  email?: string
  /** @example "string" */
  remember_me_token?: string
  /** @example true */
  is_online?: boolean
  /**
   * @format date-time
   * @example "2021-03-23T16:13:08.489+01:00"
   */
  remember_me_token_created_at?: string
  messages?: Message[]
}

export type GetUploadsData = any

export type RegisterCreateData = object

export type LoginCreatePayload = object

export type LoginCreateData = object

export type RefreshTokenCreateData = any
