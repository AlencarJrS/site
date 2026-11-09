# Template Jekyll

Estrutura inicial de um blog estático com Jekyll.

## Artigos

Crie um arquivo Markdown em `_posts/` com o nome `AAAA-MM-DD-titulo.md`. Use a data original de publicação no nome do arquivo. No início do arquivo, declare o título:

```markdown
---
title: "Título do artigo"
---

Texto do artigo em Markdown.
```

O Jekyll gera a página do artigo e o inclui no arquivo de publicações. O campo opcional `description` adiciona um resumo.

## Desenvolvimento

Com Ruby 3.3 e Bundler, execute `bundle install` e `bundle exec jekyll build`. O resultado fica em `_site/`.
