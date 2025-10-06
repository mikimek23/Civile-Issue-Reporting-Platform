import axios from "axios";
import { useEffect } from "react";
import { useState } from "react"

const Admindashboard = () => {
  const [report, setRport]=useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token= localStorage.getItem("token")
  useEffect(()=>{
  if(!token){
    setError('please, loged in first')
    setLoading(false)
    return;
  }
  let mounted=true
  async function reports(){
    setLoading(true)
    setError("")
    try{
const res = await axios.get("http://localhost:5000/report/all-reports", {
          headers: { Authorization: `Bearer ${token}` },
        });
           setRport(res.data)
      } catch (err) {
        console.error("Fetch error:", err);
        setError(
          err.response?.data?.message ||
            err.response?.statusText ||
            err.message ||
            "Unknown error"
        );
      } finally {
        if (mounted) setLoading(false);
      }
    }

    reports();

    return () => {
      mounted = false;
    };
  },[token])
    if (loading) {
    return <div className="p-16 text-center">Loading reports…</div>;
  }

  if (error) {
    return (
      <div className="p-16 text-center text-red-600">
         {error} 
        
      </div>
    );
  }
  // Update status
const updateStatus = async (id, newStatus) => {
  try {
    await axios.put(
      `http://localhost:5000/report/update/${id}`,
      { status: newStatus },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    // Refresh reports after update
    setRport(report.map(r => r._id === id ? { ...r, status: newStatus } : r));
  } catch (err) {
    console.error(err);
  }
};

// Delete report
const deleteReport = async (id) => {
  try {
    await axios.delete(
      `http://localhost:5000/report/delete/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    // Remove deleted report from UI
    setRport(report.filter(r => r._id !== id));
  } catch (err) {
    console.error(err);
  }
};

  const filter=(e)=>{
    setRport(report.filter(f=>f.title.toLowerCase().includes(e.target.value)))
  }
  return (
    
        <section className=" h-screen w-full bg-gray-50 pt-10 pb-5">
      <div className="  flex flex-col items-center justify-center  py-8 mx-auto w-full ">
        <h2 className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
          All reports
        </h2>
        <input type="text" className="w-full bg-white rounded-lg shadow overflow-x-auto" onChange={filter} placeholder="search by title"/>
        <div className="w-full bg-white rounded-lg shadow overflow-x-auto">
          <table className="table-auto border-collapse border border-gray-300 w-full">
            <thead>
              <tr className="bg-gray-100 text-center">
                <th className="border p-2">User</th>
                <th className="border p-2">Title</th>
                <th className="border p-2">Location</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {report.length===0 ?(
                 <tr>
                  <td colSpan="4" className="text-center p-4 text-gray-500">
                    No reports found 
                  </td>
                </tr>
              ):(
                report.map((report)=>(
                  <tr key={report._id} className="bg-gray-100 text-center">
                    <td className="border p-2">{report.createdBy}</td>
                    <td className="border p-2">{report.title}</td>
                    <td className="border p-2">{report.location}</td>
                    <td className="border p-2">{report.createdAt ? new Date(report.createdAt).toLocaleDateString(): "-"}</td>
                    <td className="border p-2">{report.status}</td>
                    <td className="border p-2">
  
  <select
    value={report.status}
    onChange={(e) => updateStatus(report._id, e.target.value)}
    className="border rounded p-1"
  >
    <option value="pending">Pending</option>
    <option value="in-progress">In Progress</option>
    <option value="resolved">Resolved</option>
  </select>

  <button
    onClick={() => deleteReport(report._id)}
    className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
  >
    Delete
  </button>
</td>

                  </tr>
                )
              ))}
            </tbody>
            
          </table>
        </div>
      </div>
    </section>
  )
}

export default Admindashboard