import moment from 'moment';

export enum Month {
    january = 1,
    february,
    march,
    april,
    may,
    june,
    july,
    august,
    september,
    october,
    november,
    december,
}

export const getCurrentMonthName = (): string => new Date().toLocaleString("en-US", { month: "long" }).toLowerCase();

export const getCurrentMonthNum = (): number => new Date().getMonth() + 1;

// It should use moment to avoid flaky tests in firefox (bug)
export const getMonthNum = (monthName: Month): number => moment(monthName, 'MMMM').month() + 1;

export const transformToEventTimeFormatDisplayed = (time: string): string => {
    const [hours, minutes] = time.split(':');

    return `${parseInt(hours)}:${parseInt(minutes)}`;
}

export const formatDateAsEventTitle = (monthName: Month, dayNumber: number): string => {
    const date = new Date(new Date().getFullYear(), getMonthNum(monthName) - 1, dayNumber);

    return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "2-digit",
        year: "numeric",
    }).replace(/,/g, '');
}
