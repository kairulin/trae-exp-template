import { http, HttpResponse } from 'msw'

export const handlers = [
  // Example API mock
  http.get('/api/users', () => {
    return HttpResponse.json([
      { id: 1, name: '使用者1' },
      { id: 2, name: '使用者2' }
    ])
  }),

  http.post('/api/users', async ({ request }) => {
    const { name } = await request.json()
    return HttpResponse.json(
      { id: Date.now(), name },
      { status: 201 }
    )
  })
]
