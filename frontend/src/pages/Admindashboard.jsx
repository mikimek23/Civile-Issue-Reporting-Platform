import axios from "axios";
import { Filter, IndentDecrease } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react"
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Admindashboard = () => {
  const [report, setReport]=useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);
const [showModal, setShowModal] = useState(false);
const [filterStatus, setFilterStatus] = useState("all");
const [sortOrder, setSortOrder] = useState("newest");
const [searchQuery, setSearchQuery] = useState("");

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
           setReport(res.data)
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
const updateStatus = async (id, newStatus) => {
  try {
    await axios.put(
      `http://localhost:5000/report/update/${id}`,
      { status: newStatus },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setReport(report.map(r => r._id === id ? { ...r, status: newStatus } : r));
    toast.success("Status updated!");
  } catch (err) {
    console.error(err);
    toast.error("Failed to update status!");
  }
};


const deleteReport = async (id) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This report will be permanently deleted.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#30ff00",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });
   if (result.isConfirmed) {
  try {
    await axios.delete(
      `http://localhost:5000/report/delete/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    
    setReport(report.filter(r => r._id !== id));
    toast.info("Report deleted successfully!");

  } catch (err) {
    toast.error("Failed to delete report!");
    console.error(err);
  }
}
};


const handleViewDetails = (report) => {
  setSelectedReport(report);
  setShowModal(true);
};

const closeModal = () => {
  setSelectedReport(null);
  setShowModal(false);
};

const filteredReports = report
  .filter((r) =>
    filterStatus === "all" ? true : r.status === filterStatus
  )
  .filter((r) =>
    r.title?.toLowerCase().includes(searchQuery)
  )
  .sort((a, b) =>
    sortOrder === "newest"
      ? new Date(b.createdAt) - new Date(a.createdAt)
      : new Date(a.createdAt) - new Date(b.createdAt)
  );

  return (
    
        <section className=" h-screen w-full bg-gray-50 pt-10 pb-5">
      <div className="  flex flex-col items-center justify-center  py-8 mx-auto w-full ">
        <h2 className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
          All reports
        </h2>
        <div className="w-full bg-gray-100rounded-lg shadow overflow-x-auto">

          {/* Summary Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 w-full">
  <div className="bg-gray-100 text-blue-800 p-4 rounded-xl shadow text-center">
    <h3 className="text-xl font-semibold">Total</h3>
    <p className="text-2xl font-bold">{report.length}</p>
  </div>

  <div className="bg-gray-100 text-yellow-800 p-4 rounded-xl shadow text-center">
    <h3 className="text-xl font-semibold">Pending</h3>
    <p className="text-2xl font-bold">
      {report.filter((r) => r.status === "pending").length}
    </p>
  </div>

  <div className="bg-gray-100 text-orange-800 p-4 rounded-xl shadow text-center">
    <h3 className="text-xl font-semibold">In Progress</h3>
    <p className="text-2xl font-bold">
      {report.filter((r) => r.status === "in-progress").length}
    </p>
  </div>

  <div className="bg-gray-100 text-green-800 p-4 rounded-xl shadow text-center">
    <h3 className="text-xl font-semibold">Resolved</h3>
    <p className="text-2xl font-bold">
      {report.filter((r) => r.status === "resolved").length}
    </p>
  </div>
</div>


  <div className="flex flex-wrap bg-gray-100 gap-4 mb-4 items-center justify-between">
  
  <input
    type="text"
    placeholder="Search by title..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
    className="border px-3 py-1 rounded-full shadow-sm w-64"
  />


  <select
    value={filterStatus}
    onChange={(e) => setFilterStatus(e.target.value)}
    className="border px-0 py-0 m-0 rounded-md shadow-sm"
  >
    <option value="all">All</option>
    <option value="pending">Pending</option>
    <option value="in-progress">In Progress</option>
    <option value="resolved">Resolved</option>
  </select>

  
  <select
    value={sortOrder}
    onChange={(e) => setSortOrder(e.target.value)}
    className="border px-0 py-0 rounded-md shadow-sm"
  >
    <option value="newest">Newest First</option>
    <option value="oldest">Oldest First</option>
  </select>
</div>

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
              {filteredReports.length===0 ?(
                 <tr>
                  <td colSpan="4" className="text-center p-4 text-gray-500">
                    No reports found 
                  </td>
                </tr>
              ):(
                filteredReports.map((report)=>(
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

   <button
    onClick={() => handleViewDetails(report)}
    className="ml-2 bg-green-500 text-white px-2 py-1 rounded"
  >
    View
  </button>
</td>

                  </tr>
                )
              ))}
            </tbody>
            
          </table>
          <p className="text-sm text-gray-600 mt-2">
  Showing {filteredReports.length} of {report.length} reports
</p>

          {showModal && selectedReport && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
      <button
        onClick={closeModal}
        className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>
      <h2 className="text-xl font-semibold mb-4 text-center">
        Report Details
      </h2>

     
      {selectedReport.photourl ? (
        <img
          src={`http://localhost:5000/${selectedReport.photourl}`}
          alt="Report"
          className="w-full h-60 object-cover rounded-md mb-4"
        />
      ) : (
        <div className="w-full h-60 bg-gray-200 flex items-center justify-center text-gray-500 mb-4">
          No Image
        </div>
      )}

    
      <p><strong>Title:</strong> {selectedReport.title}</p>
      <p><strong>Description:</strong> {selectedReport.description}</p>
      <p><strong>Location:</strong> {selectedReport.location}</p>
      <p><strong>Created By:</strong> {selectedReport.createdBy}</p>
      <p><strong>Status:</strong> {selectedReport.status}</p>
      <p><strong>Date:</strong> {new Date(selectedReport.createdAt).toLocaleString()}</p>

      
      {selectedReport.history && (
        <div className="mt-3">
          <strong>Status History:</strong>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {selectedReport.history.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </div>
)}
        </div>
      </div>
    </section>
  )
}

export default Admindashboard