function removeTime(date: string): string {
    return date.split('T')[0];
}

function removeDate(date: string): string {
    return date.split('T')[1];
}

function subtractDays(date: Date, days: number): Date {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - days);
    return newDate;
}

function addDays(date: Date, days: number): Date {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
}

function formatDate(locale: Intl.LocalesArgument, date?: string): string {
    if (!date) return '';
    const newDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return newDate.toLocaleDateString(locale, options);
}

export { removeTime, removeDate, subtractDays, addDays, formatDate };