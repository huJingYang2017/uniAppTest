import { http } from './http'
import type { Post } from '@/types/post'

const requestMeta = { loading: true, toast: true, auth: true }

export function fetchPost(id: number) {
  return http.get<Post>(`/posts/${id}`, { luchMeta: requestMeta })
}

export function createPost(payload: Pick<Post, 'title' | 'body'>) {
  return http.post<Post>(
    '/posts',
    { userId: 1, ...payload },
    { luchMeta: requestMeta },
  )
}

export function fetchMissing() {
  return http.get('/not-found', { luchMeta: requestMeta })
}
