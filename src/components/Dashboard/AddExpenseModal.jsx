import { X } from "lucide-react";
import useTheme from "../../context/Theme";

function AddExpenseModal({ onClose }) {
  const { themeMode } = useTheme();

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-3xl border border-gray-200  bg-white"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 ">
              Add Expense
            </h2>

            <p className="text-sm text-gray-600 ">
              Record a new transaction
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-600  hover:text-gray-900  transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form className="p-6 space-y-4">
          <div>
            <label className="block mb-2 text-sm text-gray-900 ">
              Description
            </label>

            <input
              type="text"
              placeholder="e.g. Spotify Premium"
              className="w-full rounded-xl border border-gray-300   text-gray-900  px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-600 placeholder-gray-500 "
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm text-gray-900 ">
                Amount
              </label>

              <input
                type="number"
                placeholder="0.00"
                className="w-full rounded-xl border border-gray-300   text-gray-900  px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-600 placeholder-gray-500 "
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-900 ">
                Category
              </label>

              <select
                className="w-full rounded-xl border border-gray-300   text-gray-900  px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-600"
              >
                <option>Food</option>
                <option>Shopping</option>
                <option>Transportation</option>
                <option>Entertainment</option>
                <option>Utilities</option>
                <option>Health</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-900 ">
              Date
            </label>

            <input
              type="date"
              className="w-full rounded-xl border border-gray-300   text-gray-900  py-3 focus:outline-none focus:ring-2 focus:ring-violet-600"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-900 ">
              Note
            </label>

            <textarea
              rows="3"
              placeholder="What was this for?"
              className="w-full rounded-xl border border-gray-300   text-gray-900 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-violet-600 placeholder-gray-500 "
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-gray-800 py-3 hover:bg-gray-900 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 rounded-xl bg-violet-600 py-3 text-white hover:bg-violet-500 transition"
            >
              Add Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddExpenseModal;