---
title: "Back to basic – Redes de Computadores e CyberSec – Parte 1"
description: "Fundamentos de redes para segurança, com topologias, equipamentos, protocolos, VLANs e HTTP."
date: "2024-02-06 17:48:49 -0300"
original_updated_at: "2024-02-06T17:54:46-03:00"
author: "Alencar Silva"
category: "Network"
---

> Republicado a partir da [captura do artigo original na Wayback Machine](https://web.archive.org/web/20240414234509/https://alencarjunior.com.br/index.php/2024/back-to-basic-redes-de-computadores-e-cybersec-parte-1/). A captura consultada preservou o texto e as legendas, mas 26 imagens do corpo estão indisponíveis.

## Resumo {#aioseo-resumo}

Hoje vamos falar de redes de computadores e como é um conhecimento essencial para trabalhar com segurança da informação com exemplos práticos. Essa publicação é a primeira de um compilado que estou elaborando que aborda redes, infraestrutura e segurança da informação, as futuras publicações serão incluídas sob demanda ao final desta página.

Rede de computadores ou ***network*** é a interligação entre dois ou mais ativos via cabo, sinal de rádio, fibra, cabo coaxial, entre outros, possibilitando a comunicação destes dispositivos.

> *Legenda original: Rede local de computadores*

O essencial do estudo de redes na minha opinião é entender como a comunicação entre dispositivos de rede funciona, descobrir os vetores de ataque de rede, entender ferramentas de segurança em sua essência, como o tráfego de rede fluí por elas. Para isso temos por exemplo o modelo de referência **OSI** que nos apresenta o caminho da comunicação de rede em 7 camadas partindo da camada física que interliga um dispositivo ao outro via cabo ou fibra até a camada de aplicação que é responsável pelas aplicações que chegam aos usuários finais, como por exemplo o **HTTP**, principal protocolo para requisição a páginas web.

> *Legenda original: Modelo OSI | Cloudflare*

A comunicação global através da internet é possível também graças a uma rede similar, no caso da interligação entre os continentes existem cabos submersos nos mares permitindo a comunicação entre diversos países.

> *Legenda original: Submarine Cable Map*

## Tipos de redes {#aioseo-topologias-de-rede}

Existem diversos tipos de rede, representadas por siglas, as principais são **LAN (Local Area Network)** e **WAN (Wide Area Network)**, **LAN** são as redes locais, sua rede doméstica, rede wi-fi, a rede corporativa da sua empresa, normalmente formada por computadores, IOTs, impressoras, a **WAN** normalmente está atrelada ao **ISP** **(Internet Service Provider)**, comumente chamados no Brasil de **link de Internet**, são responsáveis por disponibilizar nosso acesso a dispositivos externos a nossa rede local, comutar nossa comunicação com o mundo através de roteadores.

> *Legenda original: Rede Local vs Rede Externa*

## Topologia de rede {#aioseo-topologia-de-rede}

Uma topologia de rede descreve a composição física de uma rede de forma conceitual. Existem algumas topologias possíveis, a mais comum é o formato estrela. O conceito destes modelos também são encontrados em ferramentas de segurança, conforme você vai ganhando experiência na área, vai entendendo o quanto a teoria é importante e como é usada na arquitetura de aplicações mais complexas.

### Topologia em estrela {#star-topology}

Cada dispositivo de rede é conectado a um dispositivo comutador centralizado. Comutadores e hubs podem ser vinculados em conjunto para estender e criar redes maiores. Essa topologia é escalonável.

### Topologia de barramento {#bus-topology}

Os dispositivos de rede são conectado a um único cabo de rede. Nada prático suscetível a perda de sinal e falha decorrente de danos no cabo.

### Topologia de anel {#ring-topology}

Cada dispositivo de rede é conectado ao seu vizinho para formar um anel. Caso o cabo seja rompido em algum lugar temos degradação da rede.

### Topologia de malha {#mesh-topology}

Em uma topologia de malha ou rede mesh, cada dispositivo de rede se conecta a todos os outros dispositivos de rede que integram a rede. Pensando em conceito lógico, existem soluções que utilizam esse formato para comunicação VPN por exemplo, para que todas as pontas conversem entre si, gerando um nível alto de contingência.

## Equipamentos de rede {#aioseo-equipamentos-de-rede}

Aqui temos uma grande diversidade de equipamentos, entre os principais e fundamentais temos:

### **Switch** {#aioseo-switch}

É um dispositivo de rede que permite ligar vários dispositivos a mesma rede de forma física e lógica ou a redes distintas através de tags de vlan **(Virtual LAN)**. Um switch pode ser composto por portas **RJ45**, que são as portas para cabos UTP ou **patche cords**, portas **SFP** (Conversor de fibra) e uma porta console para gestão do equipamento via linha de comando **(CLI)**.

![Switches CISCO]({{ '/assets/posts/back-to-basic-redes-de-computadores-e-cybersec-parte-1/image-1.webp' | relative_url }})

*Switches CISCO*

Aqui temos **3 termos** importantes, referente ao posicionamento desses equipamentos em uma rede, **switch core,** **switch de distribuição** e **switch de acesso**, o **switch core** normalmente agrega e gerencia todas as redes do ambiente e possui alta carga de uso, o **switch de distribuição** normalmente interliga vários switches ao switch core e por fim o **switch de acesso** é responsável por conectar os dispositivos do ambiente como computadores, servidores, antenas wireless. Temos algumas variações também, alguns utilizam o termo switch de borda para switches responsáveis pela entrada, distribuição e saída de links de internet, esses termos e posicionamento **variam** de ambiente para ambiente essa é uma representação conceitual e simplória, um diagrama de rede é algo muito complexo e que demanda experiencia para criação.

> *Legenda original: Exemplo de posicionamento de Switch e suas funções*

### **Roteadores** {#aioseo-roteadores}

### **Firewall** {#aioseo-firewall}

Firewall é um componente de segurança e controle de rede, servindo como barreira de proteção entre redes locais e internet, e trafego entre redes locais, firewall é uma ferramenta que agrega diversas funções como filtro de tráfego, **NAT** tanto de origem como destino, proxy, inspeção ssl, VPN, IDS/IPS entre outros, na atualidade com o **NGFW** **(Next Generation Firewall)** essa ferramenta abrange soluções de segurança e inspeção de tráfego que permitem visibilidade em nível elevado até a camada de aplicação, essa solução pode ser virtualizada mas comumente é utilizada com hardware dedicado, **appliance**. Uma das soluções de Firewall que mais tenho afinidade é o Fortigate da Fortinet: [FortiGate VM – Licença de avaliação e testes de UTM – Cybersecurity (alencarjunior.com.br)]({{ '/2023/04/23/fortigate-vm-licenca-de-avaliacao-e-testes-de-utm/' | relative_url }})

> *Legenda original: Fortigate modelo 200F*

> *Legenda original: Informações datasheet do equipamento*

## Conceitos e acrônimos {#aioseo-conceitos-e-acroimos}

Dentro de redes de computadores precisamos entender diversos conceitos e acrônimos, e o mais interessante na minha opinião para esse tema é a **RFC (Request for Comments)**, que é um documento que descreve padrões, normas e neste contexto temos dois dos principais protocolos responsáveis pelo funcionamento da Internet como conhecemos hoje o **TCP (Transmission Control Protocol)** e **IP** **(Internet Protocol)** que atuam nas camada 4 e 3 respectivamente, ou seja, existe um documento técnico que explica e padroniza o funcionamento destes protocolos, esses padrões foram criados visando a comunicação entre dispositivos de diferentes fabricantes um problema encontrado no passado.

> *Legenda original: RFC 1180 – TCP/IP tutorial (ietf.org)*

## Endereço MAC {#aioseo-endereco-mac}

INPROGRESS

## Cabeçalho dos protocolos {#aioseo-cabecalho-dos-protocolos}

É importante que você aprenda os principais campos do cabeçalho IP, que são origem e destino, e do TCP, porta de origem e porta de destino, em análise de tráfego de rede bruto você vai precisar aprender este tópico mais a fundo, entender os demais campos, analisando logs em ferramentas de segurança normalmente você tem algo mais superficial **origem**, **destino** e porta de **comunicação**.

## Fragmentação de Pacotes {#aioseo-fragmentacao-de-pacotes}

Para que a comunicação nessas redes aconteça, as informações são fragmentadas em pedaços menores antes de serem enviadas para camadas de baixo nível, os fragmentos são enviados para o destino que remonta o pacote e chega a informação final:

> *Legenda original: Fragmentação de pacotes, exemplo didático*

**Exemplo Prático**

Toda rede tem um valor máximo para o payload de cada pacote, para que seja feita a comutação da camada 3 para a camada 2 respeitando limite de transmissão o **MTU** **(Maximum Transmission Unit)**, utilizando a fragmentação o protocolo **IP** tem a capacidade de dividir esses pacotes em tamanhos adequados a rede marcando cada um dos pacotes, podemos verificar essa informação utilizando os comandos abaixo:

> > `Windows -> # netsh interface ipv4 show subinterfaces`
> >
> > `Linux -> # ip address`

> *Legenda original: Chegando MTU Windows*

> *Legenda original: Checando MTU Linux*

Dessa forma, se os pacotes trafegados forem maiores do que o limite definido nos equipamentos conectados a rede esses pacotes serão fragmentados, como no exemplo abaixo, um pacote ICMP de tamanho **5000 bytes** e enviado em uma rede com **MTU 1500** :

Realizando a análise do tráfego com a ferramenta **tcpdump**, podemos ver o campo **flags [+]** que indica que aquele pacote é fragmentado e que mais partes dele serão enviadas na sequência.

Não abordarei os mais campos do cabeçalho **IP**, finalizo com o campo ***“Total Length”*** a maioria dos protocolos tem um tamanho esperado, trazendo para o contexto de cyber, atores maliciosos utilizam protocolos comuns para exfiltração de dados, ter ciência que existem esses padrões é importante, ferramentas de segurança de rede utilizam esses padrões em assinaturas por exemplo, em contrapartida, atacantes trabalham suas ferramentas para simular tráfego lícito.

> *Legenda original: Mitre Attack, sobre exfiltration utilizando tamanho de transmissão baixo*

## VLAN – Virtual LAN {#aioseo-vlan-virtual-lan}

INPROGRESS

## Cliente x Servidor – HTTP {#aioseo-cliente-x-servidor-http-s}

Para exemplificar essa comunicação entre computadores vou utilizar os protocolo **TCP** e **HTTP** como exemplo, o protocolo **TCP** pode transportar outros protocolos em seu ***payload** (conteúdo)*, como o **HTTP** **(Hyper Text Transport Protocol)**, vamos imaginar o cenário **cliente <–> servidor**, nosso navegador será o cliente e o site de destino será o servidor, os principais protocolos de rede trabalham assim, com requisição e resposta, então quando o endereço do site for requisitado através do navegador, teremos uma comunicação TCP/IP partindo do cliente para o servidor, a comunicação será estabelecida e o o conteúdo **HTTP** será transportado.

> *Legenda original: TCP Three-Way Handshake – Exemplo teórico*

Para que os dados sejam transmitidos via TCP, primeiro o protocolo inicia uma validação de comunicação entre as partes que chamamos de handshake. No exemplo a seguir, o host com IP **192.168.60.1** é nosso **cliente** **(navegador)**, na **linha 1** envia um pacote **SYN** para o **site(servidor)** que se encontra no host com IP **192.168.60.135**, o servidor responde na **linha 2** com **SYN/ACK** indicando que está pronto para a comunicação e o cliente **linha3** envia um **ACK** indicando que a comunicação foi estabelecida.

> *Legenda original: TCP Three-Way Handshake – pcap analisado com Wireshark*

Agora que o TCP foi estabelecido vamos para o payload HTTP, é um acesso simples a uma página WEB, o HTTP trabalha métodos, neste exemplo o método GET é utilizado para solicitar o conteúdo da página.

> *Legenda original: Exemplo didático de comunicação do protocolo HTTP.*

Na **linha 1** o **cliente(navegador)** solicita a página da aplicação, na **linha 2** a aplicação responde **200 OK**, retornando o conteúdo da página para o cliente.

> *Legenda original: Análise do tráfego através do Wireshark*

Então temos acesso a página web de destino.

> *Legenda original: Página web de exemplo.*

Para análise desse tráfego comumente utilizamos o **Wireshark**, é uma solução opensource que facilita a análise, ela pode ser usada em tempo real, escutando a interface de rede, ou realizar leitura de um arquivo **pcap**, que o caso do exemplo, para coleta utilizei a ferramenta **tcpdump**, que é base para análise de rede, os comandos que utilizei:

**tcpdump -D** lista as interfaces de rede, para que você possa selecionar a interface correta para escutar.

**-i** defino a interface, **port 80** filtro a porta padrão do **http**, para escutar esse tráfego, **-n** para não incluir resolução de nomes e **-v** para aumentar o nível de informações do tráfego, **-w** para escrever a saída em um arquivo, comando seguido pelo **nome-arquivo.pcap**, na sequência podemos utilizar o Wireshark para analisar o arquivo.

> *Legenda original: Captura dos pacotes*

Para o exemplo prático utilizei o servidor web **[Apache](https://www.apache.org/ "apache")**, ele está entre os servidores web mais utilizados no mundo disputando com [Nginx](https://www.nginx.com/ "Nginx") e [IIS](https://www.microsoft.com/pt-BR/download/details.aspx?id=48264 "IIS ") (Microsoft), é muito provável que você interaja com essa aplicação rodando algum site ou portal durante seu dia. O **HTTP** trabalha por convenção na porta **80**, isso pode ser alterado de acordo com a aplicação, **Hyper Text Transport Protocol** como o nome sugere, trabalha com texto, o **HTTP** em conjunto com o protocolo **IP** e **DNS** para resolução de nomes possibilitam a navegação na internet.

Voltando para o exemplo, como o protocolo trabalha com texto, se eu digito login e senha na página e envio as informações, um método **POST** é utilizado e conseguimos ver tudo em texto claro.

**Marcador 1 ->** o cliente encaminha um post contendo as informações incluídas no formulário.

**Marcador 2 ->** o servidor retorna 200 OK, retornando a página pós login.

**Marcador 3 -> Informações em texto claro.**

Continua…
