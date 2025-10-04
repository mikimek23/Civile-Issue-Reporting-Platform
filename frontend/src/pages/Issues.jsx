import axios from "axios";
import { useEffect, useState } from "react";

const Issues = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setError("You are not logged in. Please login first.");
      setLoading(false);
      return;
    }

    let mounted = true;

    async function myReports() {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get("http://localhost:5000/report/issues", {
          headers: { Authorization: `Bearer ${token}` },
        });
           setReports(res.data);
        
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

    myReports();

    return () => {
      mounted = false;
    };
  }, [token]);

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

  return (
    <section className=" h-screen w-full bg-gray-50 pt-10 pb-5">
      <div className="  flex flex-col items-center justify-center  py-8 mx-auto w-full ">
        <h2 className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
          Your reports
        </h2>

        <div className="w-full bg-white rounded-lg shadow overflow-x-auto">
          <table className="table-auto border-collapse border border-gray-300 w-full">
            <thead>
              <tr className="bg-gray-100 text-center">
                <th className="border p-2">Title</th>
                <th className="border p-2">Location</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>

            <tbody>
              {reports.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center p-4 text-gray-500">
                    No reports found 
                  </td>
                </tr>
              ) : (
                reports.map((report) => (
                  <tr key={report._id} className="odd:bg-white even:bg-gray-50">
                    <td className="border p-2 text-center">{report.title}</td>
                    <td className="border p-2 text-center">{report.location}</td>
                    <td className="border p-2 text-center">
                      {report.createdAt
                        ? new Date(report.createdAt).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="border p-2 text-center">
                      {report.status}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Issues;
