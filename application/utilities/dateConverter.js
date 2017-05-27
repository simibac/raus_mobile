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
  getMonth(month){
    switch(month){
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
  },
  getDayMonthYear(date){
    return date.getDate() + "-" + (date.getMonth()+1) + "-" + date.getFullYear()
  },
  getMonthNumber(month){
    switch(month){
      case "Jan": return 1
      case "Feb": return 2
      case "Mar": return 3
      case "Apr": return 4
      case "May": return 5
      case "Jun": return 6
      case "Jul": return 7
      case "Aug": return 8
      case "Sep": return 9
      case "Okt": return 10
      case "Nov": return 11
      case "Dez": return 12
    }
  }
}

module.exports = dateConverter;
