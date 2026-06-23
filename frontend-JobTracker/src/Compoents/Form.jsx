import React, { use, useState } from "react";
import { post } from "../Services/Api";
import { put } from "../Services/Api";
const Form = ({
  OnCancel,
  OnSave,
  OnEdit,
  loadAfterPost,
  loadStatusAfterPost,
  editData,
}) => {
  // console.log(OnSave);

  const [resume, setResume] = useState(null);
  const [editResume, setEditResume] = useState(null);
  const [addformData, setAddFormData] = useState({
    CompanyName: "",
    Role: "",
    ApplyDate: "",
    Notes: "",
    status: "",
  });
  const [editformData, setEditFormData] = useState(editData);

  function handleEditChange(e) {
    const { name, value } = e.target;
    console.log(name, value);
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  }
  async function handleEditSubmit(e) {
    e.preventDefault();
    const { id } = editformData;
    // const{ CompanyName , Role , ApplyDate , status , Notes } = editformData;
    const formData = new FormData();
    formData.append("CompanyName", editformData.CompanyName);
    formData.append("Role", editformData.Role);
    formData.append("Status", editformData.status);
    formData.append("ApplyDate", editformData.ApplyDate);
    formData.append("Notes", editformData.Notes);
    formData.append("Resume", editResume);

    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    const res = await put(id, formData);
    OnCancel();
    loadAfterPost();
    loadStatusAfterPost();
    // console.log(typeof(loadAfterPost));
    // load();
  }

  function handleAddChange(e) {
    const { name, value } = e.target;
    // console.log(name , value);
    setAddFormData((prev) => ({ ...prev, [name]: value }));
    // formData.append(addformData);
  }

  async function handleAddSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("CompanyName", addformData.CompanyName);
    formData.append("Role", addformData.Role);
    formData.append("Status", addformData.status);
    formData.append("ApplyDate", addformData.ApplyDate);
    formData.append("Notes", addformData.Notes);

    formData.append("Resume", resume);
    const res = await post(formData);
    console.log(res.data);

    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    OnCancel();
    loadAfterPost();
    loadStatusAfterPost();
  }

  return (
    <>
      {OnSave ? (
        //Add form...
        <div className="modal-overlay">
          <form className="modal" onSubmit={handleAddSubmit}>
            <h4>Add Application</h4>

            <input
              required
              type="text"
              placeholder="Company Name"
              name="CompanyName"
              value={addformData.CompanyName}
              onChange={handleAddChange}
            />

            <input
              required
              type="text"
              placeholder="Role"
              name="Role"
              value={addformData.Role}
              onChange={handleAddChange}
            />

            <div className="row">
              <input
                type="date"
                name="ApplyDate"
                value={addformData.ApplyDate}
                onChange={handleAddChange}
              />

              <select
                name="status"
                value={addformData.status}
                onChange={handleAddChange}
              >
                <option value="">Select Status</option>
                <option value="Applied">Applied</option>
                <option value="Shortlist">Shortlist</option>
                <option value="Interview">Interview</option>
                <option value="Offers">Offers</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <textarea
              placeholder="Notes"
              name="Notes"
              value={addformData.Notes}
              onChange={handleAddChange}
            ></textarea>
            <div className="btn-group">
              <input
                type="file"
                name="uploadFile"
                className="uploadFile"
                onChange={(e) => setResume(e.target.files[0])}
              />

              <button type="button" className="cancel-btn" onClick={OnCancel}>
                Cancel
              </button>
              <button type="submit" className="save-btn">
                Add Application
              </button>
            </div>
          </form>
        </div>
      ) : (
        // Edit form...
        <div className="modal-overlay">
          <form className="modal" onSubmit={handleEditSubmit}>
            <h4>Edit Application</h4>
            <input
              type="text"
              placeholder="Company Name"
              name="CompanyName"
              value={editformData.CompanyName}
              onChange={handleEditChange}
            />
            <input
              type="text"
              placeholder="Role"
              name="Role"
              value={editformData.Role}
              onChange={handleEditChange}
            />
            <div className="row">
              <input
                type="date"
                name="ApplyDate"
                value={editformData.ApplyDate}
                onChange={handleEditChange}
              />
              <select
                name="status"
                value={editformData.status}
                onChange={handleEditChange}
              >
                <option>Applied</option>
                <option>Shortlist</option>
                <option>Interview</option>
                <option>Offers</option>
                <option>Rejected</option>
              </select>
            </div>
            <textarea
              placeholder="Notes"
              name="Notes"
              value={editformData.Notes}
              onChange={handleEditChange}
            ></textarea>
            <h5 className="editResume">{`Existing Resume: ${editformData.resumeUrl}`}</h5>
            <div className="btn-group">
              <input
                type="file"
                name="uploadFile"
                className="uploadFile"
                onChange={(e) => {
                  setEditResume(e.target.files[0]);
                }}
              />
              <button type="button" className="cancel-btn" onClick={OnCancel}>
                Cancel
              </button>
              <button type="submit" className="save-btn">
                Save Application
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
export default Form;
