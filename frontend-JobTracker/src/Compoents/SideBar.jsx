import React from 'react'
import { useNavigate } from 'react-router-dom'
// import Dashboard from './Dashboard'
// import { Pipline } from './Pipline'

const SideBar = () => {

 let useNavi = useNavigate();

 let useNaviAllApps = useNavigate();
 
 let NavePip = () =>{useNavi("/");}

 let NaveAllApps =()=>{useNaviAllApps("/listOfApps")}

   
  return (
    <>
        <div className="SideBarCon">
             <p>😍JOBTRACKER!!</p>
            <ul>
                <li>Home!</li>
                <li onClick={NavePip}>Pipline</li>
                <li onClick={NaveAllApps}>All Applications</li>
                 <li>Status!</li> 
                 <li>Add Applications!</li> 
            </ul>
        </div>
   

       
    </>
  )
}

export default SideBar