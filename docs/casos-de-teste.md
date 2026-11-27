# Cenários e Casos de Teste — Luna Project

**Projeto:** Luna Project — Front-end (MVP)
**Versão avaliada:** 1.4.2-beta
**Data:** 16/11/2026
**Base dos casos:** comportamento implementado no código-fonte atual (Next.js 16, React 19, TypeScript).
**Observação:** o projeto **não possui suíte de testes automatizados** nesta versão (`package.json` sem script `test` e sem framework de testes). Os casos abaixo servem para execução manual e como base para automação futura.

---

## 1. Ambiente e pré-condições

| Item | Descrição |
|---|---|
| Front-end | `http://localhost:3000` (`next dev`) |
| Back-end | `http://localhost:8080` (definido em `API_BASE_URL`) |
| APIs externas | Steam Store (`gamesApi` / `gamesStoreApi`) e NewsAPI (`NEWS_API_KEY`) |
| Navegador | Chrome ou Edge atualizado; viewport desktop 1440x900 e mobile 390x844 |
| Sessão | Token JWT em `@Luna:token` e username em `@Luna:user` no `localStorage` |
| Massa mínima | 1 usuário válido, 1 usuário sem listas, 1 e-mail já cadastrado, jogos na Steam, notícias disponíveis, tags cadastradas no back |

### Dados de teste sugeridos

| Dado | Valor |
|---|---|
| Senha válida | `Luna@2026` (maiúscula, minúscula, número e especial) |
| Senha com 8 caracteres | `Aa1@bcde` |
| Senha com 7 caracteres | `Aa1@bcd` |
| Senha com 100 caracteres | `Aa1@` + 96 caracteres `x` |
| Senha com 101 caracteres | `Aa1@` + 97 caracteres `x` |
| Username reservado | `games`, `Games`, ` login ` |
| Username comum | `player_teste` |
| Jogo válido | appId `730` (Counter-Strike 2) ou `570` (Dota 2) |
| Jogo inválido | appId `999999999` |

---

## 2. Legenda

### Prioridade

| Código | Significado |
|---|---|
| **P1** | Crítica: fluxo principal ou bloqueante; deve entrar no smoke test |
| **P2** | Alta/Média: regra de negócio, erro relevante ou integração |
| **P3** | Baixa: usabilidade, detalhe visual ou cenário raro |

### Técnicas

| Código | Técnica |
|---|---|
| **PE** | Partição de Equivalência |
| **AVL** | Análise de Valor Limite |
| **TD** | Tabela de Decisão |
| **TE** | Transição de Estados |
| **TN** | Teste Negativo |
| **TI** | Teste de Integração |
| **TC** | Teste de Contrato (API) |
| **TM** | Teste de Componente |
| **TR** | Teste de Regressão |
| **EX** | Teste Exploratório |

---

## 3. Requisitos funcionais de referência

| ID | Requisito |
|---|---|
| RF-01 | Cadastro de conta com username, e-mail e senha |
| RF-02 | Política de senha: 8 a 100 caracteres, com especial, número, maiúscula e minúscula |
| RF-03 | Bloqueio de usernames reservados (rotas do site e nomes técnicos) |
| RF-04 | Login e persistência de sessão (token e username no `localStorage`) |
| RF-05 | Controle de acesso à edição de perfil (somente o dono) |
| RF-06 | Edição de username e bio, com validações e tratamento de conflito |
| RF-07 | Upload e recorte de avatar e banner (JPG/PNG, entrada até 10 MB, saída até 2 MB) |
| RF-08 | Exibição de perfil público em `/[username]`, com 404 para inexistente |
| RF-09 | Criação, renomeação e exclusão de listas personalizadas |
| RF-10 | Adição de jogos às listas padrão (Quero Jogar, Jogando, Jogado) e customizadas |
| RF-11 | Catálogo de jogos com paginação e loading |
| RF-12 | Detalhes do jogo com gêneros, descrição, compra e metadados |
| RF-13 | Avaliação geral da Steam (0 a 10) e estrelas proporcionais |
| RF-14 | Avaliação pessoal do jogo (0 a 10), com salvar, editar e remover |
| RF-15 | Listagem de notícias com filtro de itens inválidos e paginação |
| RF-16 | Detalhe de notícia com data, fonte, link externo e metadados |
| RF-17 | Feed da comunidade ordenado por data de publicação |
| RF-18 | Criação de post com até 250 caracteres e até 5 tags |
| RF-19 | Renderização de comentários e campo de novo comentário |
| RF-20 | Navegação global, sidebar e páginas 404 |
| RF-21 | Envio de Bearer token em rotas privadas e omissão em rotas públicas |
| RF-22 | Tratamento de erros, estados vazios e estados de carregamento |

