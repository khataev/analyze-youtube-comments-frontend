import {
  IconBulb,
  IconHeart,
  IconHelpCircle,
  IconMessage,
  IconNotes,
  IconPencil,
  IconRobot,
  IconVideo,
  type Icon,
} from '@tabler/icons-react'
import type { Category } from './api.ts'

type CategoryMeta = { label: string; color: string; icon: Icon }

// Порядок ключей — порядок вывода категорий на странице
export const CATEGORIES: Record<Category, CategoryMeta> = {
  Questions: { label: 'Вопросы', color: 'blue', icon: IconHelpCircle },
  'Video suggestion': { label: 'Идеи для видео', color: 'grape', icon: IconVideo },
  Feedback: { label: 'Отзывы', color: 'teal', icon: IconMessage },
  'Advice/tips': { label: 'Советы', color: 'yellow', icon: IconBulb },
  Corrections: { label: 'Исправления', color: 'orange', icon: IconPencil },
  Thanks: { label: 'Благодарности', color: 'pink', icon: IconHeart },
  Summaries: { label: 'Пересказы', color: 'cyan', icon: IconNotes },
  Bots: { label: 'Боты', color: 'gray', icon: IconRobot },
}

export const CATEGORY_ORDER = Object.keys(CATEGORIES) as Category[]
