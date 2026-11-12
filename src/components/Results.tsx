import { Accordion, Badge, Group, Paper, SimpleGrid, Stack, Text, ThemeIcon, Title } from '@mantine/core'
import type { Comment, TaskStatusResponse } from '../api.ts'
import { CATEGORIES, CATEGORY_ORDER } from '../categories.ts'

function CommentList({ comments, color }: { comments: Comment[]; color: string }) {
  return (
    <Stack gap="xs">
      {comments.map((comment) => (
        <Paper
          key={comment.id}
          p="sm"
          radius="md"
          withBorder
          style={{ borderLeft: `3px solid var(--mantine-color-${color}-filled)` }}
        >
          <Text size="sm" className="comment-text">
            {comment.text}
          </Text>
        </Paper>
      ))}
    </Stack>
  )
}

export function Results({ result }: { result: NonNullable<TaskStatusResponse['result']> }) {
  const categories = CATEGORY_ORDER.filter((c) => result[c]?.length)
  const total = categories.reduce((sum, c) => sum + result[c]!.length, 0)

  if (total === 0) {
    return (
      <Paper withBorder p="xl" radius="lg">
        <Text ta="center" c="dimmed">
          У этого видео нет комментариев для анализа
        </Text>
      </Paper>
    )
  }

  return (
    <Stack gap="md">
      <Group justify="space-between" align="baseline">
        <Title order={2} size="h3">
          Результаты
        </Title>
        <Text c="dimmed" size="sm">
          {total} комментариев в {categories.length} категориях
        </Text>
      </Group>

      <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="sm">
        {categories.map((c) => {
          const { label, color, icon: Icon } = CATEGORIES[c]
          return (
            <Paper key={c} withBorder p="sm" radius="md">
              <Group gap="sm" wrap="nowrap">
                <ThemeIcon variant="light" color={color} size="lg" radius="md">
                  <Icon size={20} />
                </ThemeIcon>
                <div>
                  <Text size="xl" fw={700} lh={1}>
                    {result[c]!.length}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {label}
                  </Text>
                </div>
              </Group>
            </Paper>
          )
        })}
      </SimpleGrid>

      <Accordion multiple variant="separated" radius="lg" defaultValue={[categories[0]]}>
        {categories.map((c) => {
          const { label, color, icon: Icon } = CATEGORIES[c]
          return (
            <Accordion.Item key={c} value={c}>
              <Accordion.Control
                icon={
                  <ThemeIcon variant="light" color={color} radius="md">
                    <Icon size={18} />
                  </ThemeIcon>
                }
              >
                <Group justify="space-between" pr="sm">
                  <Text fw={600}>{label}</Text>
                  <Badge color={color} variant="light">
                    {result[c]!.length}
                  </Badge>
                </Group>
              </Accordion.Control>
              <Accordion.Panel>
                <CommentList comments={result[c]!} color={color} />
              </Accordion.Panel>
            </Accordion.Item>
          )
        })}
      </Accordion>
    </Stack>
  )
}