---

## 4. Cenários de teste

| ID | Cenário | Requisitos | Casos de teste | Prioridade |
|---|---|---|---|---|
| CEN-01 | Cadastro e política de senha | RF-01, RF-02 | CT-AUT-01 a CT-AUT-04 | P1 |
| CEN-02 | Unicidade de e-mail e username reservado | RF-01, RF-03 | CT-AUT-05 a CT-AUT-06 | P1 |
| CEN-03 | Validação nativa do formulário de cadastro | RF-01 | CT-AUT-07 | P2 |
| CEN-04 | Login, sessão e autorização de requisições | RF-04, RF-21, RF-22 | CT-AUT-08 a CT-AUT-12 | P1 |
| CEN-05 | Perfil público e permissões de edição | RF-05, RF-08 | CT-PER-01 a CT-PER-06 | P1 |
| CEN-06 | Edição de username e bio | RF-06 | CT-PER-07 a CT-PER-12 | P1 |
| CEN-07 | Upload e recorte de imagens de perfil | RF-07 | CT-PER-13 a CT-PER-15 | P1 |
| CEN-08 | Gestão de listas personalizadas | RF-09 | CT-LIS-01 a CT-LIS-07 | P1 |
| CEN-09 | Jogos nas listas | RF-10 | CT-LIS-08 a CT-LIS-09 | P2 |
| CEN-10 | Catálogo de jogos e paginação | RF-11 | CT-JOG-01 a CT-JOG-03 | P1 |
| CEN-11 | Detalhe do jogo e avaliação Steam | RF-12, RF-13 | CT-JOG-04 a CT-JOG-09 | P1 |
| CEN-12 | Avaliação pessoal do jogo | RF-14 | CT-AVA-01 a CT-AVA-09 | P1 |
| CEN-13 | Listagem e paginação de notícias | RF-15 | CT-NOT-01 a CT-NOT-05 | P1 |
| CEN-14 | Detalhe da notícia | RF-16 | CT-NOT-06 a CT-NOT-09 | P1 |
| CEN-15 | Feed e criação de posts na comunidade | RF-17, RF-18, RF-19 | CT-COM-01 a CT-COM-12 | P1 |
| CEN-16 | Navegação, sessão e qualidade | RF-20, RF-21, RF-22 | CT-NAV-01 a CT-NAV-06 e CT-UTL-01 a CT-UTL-05 | P1/P2 |

---

## 5. Casos de teste

### 5.1 Autenticação e cadastro (CT-AUT)

