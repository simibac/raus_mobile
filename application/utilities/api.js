baseUrl = 'http://192.168.178.38:3333/' //http://192.168.57.1:3333/

//ifconfig | grep "inet " | grep -v 127.0.0.1 | cut -d\  -f2

var api = {
  signup(agateNumber, agatePassword, userTvd, language, email, password){
    return fetch(baseUrl + 'sign-up', {
      method: 'POST',

      body: JSON.stringify({
        "email": email,
        "agate_username": agateNumber,
        "agate_password": agatePassword,
        "user_tvd": userTvd,
        "password": password,
        "language": language,
        "role": "farmer"
      })
    })
    .then((res) => checkStatus(res))
    .then((res) => res.json())
    .catch(e => e)
  },
  login(email, password){
    return fetch(baseUrl + 'get-token', {
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify({
        "email": email,
        "password": password
      })
    })
    .then((res) => checkStatus(res))
    .then((res) => res.json())
    .catch(e => e)
  },
  getUser(token){
    return fetch(baseUrl + 'api/me', {
      mode: 'no-cors',
      method: 'GET',
      headers:{
        "Authorization": "Bearer " + token,
      }
    })
    .then((res) => checkStatus(res))
    .then((res) => res.json())
    .catch(e => e)
  },

  getCows(token, farmId){
    return fetch(baseUrl + 'api/cows', {
      method: 'GET',
      mode: 'no-cors',
      headers:{
        "Authorization": "Bearer " + token,
      }
    })
    .then((res) => checkStatus(res))
    .then((res) => res.json())
    .catch(e => e)
  },

  getCowsByCategory(token, farmId){
    return fetch(baseUrl + 'api/cows-by-category', {
      method: 'GET',
      mode: 'no-cors',
      headers:{
        "Authorization": "Bearer " + token,
      }
    })
    .then((res) => checkStatus(res))
    .then((res) => res.json())
    .catch(e => e)
  },

  addJournalEntry(token, tvds, year, month, day, minutesOutside, typeOfLairage){
    console.log("lairage", typeOfLairage);
    return fetch(baseUrl + 'api/journal', {
      method: 'POST',
      headers:{
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({
        "tvds": tvds,
      	"year" : year,
      	"month": month,
      	"day" : day,
      	"minutes_outside": minutesOutside,
        "type_of_field_lairage": typeOfLairage
      })
    })
    .then((res) => checkStatus(res))
    .then((res) => res.json())
    .catch(e => e)
  },

  addCategory(token, tvds, name){
    return fetch(baseUrl + 'api/categories', {
      method: 'POST',
      headers:{
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({
        "tvds": tvds,
        "name" : name
      })
    })
    .then((res) => checkStatus(res))
    .then((res) => res.json())
    .catch(e => e)
  },

  deleteCategory(token, name, tvds){
    return fetch(baseUrl + 'api/categories', {
      method: 'DELETE',
      headers:{
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({
        "name": name,
        "tvds": tvds,
      })
    })
    .then((res) => checkStatus(res))
    .then((res) => res.json())
    .catch(e => e)
  },
  updateCategory(token, tvds, name){
    return fetch(baseUrl + 'api/categories', {
      method: 'PUT',
      headers:{
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({
        "tvds": tvds,
        "name" : name
      })
    })
    .then((res) => checkStatus(res))
    .then((res) => res.json())
    .catch(e => e)
  },
  getMonthlyStats(token, month, year){
    return fetch(baseUrl + 'api/stats?year=' + year + '&month=' + month, {
      method: 'GET',
      headers:{
        "Authorization": "Bearer " + token,
      }
    })
    .then((res) => checkStatus(res))
    .then((res) => res.json())
    .catch(e => e)
  },
}


// Helper Functions

function checkStatus(res){
  //console.log(res);
  if (res.status >= 200 && res.status < 300) {
    return res;
  } else {
    let error = new Error("Error Code: " + res.status);
    res.error = "error";
    //console.log(res);
    return res
  }
}

module.exports = api;
