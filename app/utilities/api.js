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
}

module.exports = api;
