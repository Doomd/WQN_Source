export const formatDate = (userDate) => {
    // split date string at '/' 
    var dateArr = userDate.split('/');

    // check for single number dar or month
    // prepend '0' to single number dar or month
    if (dateArr[0].length === 1) {
        dateArr[0] = '0' + dateArr[0];
    }
    if (dateArr[1].length === 1) {
        dateArr[1] = '0' + dateArr[1];
    }
    // concatenate new values into one string
    userDate = dateArr[0] + "/" + dateArr[1] + "/" + dateArr[2];
    //alert("userDate is " + userDate)

    // test new string value
    //console.log(userDate);

    // return value
    return userDate;
}