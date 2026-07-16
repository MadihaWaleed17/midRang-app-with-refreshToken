  import { useEffect, useState } from "react";
  import {
    FileText,
    FileAudio,
    FileImage,
    Video,
  } from "lucide-react";

  import { httpInterceptor } from "../lib/httpInterceptor";
  import moment from "moment";


  const Dashboard = () => {

    const [files, setFiles] = useState([]);
    
    const fetchDashboard = async () => {
      try {
        const { data } = await httpInterceptor.get("/file?limit=5");
        setFiles(data);

      } catch (err) {
        console.log(err.message);
      }
    };
  

    useEffect(() => {
   
      fetchDashboard();

    }, []);
    return (
      <div className="space-y-8">
     

        {/* Bottom Section */}
        <div >
          {/* Recent Files */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-2xl font-semibold text-slate-700">
              Recent Files
            </h2>

            <div className="space-y-4">
              {files.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between rounded-xl border border-slate-200 p-4"
                >
                  <div>
                    <h3 className="font-medium">

                      {item.filename}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {moment(item.createdAt).format('MMM DD YYYY hh:mm A')}
                    </p>
                  </div>

                  <span className="rounded-lg bg-slate-100 px-3 py-1 text-sm">
                    {item.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Dashboard;