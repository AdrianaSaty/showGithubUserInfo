export const convertDateToLocaleString = (dateInString: string) => {
    const date = new Date(dateInString);
    return date.toLocaleString('pt-br');
};

export const convertNumberToPercentage = (percentageNumber: number) => {
    const percentage: string = Math.round(percentageNumber*100).toString()
    return percentage;
};