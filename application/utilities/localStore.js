import {
  AsyncStorage,
} from 'react-native';

var localStore = {
  async setToken(token){
    try{
      await AsyncStorage.setItem("token", token)
    }
    catch(error){
      console.log(error)
    }
  },

  async getToken(){
    try{
      const token = await AsyncStorage.getItem("token");
      if (token != null){
        return token
      }
    }
    catch(error){
      console.log(error)
    }
  },

  async deleteToken(){
    try{
      await AsyncStorage.removeItem("token")
    }
    catch(error){
      console.log(error)
    }
  },
}

module.exports = localStore;
