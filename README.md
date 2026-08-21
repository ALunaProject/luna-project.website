# 🚀 Luna Project - FrontEnd

Bem-vindo ao Luna, um site onde você pode encontrar pessoas para jogar, descobrir novos jogos, jogos em alta no momento e notícias gerais sobre o mundo dos games.
Esta versão é uma MVP (Minimum Viable Product) do que será o projeto futuramente. 
_Desenvolvido por Team Luna - disponível no [Figma Community](https://www.figma.com/community/file/1559988919515428165)._

## 📁 Estrutura do Projeto

A estrutura do projeto é organizada para facilitar a manutenção e o desenvolvimento, como exemplificado abaixo:
```
  src/
├── assets/                      # Arquivos estáticos (imagens, fontes, ícones)
│   ├── images/
│   │   ├── logo.png
│   │   ├── background-auth.jpg
│   │   └── game-covers/
│   ├── fonts/
│   │   ├── inter.ttf
│   │   └── roboto.ttf
│   └── icons/
│       ├── gamepad.svg
│       ├── user.svg
│       └── search.svg
│
├── app/                         # Rotas e páginas do Next.js (Page Router)
│   │
│   ├── _app.tsx                 # Componente principal da aplicação (Provider, Layout)
│   ├── _document.tsx            # Personalização do HTML (meta tags, fontes)
│   │
│   ├── login/                   # Página de Login
│   │   ├── index.tsx            # Componente principal da página
│   │   └── styles.module.css    # Estilos específicos da página
│   │
│   ├── signup/                  # Página de Cadastro
│   │   ├── index.tsx
│   │   └── styles.module.css
│   │
│   ├── news/                    # Página de Notícias
│   │   ├── index.tsx
│   │   ├── styles.module.css
│   │   └── [id]/                # Rota dinâmica para notícia específica
│   │       ├── index.tsx
│   │       └── styles.module.css
│   │
│   ├── discovery/               # Página de Descoberta de Jogos
│   │   ├── index.tsx
│   │   └── styles.module.css
│   │
│   ├── game-purpose/            # Página de Propósito do Jogo
│   │   ├── index.tsx
│   │   ├── styles.module.css
│   │   └── [gameId]/            # Rota dinâmica para jogo específico
│   │       ├── index.tsx
│   │       └── styles.module.css
│   │
│   ├── lfg-posts/               # Página de Posts (Looking For Game)
│   │   ├── index.tsx
│   │   └── styles.module.css
│   │
│   └── api/                     # API Routes (Next.js - opcional)
│       └── auth/
│           └── [...nextauth].ts # Configuração de autenticação (se usar NextAuth)
│
├── components/                  # Componentes reutilizáveis (globais)
│   │
│   ├── ui/                      # Componentes UI genéricos
│   │   ├── Button/
│   │   │   ├── index.tsx
│   │   │   └── styles.module.css
│   │   ├── Input/
│   │   │   ├── index.tsx
│   │   │   └── styles.module.css
│   │   ├── Card/
│   │   │   ├── index.tsx
│   │   │   └── styles.module.css
│   │   ├── Modal/
│   │   │   ├── index.tsx
│   │   │   └── styles.module.css
│   │   ├── Dropdown/
│   │   │   ├── index.tsx
│   │   │   └── styles.module.css
│   │   ├── Skeleton/           # Skeletons para carregamento
│   │   │   ├── index.tsx       # Componente Skeleton genérico
│   │   │   ├── LoginSkeleton.tsx
│   │   │   ├── NewsSkeleton.tsx
│   │   │   ├── DiscoverySkeleton.tsx
│   │   │   ├── GamePurposeSkeleton.tsx
│   │   │   ├── LfgPostsSkeleton.tsx
│   │   │   ├── styles.module.css  # Estilos unificados dos skeletons
│   │   │   └── skeleton.css        # CSS global para skeletons
│   │   └── styles.module.css    # Estilos globais da UI
│   │
│   ├── layout/                 # Componentes de layout
│   │   ├── Header/
│   │   │   ├── index.tsx
│   │   │   └── styles.module.css
│   │   ├── Footer/
│   │   │   ├── index.tsx
│   │   │   └── styles.module.css
│   │   └── Sidebar/
│   │       ├── index.tsx
│   │       └── styles.module.css
│   │
│   ├── forms/                  # Formulários reutilizáveis
│   │   ├── LoginForm/
│   │   │   ├── index.tsx
│   │   │   └── styles.module.css
│   │   ├── RegisterForm/
│   │   │   ├── index.tsx
│   │   │   └── styles.module.css
│   │   └── PostForm/
│   │       ├── index.tsx
│   │       └── styles.module.css
│   │
│   └── shared/                 # Componentes compartilhados entre páginas
│       ├── GameCard/
│       │   ├── index.tsx
│       │   └── styles.module.css
│       ├── PostCard/
│       │   ├── index.tsx
│       │   └── styles.module.css
│       └── CommentSection/
│           ├── index.tsx
│           └── styles.module.css
│
├── hooks/                       # Hooks personalizados
│   ├── useAuth.ts              # Gerenciamento de autenticação
│   ├── useFetch.ts             # Requisições HTTP
│   ├── useGameSearch.ts        # Busca de jogos
│   └── usePagination.ts        # Paginação
│
├── contexts/                   # Contextos React
│   ├── AuthContext.tsx         # Contexto de autenticação
│   └── ThemeContext.tsx        # Contexto de tema
│
├── styles/                     # Estilos globais
│   ├── globals.css             # Estilos CSS globais
│   ├── variables.css           # Variáveis CSS (cores, fontes, espaçamentos)
│   └── reset.css               # Reset de estilos
│
├── utils/                      # Funções auxiliares
│   ├── validators.ts           # Validadores de dados
│   ├── formatters.ts           # Formatação de dados (datas, números)
│   ├── api.ts                  # Configuração do cliente HTTP (Axios)
│   └── constants.ts            # Constantes globais
│
├── types/                      # Tipagens TypeScript
│   ├── user.types.ts
│   ├── game.types.ts
│   ├── post.types.ts
│   └── comment.types.ts
│
└── middleware.ts               # Middleware Next.js (autenticação de rotas)
```
## 🛠️ Ferramentas Utilizadas

| Área                  | Tecnologia                    |
|-----------------------|-------------------------------|
| Ferramenta            | *React 19*                    |
| Linguagem             | *TypeScript*                  |
| Framework             | *Next.js*                     |
| Styling               | *SCSS*                        |
| Design System         | *_a decidir__*                |
| Client State          | *Zustand*                     |
| Server State          | *TanStack Query*              |
| Formulários           | *_a decidir_*                 |
| Validação             | *_a decidir_*                 |
| Virtualização         | *TanStack Virtual*            |
| Testes unitários      | *_a decidir_*                 |
| Componentes           | *_a decidir_*                 |
| E2E                   | *_a decidir_*                 |
| Component development | *_a decidir_*                 |
| Package manager       | *pnpm*                        |
| Imagens               | *Next Image + CDN*            |
| Tempo real            | *WebSocket/SSE*               |
| Performance           | *Web Vitals + React DevTools* |

## 🏗️ Instalação

### Clone o repositório:
```
git clone https://github.com/LyanBrito/luna-project.git
```
### Rodando o projeto:
```
<--Use LiveServer, ou outro servidor local-->
Abra http://localhost:3000
no seu navegador para ver a aplicação.
```

## 🌱 Contribuições

Fique à vontade para abrir uma issue ou enviar um pull request para melhorias ou correções. Suas contribuições são bem-vindas!

## 🔗 Links

[![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Figma](https://img.shields.io/badge/figma-%23323330.svg?style=for-the-badge&logo=figma&logoColor=white)](https://www.figma.com/community/file/1559988919515428165)
[![Next.js](https://img.shields.io/badge/Next.js-%23000000.svg?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/docs)
[![React](https://img.shields.io/badge/React-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/docs/)
[![Zustand](https://img.shields.io/badge/Zustand-%23443E38.svg?style=for-the-badge&logo=react&logoColor=white)](https://zustand.docs.pmnd.rs/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-%23FF4154.svg?style=for-the-badge&logo=reactquery&logoColor=white)](https://tanstack.com/query/latest)
[![TanStack Virtual](https://img.shields.io/badge/TanStack_Virtual-%23FF4154.svg?style=for-the-badge&logo=reactquery&logoColor=white)](https://tanstack.com/virtual/latest)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-%2306B6D4.svg?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/docs)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-%23000000.svg?style=for-the-badge&logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)
[![React Hook Form](https://img.shields.io/badge/React_Hook_Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)](https://react-hook-form.com/)
[![Zod](https://img.shields.io/badge/Zod-%233E67B1.svg?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-%236E9F18.svg?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)
[![Testing Library](https://img.shields.io/badge/Testing_Library-%23E33332.svg?style=for-the-badge&logo=testinglibrary&logoColor=white)](https://testing-library.com/docs/react-testing-library/intro/)
[![Playwright](https://img.shields.io/badge/Playwright-%2345BA4.svg?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev/docs/intro)
[![Storybook](https://img.shields.io/badge/Storybook-%23FF4785.svg?style=for-the-badge&logo=storybook&logoColor=white)](https://storybook.js.org/docs)
[![pnpm](https://img.shields.io/badge/pnpm-%23F69220.svg?style=for-the-badge&logo=pnpm&logoColor=white)](https://pnpm.io/)
[![Turborepo](https://img.shields.io/badge/Turborepo-%23EF4444.svg?style=for-the-badge&logo=turborepo&logoColor=white)](https://turborepo.com/docs)
