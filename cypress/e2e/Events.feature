Feature: Events
  As a User, I want to be able to create or delete events from the calendar.


  Scenario Outline: User adds an event to the calendar correctly
    Given the user has navigated to "Home" page
    Then the user visualizes current month's calendar
    When the user goes to "<month>" month's calendar
    And the user adds a new event to the calendar
      | eventName | <eventName> |
      | dayNumber | <dayNumber> |
      | time      | <time>      |
    Then the user visualizes the new added event correctly
      | eventName | <eventName> |
      | dayNumber | <dayNumber> |
      | time      | <time>      |

    Examples:
      | month    | eventName     | dayNumber | time  |
      | february | Groundhog Day | 2         | 00:00 |


  @focus @ignoreLast
  Scenario Outline: User removes an event from the calendar correctly
    Given the user has navigated to "Home" page
    And the calendar has this event previously present in the calendar
      | month     | <month>     |
      | dayNumber | <dayNumber> |
      | eventName | <eventName> |
      | time      | <time>      |
    Then the user visualizes current month's calendar
    When the user goes to "february" month's calendar
    And the user removes the event "<eventName>" from the calendar on day <dayNumber>
    Then the user sees that the event "<eventName>" was removed from day <dayNumber>

    Examples:
      | month    | eventName     | dayNumber | time  |
      | february | Groundhog Day | 2         | 00:00 |