| ID | Caso de teste | Requisito | Técnica | Prioridade | Resultado esperado |
|---|---|---|---|---|---|
| CT-AUT-01 | Cadastro com username, e-mail e senha válidos | RF-01, RF-02 | PE | P1 | `POST /api/users` retorna 2xx; a aplicação redireciona para `/login`; nenhum token ou usuário é salvo no `localStorage` (cadastro não autentica automaticamente). |
| CT-AUT-02 | Senha nos limites de 7, 8, 100 e 101 caracteres | RF-02 | AVL | P1 | 7 e 101 caracteres bloqueiam o envio com a mensagem "A senha não atende aos requisitos abaixo."; 8 e 100 caracteres, contendo as cinco classes, são aceitos. |
| CT-AUT-03 | Senha sem cada classe obrigatória: especial, número, maiúscula e minúscula | RF-02 | TD | P1 | Cada variação bloqueia o envio, exibe a mensagem de requisitos e marca como erro somente o item não atendido no checklist. |
| CT-AUT-04 | Checklist de senha atualiza durante a digitação | RF-02 | TM | P2 | As cinco regras mudam de pendente para atendida em tempo real; antes da primeira tentativa de envio, itens pendentes não são exibidos como erro. |
| CT-AUT-05 | Username reservado com variações de caixa e espaços | RF-03 | PE | P1 | `games`, `Games` e ` login ` bloqueiam o cadastro com "Esse nome é reservado pelo site. Escolha outro."; nenhuma requisição é enviada. |
| CT-AUT-06 | Cadastro com e-mail já existente (HTTP 409) | RF-01 | TN | P1 | Exibe "Este e-mail já está cadastrado. Faça login ou use outro e-mail."; o formulário permanece em `/signup` com os dados preenchidos. |
| CT-AUT-07 | Campos obrigatórios vazios e e-mail com formato inválido | RF-01 | TN | P2 | A validação nativa (`required` e `type=email`) impede o envio; nenhuma requisição é disparada. |
| CT-AUT-08 | Login com credenciais válidas | RF-04 | PE | P1 | `POST /auth/login` retorna 2xx; token e username são gravados em `@Luna:token` e `@Luna:user`; redireciona para `/{username}` e a sidebar exibe o usuário. |
| CT-AUT-09 | Login com e-mail inexistente ou senha incorreta (401/403) | RF-04, RF-22 | TN | P1 | Exibe "Email ou senha incorretos."; o usuário permanece em `/login` e pode tentar novamente. |
| CT-AUT-10 | Falha de conexão com a API no login ou cadastro | RF-22 | TN | P2 | Exibe "Erro de conexão. Tente novamente."; o formulário permanece utilizável. |
| CT-AUT-11 | Alternância de visibilidade da senha e links entre login e cadastro | RF-04 | TE | P3 | O botão show/hide alterna o tipo do campo entre `password` e `text`; os links navegam entre `/login` e `/signup`. |
| CT-AUT-12 | Envio do token JWT em rotas públicas e privadas | RF-21 | TI | P2 | `/auth/*` e `POST /api/users` não enviam `Authorization` mesmo com token salvo; `GET /api/users` e demais rotas enviam `Bearer {token}` quando há token. |

### 5.2 Perfil do usuário (CT-PER)

