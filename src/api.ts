// Типы и запросы повторяют схемы backend-python (src/app/analysis/schemas.py)

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export type TaskStatus = 'pending' | 'processing' | 'completed' | 'failed'

export type Category =
  | 'Video suggestion'
  | 'Questions'
  | 'Thanks'
  | 'Advice/tips'
  | 'Corrections'
  | 'Summaries'
  | 'Bots'
  | 'Feedback'

export type Task = {
  task_id: string
}

export type Comment = {
  id: string
  text: string
}

export type TaskStatusResponse = {
  task_id: string
  status: TaskStatus
  result: Partial<Record<Category, Comment[]>> | null
  error: string | null
}

export class ApiError extends Error {}

// FastAPI отдаёт {"detail": "..."} для доменных ошибок и {"detail": [{msg}, ...]} для 422
async function parseError(response: Response): Promise<ApiError> {
  try {
    const body = await response.json()
    if (typeof body.detail === 'string') return new ApiError(body.detail)
    if (Array.isArray(body.detail) && body.detail.length > 0) {
      const msg: string = body.detail[0].msg
      return new ApiError(msg.replace(/^Value error, /, ''))
    }
  } catch {
    // тело не JSON — ниже вернём общее сообщение
  }
  return new ApiError(`Request failed (${response.status})`)
}

export async function analyzeVideo(url: string): Promise<Task> {
  const response = await fetch(`${API_BASE_URL}/api/v1/analysis`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  })
  if (!response.ok) throw await parseError(response)
  return response.json()
}

export async function getAnalysis(taskId: string): Promise<TaskStatusResponse> {
  const response = await fetch(`${API_BASE_URL}/api/v1/analysis/${taskId}`)
  if (!response.ok) throw await parseError(response)
  return response.json()
}
