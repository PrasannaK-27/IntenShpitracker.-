import { useState } from "react";
import Form  from '../Form';

const JobCard = ({ data ,  handleStatusChange , handleDeletion , loadAfterPost , loadStatusAfterPost ,style}) => {

  if (!data || data.length === 0) return null;

  const[showEdit , setShowEdit] = useState(false);
  let handleCancel = () =>{setShowEdit(false);}
  function viewEditForm(){
    setShowEdit(true);
  }
  
  return (

       <div className="JobCard" >
          <h2>{data.CompanyName}</h2>
          <h3>{data.Role }</h3>
          <h3>{data.ApplyDate}</h3>
          <h4>{data.Notes}</h4>
          <select className="DropDown" value={data.status} onChange={ (e) => handleStatusChange( data.id , e.target.value )} style={style}> 
            <option value="Applied">Applied</option>
            <option value="Shortlist">Shortlist</option>
            <option value="Interview">Interview</option>
            <option value="Offers">Offers</option>
            <option value="Rejected">Rejected</option>
          </select>
          <div className="btn">
            <button className="editBtn" onClick={viewEditForm}>Edit</button>
            {showEdit ? <Form  OnCancel = {handleCancel} editData={data}  loadAfterPost={loadAfterPost} loadStatusAfterPost={loadStatusAfterPost}/>:null}
            <button className="delbtn" onClick={ ()=>{ handleDeletion(data.id) } }>Delete</button>
          </div>
        </div>

  );
};

export default JobCard;
