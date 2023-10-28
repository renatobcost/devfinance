## 🚀 Cypress: automação de testes 🚀

Projeto de estudo sobre [Cypress](https://www.cypress.io/). O material disponível neste repositório foi desenvolvido durante [Lives](https://www.youtube.com/watch?v=wIjtX0CPaw0&list=PLnUo-Rbc3jjztMO4K8b-px4NE-630VNKY&index=1) disponibilizadas pelo canal [Agilizei](https://www.youtube.com/c/Agilizei).

O objetivo deste projeto é compreender um pouco mais sobre o funcionamento do cypress aplicado a um caso real. Para tanto, foi utilizada a aplicação [dev.finance$](https://devfinance-agilizei.netlify.app) como objeto de testes. 

Os testes criados analisaram a adição de novas transações à plataforma (entradas e saídas), além de validar os valores cadastrados. 


### 💡 Conceitos abordados
-----------------------

- Comandos Each e Invoke;
- Controle de entradas e saídas;
- CSS Selector;
- LocalStorage;
- Massa de testes estática (.json);
- PageObject;
- Submeter forms e validar modal;


### ⚠️ Instalação e uso do projeto
-----------------------
- Instale o [Node.js](https://nodejs.org/en/download/);
- Baixe este repositório ou faça um git clone;
- Abra o diretório do projeto e execute o comando:
    - `npm install`
- Para abrir a interface de execução do Cypress, execute no diretório do projeto:
    - `npx cypress open`


### ⚙️ Arquitetura do projeto
-----------------------

```
dev_finance/
  ├─  .github/
  │        └── workflows/
  │            └── ci.yml
  ├─  cypress/
  │        ├── fixtures/
  │        │   └── transacao.json       
  │        │
  │        ├── integration/
  │        │   └── home.spec.js
  │        │
  │        ├── plugins/
  │        │   └── index.js
  │        │
  │        └── support/
  │            ├── actions/
  │            |        └── AuthActions.js
  │            ├── utils.js
  │            ├── commands.js
  │            └── index.js
  │          
  ├── node_modules/
  ├── cypress.json
  ├── package-lock.json
  ├── package.json
  └── README.md
```

## 🔍 Camadas do projeto
-----------------------

 - **.github:** contém arquivo para criação de pipeline de integração contínua (*.yml); 
 - **fixtures:** arquivos para massa de dados estática para os testes (*.json);
 - **integration:** arquivos de testes separados em categorias a organização (*.spec.js);
 - **plugins:** plugins que são utilizados na solução ficam dentro do arquivo "plugins/index.js";
 - **support:** camada com comandos Cypress customizados e sobrescritas globais:
    - **actions:** arquivos com as páginas de funcionalidades dos testes (*.js);
    - Arquivo commands.js responsável de receber os comandos globais no cypress;
    - Arquivo index.js responsável de receber as importações dos comandos cypress;
    - Arquivo utils.js responsável pela formatação dos valores para execução dos testes;
 - **node_modules:** arquivos ou diretórios que podem ser carregados pelo Node.js;
 - **cypress.json:** arquivo de configuração do Cypress;
 - **package-lock.json:** gerado automaticamente com as instalações e atualizações de pacotes;




 



