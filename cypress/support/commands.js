// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import { faker } from '@faker-js/faker';

//Logando no serviço
Cypress.Commands.add('loginServeRest', (loginData) => {

    const { email, password } = loginData

    cy.request({

        method: 'POST',
        url: 'https://serverest.dev/#/Login/post_login',
        body: {
            email: email,
            password: password
        }

    }).then(res => {

        const { menssage, authorization } = res.body

        expect(res.status).to.eq(200)
        expect(menssage).to.eq('Login realizado com sucesso')
        expect(authorization).to.eql(`Bearer ${token}`)

        return token
    })
})

//Criando usuário
Cypress.Commands.add('creatUser', (loginData) => {
    cy.request({

        method: 'POST',
        url: 'https://serverest.dev/usuarios/',
        headers: {
            'Content-Type': 'application/json',
        },
        body: {
            nome: faker.internet.username(),
            email: faker.internet.email(),
            password: 'teste',
            administrador: 'true',
        },
    }).then((response) => {

        const token = response.body._id
        return token;

    })
})

