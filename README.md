
# Desafio:

Em PETlândia, devido à pandemia do COVID-19, se faz necessário o
distanciamento mínimo entre os habitantes. Nos campi da UFC para que as atividades
presenciais sejam retomadas, as empresas de transportes que possuem linhas nas quais o
destino é um dos campi da UFC terão que fazer algumas adaptações. A adaptação mais
importante é alterar a capacidade máxima de passageiros para que essas linhas de ônibus
possam cumprir as recomendações exigidas pela prefeitura.

Para isso, os estudantes do Coding vão colaborar com a prefeitura para fazer um
programa que ajuda a controlar o fluxo de passageiros dos ônibus que têm como destino
um dos campi da UFC em Fortaleza.

Cada linha de ônibus tem um conjunto de horários diários de partida do ônibus e
comporta uma capacidade máxima de passageiros: em pé e sentados. Só poderá haver
passageiros sentados e um passageiro por cada par de assentos Os assentos com
numeração ímpar são localizados na janela e os com numeração par são no corredor

As informações de cada linha são:

● Campus da UFC de destino

● Horário de partida (hora e minuto)

● Valor da passagem, considere que estudantes pagam meia tarifa, e crianças e
idosos dependendo da faixa etária têm direito à gratuidade.

● Cada linha tem ônibus partindo todos os dias. Portanto, as informações de cada
ônibus são:

○ Data da partida (dia/mês/ano)

○ Assentos disponíveis




O programa deve permitir:

● Cadastro de linhas: inserir, remover e alterar.

● Consultar todos os horários disponíveis para uma determinada parada de um
campus da UFC em Fortaleza.

● Consultar os assentos disponíveis no ônibus, informando o campus de destino,
horário e data.

● Após uma consulta de assento disponível, o sistema deve perguntar se algum
assento vai ser reservado (caso existam ainda assentos disponíveis).

● Nenhuma passagem pode ser comercializada para ônibus que já partiram (consultar
o relógio do sistema)

Além de receber as reservas pelo teclado, permitir ler as reservas de um arquivo
texto no seguinte formato, ou pode ser um arquivo CSV, contendo as seguintes
informações:

Campus, horário(hh:mm), data(dd/mm/aaaa), assento, sendo uma reserva por linha.
Gravar em um arquivo texto todas as reservas que não puderam ser realizadas, juntamente
com o motivo (ex.: ônibus cheio, ônibus já partiu, assento ocupado).

Observações:

● O programa poderá ser feito na linguagem Python ou um pequeno site utilizando
HTML, CSS e JavaScript, ainda pode ser utilizado banco de dados caso o aluno
deseje utilizá-lo. 

Mas deve utilizar obrigatoriamente as estruturas vistas nas aulas:

○ listas, matrizes, strings, funções, arquivos, etc.

○ Caso o aluno queira receber somente o certificado de Python, ele pode fazer
somente com Python com a interface do terminal. Porém, caso deseje
receber o certificado contendo também o módulo desenvolvimento web, ele
deve fazer o projeto utilizando os conhecimentos de desenvolvimento web.

● O trabalho deverá ser feito em equipe ou individualmente.

● A equipe deverá enviar o código no prazo

● Durante a avaliação do trabalho serão levados em conta os seguintes aspectos:

○ Organização do código fonte (indentação; comentários explicativos no
código, onde for necessário; nomes de funções e variáveis apropriados, etc.)

○ Se o programa atende todas as exigências especificadas no enunciado do
trabalho.

○ Divisão do código fonte em arquivos separados.

○ Reuso de código, inclusive com a utilização de bibliotecas desenvolvidas
especificamente para o trabalho.

## Requisitos

Antes de executar a aplicação, é necessário ter instalado na máquina:

- Node.js (versão 12 ou superior)
- Python (versão 3.6 ou superior)

## Documentação da API

#### Retorna todos os itens

```http
  GET /linhas
```

## Stack utilizada

**Front-end:** JavaScript, TypeScript, Next.js

**Back-end:** Python, Flask


## Instalação


- Clone o repositório do GitHub:
```bash
git clone https://github.com/CauanDZN/moovooca.git
```

- Acesse o diretório do projeto:
```bash
cd moovooca
```

- Instale as dependências do front-end:
```bash
cd web
npm install
```

- Mude o arquivo '/src/services/api.ts' para receber o IP da sua máquina na porta 5000.

- Mude o arquivo '.env' para receber o IP da sua máquina na porta 5000.

- Instale as dependências do back-end:
```bash
cd server
python3 -m pip install -r requirements.txt
```

- Execute primeiro o back-end:
```bash
cd server
python3 app.py
```

- Depois o front-end:
```bash
cd web
npm run dev
```
## Autores

- [@CauanDZN](https://www.github.com/CauanDZN)
- [@PdYuri](https://github.com/PdYuri)

