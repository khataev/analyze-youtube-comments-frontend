import { useState } from 'react'
import { Alert, Container, Stack } from '@mantine/core'
import { IconAlertTriangle } from '@tabler/icons-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { analyzeVideo, getAnalysis, type TaskStatus } from './api.ts'
import { AnalysisForm } from './components/AnalysisForm.tsx'
import { AnalysisProgress } from './components/AnalysisProgress.tsx'
import { Header } from './components/Header.tsx'
import { Results } from './components/Results.tsx'

const POLL_INTERVAL_MS = 2000
const FINAL_STATUSES: TaskStatus[] = ['completed', 'failed']

function App() {
  const [taskId, setTaskId] = useState('')

  const mutation = useMutation({
    mutationFn: analyzeVideo,
    onSuccess: (task) => setTaskId(task.task_id),
  })

  const query = useQuery({
    queryKey: ['analysis', taskId],
    queryFn: () => getAnalysis(taskId),
    enabled: !!taskId,
    // Опрашиваем, пока задача не завершилась (успешно или с ошибкой)
    refetchInterval: (q) => {
      const status = q.state.data?.status
      return status && FINAL_STATUSES.includes(status) ? false : POLL_INTERVAL_MS
    },
  })

  const data = query.data
  const inProgress =
    mutation.isPending ||
    (!!taskId && !query.isError && !(data && FINAL_STATUSES.includes(data.status)))

  function handleSubmit(url: string) {
    setTaskId('')
    mutation.mutate(url)
  }

  return (
    <Container size="md" py={48}>
      <Stack gap="xl">
        <Header />

        <AnalysisForm onSubmit={handleSubmit} busy={inProgress} error={mutation.error?.message} />

        {inProgress && <AnalysisProgress status={data?.status} />}

        {query.isError && (
          <Alert color="red" variant="light" title="Не удалось получить статус" icon={<IconAlertTriangle />}>
            {query.error.message}
          </Alert>
        )}

        {data?.status === 'failed' && (
          <Alert color="red" variant="light" title="Анализ завершился с ошибкой" icon={<IconAlertTriangle />}>
            {data.error}
          </Alert>
        )}

        {data?.status === 'completed' && data.result && <Results result={data.result} />}
      </Stack>
      <ReactQueryDevtools />
    </Container>
  )
}

export default App
