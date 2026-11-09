---
title: "FortiGate VM – Licença de avaliação e testes de UTM"
description: "Registro de um laboratório com FortiGate-VM 7.2.4, licença de avaliação e testes de políticas, UTM e IPS."
date: "2023-04-23 22:11:58 -0300"
original_updated_at: "2023-04-23T22:37:20-03:00"
author: "Alencar Silva"
category: "Defensive Security"
---

> Republicado a partir da [captura do artigo original na Wayback Machine](https://web.archive.org/web/20240414234509/https://alencarjunior.com.br/index.php/2023/fortigate-vm-licenca-de-avaliacao-e-testes-de-utm/). A captura consultada preservou o texto e as legendas, mas 40 imagens do corpo estão indisponíveis. As versões e as condições de licenciamento são as registradas no laboratório de 2023.

![Imagem de capa]({{ '/assets/posts/fortigate-vm-licenca-de-avaliacao-e-testes-de-utm/capa-fgt.webp' | relative_url }})

- [Resumo](#aioseo-resumo)
- [Como ativar a licença?](#aioseo-como-ativar-a-licenca)
- [Laboratório: Testes de regras e UTM](#aioseo-exemplo-de-laboratorio)
- [Laboratório: Testes IPS](#aioseo-laboratorio-testes-de-regras-e-utm)

## Resumo {#aioseo-resumo}

Esta semana retomei a leitura do material da Fortinet para as certificações do fabricante, o conteúdo e abordagem do **NSE Institute** melhoraram muito desde que realizei a certificação NSE4 em 2020. Agora existe um módulo básico de redes e infraestrutura para quem está iniciando, o curso é aberto ao público geral sendo necessário apenas cadastro no portal **https://training.fortinet.com**. Recentemente, também foram anunciadas reformulações nas certificações: [NSE Training Program Update | Fortinet](https://www.fortinet.com/nse-training/training-program-update), que serão válidas à partir de outubro de 2023.

> *Legenda original: Resumo do treinamento.*

Analisando o conteúdo superficialmente os tópicos abordados são essenciais ao início de formação de um profissional da área, incluindo explanação de LAN, Modelo OSI, TCP/IP, entre outros. (fica a sugestão para quem está iniciando na área).

Na sequência, durante o auxílio de um colega de trabalho com o deploy e configuração do Trial VM do Fortigate, a qual utilizei muito para laboratórios quando tive os primeiros contatos com a solução, me deparei com uma tela diferente após o primeiro login, a solicitação de input de licença do arquivo de licença e uma opção “evaluation license”, selecionando essa opção recebemos uma mensagem informando que a licença é unitária para cada conta de FortiCare, seguida por suas restrições, muito interessante pois anteriormente a licença era limitada a 14 dias de trial o que de certa forma tornava o processo moroso quando você queria fazer algum teste e esse período havia expirado, se não realizasse o backup era necessário reconfigurar a VM, gostei dessa nova abordagem, em pesquisa observei que essa alteração veio à partir de agosto de 2022, com a versão 7.2.1.

> *Legenda original: Informação sobre a licença de avaliação.*

## **Como ativar a licença?** {#aioseo-como-ativar-a-licenca}

**1º** Crie uma conta em **support.fortinet.com**, a conta é necessária para ativação do trial e download da VM.

**2º** Após registro, realize login no portal, acesse o submenu **“Support”** e selecione **“VM Images”**.

> *Legenda original: Caminho para download da VM*

***Os passos a seguir serão realizados utilizando o hypervisor VMWare Workstation, caso utilize outro hypervisor realize o download equivalente***.

**3º** Selecione a plataforma de virtualização:

> *Legenda original: Escolhendo a plataforma de virtualização*

**4º** Encontre o “New deployment of Fortigate for VMware” e clique em download.

> *Legenda original: Download do arquivo ovf*

**5º** Um arquivo .zip será salvo na máquina, acesse sua pasta de downloads e descompacte os arquivos **(botão direito sobre o arquivo, extrair tudo)**, acesse a pasta com os arquivos extraídos e abra o arquivo **FortiGate-VM64.ovf**.

> *Legenda original: Arquivos descompactados*

**6º** Aceite os termos do fabricante.

> *Legenda original: Termos de uso*

**7º** Selecione o nome para a VM e o caminho de armazenamento no disco e clique em “Import”

> *Legenda original: Nome e caminho da VM*

Agora precisamos realizar uma alteração no número de interfaces para respeitar o suportado pela licença.

**8º** Após importação da VM, acesse a opção “Edit virtual machine settings” e remova as interfaces criadas até que restem 3.

> *Legenda original: Editar configurações da VM*

> *Legenda original: Remoção das interfaces de rede*

**9º** Inicie a VM e aguarde a instalação finalizar, a VM irá reiniciar e a opção de login será apresentada.

> *Legenda original: Boot do FortiOS*

**10º** Realize login, usuário admin, senha em branco, insira nova senha de acesso desejada.

> *Legenda original: Primeiro acesso*

**11º** Agora você pode seguir de duas formas, fixar o IP manualmente na interface ou utilizar uma interface com DHCP no Workstation, eu utilizo modo NAT com DHCP para simular a WAN.

**Configuração manual de IP:**

```
# config system interface
(acessa a configuração de interfaces)
# edit port1
(acessa a configuração da interface 1)
# set ip x.x.x.x 255.255.255.0
(atribuí um IP a interface)
# end
(conclui a configuração)
```

**Se DHCP, apenas confira o IP do Fortigate**:

```
# diagnose ip address list
(Lista os endereços configurados nas interfaces)
```

> *Legenda original: Verificando IP da interface via CLI*

**12º** Configure uma rota estática para o acesso da VM a internet.

```
# config route static
(acessa a configuração de rotas estáticas)
# edit 1
(cria uma nova rota)
# set device port1
(define a interface de saída)
# set gateway 192.168.245.254
(defina o gateway da sua rede configurada no workstation)
```

Para checar o gateway no Workstation, acesse **“edit”** no canto superior da ferramenta e **“Virtual Network Editor”** na sequência, selecione a opção **“change settings”** seguida por > **“Nat Settings**” e verifique o IP configurado, por padrão ele vem com o IP .2 do barramento.

> *Legenda original: Verificando o gateway da rede NAT.*

**13º** Valide o acesso da VM para a internet:

```
# execute ping forticare.fortinet.com
(Testa a comunicação via ICMP com o FortiCare responsável por ativar o trial)
```

> *Legenda original: Teste de comunicação com domínio FortiCare*

**14º** Acesse a GUI do Fortigate via Browser: **http://192.168.245.135**, de acordo com o IP identificado ou fixado no passo 11 e realize o login.

**15º** Selecione a opção **“Evaluation License”** e insira as credenciais utilizadas no cadastro em support.fortinet.com.

> *Legenda original: Inserindo as credenciais para a avaliação*

Clique em **“OK”**, aceite os termos e aguarde o processo de ativação, a VM será reiniciada.

A ativação também pode ser realizada via CLI,

```
# execute vm-license-options account-id seu-email
# execute vm-license-options account-password sua-senha
# execute vm-license
```

**Pronto, licença ativa.**

> *Legenda original: Licença de avaliação ativa*

## Laboratório: Testes de regras e UTM {#aioseo-exemplo-de-laboratorio}

Para testar as funcionalidades e limitações da licença de avaliação realizei uma configuração básica para o que o FortiGate VM seja o gateway de uma máquina Linux.

> *Legenda original: Diagrama de comunicação para a internet.*

Criei uma interface host-only no Workstation sem DHCP, na sequência configurei a porta 2 do Fortigate VM com DHCP Server ativo:

> *Legenda original: Interface Host-only sem DHCP*

> *Legenda original: Configuração de DHCP*

Na sequência, atribuí esta mesma rede Host-only para a VM Linux, desta forma ela recebe um IP do DHCP configurado no Fortigate VM.

> *Legenda original: IP que a máquina Linux recebeu*

Agora, é possível visualizar o tráfego da máquina Linux através do Fortigate VM:

> *Legenda original: Informações do host via dashboard da GUI*

Como esperado, seguindo o padrão do antigo licenciamento o UTM é limitado, criei uma regra genérica aplicando todos os perfis UTM. Testando o **WebFilter** não é possível utilizar as categorias da FortiGuard mas conseguimos testar o filtro estático de URL. Adicionei bloqueio para globo.com e amazon.com.br e o bloqueio funcionou corretamente.

> *Legenda original: Regra de saída para a internet.*

> *Legenda original: Logs de comunicação de saída .*

> *Legenda original: Filtro estático de URL.*

> *Legenda original: Mensagem de bloqueio via filtro estático.*

A identificação de aplicação também funciona, limitada a versão específica da base FortiGuard.

> *Legenda original: Identificação de aplicações através do motor de assinaturas proprietário.*

Essas são as features (funções) que podem ser utilizadas de acordo com a Fortinet:

> *Legenda original: Recursos disponíveis neste modelo de licenciamento*

## Laboratório: Testes IPS {#aioseo-laboratorio-testes-de-regras-e-utm}

Para testar o IPS utilizei uma VM com uma aplicação web vulnerável rodando em docker, utilizando uma interface Host-only. Iniciei algumas técnicas de enumeração automatizadas e posteriormente tentativa de execução de exploits públicos aleatórios para testar a capacidade de detecção da ferramenta.

Projeto utilizado: <https://github.com/opsxcq/docker-vulnerable-dvwa>

> *Legenda original: Diagrama de comunicação dos ataques*

Configurei a interface port3 do Fortigate VM com DHCP ativo na sequência criei uma regra genérica de comunicação de origem port2, destino port3, liberando todo o tráfego e aplicando o filtro de IPS com todas as assinaturas da licença trial habilitadas.

> *Legenda original: Regra de comunicação lateral.*

> *Legenda original: Docker rodando a aplicação com -it, com shell sendo possível ver os logs do apache.*

> *Legenda original: Aplicação acessível à partir do Kali Linux*

Na sequência realizei os primeiros testes, uma enumeração básica com o NMAP e uma enumeração barulhenta já testando algumas vulnerabilidades de CMS com o Nikto.

> *Legenda original: Enumeração automatizada com barulho, nmap e nikto.*

No mesmo momento foi possível visualizar os logs de detecção do sensor.

> *Legenda original: Resumo de ataques após o reconhecimento.*

Neste primeiro teste o IPS funcionou como IDS apenas para detecção, conforme configurado.

> *Legenda original: Logs de detecção do motor IDS/IPS*

Na sequência alterei para bloqueio, as sessões foram derrubadas, conforme esperado.

> *Legenda original: Logs de bloqueio do motor IDS/IPS*

Testei outras vulnerabilidades disponíveis na aplicação, como SQL Injection com parâmetros “user’ or 1=1 — -” e “1′ or ‘1’ = ‘1” sem sucesso, a comunicação foi derrubada e a página não retornou nada:

> *Legenda original: Detalhes da requisição do ataque SQLI*

**<sub>Comunicação derrubada pelo firewall.</sub>**

> *Legenda original: Categorização do ataque SQLI FortiGuard*

**Conclusão**

O Fortigate VM Trial é um prato cheio para quem quer aprender segurança defensiva na prática, aplicar conceitos de menor acesso, testar sensores de IDS/IPS e aprender sobre redes. Fica a forte recomendação!

**Referências:**

[Permanent trial mode for FortiGate-VM | FortiGate / FortiOS 7.2.4 (fortinet.com)](https://docs.fortinet.com/document/fortigate/7.2.4/administration-guide/441460)
