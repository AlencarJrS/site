---
title: "Write-up – LetsDefend – Memory Analysis"
description: "Investigação de um dump de memória Windows com Volatility 2 e 3 no desafio forense da LetsDefend."
date: "2023-01-19 21:47:33 -0300"
original_updated_at: "2023-05-24T22:39:46-03:00"
author: "Alencar Silva"
category: "Forensics"
original_title: "Write-up – Lets Defend – Memory Analysis"
---

> Republicado a partir da [captura do artigo original na Wayback Machine](https://web.archive.org/web/20240414234508/https://alencarjunior.com.br/index.php/2023/lets-defend-memory-analysis-challenge/). A captura consultada preservou o texto e as legendas, mas 17 imagens do corpo estão indisponíveis.

![Imagem de capa]({{ '/assets/posts/lets-defend-memory-analysis-challenge/memory-2.webp' | relative_url }})

Neste write-up, mostro como resolvi o desafio forense [Memory Analysis, da LetsDefend](https://app.letsdefend.io/challenge/memory-analysis).

O exercício simula a análise de um incidente detectado por uma ferramenta de EDR/IDS e escalado para o Tier 2 do SOC.

> *Legenda original: Resumo do desafio*

## Preparação do dump

O arquivo do desafio usa a senha `infected`. Depois de descompactá-lo, obtive o dump `dump.mem`, com **1,8 GB**.

**SHA256: 145b836ef68432b27cab66c1bec8c88f3fcd06258d9e25a62180b2809e0c37a4**

Usei o **Volatility 2.6.1** para identificar o perfil com `imageinfo`. Essa etapa foi demorada. Tive problemas com o Python 3.10 ao tentar usar o Volatility 3 no início e voltei a ele na extração do hash.

```sh
vol.py -f dump.mem imageinfo
```

> *Legenda original: imageinfo do arquivo dump.mem*

Nos comandos seguintes do Volatility 2, use o perfil identificado com `--profile=Win10x64_17134`.

## 1º – What was the date and time when Memory from the compromised endpoint was acquired?

O comando `imageinfo` informa o horário de aquisição da imagem e o horário local da máquina. O valor exato aparecia na captura de tela, que está indisponível no acervo consultado.

> *Legenda original: Data e hora da imagem*

## 2º – What was the suspicious process running on the system? (Format : name.extension)

Os plugins `pslist` e `pstree` ajudam a identificar processos suspeitos. Usei `pstree` para observar as relações entre processos pai e filho.

O desafio sugere que existe um processo fora do padrão. O pôster [Hunt Evil, do SANS](https://www.sans.org/posters/hunt-evil/), ajuda a comparar o comportamento observado com o esperado para processos do Windows.

Neste caso fica mais fácil pela dica, mas em casos reais é possível que o atacante utilize processos legítimos, ai você precisaria de outros recursos, observei alguns processos, pesquisei sobre 2 que não conhecia, por exemplo o **Windows.WARP.J**, que eu não fazia ideia do que era, aparentemente é um processo do DirectX, beleza, o que mais? 2 **lsass.exe**, um tem um processo filho **conhost.exe**, o **lsass.exe** é um dos processos queridinhos da galera de **Red Team** porque ele tem permissões elevadas para vários recursos do sistema.

> *Legenda original: Processo lsass.exe e conhost.exe*

Segundo o pôster, é incomum observar processos filhos de `lsass.exe`.

Nesse contexto, `conhost.exe`, o host do console do Windows, chamou a atenção como processo filho.

> *Legenda original: conhost – exemplo máquina local*

A resposta registrada no desafio foi `lssas.exe`, com a grafia diferente de `lsass.exe`.

## 3º – Analyze and find the malicious tool running on the system by the attacker (Format name.extension)

Em seguida, usei `procdump` para extrair os executáveis dos dois processos. A versão original repete o PID 7560 no bloco de comandos. O PID 7592 aparece no nome do segundo executável e na legenda da análise.

```sh
vol.py -f dump.mem --profile=Win10x64_17134 procdump -D ./ -p 7560
vol.py -f dump.mem --profile=Win10x64_17134 procdump -D ./ -p 7592
```

> *Legenda original: dump dos processos maliciosos*

Agora você pode analisar manualmente os arquivos, usando o comando **strings** por exemplo, buscando por palavras chave de acordo com o desafio, utilizar ferramentas de Threat Intelligence, executar um yara scan, etc.

```sh
strings executable.7592.exe | egrep -ia "exploit"
```

> *Legenda original: Exemplo de busca manual por palavras*

Na época, analisei o executável do laboratório no VirusTotal. O resultado apontou malware e ajudou a identificar a ferramenta usada no desafio.

> *Legenda original: Resultado de análise do processo lsass.exe PID 7592*

O WinPEAS enumera informações locais e ajuda a identificar possíveis caminhos de escalonamento de privilégios. Busquei o nome da ferramenta nas strings dos executáveis para encontrar referências a scripts e módulos.

```sh
strings executable.75* | egrep -ia "winpeas"
```

***chamadas de scripts* e módulos**

Agora temos a terceira flag, **winpeas.exe**.

## 4º – Which User Account was compromised? Format (DomainName/USERNAME)

Qual conta foi comprometida? Aqui existem alguns caminhos possíveis, primeiro vamos ver os usuários e senhas (hashes) da máquina:

```sh
vol.py -f dump.mem --profile=Win10x64_17134 hashdump
```

> *Legenda original: Usuários da máquina*

Alguns destes usuários são de sistema, o usuário **CyberJunkie** é um usuário válido, podemos validar isso checando a chave de registro RUN, que é responsável por execução de software após o logon.

```sh
vol.py printkey -f dump.mem --profile=Win10x64_17134 -K 'Software\Microsoft\Windows\CurrentVersion\Run'
```

Execução do **OneDrive** após login.

Quanto ao domínio, existem algumas formas de busca também, no meu caso utilizei o **strings** no dump de memória. O comando vai retornar muita informação, na primeira linha já temos a resposta.

> *Legenda original: Domínio encontrado via strings*

Para o regex utilizei o ChatGPT para teste:

> *Legenda original: regex criado pelo chatGPT*

A resposta da quarta questão foi `MSEDGEWIN10/CyberJunkie`.

## 5º – What is the compromised user password?

Por fim, precisamos descobrir a senha do usuário CyberJunkie. Temos a hash NT do usuário, nesse caso, teríamos que usar o **hashcat** ou o **john**, eu fiz algumas tentativas e tive problemas com as duas ferramentas, aqui eu me estressei um pouco, mesmo usando os parâmetros corretos no hashcat ele não conseguia dar match com a hash coletada,

Então usei o volatility 3, e por algum motivo de compatibilidade do **volatility 2** e o perfil utilizado (provavelmente), **a hash é diferente!!!**, por fim (até que enfim), com o parâmetro -m 1000 consegui quebrar com o hashcat.

**Hash volatility 2 : d13b3c4d5c10f0ce85af1a40b0ef30ec**

**Hash volatility 3: a9fdfa038c4b75ebc76dc855dd74f0da**

```sh
python3 /opt/volatility3/vol.py -f dump.mem windows.hashdump
```

> *Legenda original: Hash volatility 3*

> *Legenda original: Hashcat para crack da senha*

```sh
hashcat -m 1000 hashdump.txt /usr/share/wordlists/rockyou.txt
```

> *Legenda original: Senha quebrada*

Flag final **password123**

Por enquanto é isso!
