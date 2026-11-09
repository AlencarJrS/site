---
title: "Variáveis da Engenharia Social"
description: "Formas de engenharia social e análise de um exemplo de phishing, do e-mail ao anexo e ao domínio."
date: "2023-04-10 15:50:50 -0300"
original_updated_at: "2023-04-10T16:04:05-03:00"
author: "Alencar Silva"
category: "Defensive Security"
---

> Republicado a partir da [captura do artigo original na Wayback Machine](https://web.archive.org/web/20240414234508/https://alencarjunior.com.br/index.php/2023/variaveis-da-engenharia-social/). A captura consultada preservou o texto e as legendas, mas 3 imagens do corpo estão indisponíveis. O domínio suspeito foi escrito sem link, e o endereço do remetente foi omitido.

![Imagem de capa]({{ '/assets/posts/variaveis-da-engenharia-social/capa-egsocial.webp' | relative_url }})

Engenharia social aborda uma serie de técnicas de persuasão utilizadas para obter informações de um alvo na maioria das vezes sem que ele perceba, normalmente utilizada por pessoas mal intencionadas que desejam informações confidenciais, acesso a lugares específicos, sistemas ou instalação de software malicioso.

Em defesa cibernética o principal vetor de ataque nas organizações são colaboradores, desta forma engenharia social e uma das principais frentes de ataques por parte dos adversários, as técnicas variam entre envio de e-mails maliciosos, fraude de documentos, ligações falsas, perfis falsos em redes sociais.

A principal forma de combate são politicas internas fortes e conscientização, manter os colaboradores cientes e formar um pensamento crítico a qualquer tipo de comunicação recebida.

## Tipos comuns de ataques de engenharia social

### E-mails maliciosos

A técnica que aborda o envio de e-mails maliciosos conhecida como Phishing possuí algumas variáveis, o Phishing convencional, normalmente enviado em campanhas de larga escala abordam diferentes temas do dia a dia, noticias de politica, promoções de marketplace, mudanças e cobranças de serviços de streaming, notificações bancarias, normalmente e-mails genéricos, na sequencia temos o **spear phishing**, que trabalha com um alvo definido onde campanhas direcionadas são criadas, em situações que o atacante possui maior numero de informações sobre o alvo, serviços que o alvo realmente utiliza, assuntos relacionados a empresa, família.

Analisar o contexto do e-mail e informações contidas nele inicialmente é a melhor remediação nestes casos, seguido por ações de configuração de antispam.

### Ligações telefônicas

A técnica que se aproveita de ligações telefônicas e chamada de Vishing, nela o atacante utiliza informações prévias do alvo ou objetivo de ataque para conduzir uma conversa coletando informações confidenciais ou instruindo o alvo a executar determinada ação. É importante sempre validar a origem da chamada, ataques comuns são solicitações de acesso remoto, promoções e até mesmo intimidação.

### Fraude em documentos

Fraude em documentos é uma técnica que consiste em criar documentos falsos, como cartas, memorandos, recibos, formulários e outras formas de comunicação. Esses documentos são criados para enganar os destinatários, geralmente com o objetivo de obter informações confidenciais ou acesso a sistemas. Ela pode ser atrelada as técnicas anteriores citadas. É importante verificar a autenticidade de todos os documentos recebidos e confirmar com a fonte original antes de fornecer informações confidenciais.

## Análise do e-mail de phishing

Aqui temos um caso de spear phishing, o remetente possui nome completo e CPF do destinatário na tentativa de demonstrar legitimidade.

> *Legenda original: E-mail de phishing*

Principais pontos de atenção:

- Contexto, importante validar se o e-mail faz sentido, neste caso, parcialmente, o destinatário possui conta no banco em questão.
- Erros ortográficos, o assunto do e-mail tem caracteres aleatórios (alerta) o corpo do e-mail também contém tem erros,
- Remetente, muito importante, e-mail de origem é aleatório (alerta), não é da organização em questão **[endereço do remetente omitido]**
- Anexo, já foram apresentados 2 alertas para que esse anexo não seja salvo na máquina, evite ao máximo abertura e download de arquivos externos sem validação do envio. Neste caso, o próprio Google verifica o arquivo e não retorna status malicioso e recomenda que só seja realizado download de remetentes confiáveis.

> *Legenda original: Verificação de anexo da Google*

### Análise do anexo

O arquivo PDF em anexo, contém uma imagem estática com link embutido que encaminha para um site malicioso, realizando análise dinâmica e estática não são encontradas informações extras:

> *Legenda original: PDF malicioso*

Se clicarmos no link a página não está mais disponível, provavelmente a campanha foi descontinuada.

### Análise da URL e do domínio

Em todos os ataques que utilizam mídia digital, é importante analisar o domínio/url de destino, existem algumas técnicas maliciosas para esses tipos de ataque, uma delas é o **Typosquatting**, que ocorre quando o usuário digita alguma letra errada na URL do navegador, como exemplo clássico, **gogle[.]com** ao invés de **[google.com](https://google.com)**, atores maliciosos podem se aproveitar desse tipo de falha registrando o domínio similar ao autentico e hospedando um site malicioso, o mesmo ocorre em envios de phishing, domínios que utilizam hífen, numeral 0 no lugar da letra O, letra L no lugar da letra I, entre outros.

Contra essas técnicas além da atenção, utilizar a ferramenta de busca pode ser uma melhor opção a digitar manualmente a URL. Evite cliques em links suspeitos e em caso de encurtador de URL, utilize o símbolo + ao final da URL no navegador, desta forma, grande parte dos portais de encurtamento de URL exibem a URL de destino.

## Uso de PNL

PNL (Programação Neuro Linguística) é uma técnica utilizada em engenharia social buscando manipular o comportamento do alvo, entendendo que a linguagem e o comportamento humano são interdependentes e podem ser manipulados para responderem de formas diferentes a cada situação abordada, os atores maliciosos buscam criar proximidade com o alvo utilizando a técnica rapport, ou buscando por algum gatilho com a técnica ancora, sempre com o objetivo de obter informações confidenciais através de persuasão ou indução.

Para proteção sempre esteja atendo a sinais de manipulação, repetição de palavras, curiosidade excessiva, essa técnica pode ser utilizada em uma conversa de bar, ligação telefônica, indução em grupo.

## Referências

[Ameaças de engenharia social | Dicas de proteção contra malware (kaspersky.com.br)](https://www.kaspersky.com.br/resource-center/threats/malware-social-engineering)

[O que é Typosquatting? (kaspersky.com.br)](https://www.kaspersky.com.br/resource-center/definitions/what-is-typosquatting)

[O que é PNL e como usá-la para ser mais influente | Blog Conquer (escolaconquer.com.br)](https://escolaconquer.com.br/blog/o-que-e-pnl-e-como-usa-la-para-ser-mais-influente/)
