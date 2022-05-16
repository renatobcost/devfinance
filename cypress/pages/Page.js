import { format } from '../support/utils.js'

class PageObj{

    go(){
        cy.visit('/')
    };

    fillForm(transacao){
        cy.get('#transaction .button').click()          // id+classe
        cy.get('#description').type(transacao.nome)     // id
        cy.get('[name=amount]').type(transacao.valor)   // atributos
        cy.get('[type=date]').type(transacao.data)      // atributos
    };

    submit(){
        cy.get('button').contains('Salvar').click()     // tipo e valor
    };

    removeEntry(transacao){
        //estratégia 1: voltar para o elemento pai, e avançar para um td img attr
        cy.get('td.description').contains(transacao.nome).parent().find('img[onclick*=remove]').click()

        //estratégia 2: buscar todos os irmãos, e buscar um que tem img + attr
        //cy.get('td.description').contains(transacao.nome).siblings().children('img[onclick*=remove]').click()
    };

    removeOutput(transacao){
        //estratégia 1: voltar para o elemento pai, e avançar para um td img attr
        //cy.get('td.description').contains(transacao.nome).parent().find('img[onclick*=remove]').click()

        //estratégia 2: buscar todos os irmãos, e buscar um que tem img + attr
        cy.get('td.description').contains(transacao.nome).siblings().children('img[onclick*=remove]').click()
    };

    captureValues(){
        var incomes = 0
        var expenses = 0

        cy.get('#data-table tbody tr')                      //pega a tabela e encontra 2 linhas;
            .each(($el, index, $list) =>{                   //no each ele navega em cada item da lista e executa uma ação. el:elemento atual, index:índice atual, list:lista como um todo
            cy.get($el).find('td.income, td.expense')       //seleciona só as colunas que possuem valores através das classes. income-entrada, expense-saída
                .invoke('text').then(text =>{               //obtém o texto, que no caso é o valor de entrada ou saída
                    cy.log('valor sem formatação', text)    //texto que ele pegou 
                    cy.log('valor formatado', format(text)) //texto que ele pegou formatado
                    if(text.includes('-')){                 //verifica se o texto tem sinal negativo
                        expenses = expenses + format(text)  //se possuir ele é negativo, faz a soma deles e formata
                    } else {
                        incomes = incomes + format(text)    //se não possuir é positivo, faz a soma e formata
                    }
                })    
        });
    };

    compareValues(){
        cy.get('#totalDisplay').invoke('text').then(text => {  //pega o valor da tabela             

            let formattedTotalDisplay = format(text)           //valor da tabela
            cy.log('valor da tela',formattedTotalDisplay)      //exibe o valor da tabela

            var expectedTotal = incomes + expenses             //soma das entradas e saídas    

            expect(formattedTotalDisplay).to.eq(expectedTotal) //compara se o valor da tabela é o mesmo valor da soma
        });
    };

}

export default new PageObj;