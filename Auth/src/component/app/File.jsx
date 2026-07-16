import { Notyf } from "notyf";
import "notyf/notyf.min.css";
const notyf = new Notyf({
  position: { x: "center", y: "top" }
});


import { useEffect, useState } from "react";
import {
  Download,
  Share2,
  Trash2,
  Plus,
  X,
} from "lucide-react";
import { httpInterceptor } from "../lib/httpInterceptor";
import moment from 'moment'



const File = () => {
  const [showModal, setShowModal] = useState(false);
  const [files, setFiles] = useState([])


  const downloadHandle = async (id, filename) => {
    try {
      <i ></i>
      const options = {
        responseType: "blob"
      }
      const { data } = await httpInterceptor.get(`/file/download/${id}`, options)
      const url = URL.createObjectURL(data)
      const a = document.createElement('a')

      a.href = url
      a.download = filename
      a.click()
      a.remove()

    }
    catch (err) {
      console.log(err.response ? err.response.data.message : err.message)
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const prog = document.getElementById("progress")
    const form = e.target
    const formData = new FormData(form)
    const option = {
      onUploadProgress: (e) => {
        const loaded = e.loaded
        const total = e.total
        const persentage = Math.floor((loaded * 100) / total)

        prog.style.width = persentage + "%"
        prog.innerHTML = persentage + "%"
      }
    }

    prog.disable = true
    const { data } = await httpInterceptor.post('/file', formData, option)
    fileFetch()

    notyf.success(`${data.filename} - has been uploaded`);
    setTimeout(() => {
      prog.disable = false
      prog.style.width = 0
      prog.innerHTML = ''
      form.reset()
      setShowModal(false);
    }, 2000)

  };

  useEffect(() => {
    fileFetch()
  }, [])

  const fileFetch = async () => {
    try {
      const { data } = await httpInterceptor.get('/file')
      setFiles(data)
    }
    catch (err) {
      console.log(err.message)
    }
  }

    const deleteFile = async (id) => {

    try {
      const { data } = await httpInterceptor.delete(`/file/${id}`);
      fileFetch()
    }
    catch (err) {
      console.error("Delete error:", err);
    }
  }

const getSize=(size)=>{

  const mb = size/(1000*1000)
  return mb.toFixed(2)+"MB"

}


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold text-slate-900">
          My Files
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-medium text-white transition hover:bg-violet-700"
        >
          <Plus size={18} />
          Add File
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b p-6">
              <h2 className="text-3xl font-bold">
                Add New File
              </h2>

              <button
                onClick={() => setShowModal(false)}
                className="rounded-full p-2 transition hover:bg-slate-100"
              >
                <X size={28} />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-6 p-8 h-full mb-2"
            >
              <div>
                <label className="mb-2 block text-lg font-medium">
                  Filename
                </label>

                <input
                  type="text"
                  name="filename"
                  placeholder="Enter file name"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-lg font-medium">
                  Choose a file
                </label>

                <input
                  type="file"
                  name="file"
                  className="w-full rounded-xl border border-slate-300 p-3"
                />
              </div>

              <button
                type="submit"

                className="rounded-xl bg-rose-500 px-6 py-3 font-medium text-white transition hover:bg-rose-600"
              >
                Upload Now
              </button>

              {/* Progress Bar */}
              <div className="h-8  overflow-hidden rounded-full bg-green-400" style={{ width: 0 }} id="progress">
                <div className="h-full  rounded-full bg-green-500"></div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-2xl bg-white shadow lg:block">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-950 text-left text-white">
              <th className="px-8 py-5">Filename</th>
              <th className="px-8 py-5">Type</th>
              <th className="px-8 py-5">Size</th>
              <th className="px-8 py-5">CreatedAt</th>
              <th className="px-8 py-5">Action</th>
            </tr>
          </thead>

          <tbody>
            {files.map((file, index) => (
              <tr
                key={file._id || index}
                className="border-b border-slate-100 hover:bg-slate-50"
              >
                <td className="px-8 py-5 first-letter:uppercase" >
                  {file.filename}
                </td>

                <td className="px-8 py-5">
                  {file.type}
                </td>

                <td className="px-8 py-5">
                  {getSize(file.size)}
                </td>

                <td className="px-8 py-5">
                  {moment(file.createdAt).format('MMM DD YYYY hh mm A')}
                </td>

                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => deleteFile(file._id)}
                      className="rounded-lg bg-rose-500 p-3 text-white transition hover:bg-rose-600"
                    >
                      <Trash2 size={18} />
                    </button>

                    <button
                      onClick={() => downloadHandle(file._id, file.filename)}
                      className="rounded-lg bg-emerald-500 p-3 text-white transition hover:bg-emerald-600"
                    >
                      <Download size={18} />
                    </button>

                    <button
                      onClick={() =>
                        console.log("Share", file)
                      }
                      className="rounded-lg bg-amber-400 p-3 text-white transition hover:bg-amber-500"
                    >
                      <Share2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="grid gap-4 lg:hidden">
        {files.map((file, index) => (
          <div
            key={file._id || index}
            className="rounded-2xl bg-white p-5 shadow"
          >
            <div className="space-y-2">
              <h3 className="font-semibold">
                {file.filename}
              </h3>

              <p className="text-sm text-slate-500">
                Type: {file.type}
              </p>

              <p className="text-sm text-slate-500">
                Size: {file.size}
              </p>

              <p className="text-sm text-slate-500">
                CreatedAt {file.createdAt}
              </p>
            </div>

            <div className="mt-5 flex gap-3">
              <button
                onClick={() => deleteFile(file._id)}
                className="rounded-lg bg-rose-500 p-3 text-white"
              >
                <Trash2 size={18} />
              </button>

              <button
                onClick={() => downloadHandle(file._id, file.filename)}
                className="rounded-lg bg-emerald-500 p-3 text-white"
              >
                <Download size={18} />
              </button>

              <button
                onClick={() =>
                  console.log("Share", file)
                }
                className="rounded-lg bg-amber-400 p-3 text-white"
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default File;