import { PostModel } from '@/domain/Post'
import { StrictOmit } from '@/types/utils'

export type PostItemProps = StrictOmit<PostModel, 'id'>
