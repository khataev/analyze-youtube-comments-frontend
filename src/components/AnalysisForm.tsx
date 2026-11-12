import { useState, type FormEvent } from 'react'
import { Button, Group, Paper, TextInput } from '@mantine/core'
import { IconLink, IconSparkles } from '@tabler/icons-react'

type Props = {
  onSubmit: (url: string) => void
  busy: boolean
  error?: string
}

export function AnalysisForm({ onSubmit, busy, error }: Props) {
  const [url, setUrl] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (url.trim()) onSubmit(url.trim())
  }

  return (
    <Paper component="form" onSubmit={handleSubmit} withBorder shadow="sm" p="lg" radius="lg">
      <Group align="flex-start" gap="sm">
        <TextInput
          flex={1}
          miw={240}
          size="md"
          label="Ссылка на видео"
          placeholder="https://www.youtube.com/watch?v=..."
          leftSection={<IconLink size={18} />}
          value={url}
          onChange={(e) => setUrl(e.currentTarget.value)}
          error={error}
          disabled={busy}
        />
        <Button
          type="submit"
          size="md"
          mt={25}
          variant="gradient"
          gradient={{ from: 'red', to: 'pink' }}
          leftSection={<IconSparkles size={18} />}
          loading={busy}
          disabled={!url.trim()}
        >
          Анализировать
        </Button>
      </Group>
    </Paper>
  )
}
