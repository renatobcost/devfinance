import page from '../pages/Page'
import { format } from '../support/utils.js'

describe('acesso', () => {

    beforeEach( function() {
        cy.fixture('transacao').then( (t)=> {
            this.transacao = t
        })
    })

    it('Cadastrar entradas', function() {
        page.go()
        page.fillForm(this.transacao.deposito)
        page.submit()
    });

    
    it('Cadastrar saídas', function() {
        page.go()
        page.fillForm(this.transacao.saque)
        page.submit()
    });

    it('Remover entradas', function() {
        page.go()
        page.fillForm(this.transacao.deposito)
        page.submit()
        page.removeEntry(this.transacao.deposito)
    });

    it('Remover Saídas', function() {
        page.go()
        page.fillForm(this.transacao.saque)
        page.submit()
        page.removeOutput(this.transacao.saque)
    });

    it('Validar saldo com diversas transações', function() {
        page.go()
        page.fillForm(this.transacao.deposito)
        page.submit()
        page.fillForm(this.transacao.saque)
        page.submit()

        let incomes = 0
        let expenses = 0

        cy.get('#data-table tbody tr')                      //pega a tabela e encontra 2 linhas;
            .each(($el, index, $list) =>{                   //no each ele navega em cada item da lista e executa uma ação. el:elemento atual, index:índice atual, list:lista como um todo
            cy.get($el).find('td.income, td.expense')       //seleciona só as colunas que possuem valores através das classes. income-entrada, expense-saída
                .invoke('text').then(text =>{               //obtém o texto, que no caso é o valor de entrada ou saída
                    cy.log(text)                            //texto que ele pegou 
                    cy.log(format(text))                    //texto que ele pegou formatado
                    if(text.includes('-')){                 //verifica se o texto tem sinal negativo
                        expenses = expenses + format(text)  //se possuir ele é negativo, faz a soma deles e formata
                    } else {
                        incomes = incomes + format(text)    //se não possuir é positivo, faz a soma e formata
                    }
                    cy.log('entradas', incomes)
                    cy.log('saídas', expenses)
                })
        });

        cy.get('#totalDisplay').invoke('text').then(text => {  //pega o valor da tabela
            cy.log('valor total', format(text))                //exibe o valor da tabela

            let formattedTotalDisplay = format(text)           //valor da tabela
            let expectedTotal = incomes + expenses             //soma das entradas e saídas

            expect(formattedTotalDisplay).to.eq(expectedTotal) //compara se o valor da tabela é o mesmo valor da soma
        });

        //page.captureValues()

        //page.compareValues()
        
    });

});