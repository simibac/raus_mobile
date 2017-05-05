var api = {
  signup(firstName, lastName, email, farmId, language, password){
    return fetch('http://192.168.57.1:3333/sign-up', {
      method: 'POST',

      body: JSON.stringify({
        "email": email,
        "first_name": firstName,
        "last_name": lastName,
        "farm_id": farmId,
        "password": password,
        "language": language,
        "created": "12.12.2012",//new Date(),
        "role": "farmer"
      })
    })
    .then((res) => checkStatus(res))
    .then((res) => res.json())
    .catch(e => e)
  },
  login(email, password){
    return fetch('http://192.168.57.1:3333/get-token', {
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
    return fetch('http://192.168.57.1:3333/api/me', {
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
    return fetch('http://192.168.57.1:3333/api/cows', {
      method: 'GET',

      headers:{
        "Authorization": "Bearer " + token,
      }
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
