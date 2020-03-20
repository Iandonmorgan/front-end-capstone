export default {
    monthDayYear(date) {
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    let formatted_date = months[(Number(date.split("-")[1]) - 1)] + " " + date.split("-")[0];
    return formatted_date;
    }
};