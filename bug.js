import React, { useState, useEffect } from 'react'
import axios from 'axios';

const Bug = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [assignee, setAssignee] = useState("");
    const [data, setData] = useState([]);
    const[showtableheader,setshowtableheader]=useState(false);


    const mainviewdata=()=>{
        setshowtableheader(true)
        setTimeout(handlesubmit,1)
        setTimeout(viewdata,1)
    }
    const handlesubmit = async (e) => {
   
        e.preventDefault();
        const res = await axios.post("http://localhost:8001/bugdata",{
            title: title,
            description: description,
            assignee: assignee
            
        })
      
    }
    const viewdata = async () => {
        const res = await axios.get("http://localhost:8001/showdata");
        console.log(true)
        setData(res.data);
        // console.log(res.data);
        // console.log(res.data.data.token);
    }
    useEffect(() => {
        mainviewdata();
    }, []);

    return (
        <div>
        
            <form onSubmit={handlesubmit}>
              <div align="center">
              <label>Title</label>
              <br></br>
                        <input type='text' name='title' value={title} className="form-control" onChange={(e) => { setTitle(e.target.value) }} placeholder="Please enter the title of the bug"  required/> 
              </div>
              <div align="center">
              <label>Description</label>
              <br></br>
                        <input type='text' name='description' className="form-control" value={description} onChange={(e) => { setDescription(e.target.value) }} placeholder="Please enter the description of bug"  required/> 
              </div>
                       <div align="center">
                       <label>Assignee</label>
                       <br></br>
                       <input type='text' name='assignee' value={assignee} className="form-control" onChange={(e) => { setAssignee(e.target.value) }} placeholder="Please enter the name of assignee" required/>
                   
                       </div>
                  

                    
                       
                   

                   
                      

                   
                      <br></br>
                      <div className='button'>
                      <input type='submit' value='submit'  onClick={mainviewdata} class="btn btn-primary"    />
                      </div>
                           
                            {/* <button onClick={viewdata}></button> */}
                       
                  

                {showtableheader?

                <table className='table table-primary text-center w-75 table-bordered border-primary ' id="t">
                    <tr style={{ textAlign: "center" }}>

                        <th>TITLE</th>
                        <th>DESCRIPTION</th>
                        <th>TIME</th>
                        <th>DATE</th>
                        <th>ASSIGNEE</th>
                        <th>left_days</th>
                       
                     
                    </tr> 
                    {data.map((data, index) => {
                        return (
                            <tr key={index}>
                                <td> {data.title}</td>
                                <td> {data.description}</td>
                                <td> {data.time}</td>
                                <td> {data.date.slice(0,10)}</td>
                                <td> {data.assignee}</td>
                                {data.left_days <= 0 ? <td style={{"color":"red"}}> {data.left_days}</td> : <td> {data.left_days}</td>}

                            </tr>
                        )
                    })}




                </table>
:null}
            </form>

        </div>
    )
}

export default Bug
