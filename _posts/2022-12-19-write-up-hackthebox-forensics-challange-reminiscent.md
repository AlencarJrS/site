---
title: "Write-up – Hack The Box – Reminiscent"
description: "Análise de memória no desafio Reminiscent do Hack The Box, com Volatility e CyberChef."
date: "2022-12-19 19:15:12 -0300"
original_updated_at: "2023-01-20T10:06:25-03:00"
author: "Alencar Silva"
category: "Forensics"
original_title: "Write-up – HackTheBox – Reminiscent"
---

> Republicado a partir da [captura do artigo original na Wayback Machine](https://web.archive.org/web/20240414234509/https://alencarjunior.com.br/index.php/2022/write-up-hackthebox-forensics-challange-reminiscent/). A captura consultada preservou o texto e as legendas, mas 13 imagens do corpo estão indisponíveis.

![Imagem de capa]({{ '/assets/posts/write-up-hackthebox-forensics-challange-reminiscent/Capa-Forense-1.webp' | relative_url }})

Olá, como aspirante a investigador forense em CTF’s e Challenges deixo aqui os passos que utilizei para a resolução do desafio Reminiscent, do Hack The Box: <https://app.hackthebox.com/>

> *Legenda original: Tráfego suspeito foi detectado no PC virtual de um recrutador. Um dump de memória da VM ofensiva foi capturado antes de ser removido da rede para geração de imagens e análise. Nosso recrutador mencionou que recebeu um e-mail de alguém sobre seu currículo. Uma cópia do e-mail foi recuperada e é fornecida para referência. Encontre e decodifique a origem do malware para encontrar a flag.*

Usei o [Volatility](https://github.com/volatilityfoundation/volatility) para analisar a memória.

## Artefatos e perfil de memória

Após executar o download e descompactar o arquivo, foi possível encontrar 3 arquivos:

Um email **“Resume.eml**” , um arquivo de texto **“imageinfo.txt”** e um arquivo ELF **“flounder-pc-memdump.elf”** que é o dump de memória que vamos analisar.

*Arquivos do desafio* descompactados.

O arquivo “imageinfo.txt” já poupa nosso tempo informando qual é o perfil recomendado para análise do dump de memória “Win7SP1x64”.

Lendo o e-mail, conseguimos informações que podem ajudar na investigação, a vítima recebeu um e-mail contendo um link com descrição .zip, é uma estratégia comum em e-mails de phishing, também encontramos um endereço IP privado (**10.10.99.55**), que pode auxiliar na investigação.

> *Legenda original: E-mail recolhido para análise*

> *Legenda original: Lendo o arquivo de e-mail com o comando cat*

## Processos e conexões de rede

Eu gosto sempre de começar a análise de memória, visualizando os processos do sistema, utilizando os comandos **pslist** e **pstree**.

Neste caso, logo de início, já é possível identificar um **PowerShell** sendo executado, que no contexto de usuário não costuma ser comum.

```sh
volatility -f flounder-pc-memdump.elf --profile=Win7SP1x64 pstree
```

> *Legenda original: Árvore de processos rodando no Sistema*

Hmmm, análise… O que é interessante é que o **powershell** é processo filho do **explorer.exe**.

Utilizando o comando **netscan**, é possível identificar que através do processo powershell, ocorreu comunicação com o IP malicioso encontrado no e-mail, indicando que o usuário possa ter clicado no link malicioso.

> *Legenda original: Conexões de rede ativas e inativas da máquina*

## Extração de arquivos e decodificação

Na sequência, iniciei a busca por arquivos com a palavra **“resume”** referente ao conteúdo do e-mail sobre currículo, foi possível encontrar 2 arquivos,

```sh
volatility -f flounder-pc-memdump.elf --profile=Win7SP1x64 filescan | grep resume
```

> *Legenda original: Busca por arquivos maliciosos*

Realizei o dump dos 2 arquivos com o comando `dumpfiles`.

```sh
volatility -f flounder-pc-memdump.elf --profile=Win7SP1x64 dumpfiles -D ./ -r $pdf.lnk -i -S file.txt
```

> *Legenda original: Extração dos arquivos maliciosos*

Na sequência utilizei o comando **strings** nas duas amostras coletadas, e surgiu uma tripa de base64 na tela **(preste atenção no = ao fim da string)**:

> *Legenda original: Conteúdo do arquivo malicioso*

Para decodificar, utilizei o [CyberChef](https://gchq.github.io/CyberChef/).

Decodificando o primeiro Base64, encontramos um comando powershell também encodado, decodificando essa outra string chegamos a um comando **powershell** que altera algumas configurações da máquina, e por fim, encontramos a Flag:

*Decode do comando PowerShell em Base64*

> *Legenda original: Decoded e Flag!*
