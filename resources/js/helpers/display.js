const prettyDate=(displayResult)=>{
    let inputDay;
    let rawDate=displayResult.created_at.split('-');
    
    let extractDay=rawDate[2].split('')
    // console.log(extractDay)
    let first=extractDay[0];
    let second=extractDay[1];
    let fs=first+second;
    let day=parseInt(fs)
    let month=rawDate[1];
    let year=rawDate[0]
    
    let finaldate=formatDate(day,month,year);
        return finaldate;
}
const formatDate=(day,month,year)=>{
   
    const monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
      ];
      let dayWithSuffix=ordinal_suffix_of(day)
      return `${dayWithSuffix}  ${monthNames[parseInt(month)-1]} ${year}`;
}
// https://stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number
const ordinal_suffix_of=(i)=>{
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}


//export default formatDate;
module.exports = {
formatDate,
prettyDate
}