import axios from 'axios';

// const BASE_URL = 'http://localhost:8000';
const BASE_URL = 'https://intenshpitracker.onrender.com';

 export let getAll = () => axios.get(`${BASE_URL}`+"/JobsDTO");
 export let post = (data) => axios.post(`${BASE_URL}`+"/Jobs" , data);
 export let put = (id ,data) => axios.put(`${BASE_URL}`+"/Jobs/"+`${id}` , data);
 export let patch = (id ,data) => axios.patch(`${BASE_URL}`+"/Jobs/"+`${id}` , data);
 export let patchDelReusme = (id ,fileName) => axios.patch(`${BASE_URL}`+"/DelResumeUrl/"+`${id}` , null , {
                                                                                                            params:{
                                                                                                                  "fileName":fileName
                                                                                                            }
                                                                                                         });
 export let deleteJob = (id) => axios.delete(`${BASE_URL}`+"/Jobs/"+`${id}`);


 let getStatus = () => axios.get(`${BASE_URL}`+"/status")
 export async function jobsStatus(){
       const res = await getStatus();
       return res.data;   
}