| ID | Caso de teste | Requisito | Técnica | Prioridade | Resultado esperado |
|---|---|---|---|---|---|
| CT-PER-01 | Exibir perfil de usuário existente | RF-08 | PE | P1 | `/{username}` responde 200 e renderiza banner, avatar, username, bio, seção de listas e seção de comentários. |
| CT-PER-02 | Perfil sem bio, avatar ou banner | RF-08 | TD | P2 | Exibe "sem descrição, ainda", avatar padrão e banner padrão, sem erro de imagem ou quebra de layout. |
| CT-PER-03 | Username codificado na URL, como `Eric%20Moreira` | RF-08 | AVL | P2 | O parâmetro é decodificado, o usuário é encontrado e o perfil é exibido em vez de 404. |
| CT-PER-04 | Perfil de username inexistente | RF-08 | TN | P1 | Renderiza a página 404 personalizada com a mensagem "Página não encontrada". |
| CT-PER-05 | Permissões de edição por tipo de visitante | RF-05 | TD | P1 | Visitante não vê controles de edição; usuário logado em perfil alheio também não; somente o dono vê o botão de edição e os controles de imagem. |
| CT-PER-06 | Dono inicia o modo de edição | RF-05 | TE | P1 | Username e bio viram campos editáveis no próprio local; avatar e banner abrem o seletor; ações de concluir e cancelar são exibidas; nada é enviado ao back ainda. |
| CT-PER-07 | Dono altera o username para um valor válido | RF-06 | PE | P1 | `PUT /api/users/{id}` é enviado; `@Luna:user` é atualizado; a rota muda para `/{novoUsername}` e a sidebar reflete o novo nome. |
| CT-PER-08 | Username vazio, somente espaços ou com espaço interno | RF-06 | TN | P1 | Vazio ou só espaços exibem "O username não pode ficar vazio."; espaço interno exibe "O username não pode ter espaço."; concluir é bloqueado com "Corrija o username antes de concluir." e nenhuma requisição é feita. |
| CT-PER-09 | Username igual a uma rota reservada, diferente do atual | RF-06, RF-03 | TD | P2 | Exibe "Esse nome é reservado pelo site. Escolha outro." e bloqueia o salvamento; se o username atual já for reservado (conta antiga), ainda é permitido salvar a bio. |
| CT-PER-10 | Username já em uso (409) ou não aplicado pelo back | RF-06, RF-22 | TN | P2 | 409 exibe "Esse username já está em uso."; resposta 2xx com o username antigo exibe "O servidor não aplicou o novo username."; permanece em edição com o rascunho intacto. |
| CT-PER-11 | Bio no limite de 255 caracteres | RF-06 | AVL | P2 | 255 caracteres são aceitos e persistidos; o campo limita a 255, impedindo o 256º caractere. |
| CT-PER-12 | Cancelar edição e concluir sem alterações | RF-06 | TE | P3 | Cancelar descarta textos e previews, volta ao modo leitura e não envia requisição; concluir sem mudanças apenas sai da edição, também sem requisição. |
| CT-PER-13 | Upload de avatar JPG/PNG e banner dentro dos limites | RF-07 | PE | P1 | Abre o recorte 1:1 para avatar e 16:5 para banner; gera preview local; o envio só ocorre ao concluir a edição; a imagem persiste no perfil após refresh e a saída fica em até 2 MB. |
| CT-PER-14 | Arquivo com formato não aceito ou acima de 10 MB | RF-07 | AVL | P1 | GIF, SVG ou PDF exibem "Formato inválido. Apenas JPG e PNG são aceitos."; arquivo acima de 10 MB exibe "Arquivo muito grande. O limite é 10MB."; nenhum preview é gerado. |
| CT-PER-15 | Imagem recortada acima de 2 MB ou falha ao salvar | RF-07, RF-22 | TN | P2 | Recorte acima de 2 MB após as três tentativas exibe "Mesmo recortada, a imagem passa de 2MB. Tente outra."; falha 401/403, 413 ou de rede mantém o modo edição, o rascunho e o preview, com mensagem específica e possibilidade de nova tentativa. |

### 5.3 Listas personalizadas (CT-LIS)

| ID | Caso de teste | Requisito | Técnica | Prioridade | Resultado esperado |
|---|---|---|---|---|---|
| CT-LIS-01 | Perfil sem listas | RF-09 | PE | P2 | Exibe a mensagem "{username} não tem nenhuma lista até o momento" e mantém a ação de criar lista visível. |
| CT-LIS-02 | Criar lista com nome válido | RF-09 | PE | P1 | `POST /api/lists` é enviado; exibe o alerta "Nova lista criada!"; o modal fecha e a lista aparece no perfil após atualização. |
| CT-LIS-03 | Criar ou renomear com nome vazio ou no limite de 50 caracteres | RF-09 | AVL | P1 | Nome vazio ou só espaços exibe "Dê um nome para a lista" e não envia requisição; 50 caracteres são aceitos e o campo impede o 51º. |
| CT-LIS-04 | Renomear lista existente | RF-09 | PE | P2 | `PATCH /api/lists/{id}` é enviado; o modal fecha e o novo nome é exibido após o refresh. |
| CT-LIS-05 | Renomear mantendo o mesmo nome | RF-09 | TD | P3 | O modal fecha sem chamada de API. |
| CT-LIS-06 | Excluir lista com confirmação e cancelar a exclusão | RF-09 | TE | P1 | O primeiro clique exibe o nome da lista e "Essa ação não pode ser desfeita"; "Deletar" remove via `DELETE` e fecha; "Voltar" mantém a lista. |
| CT-LIS-07 | Criar, renomear ou excluir sem token | RF-09, RF-22 | TN | P2 | Exibe "Você precisa estar logado"; nenhuma chamada de escrita é feita e o modal permanece aberto. |
| CT-LIS-08 | Adicionar jogo às listas padrão e customizada | RF-10 | PE | P1 | Logado, os botões Quero Jogar, Jogando e Jogado e a lista custom enviam o jogo; exibe o alerta `Jogo adicionado na lista "{nome}"`; a lista custom é atualizada no modal. |
| CT-LIS-09 | Ações de lista para usuário deslogado | RF-10 | TD | P2 | Os botões de adicionar a listas não são renderizados no card do jogo. |

