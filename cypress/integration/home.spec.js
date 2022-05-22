import auth from '../support/actions/AuthActions'
import { format } from '../support/utils.js'

describe('acesso', () => {

    beforeEach( function() {
        cy.fixture('transacao').then( (t)=> {
            this.transacao = t
        })
    })

    it('Cadastrar entradas', function() {
        auth.go()
        auth.fillForm(this.transacao.deposito)
        auth.submit()
    });

    
    it('Cadastrar saídas', function() {
        auth.go()
        auth.fillForm(this.transacao.saque)
        auth.submit()
    });

    it('Remover entradas', function() {
        auth.go()
        auth.fillForm(this.transacao.deposito)
        auth.submit()
        auth.removeEntry(this.transacao.deposito)
    });

    it('Remover Saídas', function() {
        auth.go()
        auth.fillForm(this.transacao.saque)
        auth.submit()
        auth.removeOutput(this.transacao.saque)
    });

    it('Validar saldo com diversas transações', function() {
        auth.go()
        auth.fillForm(this.transacao.deposito)
        auth.submit()
        auth.fillForm(this.transacao.saque)
        auth.submit()

        let incomes = 0
        let expenses = 0

        //soma todos os valores de entrada e saída
        cy.get('#data-table tbody tr')                      
            .each(($el, index, $list) =>{                   
            cy.get($el).find('td.income, td.expense')       
                .invoke('text').then(text =>{               
                    cy.log(text)                            
                    cy.log(format(text))                    
                    if(text.includes('-')){                 
                        expenses = expenses + format(text)  
                    } else {
                        incomes = incomes + format(text)   
                    }
                })
        });

        //compara o valor da soma feita anteriormente com o valor que é exibido na tela
        cy.get('#totalDisplay').invoke('text').then(text => {  
            cy.log('valor total', format(text))                

            let formattedTotalDisplay = format(text)           
            let expectedTotal = incomes + expenses             

            expect(formattedTotalDisplay).to.eq(expectedTotal) 
        });
        
    });

});