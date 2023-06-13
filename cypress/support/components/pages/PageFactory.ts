import BasePage from "./BasePage";
import HomePage from "./HomePage";

export default class PageFactory {
    /**
     * Gets the page's object for the given name.
     * 
     * @param pageName The page's name.
     * @returns A page object.
     */
    public static getCurrentPageObject(pageName: string): BasePage {
        let page: BasePage;

        switch (pageName) {
            case 'Home':
                page = new HomePage();
                break;
            
            default:
                throw new Error(`"${pageName}" page not implemented yet!`);
        }

        return page;
    };
}
