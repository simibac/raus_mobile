var api = {
  addUser(email, firstName, lastName, farmId, password, role, language){
    return fetch('http://10.0.3.2:3333/sign-up', {
      method: 'POST',

      body: JSON.stringify({
        "email": email,
        "first_name": firstName,
        "last_name": lastName,
        "farm_id": farmId,
        "password": password,
        "role": role,
        "language": language
      })
    }).then((res) => res.json()).catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
      throw error;
    });
  },
  login(email, password){
    return fetch('http://192.168.57.1:3333/get-token', {
      method: 'POST',

      body: JSON.stringify({
        "email": email,
        "password": password
      })
    }).then((res) => res.json()).catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
      throw error;
    });
  },
  getUser(token){
    return fetch('http://192.168.57.1:3333/api/me', {
      method: 'GET',

      headers:{
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
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
    throw error;
  }
}

module.exports = api;
