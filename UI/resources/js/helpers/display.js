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
const displayDate=(rawDate)=>{
    const date =new Date (rawDate)
    const day=date.getDate();
    const month=date.getMonth();
    const year=date.getFullYear();
    const finaldate=formatDate(day,month,year);
    return finaldate;
}


export default displayDate;