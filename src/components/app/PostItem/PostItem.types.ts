import { Post } from '@/domain'
import { StrictOmit } from '@/types/utils'

export type PostItemProps = StrictOmit<Post, 'id'>
