import { Trash2 } from "lucide-react";

const historyData = [
  {
    id: 1,
    filename: "Introduction to html",
    email: "madiha@gmail.com",
    datetime: "24 June 2025",
  },
  {
    id: 2,
    filename: "Introduction to html",
    email: "madiha@gmail.com",
    datetime: "24 June 2025",
  },
  {
    id: 3,
    filename: "Introduction to html",
    email: "madiha@gmail.com",
    datetime: "24 June 2025",
  },
];

const History = () => {
  const handleDelete = (item) => {
    console.log("Delete History:", item);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">
        History
      </h1>

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-2xl bg-white shadow lg:block">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-950 text-left text-white">
              <th className="px-8 py-5">Filename</th>
              <th className="px-8 py-5">Email</th>
              <th className="px-8 py-5">Datetime</th>
              <th className="px-8 py-5">Action</th>
            </tr>
          </thead>

          <tbody>
            {historyData.map((item) => (
              <tr
                key={item.id}
                className="border-b border-slate-100 hover:bg-slate-50"
              >
                <td className="px-8 py-5">
                  {item.filename}
                </td>

                <td className="px-8 py-5">
                  {item.email}
                </td>

                <td className="px-8 py-5">
                  {item.datetime}
                </td>

                <td className="px-8 py-5">
                  <button
                    onClick={() => handleDelete(item)}
                    className="rounded-lg bg-rose-500 p-3 text-white transition hover:bg-rose-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="grid gap-4 lg:hidden">
        {historyData.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl bg-white p-5 shadow"
          >
            <div className="space-y-2">
              <h3 className="font-semibold">
                {item.filename}
              </h3>

              <p className="text-sm text-slate-500">
                {item.email}
              </p>

              <p className="text-sm text-slate-500">
                {item.datetime}
              </p>
            </div>

            <button
              onClick={() => handleDelete(item)}
              className="mt-5 rounded-lg bg-rose-500 p-3 text-white"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;