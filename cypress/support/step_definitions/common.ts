/// <reference types='cypress' />
import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import PageFactory from '../components/pages/PageFactory';

Given('the user has navigated to {string} page', (pageName: string) => {
    PageFactory.getCurrentPageObject(pageName).navigateToThisPage(30);
});