### 5.4 Catálogo e detalhes de jogos (CT-JOG)

| ID | Caso de teste | Requisito | Técnica | Prioridade | Resultado esperado |
|---|---|---|---|---|---|
| CT-JOG-01 | Catálogo de jogos na primeira página | RF-11 | PE | P1 | `/games` exibe 25 jogos lançados, com imagem, nome e até três tags; skeletons aparecem durante o carregamento; jogos com a tag Hentai são excluídos. |
| CT-JOG-02 | Paginação com `page` 0, 1, negativo e não numérico | RF-11 | AVL | P2 | `page=0` não mostra "Anterior" e "Próximo" aponta para `?page=1`; `page=1` mostra "Anterior"; `-5` e `abc` são normalizados para 0. |
| CT-JOG-03 | Falha ao carregar o catálogo | RF-11, RF-22 | TN | P2 | A página não quebra e exibe "Nenhum jogo encontrado no momento."; sidebar e paginação continuam renderizando. |
| CT-JOG-04 | Abrir o card de um jogo | RF-12 | PE | P1 | Navega para `/games/{appId}` com banner, nome, gêneros e categorias, descrição, seção de avaliação, compra e comentários. |
| CT-JOG-05 | appId inválido ou inexistente | RF-12 | TN | P1 | Renderiza a página 404 específica com a mensagem "Jogo não encontrado". |
| CT-JOG-06 | "Onde comprar" para jogo pago, grátis e sem preço | RF-12 | TD | P2 | Pago exibe o preço final formatado e link para a Steam; gratuito exibe "Grátis" com link; sem preço e não gratuito não exibe botão. |
| CT-JOG-07 | Avaliação geral da Steam e estrelas | RF-13 | AVL | P2 | A nota é positivas dividido por total, multiplicada por 10 e arredondada em uma casa; 80/100 exibe 8 e quatro estrelas cheias; 90/100 exibe 9 e 4,5 estrelas. |
| CT-JOG-08 | Jogo sem avaliações ou falha na API de reviews | RF-13, RF-22 | AVL | P2 | Com zero avaliações ou erro, a nota não exibe valor inválido e as estrelas ficam vazias; o restante da página continua renderizando. |
| CT-JOG-09 | Descrição longa e metadados do jogo | RF-12 | TE | P3 | "Ver mais" expande e recolhe a descrição HTML; o título da aba, a descrição com gêneros e a imagem de compartilhamento usam os dados do jogo. |

### 5.5 Avaliação pessoal do jogo (CT-AVA)

| ID | Caso de teste | Requisito | Técnica | Prioridade | Resultado esperado |
|---|---|---|---|---|---|
| CT-AVA-01 | Visitante clica em "Adicione uma nota" | RF-14 | TD | P1 | Redireciona para `/login` e não abre o modal de avaliação. |
| CT-AVA-02 | Estados de carregamento, nota inexistente e nota existente | RF-14, RF-22 | TI | P2 | Durante o `GET /ratings/games/{appId}/me` exibe skeleton; 204 exibe "Adicione uma nota"; 200 exibe o card "Pessoal" com a nota e o botão "Editar Nota". |
| CT-AVA-03 | Salvar nota 8,5 | RF-14 | PE | P1 | O modal abre com "Sua nota para {jogo}"; o `PUT /ratings/games/{appId}` envia `score` 8.5; em sucesso o modal fecha e o card exibe 8,5. |
| CT-AVA-04 | Aceitar vírgula ou ponto e arredondar para uma casa | RF-14 | PE, AVL | P2 | "8,5" e "8.5" resultam em 8.5; "8,55" resulta em 8.6; a exibição usa uma casa decimal. |
| CT-AVA-05 | Limites válidos 0 e 10 | RF-14 | AVL | P1 | 0 e 10 são aceitos, salvos e exibidos corretamente. |
| CT-AVA-06 | Nota fora do intervalo, texto ou campo vazio | RF-14 | AVL, TN | P1 | "-0,1", "10,1" e "abc" exibem "Digite uma nota entre 0 e 10 (ex: 8,5)." e desabilitam "Salvar nota"; campo vazio mantém o botão desabilitado sem alerta. |
| CT-AVA-07 | Editar nota existente | RF-14 | TE | P2 | O modal inicia com o valor atual; salvar substitui a nota anterior e o card é atualizado, sem criar duplicata. |
| CT-AVA-08 | Remover nota | RF-14 | TE | P1 | "Remover nota" aparece somente quando há nota; o `DELETE` remove o registro e a seção volta ao botão "Adicione uma nota". |
| CT-AVA-09 | Erro ao salvar ou remover nota | RF-14, RF-22 | TN | P2 | Exibe "Não foi possível salvar a nota. Verifique sua conexão e tente novamente."; o modal permanece aberto e permite nova tentativa. |

