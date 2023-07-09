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

import { TopLevelMenu } from '~/cypress/support/toplevelmenu';
import { Elemental } from '~/cypress/support/elemental';
import '~/support/commands';

Cypress.config();
describe('User role testing', () => {
  const elemental     = new Elemental();
  const elementalUser = "elemental-user"
  const stdUser       = "std-user"
  const topLevelMenu  = new TopLevelMenu();
  const uiPassword    = "rancherpassword"

  beforeEach(() => {
    cy.visit('/');
  });


    it('Create elemental user', () => {
      // User with the elemental-administrator role
      cy.login();
      topLevelMenu.openIfClosed();
      cy.getBySel('side-menu')
        .contains('Users & Authentication')
        .click();
      cy.contains('.title', 'Users')
        .should('exist');
      cy.clickButton('Create');
      cy.typeValue('Username', stdUser);
      cy.typeValue('New Password', uiPassword);
      cy.typeValue('Confirm Password', uiPassword);
      cy.clickButton('Create');
    });

    it('Create standard user', () => {
      // User without the elemental-administrator role
      cy.login();
      topLevelMenu.openIfClosed();
      cy.getBySel('side-menu')
        .contains('Users & Authentication')
        .click();
      cy.contains('.title', 'Users')
        .should('exist');
      cy.getBySel('masthead-create')
        .contains('Create')
        .click();
      cy.typeValue('Username', elementalUser);
      cy.typeValue('New Password', uiPassword);
      cy.typeValue('Confirm Password', uiPassword);
      cy.contains('Elemental Administrator')
        .click();
      cy.getBySel('form-save')
        .contains('Create')
        .click();
    });

    it('Elemental user should access the OS management menu', () => {
      cy.login(elementalUser, uiPassword);
      cy.getBySel('banner-title')
        .contains('Welcome to Rancher');
      topLevelMenu.openIfClosed();
      elemental.elementalIcon().should('exist');
      elemental.accessElementalMenu();
      elemental.checkElementalNav();
    });

    it('Standard user should not access the OS management menu', () => {
      cy.login(stdUser, uiPassword);
      cy.getBySel('banner-title')
        .contains('Welcome to Rancher');
      topLevelMenu.openIfClosed();
      elemental.elementalIcon().should('exist');
      elemental.accessElementalMenu();
      // User without appropriate role will get a specific page
      cy.getBySel('elemental-icon')
        .should('exist');
      cy.getBySel('elemental-description-text')
        .contains('Elemental is a software stack')
        .should('exist');
      cy.getBySel('warning-not-install-or-no-schema')
        .should('exist');
    });
  });
