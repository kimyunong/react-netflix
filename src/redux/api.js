import axios from "axios";

const api= axios.create({

    baseURL: "https://api.themoviedb.org/3",
    headers :{"Content-Type":"application/json"}

}) // url 생성시 필요한 기본값 셋팅 



//axios의 부가기능

api.interceptors.request.use(function (config) {
    
    console.log("request-start",config);

    return config;

  }, function (error) {
    
    console.log("request-error",error);

    return Promise.reject(error);
  });


api.interceptors.response.use(function (response) {

    console.log("getResponse",response);

    return response;
  }, function (error) {

    console.log("getResponse-error",error);

    return Promise.reject(error);
  });

  export default api;