### 5.6 Notícias (CT-NOT)

| ID | Caso de teste | Requisito | Técnica | Prioridade | Resultado esperado |
|---|---|---|---|---|---|
| CT-NOT-01 | Listar notícias na primeira página | RF-15 | PE | P1 | `/news` exibe até 10 notícias com imagem e título, ordenadas por `publishedAt` decrescente; cada card aponta para `/news/{id}?page=N`. |
| CT-NOT-02 | Filtrar notícias inválidas | RF-15 | PE | P2 | Notícias sem imagem, sem URL ou com título "[Removed]" não são exibidas, mesmo que a API as retorne. |
| CT-NOT-03 | Navegar pela paginação de notícias | RF-15 | AVL | P1 | Exibe primeira, anterior, página atual, próxima e última quando aplicáveis; usa elipse em lacunas; a página atual recebe `aria-current="page"`; as URLs usam `/news?page=N`. |
| CT-NOT-04 | Parâmetro `page` inválido e total de páginas menor ou igual a 1 | RF-15 | AVL | P2 | `page=0`, `-3` ou `abc` resultam na página 1; quando `totalPages` é menor ou igual a 1, a paginação não é renderizada. |
| CT-NOT-05 | Erro na API ou nenhuma notícia válida | RF-15, RF-22 | TN | P2 | Exibe "Nenhuma notícia encontrada no momento."; a página não quebra e a paginação fica oculta. |
| CT-NOT-06 | Abrir notícia pelo card | RF-16 | PE | P1 | Navega para `/news/{idBase64}?page=N` e exibe imagem, título, metadados, descrição e link "Ler matéria completa em {fonte}". |
| CT-NOT-07 | id inválido ou notícia fora da página informada | RF-16 | TN | P1 | Base64 que não decodifica para uma URL `http` ou matéria ausente na página resultam em 404. |
| CT-NOT-08 | Formatação do conteúdo e link externo | RF-16 | PE | P2 | Data em português no formato longo; metadados com autor, fonte e data, omitindo valores ausentes; link externo abre em nova aba com `rel="noopener noreferrer"`; imagens usam `referrerPolicy="no-referrer"`. |
| CT-NOT-09 | Metadados e indisponibilidade da NEWS_API_KEY | RF-16, RF-22 | TC | P3 | Título, descrição e OpenGraph da matéria são gerados; sem a chave, o servidor registra erro e a lista é exibida vazia com a mensagem de estado vazio. |

### 5.7 Comunidade e posts (CT-COM)

