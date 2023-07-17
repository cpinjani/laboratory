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

import { Rancher } from '~/cypress/support/rancher';
import '~/support/commands';

Cypress.config();
describe('User role testing', () => {
  const rancher    = new Rancher();
  const stdUser    = "std-user"
  const uiPassword = "rancherpassword"

  beforeEach(() => {
    cy.visit('/');
  });


  it('Create standard user', () => {
    // User without the administrator role
    cy.login();
    rancher.burgerMenuOpenIfClosed();
    rancher.createUser(stdUser, uiPassword);
  });

  it('Standard user should access the Cluster management menu', () => {
    cy.login(stdUser, uiPassword);
    cy.getBySel('banner-title')
      .contains('Welcome to Rancher');
    rancher.burgerMenuOpenIfClosed();
    rancher.checkNavIcon('cluster').should('exist');
    rancher.accessMenu('Cluster Management');
  });
});