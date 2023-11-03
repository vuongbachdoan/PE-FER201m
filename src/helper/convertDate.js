export const convertDate = (isoDate) => {
    let date = new Date(isoDate);
    let day = ('0' + date.getDate()).slice(-2);
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let year = date.getFullYear();
    return day + '/' + month + '/' + year;
}