| ID | Caso de teste | Requisito | Técnica | Prioridade | Resultado esperado |
|---|---|---|---|---|---|
| CT-COM-01 | Feed da comunidade ordenado e card completo | RF-17 | PE | P1 | `/community` lista posts do mais recente ao mais antigo; cada card exibe autor ou "Usuário", avatar padrão quando ausente, até três tags mais "+N", conteúdo e link "Comentar". |
| CT-COM-02 | Abrir post e tratar post inexistente | RF-17 | PE, TN | P1 | Clicar no card abre `/community/{id}` com o post e a seção de comentários; id inexistente renderiza 404. |
| CT-COM-03 | Feed vazio ou falha na API | RF-17, RF-22 | TN | P2 | Exibe um estado vazio ou de erro amigável com possibilidade de nova tentativa; atualmente a página fica sem posts e sem mensagem (ver D-05). |
| CT-COM-04 | Botão de criar post para visitante | RF-18 | TD | P2 | Sem usuário autenticado, o botão "Fazer um post" e o modal não são renderizados. |
| CT-COM-05 | Abrir e fechar o modal de post | RF-18 | TE | P2 | O botão abre o dialog com título "Fazer um post"; Cancelar, Esc ou clique fora fecham; ao reabrir, conteúdo, tags e erro estão limpos. |
| CT-COM-06 | Publicar post vazio ou no limite de 250 caracteres | RF-18 | AVL | P1 | Vazio ou só espaços exibe "Content cannot be empty" e não envia requisição; 250 caracteres são aceitos e o campo impede o 251º. |
| CT-COM-07 | Publicar post válido | RF-18 | PE | P1 | `POST api/post` é enviado com conteúdo trim, `tagIds` e Bearer; em sucesso o modal fecha, o feed atualiza e o post aparece no topo. |
| CT-COM-08 | Selecionar e remover até cinco tags | RF-18 | AVL | P2 | Contador vai de 0/5 a 5/5; sugestões aparecem a partir da digitação, limitadas a 8; a busca ignora acentos e caixa; tag selecionada não é sugerida novamente; no limite o input é desabilitado com "Máximo de 5 tags"; clicar no chip remove a tag. |
| CT-COM-09 | Tags excluídas e duplicadas no seletor | RF-18 | PE | P3 | A tag "Hentai" (id 9130) e nomes duplicados não são listados; tags já selecionadas não aparecem nas sugestões. |
| CT-COM-10 | Publicar sem token ou com falha da API | RF-18, RF-22 | TN | P2 | Sem token exibe "Você precisa estar logado"; erro da API exibe mensagem e mantém o modal aberto. Atualmente o serviço retorna `null` e o modal fecha sem feedback (ver D-03 e D-04). |
| CT-COM-11 | Comentários na página do post | RF-19 | TI | P2 | Exibe o título "Comentários", o campo "Escreva aqui..." e a lista de comentários; atualmente a lista é mockada e o envio não persiste (ver D-02). |
| CT-COM-12 | Link "Comentar" e âncora da seção | RF-17, RF-19 | PE | P3 | No feed o link leva a `/community/{id}#comments`; na página do post leva a `#comments`, rolando até a seção. |

### 5.8 Navegação, sessão e qualidade (CT-NAV)

| ID | Caso de teste | Requisito | Técnica | Prioridade | Resultado esperado |
|---|---|---|---|---|---|
| CT-NAV-01 | Redirecionamento da raiz e links da sidebar | RF-20 | PE | P1 | `/` redireciona para `/games`; Notícias, Jogos e Comunidade navegam para `/news`, `/games` e `/community`; o logo permanece visível. |
| CT-NAV-02 | Sidebar para visitante e usuário logado | RF-20, RF-04 | TD | P1 | Sem sessão exibe "Entrar", que leva a `/login`; com sessão exibe nome e avatar (ou padrão), com link para `/{username}`. |
| CT-NAV-03 | Token presente com usuário inválido ou API indisponível | RF-04, RF-22 | TN | P2 | O carregamento do usuário falha ou não encontra o registro; a UI trata como deslogado, exibe "Entrar" e não quebra a página. |
| CT-NAV-04 | Atualização de perfil reflete na sidebar | RF-06, RF-20 | TI | P2 | Após salvar o perfil, o evento `luna:profile-updated` recarrega o usuário e a sidebar exibe nome e avatar novos sem recarregar a página manualmente. |
| CT-NAV-05 | URL inexistente | RF-20 | TN | P2 | Renderiza a página 404 personalizada com a mensagem "Página não encontrada", sidebar e ilustração, sem quebrar o layout. |
| CT-NAV-06 | Build, tipos e lint | RF-22 | TR | P2 | `next build`, `tsc --noEmit` e `biome check` concluem sem erros bloqueantes; eventuais avisos ficam documentados. |

### 5.9 Utilitários e regras de domínio (CT-UTL)

