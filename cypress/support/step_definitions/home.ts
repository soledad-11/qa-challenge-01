/// <reference types='cypress' />
import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import HomePage from '../components/pages/HomePage';
import { Month, getCurrentMonthName, getCurrentMonthNum, getMonthNum, transformToEventTimeFormatDisplayed } from '../../utils/date';
import EventEditionComponent from '../components/EventEditionComponent';
import { formatDateAsEventTitle } from '../../utils/date';
import { v4 as uuidv4 } from 'uuid';

Given('the calendar has this event previously present in the calendar', (table: any) => {
    const data: any = table.rowsHash();
    const eventKey: string = 'calendar-' + formatDateAsEventTitle(data.month, data.dayNumber);
    // Adds the event to the calendar using the local storage
    localStorage.setItem(
        eventKey,
        `[{"color":1,"description":"${data.eventName}","id":"${uuidv4()}","time":"${data.time}"}]`
    );
});

Then("the user visualizes current month's calendar", () => {
    const page: HomePage = new HomePage();
    page.getElement('monthTitle').should('have.text', getCurrentMonthName());
});

When("the user goes to {string} month's calendar", (month: Month) => {
    const page: HomePage = new HomePage();
    const numClicks: number = getCurrentMonthNum() - getMonthNum(month);
    let buttonToClick: string = 'prevButton';

    if (numClicks < 0) {
        buttonToClick = 'nextButton';
    }

    for (let i = 0; i < Math.abs(numClicks); i++) {
        page.getElement(buttonToClick).click();
    }
});

When('the user adds a new event to the calendar', (table: any) => {
    const data: any = table.rowsHash();
    const page: HomePage = new HomePage();
    // Click on calendar day cell
    page.getElementContaining('calendarDay', data.dayNumber).click();
    const eventEdition: EventEditionComponent = new EventEditionComponent();
    eventEdition.getElement('eventDescTextArea').type(data.eventName);
    const timeArray: string[] = data.time.split(':');
    const eventHour: number = parseInt(timeArray[0]);
    const eventMinutes: number = parseInt(timeArray[1]);
    cy.wrap(eventHour).should('beValid24Hour');
    cy.wrap(eventMinutes).should('beValidMinutes');

    eventEdition.getElement('hourInput').then($hourInput => {
        for (let i = $hourInput.val(); i > eventHour; i--) {
            eventEdition.getElement('hourMinusButton').click();
        }
    });

    eventEdition.getElement('minutesInput').then($minutesInput => {
        for (let i = $minutesInput.val(); i > eventMinutes; i -= $minutesInput.attr('step')) {
            eventEdition.getElement('minutesMinusButton').click();
        }
    });

    eventEdition.getElement('closeButton').click();
});

Then('the user visualizes the new added event correctly', (table: any) => {
    const data: any = table.rowsHash();
    const page: HomePage = new HomePage();

    page.getElementContaining('calendarDay', data.dayNumber)
        .should('exist')
        .and('be.visible')
        .siblings()
        .contains(data.eventName)
        .should('exist')
        .and('be.visible')
        .siblings()
        .contains(transformToEventTimeFormatDisplayed(data.time))
        .should('exist')
        .and('be.visible');
});

When('the user removes the event {string} from the calendar on day {int}',
    (eventName: string, dayNumber: number) => {
        const page: HomePage = new HomePage();
        // Click on calendar day cell
        page.getElementContaining('calendarDay', dayNumber.toString()).click();
        const eventEdition: EventEditionComponent = new EventEditionComponent();
        // Click on the delete button of the selected event
        eventEdition.getElement('eventDescTextArea')
            .contains(eventName)
            .parent().parent()
            .find('div:nth-of-type(3) span:nth-of-type(2)')
            .click();
        // Close the event edition window
        eventEdition.getElement('closeButton').click();
    }
);

Then('the user sees that the event {string} was removed from day {int}',
    (eventName: string, dayNumber: number) => {
        const page: HomePage = new HomePage();

        page.getElementContaining('calendarDay', dayNumber.toString())
            .should('exist')
            .and('be.visible')
            .siblings()
            .contains(eventName)
            .should('not.exist');
    }
);
