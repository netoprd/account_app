import moment from "moment";

export const formatter = new Intl.NumberFormat('en-NI', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2
});
export const formatter1 = new Intl.NumberFormat('en-NI', {
    minimumFractionDigits: 2
});
export const formatter2 = new Intl.NumberFormat('en-NI', {});

export const fourDecimal = (myNumber) => {
    const num = parseFloat(myNumber).toFixed(4);
    return num;
}

export const toDate = (date) => {
    const newDate = moment(date).format('DD-MMM-YYYY');
    return newDate;
}