| ID | Caso de teste | Requisito | Técnica | Prioridade | Resultado esperado |
|---|---|---|---|---|---|
| CT-UTL-01 | Matriz de `isPasswordValid` | RF-02 | AVL, TD | P1 | Retorna `true` somente com 8 a 100 caracteres e as cinco classes; `Aa1@bcde` (8) é válida, 7 e 101 são inválidas, e a ausência de qualquer classe invalida a senha. |
| CT-UTL-02 | `isReservedUsername` com caixa e espaços | RF-03 | PE | P1 | Retorna `true` para `games`, `Games `, `login` e `_next`; retorna `false` para `player_teste`. |
| CT-UTL-03 | Codificação e decodificação de id de notícia | RF-16 | PE | P2 | `encodeNewsId` e `decodeNewsId` fazem round-trip da URL original; base64 inválido ou texto que não começa com `http` retorna `null`. |
| CT-UTL-04 | `getErrorMessage` com diferentes formatos de erro | RF-22 | PE | P3 | Retorna a string do corpo quando existir; senão `data.message`; senão o fallback informado. |
| CT-UTL-05 | `cropImageToFile` para avatar e banner | RF-07 | TI | P2 | Gera arquivo JPG ou PNG com largura máxima de 512 para avatar e 1920 para banner, preserva a proporção e garante saída de até 2 MB; se todas as tentativas excederem, lança `image-too-large`. |

---

## 6. Defeitos e lacunas identificadas na análise

| ID | Descrição | Impacto | Prioridade |
|---|---|---|---|
| D-01 | Projeto sem suíte de testes automatizados; `package.json` não possui script `test` e o README mantém "a decidir" | Regressões dependem de teste manual; sugere-se Vitest + Testing Library para unidade/componente e Playwright para E2E | P1 |
| D-02 | `CommentSection` usa comentários mockados e o input não possui formulário ou handler de envio | RF-19 incompleto; comentário digitado não é publicado nem persistido | P1 |
| D-03 | `createPost` e `createCustomList` capturam a exceção e retornam `null`; os hooks tratam a chamada como sucesso e fecham o modal | Falha de API é silenciosa; usuário acredita que publicou/criou quando não houve persistência | P1 |
| D-04 | Fallback de erro ao criar post é "Não foi possível criar a lista" (`usePostModal`) | Mensagem incorreta em caso de erro | P2 |
| D-05 | `/community` não possui estado vazio nem mensagem de erro quando `getPosts` retorna `null` | Tela fica em branco sem orientação ao usuário | P2 |
| D-06 | Paginação de jogos sempre exibe "Próximo", inclusive na última página | Permite navegar para página além do fim e cair em estado vazio | P2 |
| D-07 | Adicionar jogo a uma lista padrão inexistente apenas registra `console.error` | Usuário não recebe feedback da falha | P2 |
| D-08 | Não existe logout nem invalidação local da sessão | Token expirado só é percebido em chamadas seguintes; não há como encerrar sessão pela UI | P2 |
| D-09 | Serviços enviam `Authorization` manualmente e o interceptor anexa novamente o token | Redundância e risco de conflito de headers | P3 |
| D-10 | `getUserByUsername` baixa todos os usuários e filtra no cliente | Custo desnecessário e baixa escalabilidade | P2 |
| D-11 | O front-end do cadastro não bloqueia username com espaço, mas a edição de perfil bloqueia | Regra inconsistente entre criação e manutenção da conta | P2 |

---

## 7. Estratégia de execução sugerida

1. **Smoke test (P1):** CT-AUT-08, CT-PER-01, CT-PER-06, CT-PER-13, CT-LIS-02, CT-JOG-01, CT-JOG-04, CT-AVA-03, CT-NOT-01, CT-NOT-06, CT-COM-01, CT-COM-07, CT-NAV-01.
2. **Regressão:** todos os casos P1 e P2 das áreas alteradas no pull request.
3. **Completa:** P3 e testes exploratórios de responsividade, teclado e leitores de tela.
4. **Automação recomendada:**
   - Unitários/componentes: `isPasswordValid`, `getPasswordRules`, `isReservedUsername`, `encodeNewsId`/`decodeNewsId`, `getErrorMessage`, `cropImageToFile` e `RatingModal`.
   - E2E: cadastro, login, edição de perfil, criação de lista, avaliação de jogo, criação de post e paginação de notícias.
