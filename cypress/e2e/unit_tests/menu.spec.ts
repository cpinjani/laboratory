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
import '~/cypress/support/commands';


  Cypress.config();
  describe('Menu testing', () => {
    const elemental     = new Elemental();
    const topLevelMenu  = new TopLevelMenu();
  
    beforeEach(() => {
      cy.login();
      cy.visit('/');
    });
   
    it('Check Elemental menu', () => {
      topLevelMenu.openIfClosed();

      // Click on the Elemental's icon
      elemental.accessElementalMenu(); 
      });
  });
