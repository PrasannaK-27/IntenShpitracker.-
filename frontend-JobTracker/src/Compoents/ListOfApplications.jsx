import React, { useState, useEffect } from "react";
import { jobsStatus } from "../Services/Api";
// import { data } from "../db/DemoData.json";
import { getAll } from "../Services/Api";
import { patchDelReusme } from "../Services/Api";

const ListOfApplications = () => {
  const [totalApplieds, setTotalApplieds] = useState(0);
  const [interviews, setInterviews] = useState(0);
  const [offers, setOffers] = useState(0);
  const [respoenceRate, setRespoenceRate] = useState(0.0);

  const [dynamicSerach, setDynamicSerach] = useState([]);

  const [jobsTable, setJobsTable] = useState([]);

  useEffect(() => {
    loadStatu();
    loadData();
  }, []);

  async function loadData() {
    try {
      const res = await getAll();
      // console.log("Response data :" , res.data);
      setJobsTable(res.data);
      // console.log("Current State condition :" , jobs);
    } catch (error) {
      console.log(error);
    }
  }

  async function loadStatu() {
    // return await jobsStatus();
    const { totalJobs, totalInterviews, totalOffers, responseRate } =
      await jobsStatus();
    console.log(
      "Status Responece :",
      totalJobs,
      totalInterviews,
      totalOffers,
      responseRate,
    );
    setTotalApplieds(totalJobs);
    setInterviews(totalInterviews);
    setOffers(totalOffers);
    setRespoenceRate(responseRate);
  }

  async function handleResumeUrlDeletion(id, fileName) {
    // console.log(id , fileName);

    if (confirm(`Are you sure you want to delete this`)) {
      await patchDelReusme(id, fileName);
      loadData();
    }
  }

  const statusClassMap = {
    Applied: "applied",
    Shortlist: "shortlist",
    Interview: "interview",
    Offers: "offer",
    Rejected: "rejected",
  };

  function dyanamin(e) {
    const fillered = jobsTable.filter((data) =>
      data.CompanyName.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    setDynamicSerach(fillered);
    console.log(dynamicSerach);
  }

  return (
    <>
      <div className="dashSear">
        <h4 className="dashHead">Your stats at a glance</h4>
        <input
          type="text"
          name=""
          id=""
          placeholder="Search Job"
          onChange={dyanamin}
        />
      </div>
      <div className="Status-container" style={{ marginTop: "10px" }}>
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

      <div className="tableCon">
        <div className="table-container">
          <div className="table-title">Job Application Tracker</div>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Company</th>
                <th>Role</th>
                <th>Status</th>
                <th>Applied Date</th>
                <th>Notes</th>
                <th>Resume</th>
              </tr>
            </thead>

            <tbody>
              {dynamicSerach.length == 0
                ? jobsTable.map((data, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{data.CompanyName}</td>
                      <td>{data.Role}</td>

                      <td>
                        <span
                          className={`status ${
                            statusClassMap[data.status] || "default"
                          }`}
                        >
                          {data.status}
                        </span>
                      </td>

                      <td>{data.ApplyDate}</td>
                      <td>{data.Notes}</td>

                      <td className="action-buttons">
                        {data.resumeUrl ? (
                          <>
                            <a
                              href={`https://intenshpitracker.onrender.com/resume/view/${data.resumeUrl}`}
                              target="_blank"
                              className="view-btn"
                            >
                              View
                            </a>

                            <a
                              href={`https://intenshpitracker.onrender.com/resume/download/${data.resumeUrl}`}
                              download
                              className="download-btn"
                            >
                              Download
                            </a>

                            <button
                              className="delete-btn"
                              onClick={() =>
                                handleResumeUrlDeletion(data.id, data.resumeUrl)
                              }
                            >
                              Delete
                            </button>
                          </>
                        ) : (
                          <span style={{ color: "#94a3b8", fontSize: "20px" }}>
                            Empty
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                : dynamicSerach.map((data, index) => (
                    <tr key={index}>
                      <td>
                        {jobsTable.findIndex((job) => job.id === data.id) + 1}
                      </td>
                      <td>{data.CompanyName}</td>
                      <td>{data.Role}</td>
                      <td>
                        <span
                          className={`status ${
                            statusClassMap[data.status] || "default"
                          }`}
                        >
                          {data.status}
                        </span>
                      </td>

                      <td>{data.ApplyDate}</td>
                      <td>{data.Notes}</td>

                      <td className="action-buttons">
                        {data.resumeUrl ? (
                          <>
                            <a
                              href={`https://intenshpitracker.onrender.com/resume/view/${data.resumeUrl}`}
                              target="_blank"
                              className="view-btn"
                            >
                              View
                            </a>

                            <a
                              href={`https://intenshpitracker.onrender.com/resume/download/${data.resumeUrl}`}
                              download
                              className="download-btn"
                            >
                              Download
                            </a>

                            <button
                              className="delete-btn"
                              onClick={() =>
                                handleResumeUrlDeletion(data.id, data.resumeUrl)
                              }
                            >
                              Delete
                            </button>
                          </>
                        ) : (
                          <span style={{ color: "#94a3b8", fontSize: "20px" }}>
                            Empty
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ListOfApplications;
