export const convertDateToLocaleString = (dateInString: any) => 
{   const date = new Date(dateInString);
    return date.toLocaleString('pt-br');
};