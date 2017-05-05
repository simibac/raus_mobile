dateConverter={
  getDay(day){
    switch(day){
      case 0: return "Sunday"
      case 1: return "Monday"
      case 2: return "Tuesday"
      case 3: return "Wednesday"
      case 4: return "Thursday"
      case 5: return "Friday"
      case 6: return "Saturday"
    }
  },
  getMonth(day){
    switch(day){
      case 0: return "Jan"
      case 1: return "Feb"
      case 2: return "Mar"
      case 3: return "Apr"
      case 4: return "May"
      case 5: return "Jun"
      case 6: return "Jul"
      case 7: return "Aug"
      case 8: return "Sep"
      case 9: return "Okt"
      case 10: return "Nov"
      case 11: return "Dez"
    }
  },
  getDayEnding(day){
    switch(day){
      case 1: return "st"
      case 2: return "nd"
      default: return "th"
    }
  }
}

module.exports = dateConverter;
