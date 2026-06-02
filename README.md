# Goals Plane 🎯

> Também referenciado como **inorbit**

Aplicação fullstack para organização de metas semanais, permitindo ao usuário cadastrar objetivos, acompanhar a frequência desejada por semana, registrar conclusões e visualizar um resumo atualizado do progresso semanal.

---

## Visão geral

O **Goals Plane** é uma plataforma para gestão de metas pessoais semanais, com foco em simplicidade, clareza e consistência. O projeto funciona como um painel leve de produtividade, semelhante a um Trello simplificado para acompanhamento de completude semanal.

A aplicação permite:

- cadastrar metas com título e frequência semanal desejada;
- acompanhar metas pendentes na semana;
- registrar cada conclusão de forma controlada;
- impedir que uma meta seja concluída acima da frequência definida;
- visualizar um resumo semanal com total, concluídas e progresso.

---

## Funcionalidades principais

- Cadastro de metas semanais.
- Definição de frequência desejada entre **1 e 7 vezes por semana**.
- Resumo semanal com métricas de progresso.
- Listagem de metas pendentes.
- Registro de conclusão por meta.
- Validação para impedir conclusões acima do limite semanal.
- Atualização automática da interface após criar ou concluir metas.

---

## Tecnologias utilizadas

### Infraestrutura e base

- Node.js
- TypeScript
- npm
- Docker Compose
- PostgreSQL
- Git

### Backend

- Fastify
- @fastify/cors
- fastify-type-provider-zod
- Zod
- Drizzle ORM
- drizzle-kit
- postgres
- dotenv
- dayjs
- @paralleldrive/cuid2
- tsx
- @biomejs/biome
- @types/node

### Frontend

- React 19
- React DOM
- Vite
- @vitejs/plugin-react
- Tailwind CSS
- PostCSS
- Autoprefixer
- @tanstack/react-query
- react-hook-form
- @hookform/resolvers
- Zod
- Radix UI
- @radix-ui/react-dialog
- @radix-ui/react-progress
- @radix-ui/react-radio-group
- lucide-react
- tailwind-merge
- tailwind-variants
- @types/node
- @types/react
- @types/react-dom
- @biomejs/biome

---

## Arquitetura do projeto

O projeto está organizado em dois módulos principais:

### Backend
Localizado em `backend/`, responsável pela API REST, regras de negócio, validação, persistência e integração com PostgreSQL.

### Frontend
Localizado em `frontend/`, responsável pela interface do usuário, consumo da API e gerenciamento de estado assíncrono.

---

## Estrutura de pastas

### `backend/`

```bash
backend/
├── server/
│   └── src/
│       ├── http/        # Rotas e servidor
│       ├── functions/   # Lógica de negócio
│       └── db/          # Schema e seed
├── drizzle.config.ts
└── docker-compose.yml
```

### `frontend/`

```bash
frontend/
├── src/                  # Componentes, hooks e chamadas HTTP
├── components/           # UI de metas, resumo e pendentes
└── http/                 # Funções de fetch para a API
```

---

## Banco de dados

O projeto utiliza PostgreSQL com Drizzle ORM.

### Tabela `goals`

Armazena as metas cadastradas.

Campos principais:

- `id`
- `title`
- `desired_weekly_frequency`
- `created_at`

### Tabela `goal_completions`

Armazena cada conclusão registrada de uma meta.

Campos principais:

- `id`
- `goal_id`
- `created_at`

---

## API REST

A API do backend expõe os seguintes endpoints:

### `POST /goals`
Cria uma nova meta semanal.

**Body**

```json
{
  "title": "string",
  "desiredWeeklyFrequency": 3
}
```

### `GET /summary`
Retorna o resumo semanal.

**Resposta**

```json
{
  "summary": {
    "completed": 0,
    "total": 0,
    "goalsPerDay": []
  }
}
```

### `GET /pending-goals`
Retorna as metas que ainda não atingiram a frequência semanal.

### `POST /completions`
Registra a conclusão de uma meta.

**Body**

```json
{
  "goalId": "string"
}
```

Este endpoint valida se a meta ainda pode ser concluída dentro da semana atual.

---

## Como executar o projeto

### Pré-requisitos

- Node.js instalado
- npm instalado
- PostgreSQL disponível localmente ou via Docker Compose

---

## Backend

### 1. Instalar dependências

```bash
cd backend
npm install
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` dentro de `backend/` com a variável:

```env
DATABASE_URL="postgresql://user:password@localhost:5433/inorbit"
```

### 3. Subir o PostgreSQL com Docker Compose

```bash
cd backend
docker compose up -d
```

> O `docker-compose.yml` do backend utiliza `bitnami/postgresql` e expõe a base na porta **5433**.

### 4. Executar migrations

```bash
npm run migrate
```

### 5. Gerar artefatos do Drizzle, se necessário

```bash
npm run generate
```

### 6. Popular a base com seed

```bash
npm run seed
```

### 7. Iniciar o backend em desenvolvimento

```bash
npm run dev
```

O servidor é executado com `tsx --env-file .env --watch server/src/http/server.ts`.

### 8. Utilitários adicionais

```bash
npm run studio
```

---

## Frontend

### 1. Instalar dependências

```bash
cd frontend
npm install
```

### 2. Iniciar em desenvolvimento

```bash
npm run dev
```

### 3. Gerar build de produção

```bash
npm run build
```

### 4. Visualizar build localmente

```bash
npm run preview
```

### 5. Executar lint

```bash
npm run lint
```

---

## Integração frontend e backend

O frontend consome a API do backend através de chamadas HTTP, por exemplo:

```ts
fetch('http://localhost:3333/summary')
```

```ts
fetch('http://localhost:3333/goals', {
  method: 'POST',
  body: JSON.stringify({ title, desiredWeeklyFrequency }),
})
```

A interface utiliza React Query para buscar, atualizar e sincronizar dados após criação ou conclusão de metas.

---

## Fluxo da aplicação

1. O usuário cadastra uma meta com título e frequência semanal.
2. O backend valida e salva a meta no banco.
3. O frontend atualiza o resumo e a lista de metas pendentes.
4. O usuário registra conclusões ao longo da semana.
5. O backend impede que a meta ultrapasse a frequência semanal definida.
6. O resumo semanal é recalculado com base nas conclusões registradas.

---

## Possíveis melhorias

- Autenticação de usuários.
- Separação de metas por perfil.
- Histórico semanal e mensal com gráficos.
- Notificações e lembretes automáticos.
- Filtros por status, período e prioridade.
- Temas visuais personalizáveis.
- Suporte a metas recorrentes com regras mais avançadas.
- Dashboard analítico com evolução de performance.

---

## Template:

### Home Page:

![alt text](<Screenshot from 2026-06-02 19-05-24.png>)

### Goals Page

![alt text](<Screenshot from 2026-06-02 19-04-19.png>)

### Create Goals Page

![alt text](<Screenshot from 2026-06-02 19-04-34.png>)

## Scripts principais

### Backend

- `npm run dev` — inicia o servidor em desenvolvimento
- `npm run seed` — popula dados iniciais
- `npm run migrate` — executa migrações
- `npm run generate` — gera artefatos do Drizzle
- `npm run studio` — abre o Drizzle Studio

### Frontend

- `npm run dev` — inicia o ambiente de desenvolvimento
- `npm run build` — gera build de produção
- `npm run preview` — pré-visualiza o build
- `npm run lint` — verifica padrões de código

---

## Licença

Este projeto está licenciado sob a **MIT License**.

---

## Autor

**Arnaldo de Melo**

