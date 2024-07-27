*** Settings ***
Library           SeleniumLibrary
Library           FakeDataLibrary.py

Suite Setup       Open Browser to Login Page
Suite Teardown    Close All Browsers

*** Variables ***
${SERVER_URL}          http://localhost:5174
${VALID_EMAIL}         khsmail@gmail.com
${VALID_PASSWORD}      Wild2024@
${INVALID_EMAIL}       khsmail21@gmail.com
${WRONG_PASSWORD}      Wild20234@
${NEW_USER_PASSWORD}   Wild2024@


*** Test Cases ***

Adresse Mail Non Valide
    [Tags]    FailedLogin
    Input Text    id=email    ${INVALID_EMAIL}
    Input Text    id=password    ${VALID_PASSWORD}
    Click Button    Se connecter
    Page Should Contain    l'adresse mail n'existe pas ou votre compte est désactivé

Mot de Passe Non Valide
    [Tags]    FailedLogin
    Input Text    id=email    ${VALID_EMAIL}
    Input Text    id=password    ${WRONG_PASSWORD}
    Click Button    Se connecter
    Page Should Contain    Vos données ne sont pas valides

Tous les Champs Sont Obligatoires
    [Tags]    FailedLogin
    Input Text    id=email    khsmail1@gmail.com
    Click Button    Se connecter
    Page Should Contain    Vos données ne sont pas valides

Connexion Réussie
    [Tags]    SuccessfulLogin
    Input Text    id=email    ${VALID_EMAIL}
    Input Text    id=password    ${VALID_PASSWORD}
    Click Button    Se connecter
    Location Should Contain    /admin/dashboard

Tester la Page Équipe
    [Tags]    Navigation
    Click Link    Équipe
    Page Should Contain    Admin
    Page Should Contain    Notre équipe

Création d'un Nouvel Utilisateur Réussie
    [Tags]    UserRegistration
    Click Link    Création de user
    ${userData}=    Generate User Data
    Input Text    id=firstname    ${userData['firstName']}
    Input Text    id=lastname    ${userData['lastName']}
    Input Text    id=pseudo    ${userData['pseudo']}
    Input Text    id=email    ${userData['email']}
    Input Text    id=password    ${NEW_USER_PASSWORD}
    Input Text    id=role    ${userData['role']}
    Click Button    Créer
    Page Should Contain    Félicitaion ! votre compte à été bien créer

Création d'un Nouvel Utilisateur Échouée
    [Tags]    UserRegistration
    Click Link    Création de user
    ${userData}=    Generate User Data
    Input Text    id=firstname    ${userData['firstName']}
    Input Text    id=lastname    ${userData['lastName']}
    Input Text    id=pseudo    ${userData['pseudo']}
    Input Text    id=email    ${userData['email']}
    Input Text    id=password    Wild20235
    Input Text    id=role    ${userData['role']}
    Click Button    Créer
    Page Should Contain    Vos données ne sont pas valides

Afficher le Profile de l'Utilisateur
    [Tags]    Profile
    Click Element    id=headlessui-menu-button-\\:r5\\:
    Click Link    Mon profile
    Page Should Contain Element    label=Prénom
    Page Should Contain Element    label=Nom
    Page Should Contain Element    label=Pseudo
    Page Should Contain Element    label=Email
    Page Should Contain Element    label=Status
    Page Should Contain Element    label=Avatar

Mettre à Jour le Profile de l'Utilisateur
    [Tags]    ProfileUpdate
    Click Element    id=headlessui-menu-button-\\:r5\\:
    Click Link    Mon profile
    Click Button    Mettre à jour mes données
    Clear Element Text    id=pseudo
    Input Text    id=pseudo    khsmail
    Page Should Contain    Vos données sont mises à jour !

Tester le Bouton Logout
    [Tags]    Logout
    Click Element    id=headlessui-menu-button-\\:r5\\:
    Click Button    Déconnexion
    Location Should Be    ${SERVER_URL}/

*** Keywords ***

Open Browser to Login Page
    Open Browser    ${SERVER_URL}    edge
    Maximize Browser Window

Close All Browsers
    [Teardown]   Close All Browsers

