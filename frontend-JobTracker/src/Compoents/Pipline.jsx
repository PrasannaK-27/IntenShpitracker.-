import React, { useEffect, useState } from "react";
import JobCard  from "./Cards/JobCard";
// import { data } from "../db/DemoData";
import Empty from "./Cards/Empty";
import { getAll, jobsStatus } from "../Services/Api.js";
// import { put } from "../Services/Api.js";
import { deleteJob } from "../Services/Api.js";
import { patch } from "../Services/Api.js";
// import StausGlance from "./StausGlance.jsx";
import Form from "./Form";

export const Pipline = () => {
  const [totalApplieds, setTotalApplieds] = useState(0);
  const [interviews, setInterviews] = useState(0);
  const [offers, setOffers] = useState(0);
  const [respoenceRate, setRespoenceRate] = useState(0.0);
  
  const [showForm, setShowForm] = useState(false);
  const [save, setSave] = useState(false);
  const[startload , setStartload] = useState(false);
  // const[hasEdit , setHasEdit] = useState({});

  useEffect(() => {
    loadData();
    loadStatu();
  }, []);

   async function loadStatu(){
      // return await jobsStatus();
     const {totalJobs , totalInterviews , totalOffers , responseRate} = await jobsStatus();
    //  console.log("Status Responece :" , totalJobs , totalInterviews , totalOffers , responseRate); 
     setTotalApplieds(totalJobs); 
     setInterviews(totalInterviews);
     setOffers(totalOffers);
     setRespoenceRate(responseRate); 
  }

  async function loadData() {
    try{
      const res = await getAll();
      setJobs(res.data);
      setStartload(true);  
    } catch (error) {
      console.log(error);
    }
    // if(!startload){setJobs(data)}   
  }
  const [jobs, setJobs] = useState([]);

  async function handleDeletion(id){
    if(confirm("Are you sure, you want to delete this application!!")){
         const res = await deleteJob(id);
         loadData();
         loadStatu();
         console.log(res.data);
    } 
  }

  let hasEdit;
  function handleStatusChange(ids, newStatus) {
    const updatedJobs = jobs.map((job) => {
      if (job.id === ids) {
         hasEdit = { ...job, status: newStatus };
      }
      return job;
    });
    
    async function updatedJobsToDb() {
      // console.log(id , newStatus);
      const up = jobs.map((job) => {
        if (job.id === ids) {
            hasEdit = { ...job, status: newStatus };
        }
      });
      // console.log(hasEdit);

      const { id } = hasEdit;
      // const formData = new FormData();
      //  formData.append("CompanyName", hasEdit.CompanyName);
      //  formData.append("Role",  hasEdit.Role);
      //  formData.append("Status", hasEdit.status);
      //  formData.append("ApplyDate" , hasEdit.ApplyDate);
      //  formData.append("Notes" ,  hasEdit.Notes);
      const { CompanyName, Role, ApplyDate, status, Notes } = hasEdit;
      const readytoPost = { CompanyName, Role, ApplyDate, status, Notes };
      console.log(readytoPost);
      try {
        const res = await patch(id,readytoPost);
        //  console.log(res.data);
        loadData();
        loadStatu();
      } catch (error) {
        console.log(error);
      }
    }
    updatedJobsToDb();
    setJobs(updatedJobs);
  }
  let ApplyData = jobs.filter((job) => job.status === "Applied");
  let InterviewsData = jobs.filter((job) => job.status === "Interview");
  let ShortlistData = jobs.filter((job) => job.status === "Shortlist");
  let OffersData = jobs.filter((job) => job.status === "Offers");
  let RejectedData = jobs.filter((job) => job.status === "Rejected");

  
  let ViewForm = () => {
    setShowForm(true);
    console.log("Add butten is clicked");
  };
  let handleCancel = () => {
    setShowForm(false);
  };

  function handleSave() {
    setSave(true);
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
      {/* <StausGlance loadStatu={loadStatu}/> */}
      <div className="HeadAndButton">
        <h4 className="pipHead">My Pipline</h4>
        <button
          className="newAdd"
          onClick={() => {
            ViewForm();
            handleSave();
          }}
        >
          +Add
        </button>
        {showForm ? (
          <Form
            OnCancel={handleCancel}
            OnSave={save}
            loadAfterPost={loadData}
            loadStatusAfterPost={loadStatu}
          />
        ) : null}
      </div>
      
      <div className="JobCardsHeaders">
          <div className="Acon">Applied</div>
          <div className="Scon">Shortlist</div>
          <div className="Icon">Interview</div>
          <div className="Ocon">Offers</div>
          <div className="Rcon">Rejected</div>
        </div>
       
      <div className="pipCon">
         <div className="ApplyCon">
          {/* <p>Applied</p> */}
          <div className="Appcards">

            {ApplyData.length === 0 ? (
              <Empty />
            ) : (
              jobs
                .filter((job) => job.status === "Applied")
                .map((job) => (
                  <JobCard 
                    key={job.id}
                    data={job}
                    handleStatusChange={handleStatusChange}
                    handleDeletion={handleDeletion}
                    loadAfterPost={loadData}
                    loadStatusAfterPost={loadStatu}
                    style={{"backgroundColor":"#ffe0e0"}}

                  />
                ))
            )}
          </div>
        </div>

        <div className="ShortlistCon">
          {/* <p>Shortlist</p> */}

          <div className="Shortlistcards">
            {ShortlistData.length === 0 ? (
              <Empty />
            ) : (
              jobs
                .filter((job) => job.status === "Shortlist")
                .map((job) => (
                  <JobCard 
                    key={job.id}
                    data={job}
                    handleStatusChange={handleStatusChange}
                    handleDeletion={handleDeletion}
                    loadAfterPost={loadData}
                    loadStatusAfterPost={loadStatu}
                    style={{"backgroundColor":"#daffdd"}}
                    
                  />
                ))
            )}
          </div>
        </div>

        <div className="InterviewCon">
          {/* <p>interviews</p> */}

          <div className="interviwecards">
            {InterviewsData.length === 0 ? (
              <Empty />
            ) : (
              jobs
                .filter((job) => job.status === "Interview")
                .map((job) => (
                  <JobCard 
                    key={job.id}
                    data={job}
                    handleStatusChange={handleStatusChange}
                    handleDeletion={handleDeletion}
                    loadAfterPost={loadData}
                    loadStatusAfterPost={loadStatu}
                    style={{"backgroundColor":"#efd6ff"}}
                  />
                ))
            )}
          </div>
        </div>
        <div className="offersCon">
          {/* <p>Offers</p> */}

          <div className="Offercards">
            {OffersData.length === 0 ? (
              <Empty />
            ) : (
              jobs
                .filter((job) => job.status === "Offers")
                .map((job) => (
                  <JobCard 
                    key={job.id}
                    data={job}
                    handleStatusChange={handleStatusChange}
                    handleDeletion={handleDeletion}
                    loadAfterPost={loadData}
                    loadStatusAfterPost={loadStatu}
                    style={{"backgroundColor":"#deffdc"}}
                  />
                ))
            )}

            {/* {
            jobs.filter((job) => job.Statu === "Offers" ? jobs.map((job)=>(<ApplyCard key={job.id} data={job}  handleStatusChange={handleStatusChange}/>)): <ApplyCard data={{CompanyName : "EM",
           Role:"EM",
           ApplyData:"em"}}/>)
            }  */}
          </div>
        </div>
        <div className="RejectedCon">
          {/* <p>Rejected</p> */}

          <div className="Rejectedcards">
            {RejectedData.length === 0 ? (
              <Empty />
            ) : (
              jobs
                .filter((job) => job.status === "Rejected")
                .map((job) => (
                  <JobCard 
                    key={job.id}
                    data={job}
                    handleStatusChange={handleStatusChange}
                    handleDeletion={handleDeletion}
                    loadAfterPost={loadData}
                    loadStatusAfterPost={loadStatu}
                    style={{"backgroundColor":"#fad6d6"}}
                  />
                ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};
