/*
Copyright © 2022 - 2023 SUSE LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// Generic commands

// Log into Rancher
Cypress.Commands.add('login', (
  username = Cypress.env('username'),
  password = Cypress.env('password'),
  cacheSession = Cypress.env('cache_session')) => {
    const login = () => {
      let loginPath ="/v3-public/localProviders/local*";
      cy.intercept('POST', loginPath).as('loginReq');
      
      cy.visit('/auth/login');

      cy.getBySel('local-login-username')
        .type(username, {log: false});

      cy.getBySel('local-login-password')
        .type(password, {log: false});

      cy.getBySel('login-submit')
        .click();
      cy.wait('@loginReq');
      cy.getBySel('banner-title').contains('Welcome to Rancher');
      } 

    if (cacheSession) {
      cy.session([username, password], login);
    } else {
      login();
    }
});

// Search by data-testid selector
Cypress.Commands.add("getBySel", (selector, ...args) => {
  return cy.get(`[data-testid=${selector}]`, ...args);
});

// Search fields by label
Cypress.Commands.add('byLabel', (label) => {
  cy.get('.labeled-input')
    .contains(label)
    .siblings('input');
});

// Search button by label
Cypress.Commands.add('clickButton', (label) => {
  cy.get('.btn')
    .contains(label)
    .click();
});

// Confirm the delete operation
Cypress.Commands.add('confirmDelete', () => {
  cy.getBySel('prompt-remove-confirm-button')
    .click()
});

// Make sure we are in the desired menu inside a cluster (local by default)
// You can access submenu by giving submenu name in the array
// ex:  cy.clickClusterMenu(['Menu', 'Submenu'])
Cypress.Commands.add('clickNavMenu', (listLabel: string[]) => {
  listLabel.forEach(label => cy.get('nav').contains(label).click());
});

// Insert a value in a field *BUT* force a clear before!
Cypress.Commands.add('typeValue', (label, value, noLabel, log=true) => {
  if (noLabel === true) {
    cy.get(label)
      .focus()
      .clear()
      .type(value, {log: log});
  } else {
    cy.byLabel(label)
      .focus()
      .clear()
      .type(value, {log: log});
  }
});

// Make sure we are in the desired menu inside a cluster (local by default)
// You can access submenu by giving submenu name in the array
// ex:  cy.clickClusterMenu(['Menu', 'Submenu'])
Cypress.Commands.add('clickClusterMenu', (listLabel: string[]) => {
  listLabel.forEach(label => cy.get('nav').contains(label).click());
});

// Insert a key/value pair
Cypress.Commands.add('typeKeyValue', (key, value) => {
  cy.get(key)
    .clear()
    .type(value);
});

// Add Helm repo
Cypress.Commands.add('addHelmRepo', (repoName, repoUrl, repoType) => {
  cy.clickClusterMenu(['Apps', 'Repositories'])

  // Make sure we are in the 'Repositories' screen (test failed here before)
  cy.contains('header', 'Repositories')
    .should('be.visible');
  cy.contains('Create')
    .should('be.visible');

  cy.clickButton('Create');
  cy.contains('Repository: Create')
    .should('be.visible');
  cy.typeValue('Name', repoName);
  if (repoType === 'git') {
    cy.contains('Git repository')
      .click();
    cy.typeValue('Git Repo URL', repoUrl);
    cy.typeValue('Git Branch', 'main');
  } else {
    cy.typeValue('Index URL', repoUrl);
  }
  cy.clickButton('Create');
});

// Delete all resources from a page
Cypress.Commands.add('deleteAllResources', () => {  
  cy.get('[width="30"] > .checkbox-outer-container')
    .click();
  cy.getBySel('sortable-table-promptRemove')
    .contains('Delete')
    .click()
  cy.confirmDelete();
  // Sometimes, UI is crashing when a resource is deleted
  // A reload should workaround the failure
  cy.get('body').then(($body) => {
    if (!$body.text().includes('There are no rows to show.')) {
        cy.reload();
        cy.log('RELOAD TRIGGERED');
        cy.screenshot('reload-triggered');
      };
    });
  cy.contains('There are no rows to show', {timeout: 15000});
});

