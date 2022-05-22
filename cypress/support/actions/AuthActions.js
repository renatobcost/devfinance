

class Auth{

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

}

export default new Auth;