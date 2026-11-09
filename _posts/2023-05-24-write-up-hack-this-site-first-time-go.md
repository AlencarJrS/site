---
title: "Write-up – Hack This Site – First Time Go"
description: "Recuperação de arquivos excluídos de uma imagem de disco com Autopsy no desafio First Time Go."
date: "2023-05-24 22:21:16 -0300"
original_updated_at: "2023-05-29T08:49:05-03:00"
author: "Alencar Silva"
category: "Forensics"
original_title: "Write-up – Hack this Site – First time go"
---

> Republicado a partir da [captura do artigo original na Wayback Machine](https://web.archive.org/web/20240414234508/https://alencarjunior.com.br/index.php/2023/write-up-hack-this-site-first-time-go/). A captura consultada preservou o texto e as legendas, mas 20 imagens do corpo estão indisponíveis.

![Imagem de capa]({{ '/assets/posts/write-up-hack-this-site-first-time-go/capa-hack-this-site-1.webp' | relative_url }})

Olá, tudo bem? Seguindo recomendação do meu amigo Squ4nch <https://squ4nch.github.io/>, tive o primeiro contato com o site Hack This Site: www.hackthissite.org e explorei o primeiro desafio forense.

> *Legenda original: Resumo do desafio.*

Na introdução do desafio temos um breve texto sobre o desafio, resumindo, o contratante perdeu seus dados salvos em um flashdrive ou algo assim e precisa que você recupere um arquivo específico que contém uma senha, então temos um arquivo disponível para download **“image.tar.gz”**.

## Preparação da imagem no Autopsy

Descompactando o conteúdo temos o arquivo “image.dd”. Este é um padrão comum para criação de imagem de disco.

> *Legenda original: Imagem para análise*

Para analisar a imagem vou utilizar o Autopsy, uma ferramenta de análise Forense muito conhecida, que já tem a função de recuperação de arquivos.

Crio um novo caso, selecionando a imagem DD.

> *Legenda original: Criando novo caso no Autopsy*

Configuro as informações básicas do caso.

> *Legenda original: Selecionando o diretório do caso*

Após criado projeto, importo a imagem DD.

> *Legenda original: Selecionando o data source para importar a imagem dd.*

> *Legenda original: Selecionando a imagem dd do desafio.*

Mantenho as configurações de ingest para processamento default.

> *Legenda original: Módulos habilitados do Autopsy*

Pronto, agora podemos analisar os arquivos.

> *Legenda original: Configuração do novo caso finalizada*

## Recuperação de arquivos excluídos

O Autopsy por padrão já faz o processo de ***file carving*** ou ***data carving*** que é o processo de recuperação e reconstrução de arquivos modificados ou apagados, esse processo é essencial para análise forense.

Acessando o submenu **“Deleted Files”**, vamos encontrar os arquivos que a ferramenta conseguiu recuperar.

> *Legenda original: Módulo de arquivos apagados do Autopsy*

De cara já encontramos o arquivo citado pelo contratante, “***Your new password is.rar***“

> *Legenda original: Arquivo alvo “Your new password is.rar”*

O Autopsy executa uma pré análise e informa que o arquivo é protegido por senha, então o desafio será encontrar essa senha.

> *Legenda original: Arquivo protegido por senha.*

Também é possível encontrar um arquivo docx, que contém uma notificação de desligamento e um arquivo de áudio, **.wav.**

> *Legenda original: Arquivo de aúdio*

> *Legenda original: Notificação de desligamento do colaborador*

Foi a primeira vez que me deparei com arquivo de áudio em desafio forense, então fiquei curioso.

## Extração do áudio e resolução do desafio

Realizei a extração do áudio e do arquivo contendo a senha.

> *Legenda original: Extraindo arquivo de áudio*

> *Legenda original: Extraindo arquivo .rar contendo a possível senha.*

> *Legenda original: Arquivos extraídos*

Escutando o áudio já foi possível matar o desafio, ouvimos a voz de um homem dizendo que respondendo a solicitação está encaminhando um documento com uma nova **key** e que a senha é o número de telefone do contratante.

Então vamos a procura do número de telefone do contratante, temos as informações dele na notificação de desligamento.

> *Legenda original: Numero de telefone*

Então agora vamos para o arquivo .rar, abrindo o arquivo podemos visualizar que existe um arquivo docx dentro do zip.

Tentando abrir ele solicita senha.

Inserindo o número sem os separadores conseguimos acessar o arquivo e chegamos a flag do desafio.

gg!

> *Legenda original: Flag*

Curti o desafio, foi curto mas foi um pouco diferente do convencional.

Até!
