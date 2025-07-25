describe('Reqres API Automation Tests', () => {

    it('GET - List Users', () => {
        cy.request('GET', 'https://reqres.in/api/users?page=2')
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('data');
            });
    });

    it('GET - Single User', () => {
        cy.request('GET', 'https://reqres.in/api/users/2')
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.data).to.have.property('id', 2);
            });
    });

    it('GET - Single User Not Found', () => {
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/users/23',
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401);
        });
    });

    it('POST - Create User', () => {
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/users',
            headers: {
                'x-api-key': 'reqres-free-v1'
            },
            body: {
                name: 'morpheus',
                job: 'leader'
            },
            failOnStatusCode: true
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('name', 'morpheus');
        });
    });

    it('PUT - Update User', () => {
        cy.request({
            method: 'PUT',
            url: 'https://reqres.in/api/users/2',
            headers: {
                'x-api-key': 'reqres-free-v1'
            },
            body: {
                name: 'morpheus',
                job: 'zion resident'
            },
            failOnStatusCode: true
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('job');
        });
    });

    it('PATCH - Update User', () => {
        cy.request({
            method: 'PATCH',
            url: 'https://reqres.in/api/users/2',
            headers: {
                'x-api-key': 'reqres-free-v1'
            },
            body: {
                name: 'neo'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('name', 'neo');
        });
    });

    it('DELETE - Delete User', () => {
        cy.request({
            method: 'DELETE',
            url: 'https://reqres.in/api/users/2',
            headers: {
                'x-api-key': 'reqres-free-v1'
            },
            failOnStatusCode: true
        }).then((response) => {
            expect(response.status).to.eq(204);
        });
    });

    it('POST - Register Successful', () => {
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/register',
            headers: {
                'x-api-key': 'reqres-free-v1'
            },
            body: {
                email: 'eve.holt@reqres.in',
                password: 'pistol'
            },
            failOnStatusCode: true
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('token');
        });
    });

    it('POST - Register Unsuccessful', () => {
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/register',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                email: 'sydney@fife'
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401);
            expect(response.body).to.have.property('error');
        });
    });

    it('POST - Login Successful', () => {
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/login',
            headers: {
                'x-api-key': 'reqres-free-v1'
            },
            body: {
                email: 'eve.holt@reqres.in',
                password: 'cityslicka'
            },
            failOnStatusCode: true
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('token');
        });
    });

    it('POST - Login Unsuccessful', () => {
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/login',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                email: 'peter@klaven'
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401);
            expect(response.body).to.have.property('error');
        });
    });

    it('GET - Delayed Response', () => {
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/users?delay=3',
            failOnStatusCode: false
        }).then((response) => {
            cy.log('Status Code:', response.status)
            if (response.status === 200) {
                expect(response.body).to.have.property('data');
            } else {
                expect(response.status).to.eq(401);
            }
        });
    });

});