const generateUserData = require('../support/generateUser');
describe('template spec - connexion echouée', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5174/');
  });

  it('adresse mail non valide (USER)', () => {
    cy.get("#email").type("khsmail21@gmail.com");
    cy.get("#password").type("Wild2024@");
    cy.get("button").contains("Se connecter").click();
    cy.contains("l'adresse mail n'existe pas ou votre compte est désactivé")
      .should('be.visible'); 
  });

  it('password non valide', () => {
    cy.get("#email").type("khsmail@gmail.com");
    cy.get("#password").type("Wild20234");
    cy.get("button").contains("Se connecter").click();
    cy.contains("Vos données ne sont pas valides").should('be.visible'); 
  });

  it('tous les champs sont obligatoires', () => {
    cy.get("#email").type("khsmail1@gmail.com");
    cy.get("button").contains("Se connecter").click();
    cy.contains("Vos données ne sont pas valides")
      .should('be.visible'); 
  });
});

describe('template spec - connexion réussie', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5174/');
    cy.get("#email").type("khsmail@gmail.com");
    cy.get("#password").type("Wild2024@");
    cy.get("button").contains("Se connecter").click();
    cy.url().should('include', '/admin/dashboard');
  });

  it('teter la page equipe', () => {
    cy.get('a').contains('Équipe').click();
    cy.get("h1").contains("Admin").should('be.visible'); 
    cy.get("h2").contains("Notre équipe").should('be.visible'); 
  });
  it("création d'un nouvel utilisateur réussie", () => {
    cy.get('a').contains('Création de user').click();
      const userData = generateUserData();
      cy.get("#firstname").type(userData.firstName);
      cy.get("#lastname").type(userData.lastName);
     cy.get("#pseudo").type(userData.pseudo);
      cy.get("#email").type(userData.email);
      cy.get("#password").type("Wild2024@");
      cy.get("#role").type(userData.role);
      cy.get('button').contains("Créer").click();
      cy.contains("Félicitaion ! votre compte à été bien créer").should('be.visible')
     
    });
    it("création d'un nouvel utilisateur échouée", () => {
      cy.get('a').contains('Création de user').click();
        const userData = generateUserData();
        cy.get("#firstname").type(userData.firstName);
        cy.get("#lastname").type(userData.lastName);
        cy.get("#pseudo").type(userData.pseudo);
        cy.get("#email").type(userData.email);
        cy.get("#password").type("Wild2024");
        cy.get("#role").type(userData.role);
        cy.get('button').contains("Créer").click();
        cy.contains("Vos données ne sont pas valides").should('be.visible')
  
      });
    it("afficher le profile de l'utilisateur", () => {
        cy.get('#headlessui-menu-button-\\:r5\\:').click();
        cy.get("a").contains("Mon profile").click();
        cy.contains('label', 'Prénom').should('exist');
        cy.contains('label', 'Nom').should('exist');
        cy.contains('label', 'Pseudo').should('exist');
        cy.contains('label', 'Email').should('exist');
        cy.contains('label', 'Status').should('exist');
        cy.contains('label', 'Avatar').should('exist'); 
      });
      it("mettre à jor le profile de l'utilisateur", () => {
        cy.get('#headlessui-menu-button-\\:r5\\:').click();
        cy.get("a").contains("Mon profile").click();
        cy.get('button').contains("Mettre à jour mes données").click();
        cy.get('#pseudo').clear().type('khsmail').should('have.value', 'khsmail');
        cy.get('button').contains("Valider").click();
        cy.contains("Vos données sont mises à jour !").should('be.visible');
      /*  cy.get("a").contains("Mettre à jour mon mot de passe").click();
        cy.get("#oldPassword").type("Wild2024@");
        cy.get("#newPassword").type("Wild20234@");
        cy.get('button').contains("Valider").click().wait(12000)
        cy.contains("Votre opperation est réalisée aevc succes !").should('be.visible').wait(200000);
       */

      });
      it("tester le bouton logout",()=>{
        cy.get('#headlessui-menu-button-\\:r5\\:').click();
        cy.get("button").contains("Déconnexion").click();
        cy.url().should('eq', 'http://localhost:5174/');


      })
  
  
});
