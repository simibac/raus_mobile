baseUrl = 'http://192.168.1.104:3333/' //http://192.168.57.1:3333/

var api = {
  signup(firstName, lastName, email, farmId, language, password){
    return fetch(baseUrl + 'sign-up', {
      method: 'POST',

      body: JSON.stringify({
        "email": email,
        "first_name": firstName,
        "last_name": lastName,
        "farm_id": farmId,
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

      headers:{
        "Authorization": "Bearer " + token,
      }
    })
    .then((res) => checkStatus(res))
    .then((res) => res.json())
    .catch(e => e)
  },

  addJournalEntry(token, tvds, year, month, day, minutesOutside){
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
      	"minutes_outside": minutesOutside
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
  }
}


// Helper Functions

function checkStatus(res){
  if (res.status >= 200 && res.status < 300) {
    return res;
  } else {
    let error = new Error("Error Code: " + res.status);
    error.res = res;
    return res
  }
}

module.exports = api;
