import { describe } from "mocha";
import { faker } from '@faker-js/faker';

describe('Requisições Serverest', () => {

    /*variaveis Globais*/

    let loginData
    let token

    beforeEach(() => {

        cy.creatUser(loginData).then((tokenId) => {
            token = tokenId
        })
    })

    it('CT01 - Retorna uma lista de todos os usuários', () => {

        cy.request({
            method: 'GET',
            url: Cypress.config('baseUrl'),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {

            const mensagem = response.body;

            expect(response.status).to.eq(200)
            expect(mensagem).to.have.property('quantidade')
            expect(mensagem).to.have.property('usuarios')
        })
    })

    it('CT02 - Retorna os detalhes de um usuário específico', () => {

        cy.request({
            method: 'GET',
            url: Cypress.config('baseUrl') + `${token}`,
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {

            const mensagem = response.body;

            expect(response.status).to.eq(200)
            expect(mensagem).to.have.property('nome')
            expect(mensagem).to.have.property('email')
            expect(mensagem).to.have.property('password')
            expect(mensagem).to.have.property('administrador')
            expect(mensagem).to.have.property('_id')
        })
    })

    it('CT03 - Atualiza as informações do usuário criado', () => {

        cy.request({
            method: 'PUT',
            url: Cypress.config('baseUrl') + `${token}`,
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                nome: "Fulano 123 Silva",
                email: faker.internet.email(),
                password: "teste123",
                administrador: "true"
            }

        }).then((response) => {

            const mensagem = response.body;

            expect(response.status).to.eq(200)
            expect(mensagem).to.have.property('message', 'Registro alterado com sucesso')
        })
    })

    it('CT04 - Exclui o usuário criado', () => {

        cy.request({
            method: 'DELETE',
            url: Cypress.config('baseUrl') + `${token}`,
            headers: {
                'Content-Type': 'application/json',
            },
        })
    })
})


