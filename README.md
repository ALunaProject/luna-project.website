# 🚀 Luna Project - FrontEnd

Bem-vindo ao Luna, um site onde você pode encontrar pessoas para jogar, descobrir novos jogos, jogos em alta no momento e notícias gerais sobre o mundo dos games.
Esta versão é uma MVP (Minimum Viable Product) do que será o projeto futuramente. 
> _Desenvolvido por Team Luna - disponível no [Figma Community](https://www.figma.com/community/file/1559988919515428165)._
> 
## 🛠️ Ferramentas Utilizadas

| Área             | Tecnologia                                                                   |
|------------------|------------------------------------------------------------------------------|
| Ferramenta       | *React 19*                                                                   |
| Linguagem        | *TypeScript*                                                                 |
| Framework        | *Next.js*                                                                    |
| Styling          | *SCSS*                                                                       |
| Design System    | *_[Made By Luna](https://www.figma.com/community/file/1559988919515428165)_* |
| Client State     | *Zustand*                                                                    |
| Validação        | *_a decidir_*                                                                |
| Testes unitários | *_a decidir_*                                                                |
| Componentes      | *_radix-ui_*                                                                 |
| E2E              | *_cypress_*                                                                  |
| Package manager  | *pnpm*                                                                       |
| Imagens          | *Next Image + CDN*                                                           |
| Tempo real       | *WebSocket/SSE*                                                              |
| Performance      | *Web Vitals + React DevTools*                                                |

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

## 📁 Estrutura do Projeto

A estrutura do projeto é organizada para facilitar a manutenção e o desenvolvimento, como exemplificado abaixo:
```
  src/
├── assets/                      # Arquivos estáticos (imagens, fontes, ícones)
│   ├── images/
│   ├── fonts/
│   └── icons/
├── app/                         # Rotas e páginas do Next.js (App Router)
│   ├── app.tsx                  # Componente principal da aplicação (Provider, Layout)
│   ├── layout.tsx               # Personalização do HTML (meta tags, fontes)
│   ├── login/                   # Exemplo de uma página estática
│   │   ├── page.tsx             # Componente principal da página
│   │   └── styles.module.scss   # Estilos específicos da página
│   ├── [username]/              # Exemplo de Rota Dinâmica de uma página com conteúdos externos
│   │   ├── page.tsx               
│   │   └── styles.module.scss
├── components/                  # Componentes reutilizáveis (globais)
│   ├── ui/                      # Componentes UI genéricos
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Skeleton/            # Skeletons para carregamento
│   │   │   ├── index.tsx        # Componente Skeleton genérico
│   │   │   ├── GameCardSK.tsx
│   │   │   ├── styles.module.scss     # Estilos unificados dos skeletons
│   │   └── styles.module.scss    # Estilos globais da UI
│   │
│   ├── layout/                  # Componentes de layout
│   │   ├── Header/
│   │   │   ├── Header.tsx
│   │   │   └── styles.module.scss
│   │   ├── Footer/
│   │   │   ├── Footer.tsx
│   │   │   └── styles.module.scss
│   │   └── Sidebar/
│   │       ├── Sidebar.tsx
│   │       └── styles.module.scss
│   │
│   ├── forms/                  # Formulários reutilizáveis
│   │   ├── AuthCard/
│   │   │   ├── AuthCard.tsx
│   │   │   └── styles.module.scss
│   └── shared/                 # Componentes compartilhados entre páginas
│       ├── GameCard/
│       │   ├── GameCard.tsx
│       │   └── styles.module.scss
│       ├── PostCard/
│       │   ├── PostCard.tsx
│       │   └── styles.module.scss
│       └── Commentts/
│           ├── Comments.tsx
│           └── styles.module.scss
│
├── hooks/                      # Hooks personalizados
│   └── useAuth.ts              # Gerenciamento de autenticação
│
├── services/                   # Serviços da aplicaçãp
│   ├── gamesServices.tsx 
│   └── userServcies.tsx 
│
├── styles/                     # Estilos globais
│   ├── base/                   # Estilos SCSS globais
│   ├── utils                   # Variáveis/Mixins reutilizaveis
│   └── main.scss               # Exportador dos estilos
│
├── utils/                      # Funções auxiliares
│   ├── api.ts                  # Configuração do cliente HTTP (Axios)
│   └── constants.ts            # Constantes globais
│
├── types/                      # Tipagens TypeScript reutilizaveis
│   ├── userDTO.ts
│   ├── gameDTO.ts
│   ├── postDTO.ts
│   └── commentDTO.ts
│
└── biome.json                  # Configuração do Lintador
```

## 🌱 Contribuições

Fique à vontade para abrir uma issue ou enviar um pull request para melhorias ou correções. Suas contribuições são bem-vindas!

## 🔗 Links

[![Figma](https://img.shields.io/badge/figma-%23323330.svg?style=for-the-badge&logo=figma&logoColor=white)](https://www.figma.com/community/file/1559988919515428165)
[![Next.js](https://img.shields.io/badge/Next.js-%23000000.svg?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/docs)
[![React](https://img.shields.io/badge/React-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/docs/)
[![Zustand](https://img.shields.io/badge/Zustand-%23443E38.svg?style=for-the-badge&logo=react&logoColor=white)](https://zustand.docs.pmnd.rs/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-%23000000.svg?style=for-the-badge&logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)
[![Playwright](https://img.shields.io/badge/Playwright-%2345BA4.svg?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev/docs/intro)
[![pnpm](https://img.shields.io/badge/pnpm-%23F69220.svg?style=for-the-badge&logo=pnpm&logoColor=white)](https://pnpm.io/)
