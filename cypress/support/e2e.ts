// /*
// Copyright © 2022 - 2023 SUSE LLC

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//     http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// */

// import './commands';

// declare global {
//   // eslint-disable-next-line no-unused-vars
//   namespace Cypress {
//     interface Chainable {
//       // Functions declared in commands.ts
//       addMachInvAnnotation(annotationName: string, annotationValue: string):Chainable<Element>;
//       addMachInvLabel(labelName: string, labelValue: string, useHardwareLabels?: boolean):Chainable<Element>;
//       addMachRegAnnotation(annotationName: string, annotationValue: string):Chainable<Element>;
//       addMachRegLabel(labelName: string, labelValue: string):Chainable<Element>;
//       addOsVersionChannel(channelVersion: string): Chainable<Element>;
//       byLabel(label: string,): Chainable<Element>;
//       checkFilter(filterName: string, testFilterOne: boolean, testFilterTwo: boolean, shouldNotMatch: boolean): Chainable<Element>;
//       checkLabelSize(sizeToCheck: string): Chainable<Element>;
//       checkMachInvAnnotation(machRegName: string, annotationName: string, annotationValue: string):Chainable<Element>;
//       checkMachInvLabel(machRegName: string, labelName: string, labelValue: string, afterBoot: boolean, useHardwareLabels?: boolean):Chainable<Element>;
//       checkMachRegAnnotation(machRegName: string, annotationName: string, annotationValue: string):Chainable<Element>;
//       checkMachRegLabel(machRegName: string, labelName: string, labelValue: string):Chainable<Element>;
//       clickButton(label: string,): Chainable<Element>;
//       clickElementalMenu(label: string,): Chainable<Element>;
//       clickNavMenu(listLabel: string[],): Chainable<Element>;
//       confirmDelete(): Chainable<Element>;
//       createMachReg(machRegName: string, namespace?: string, checkLabels?: boolean, checkAnnotations?: boolean, checkInventoryLabels?: boolean,
//         checkInventoryAnnotations?: boolean, checkIsoBuilding?: boolean, customCloudConfig?: string, checkDefaultCloudConfig?: boolean): Chainable<Element>;
//       deleteAllResources():Chainable<Element>;
//       deleteMachReg(machRegName: string): Chainable<Element>;
//       editMachReg(machRegName: string, addLabel?: boolean, addAnnotation?: boolean, withYAML?: boolean): Chainable<Element>;
//       getBySel(dataTestAttribute: string, args?: any): Chainable<JQuery<HTMLElement>>;
//       getDetail(name: string, type: string, namespace?: string): Chainable<Element>;
//       importMachineInventory(machineInventoryFile: string, machineInventoryName: string): Chainable<Element>;
//       login(username?: string, password?: string, cacheSession?: boolean,): Chainable<Element>;
//       typeKeyValue(key: string, value: string,): Chainable<Element>;
//       typeValue(label: string, value: string, noLabel?: boolean, log?: boolean): Chainable<Element>;
//     }
// }}

// // TODO handle redirection errors better?
// // we see a lot of 'error navigation cancelled' uncaught exceptions that don't actually break anything; ignore them here
// Cypress.on('uncaught:exception', (err, runnable) => {
//   // returning false here prevents Cypress from failing the test
//   if (err.message.includes('navigation guard')) {
//     return false;
//   }
// });


