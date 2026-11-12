import {
  ActionIcon,
  Group,
  Stack,
  Text,
  ThemeIcon,
  Title,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core'
import { IconBrandYoutubeFilled, IconMoon, IconSun } from '@tabler/icons-react'

export function Header() {
  const { setColorScheme } = useMantineColorScheme()
  const scheme = useComputedColorScheme('light')

  return (
    <Group justify="space-between" align="flex-start" wrap="nowrap">
      <Group gap="md" wrap="nowrap">
        <ThemeIcon size={56} radius="lg" variant="gradient" gradient={{ from: 'red', to: 'pink' }}>
          <IconBrandYoutubeFilled size={32} />
        </ThemeIcon>
        <Stack gap={2}>
          <Title order={1} size="h2">
            YouTube Comments Analyzer
          </Title>
          <Text c="dimmed" size="sm">
            Раскладываем комментарии к видео по категориям с помощью LLM
          </Text>
        </Stack>
      </Group>
      <ActionIcon
        variant="default"
        size="lg"
        aria-label="Переключить тему"
        onClick={() => setColorScheme(scheme === 'light' ? 'dark' : 'light')}
      >
        {scheme === 'light' ? <IconMoon size={18} /> : <IconSun size={18} />}
      </ActionIcon>
    </Group>
  )
}
