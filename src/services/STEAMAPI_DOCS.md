[benhurk](https://github.com/benhurk/IStoreQueryService-Query-v1-Documentation) - descreve o que ele testou na prática

[xPaw](https://steamapi.xpaw.me/IStoreQueryService) - extraído dos protobufs da Steam. 

**Nada disso é oficialmente documentado**

---

# `IStoreQueryService/Query/v1`

```
GET https://api.steampowered.com/IStoreQueryService/Query/v1/?key={KEY}&input_json={JSON_URLENCODED}
```

> Mesmo que nas documentações oficiais e não oficiais exigam uma chave, não colocar ela também funciona

O endpoint retorna dados filtrados da loja para até 1000 apps por requisição. O `input_json` precisa estar codificado como URI. Os campos de nível raiz são `query_name`, `query`, `context`, `data_request` e `override_country_code`.

## 1. Raiz do `input_json`

| Campo                   | Tipo   | Descrição                                                                |
|-------------------------|--------|--------------------------------------------------------------------------|
| `query_name`            | string | Nome descritivo, usado só em logs e métricas da Steam.                   |
| `query`                 | objeto | Paginação, ordenação e filtros (seção 2).                                |
| `context`               | objeto | Idioma e país (seção 4).                                                 |
| `data_request`          | objeto | Quais dados retornar por item (seção 5). Sem ele, só os `appids` voltam. |
| `override_country_code` | string | Código de país com 2 letras para puxar dados de outra região.            |

## 2. `query`

| Campo     | Tipo       | Descrição                                             |
|-----------|------------|-------------------------------------------------------|
| `start`   | int        | Índice inicial, usado como offset de paginação.       |
| `count`   | int        | Quantidade de itens. O padrão é 10 e o máximo é 1000. |
| `sort`    | int (enum) | Critério de ordenação.                                |
| `filters` | objeto     | Filtros (seção 3).                                    |

**Valores de `sort` confirmados:** 1 = ordem alfabética, 2 = `appid` crescente, 20 = mais recentes, 21 = percentual de avaliações positivas (decrescente). Outros valores existem no enum, mas não encontrei documentação deles.

## 3. `query.filters`

### Básicos
| Campo              | Tipo | Descrição                      |
|--------------------|------|--------------------------------|
| `released_only`    | bool | Só apps já lançados.           |
| `coming_soon_only` | bool | Só apps com lançamento futuro. |

### `type_filters` (tipos de item)
Todos são booleanos: `include_apps`, `include_packages`, `include_bundles`, `include_games`, `include_demos`, `include_mods`, `include_dlc`, `include_software`, `include_video`, `include_hardware`, `include_series`, `include_music`.

Campos relacionados no mesmo nível de `filters`:
- `dlc_for_appid` (uint): retorna só DLCs de um app específico.
- `exclude_from` (int[], enum): valores não documentados.

### Tags
| Campo               | Tipo     | Descrição                                                                                             |
|---------------------|----------|-------------------------------------------------------------------------------------------------------|
| `tagids_exclude`    | int[]    | Remove apps que tenham qualquer uma dessas tags.                                                      |
| `tagids`            | int[]    | Presente no schema. Não achei descrição do comportamento (provavelmente "qualquer uma"), então teste. |
| `tagids_must_match` | objeto[] | Exige tags. Veja o formato abaixo.                                                                    |

O formato de `tagids_must_match` é peculiar. Cada objeto `tagids` só pode ter 1 tag; para exigir várias, você passa vários objetos:

```json
"tagids_must_match": [{ "tagids": ["1628"] }, { "tagids": ["1664"] }]
```

Isso se comporta como **AND** entre os objetos. Pelo schema, cada objeto aceita um array, mas a documentação comunitária diz que só funciona com 1 id por objeto. Teste antes de depender de **OR** dentro de um objeto.

### Preço (`price_filters`)
| Campo                  | Tipo |
|------------------------|------|
| `only_free_items`      | bool |
| `exclude_free_items`   | bool |
| `min_discount_percent` | int  |

### Data de lançamento (`release_date_filter`)
| Campo               | Tipo       | Observação                    |
|---------------------|------------|-------------------------------|
| `release_date_type` | int (enum) | Valores não documentados.     |
| `start_date`        | int        | Provavelmente Unix timestamp. |
| `end_date`          | int        | Provavelmente Unix timestamp. |

### Descritores de conteúdo
| Campo                            | Tipo         | Descrição                          |
|----------------------------------|--------------|------------------------------------|
| `content_descriptors_must_match` | int[] (enum) | Exige esses descritores.           |
| `content_descriptors_excluded`   | int[] (enum) | Exclui apps com esses descritores. |

Os IDs de descritores não aparecem nas fontes que li. Pelo que lembro, são 1 (nudez/sexual leve), 2 (violência/gore frequente), 3 (conteúdo sexual exclusivo adulto), 4 (nudez/sexual frequente) e 5 (conteúdo maduro geral), mas **confirme antes de usar**. Há um serviço `IAppContentDescriptorService` na lista do xPaw que pode listá-los.

### Promoções (`discounted_dates_filter`)
`start_date` (uint), `end_date` (uint), `allow_partial_overlap` (bool).

### Compatibilidade (`compatibility_filter`)
`device` (int, enum) e `categories` (int[], enum). Os valores não estão documentados.

### Rankings de vendas
| Campo                              | Descrição                                        |
|------------------------------------|--------------------------------------------------|
| `global_top_n_sellers`             | Top N mais vendidos globalmente.                 |
| `regional_top_n_sellers`           | Top N mais vendidos na região do `country_code`. |
| `global_long_term_top_n_sellers`   | Top N global de longo prazo.                     |
| `regional_long_term_top_n_sellers` | Top N regional de longo prazo.                   |

### Outros
- `language_preferences` (int[]): preferências de idioma dos itens.
- `predefined_filter.filter_type` (int, enum): filtros pré-definidos da própria loja.
- `parent_appids` (uint[]).
- `store_page_filter`: espelha os filtros de páginas da loja (`sale_filter`, `content_hub_filter` com `hub_type`, `hub_category`, `hub_tagid`, `discount_filter` etc.). Parece voltado a páginas de hub e promoção, e eu não testaria sem necessidade.

## 4. `context`

| Campo          | Tipo   | Descrição                                                          |
|----------------|--------|--------------------------------------------------------------------|
| `language`     | string | Nome do idioma (você já usa `"brazilian"`).                        |
| `elanguage`    | int    | ID numérico do idioma. O padrão é 0 (inglês).                      |
| `country_code` | string | Ex.: `BR`, `US`. Parece não afetar dados como avaliações ou preço. |

## 5. `data_request`

Todos são opcionais. Habilite só o que for usar, pois quanto mais itens, maior o payload.

| Campo                                      | Tipo   | Observação                                                                    |
|--------------------------------------------|--------|-------------------------------------------------------------------------------|
| `include_basic_info`                       | bool   | Nome, descrição curta, desenvolvedores etc.                                   |
| `include_assets`                           | bool   | URLs das imagens (header, capsule etc.).                                      |
| `include_release`                          | bool   | Dados de lançamento.                                                          |
| `include_platforms`                        | bool   | Windows/Mac/Linux, Steam Deck.                                                |
| `include_all_purchase_options`             | bool   | Todas as opções de compra.                                                    |
| `include_best_purchase_option`             | bool   | Só a melhor opção (preço/desconto).                                           |
| `include_screenshots` / `include_trailers` | bool   | Mídia.                                                                        |
| `include_ratings`                          | bool   | Avaliações.                                                                   |
| `include_reviews`                          | bool   | Dados de reviews.                                                             |
| `include_tag_count`                        | int    | Quantas tags incluir; se omitido, nenhuma tag é retornada.                    |
| `include_supported_languages`              | bool   | Idiomas suportados.                                                           |
| `include_full_description`                 | bool   | Descrição completa.                                                           |
| `include_included_items`                   | bool   | Itens de bundles/pacotes.                                                     |
| `included_item_data_request`               | objeto | Mesmo schema, aplicado aos itens incluídos.                                   |
| `include_links`                            | bool   | Links.                                                                        |
| `include_extra_details`                    | bool   | Detalhes extras.                                                              |
| `include_assets_without_overrides`         | bool   | Assets sem sobrescritas.                                                      |
| `apply_user_filters`                       | bool   | Aplica filtros de preferências do usuário (provavelmente exige autenticação). |

## 6. Pontos de atenção

1. **`filter` vs `filters`:** o README do benhurk escreve `filter`, mas o schema do xPaw e o seu código funcionando usam `filters`. Siga o schema.
2. **A tabela do xPaw é "achatada":** os campos `↳` aparecem todos no mesmo nível visual. A hierarquia que montei acima é inferida pelos nomes dos tipos (`CStoreQueryFilters_PriceFilters` etc.).
3. **Enums sem valores:** `exclude_from`, `release_date_type`, `device`, `categories` e `filter_type` aparecem como enum, mas sem os valores listados. O jeito mais confiável de descobri-los é abrir `store.steampowered.com/search`, aplicar o filtro desejado e ver o payload na aba **Network** (o mesmo método que sugeri antes).
4. **Endpoint instável:** por não ser documentado, a Steam pode mudar campos sem aviso. Encapsule a montagem da query em um único módulo (um *query builder*) para ter um só ponto de manutenção.
5. **Chave de API:** o README exige `key` na URL. Mantenha-a no servidor (Server Component, Route Handler ou seu Spring Boot), nunca no bundle do cliente.

---

**Dica para os estudos:** projetar um *query builder* tipado como esse é um exercício muito bom, porque é o padrão **Builder** aplicado a um problema real. 