const generateUserData = require('../support/generateUser');
const userData = generateUserData();
describe('template spec - connexion echouée', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });
  it('adresse mail non valide (USER)', () => {
    cy.get("#email").type("khsmailaz@gmail.com");
    cy.get("#password").type("Wild2024@");
    cy.get("button").contains("Se connecter").click();
    cy.contains("Erreur lors de la connexion").should('be.visible'); 
  });

  it('password non valide', () => {
    cy.get("#email").type("lfvdtwef@gmail.com");
    cy.get("#password").type("Wild20234");
    cy.get("button").contains("Se connecter").click();
    cy.contains("Erreur lors de la connexion").should('be.visible'); 
  });
  it("création d'un nouvel utilisateur réussie", () => {
    cy.get('button').contains("S'enregistrer").click();
      cy.get("#firstname").type(userData.firstName);
      cy.get("#lastname").type(userData.lastName);
      cy.get("#pseudo").type(userData.pseudo);
      cy.get("#email").type(userData.email);
      cy.get("#password").type("Wild2024@");
      cy.get("#avatar").type("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7fKxd1307EWxZ9Ot-6V96s9eA0yecW3s7IQ&s");
      cy.get('button').contains("Sinscrire").click();
      cy.contains("Inscription réussie ! Merci de vous connecter").should("be.visible");
      cy.url().should('eq',"http://localhost:5173/");
    });
    it("création d'un nouvel utilisateur avec email existant déja (echouée) ", () => {
        cy.get('button').contains("S'enregistrer").click();
          cy.get("#firstname").type(userData.firstName);
          cy.get("#lastname").type(userData.lastName);
          cy.get("#pseudo").type(userData.pseudo);
          cy.get("#email").type(userData.email);
          cy.get("#password").type("Wild2024@");
          cy.get("#avatar").type("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7fKxd1307EWxZ9Ot-6V96s9eA0yecW3s7IQ&s");
          
          cy.get('button').contains("Sinscrire").click();
          cy.contains("Email déjà utilisé").should("be.visible");
          cy.url().should('eq',"http://localhost:5173/");
        });
});

describe('template spec - connexion réussie', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
    cy.get("#email").type("Kelvin32@gmail.com");
    cy.get("#password").type("Wild2024@");
    cy.get("button").contains("Se connecter").click();
    cy.url().should('eq',"http://localhost:5173/dashboard");
    cy.contains("Bienvenue !").should("be.visible");
    cy.percySnapshot('user Home Page')
  });
 it('tester la nav barre ', () => {
    cy.contains("Accueil").should('be.visible');
    cy.contains("Déconnexion").should('be.visible');
    cy.get("._avatar_1zjy2_35").should("be.visible")
  });
  it("tester l'ajout d'un article ", () => {
    cy.get("._addArticle_1ptdj_58").click();
    cy.get("#title").type("article");
    cy.get("#description").type("nouvelle description");
    cy.get('#categorie').select('testeurQA');
    cy.get("._buttonAddArticle_1sfud_92").click();
  });
it("ajouter modifier et supprimer un commentaire ",()=>{ 
cy.get("._cards_1ptdj_4 div").first().click();
cy.reload();
cy.get('._comments_1ekwb_54 ._titleAndButtonComments_1ekwb_64').find('button._button_1ekwb_72').click();
cy.get("#description").type("description de métier");
cy.get("._buttonAddArticle_1sfud_92").click();
cy.contains("Ajout du commentaire réussi !").should("be.visible");
//modifier un commentaire
cy.get("._buttonContainer_1ekwb_72").find("._button_1ekwb_72").first().click();
cy.get("#description").clear().type("description de nouveau métier");
cy.get("._buttonAddArticle_1sfud_92").click();
cy.contains("Commentaire modifié avec succès !");
//supprimer un commentaire
cy.get("._buttonContainer_1ekwb_72").find("._buttonDelete_1ekwb_90").first().click();
cy.contains("Commentaire supprimé !")


});

it("tester le logo de profil",()=>{
    cy.get("._avatar_1zjy2_35").click();
    cy.reload();
    cy.contains('h3', 'Mon profile');
    cy.contains('h2','Mes articles')
  });
  
  it("modifier un article ",()=>{
    cy.get("._avatar_1zjy2_35").click();
    cy.reload();
    cy.get("._buttonContainerCard_ikgi6_116").find("._editPassword_ikgi6_4").first().click();
    cy.get("#title").clear().type("article");
    cy.get("#description").clear().type("description de métier testeur");
    cy.get('#category').select('testeurQA');
    cy.get("._buttonAddArticle_1sfud_92").click();
    cy.contains("Modification de l'article réussie !")
  });
  it("supprimer un article",()=>{
    cy.get("._avatar_1zjy2_35").click();
    cy.reload();
    cy.get("._buttonContainerCard_ikgi6_116").find("._buttonDelete_ikgi6_99").first().click();
    cy.contains('Article supprimé !')

  });
  it("modifier le profile utilisateur(password) echouée",()=>{
    cy.get("._avatar_1zjy2_35").click();
    cy.reload();
   cy.get("._editPassword_ikgi6_4").click();
   cy.get("#oldPassword").type("Wild2023ac4@");
   cy.get("#newPassword").type("Wild20DFS25@");
   cy.get("._buttonEditPassword_v9cr0_74").click();
   cy.contains("Erreur lors de la modification du mot de passe")
  });
  /*it("modifier le profile utilisateur(password) echouée",()=>{
    cy.get("._avatar_1zjy2_35").click();
    cy.reload();
   cy.get("._editPassword_ikgi6_4").click();
   cy.get("#oldPassword").type("Wild2025@");
   cy.get("#newPassword").type("Wild2024@");
   cy.get("._buttonEditPassword_v9cr0_74").click();
   cy.contains("Mot de passe modifié!")
  });*/
it("tester le bouton déconnexion",()=>{
  cy.get("li").contains("Déconnexion").click();
  cy.url().should('eq','http://localhost:5173/');
  cy.contains("Déconnexion réussie").should("be.visible");
});  
});



