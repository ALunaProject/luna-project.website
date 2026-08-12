# Design System

## Como usar

```scss
@use "base" as *; // importa variables + mixins de uma vez
```

## Cores

```scss
// Tons principais (sem sufixo = tom base da paleta)
$blue-violet, $pure-blue, $pantie-blue, $blue-sky,
$green-grass, $gold-yellow, $mclaren-orange, $clockwork-orange, $bloody-red

// Escala: quanto maior o número, mais escuro
color: $blue-violet-700; // -100 (claro) até -1200 (escuro)

// Neutros e cinzas
$neutrals-white, $neutrals-black
$gs-eire-black, $gs-gunmetal, $gs-slate-gray, $gs-white-smoke...
```

## Gradientes

```scss
background: $gradient-brand-primary;         // CTAs, banners
background: $gradient-heading-primary;       // Títulos
background: $gradient-card-active-primary;   // Card ativo (roxo)
background: $gradient-card-active-secondary; // Card ativo (laranja)
```

## Tipografia

```scss
// Sempre via mixin — nunca declarar font-family/weight/size na mão
@include poppins-regular-base;   // texto padrão
@include poppins-semibold-xl;    // destaque
@include poppins-semibold-5-5xl; // hero/título grande
@include abeezee-lg;             // fonte alternativa
```

Padrão: `{familia}-{peso}-{tamanho}` → família (`poppins`/`abeezee`) + peso (`thin`/`light`/`regular`/`semibold`/`bold`) + tamanho (`xs` → `9xl`).

## Sombras & Efeitos

```scss
box-shadow: $shadow-card;            // card padrão
box-shadow: $shadow-focused;         // input/card em foco
box-shadow: $shadow-hover-primary;   // hover roxo
@include glass-effect;               // vidro fosco
@include title-blur-effect;          // glow atrás de título
```

## Regras

1. **Nunca hardcode** cor, sombra, gradiente ou fonte no componente — sempre use a variável/mixin.
2. **Inexistência de um valor:** Adicione em `_variables.scss` primeiro, seguindo o padrão de nome já existente, antes de usar.
3. **Novo estilo de texto:** Crie o mixin em `_mixins.scss`, nunca inline no componente.