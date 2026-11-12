import { Group, Loader, Paper, Stack, Text } from '@mantine/core'
import type { TaskStatus } from '../api.ts'

const STEPS: Partial<Record<TaskStatus, string>> = {
  pending: 'Задача в очереди, ждём воркер…',
  processing: 'Загружаем комментарии и классифицируем их…',
}

export function AnalysisProgress({ status }: { status?: TaskStatus }) {
  return (
    <Paper withBorder p="xl" radius="lg">
      <Group justify="center" gap="lg">
        <Loader type="bars" color="red" />
        <Stack gap={0}>
          <Text fw={600}>Анализируем комментарии</Text>
          <Text c="dimmed" size="sm">
            {(status && STEPS[status]) ?? 'Отправляем запрос…'}
          </Text>
        </Stack>
      </Group>
    </Paper>
  )
}
