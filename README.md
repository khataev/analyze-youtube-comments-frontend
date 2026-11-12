# YouTube Comments Analyzer — frontend

Фронтенд к `../backend-python` по мотивам [примера Pretty Printed](https://github.com/PrettyPrinted/youtube_video_code/tree/master/2025/07/10/React%20Frontend%20Project%20for%20Beginners%20-%20React%20Query%20&%20FastAPI).
Стек тот же (Vite + React + TypeScript + TanStack Query), компоненты из [Mantine](https://mantine.dev).

## Структура

```
src/
├── main.tsx             # MantineProvider + QueryClientProvider
├── App.tsx              # useMutation (старт задачи) + useQuery с опросом статуса
├── api.ts               # типы и запросы к API, разбор ошибок FastAPI
├── categories.ts        # подписи, цвета и иконки категорий
├── theme.ts             # тема Mantine
└── components/
    ├── Header.tsx           # заголовок и переключатель светлой/тёмной темы
    ├── AnalysisForm.tsx     # поле ввода URL и кнопка
    ├── AnalysisProgress.tsx # Loader, пока задача pending/processing
    └── Results.tsx          # сводка по категориям и списки комментариев
```

## Отличия от оригинала

- Пути API: `/analyze` → `POST /api/v1/analysis`, `/status/{id}` → `GET /api/v1/analysis/{id}`.
- Поле с результатом: `data` → `result`.
- Опрос останавливается и на `completed`, и на `failed`; ошибка задачи (`error`) показывается пользователю.
- Ошибки API показываются как есть: 422 «Not a valid YouTube video URL» — под полем ввода, 404/503 — в отдельном блоке.

## Запуск

Нужен запущенный backend (API + воркер, см. `../backend-python/README.md`).

```bash
cp .env.example .env   # при необходимости поменять VITE_API_BASE_URL
npm install
npm run dev            # http://localhost:5173
```

Адрес фронта должен входить в `CORS_ORIGINS` бэкенда (по умолчанию там `http://localhost:5173`).

## Проверки

```bash
npm run build   # tsc + сборка
npm run lint    # oxlint
```
