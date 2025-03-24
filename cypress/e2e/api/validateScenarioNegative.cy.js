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

    it('CT01 - Criar usuário com e-mail já cadastrado', () => {

        cy.request({
            method: 'POST',
            url: Cypress.config('baseUrl'),
            headers: {
                'Content-Type': 'application/json',
            },
            failOnStatusCode: false,
            body: {
                nome: faker.internet.username(),
                email: 'beltrano@qa.com.br',
                password: 'teste',
                administrador: 'true',
            },
        }).then((response) => {

            const mensagem = response.body

            expect(response.status).to.eq(400)
            expect(mensagem).to.have.property('message', "Este email já está sendo usado")
        })
    })

    it('CT02 - Buscar usuário com ID inválido', () => {

        cy.request({
            method: 'GET',
            url: Cypress.config('baseUrl') + '1234',
            headers: {
                'Content-Type': 'application/json',
            },
            failOnStatusCode: false,
        }).then((response) => {

            const mensagem = response.body;

            expect(response.status).to.eq(400)
            expect(mensagem).to.have.property('message', "Usuário não encontrado")
        })
    })

    it('CT03 - Atualizar usuário inexistente sem passar o ID', () => {

        cy.request({
            method: 'PUT',
            url: Cypress.config('baseUrl'),
            headers: {
                'Content-Type': 'application/json',
            },
            failOnStatusCode: false,
            body: {
                nome: "Fulano da Silva",
                email: faker.internet.email(),
                password: "testearquivoX123",
                administrador: "true"
            }

        }).then((response) => {

            const mensagem = response.body;

            expect(response.status).to.eq(405)
            expect(mensagem).to.have.property('message', "Não é possível realizar PUT em /usuarios/. Acesse https://serverest.dev para ver as rotas disponíveis e como utilizá-las.")
        })
    })

    it('CT04 - Excluir usuário inexistente', () => {

        cy.request({
            method: 'DELETE',
            url: Cypress.config('baseUrl') + '123adasdwq',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {

            const mensagem = response.body;

            expect(response.status).to.eq(200)
            expect(mensagem).to.have.property('message', "Nenhum registro excluído")
        })
    })

    it('CT05 - Criar usuário com campo obrigatório ausente', () => {

        cy.request({
            method: 'POST',
            url: Cypress.config('baseUrl'),
            headers: {
                'Content-Type': 'application/json',
            },
            failOnStatusCode: false,
            body: {
                nome: faker.internet.username(),
                password: 'teste',
                administrador: 'true',
            },
        }).then((response) => {

            const mensagem = response.body;

            expect(response.status).to.eq(400)
            expect(mensagem).to.have.property('email', "email é obrigatório")
        })
    })
})


