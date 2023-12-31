import { camelize } from "../../utils/string";

/**
 * BasePage class. All page objects must inherite from this class.
 */
export default abstract class BaseComponent {
    protected selectors: any = null;
    protected data: any = null;

    constructor() {
        try {
            this.selectors = require(`../../fixtures/selectors/${this.constructor.name}.json`);
            this.data = require(`../../fixtures/data/${this.constructor.name}.json`);
        } catch (error) {
            cy.log(`Page Object "${this.constructor.name}"`, error);
        }
    }

    /**
     * Finds a button element by the given name (inner text).
     * 
     * @param name The button's name.
     * @returns A button element.
     */
    public static getButtonByName(name: string): Cypress.Chainable {
        return cy.contains('button', name, { matchCase: false });
    }

    /**
     * Finds a button element with a span inside by the given name (inner text).
     * 
     * @param name The button's name.
     * @returns A button element.
     */
    public static getSpanButtonByName(name: string): Cypress.Chainable {
        return cy.contains('button span', name, { matchCase: false });
    }

    /**
     * Returns all page's selectors.
     * 
     * @returns All page's selectors.
     */
    public getAllSelectors(): string[] {
        return Object.keys(this.selectors);
    }

    /**
     * Gets a page element identified by the given name.
     * 
     * @param name the name of the page's element. 
     * @returns The page's element.
     */
    public getElement(name: string): Cypress.Chainable {
        const selector = this.selectors[camelize(name)];
        
        return cy.get(selector);
    }

    /**
     * Searches a page element by a param key and identified by the given name.
     * 
     * @param name the name of the page's element.
     * @param searchParam the param that describes the search key for the element. 
     * @returns The page's element.
     */
    public getElementBySearchParam(name: string, searchParam: string): Cypress.Chainable {
        const selector = this.selectors[camelize(name)].replace('{name}', searchParam);

        return cy.get(selector);
    }

    /**
     * Gets a page element identified by the given name and containing the text passed.
     * 
     * @param name the name of the page's element.
     * @param text the texts that the page's element contains.
     * @returns The page's element.
     */
    public getElementContaining(name: string, text: string): Cypress.Chainable {
        const selector = this.selectors[camelize(name)];

        return cy.contains(selector, new RegExp(`^${text}$`));
    }

    /**
     * Gets the testing data identified by the field name.
     * 
     * @param fieldName The field's name where the data will be inputted.
     * @returns The requested testing data.
     */
    public getTestData(fieldName: string): number | string | any {
        return this.data[camelize(fieldName)];
    }
}
