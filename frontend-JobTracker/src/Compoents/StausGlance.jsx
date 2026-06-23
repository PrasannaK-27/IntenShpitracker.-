import React, { useEffect, useState } from "react";
import Form  from './Form';
import { jobsStatus } from "../Services/Api";

const StausGlance = ({loadStatu}) => {
  
  const[totalApplieds , setTotalApplieds] = useState(0);
  const[interviews , setInterviews] = useState(0);
  const[offers ,setOffers] = useState(0);
  const[respoenceRate , setRespoenceRate] = useState(0.0);
  
  
  async function loadStatu(){
     const {totalJobs , totalInterviews , totalOffers , responseRate} = await jobsStatus();
     console.log("Status Responece :" , totalJobs , totalInterviews , totalOffers , responseRate); 
     setTotalApplieds(totalJobs); 
     setInterviews(totalInterviews);
     setOffers(totalOffers);
     setRespoenceRate(responseRate); 
  }
  return (
    <>
      <h4 className="dashHead"> Your stats at a glance</h4>
      <div className="Status-container">
        <div className="totalApp">
          <h2>{totalApplieds}</h2>
          <p>TotalApplied</p>
        </div>

        <div className="interviwe">
          <h2>{interviews}</h2>
          <p>interviews</p>
        </div>

        <div className="Offers">
          <h2>{offers}</h2>
          <p>Offers</p>
        </div>

        <div className="RespoenceRate">
          <h2>{respoenceRate}</h2>
          <p>RespoenceRate</p>
        </div>
      </div>
    </>
  );
};
export default StausGlance;

