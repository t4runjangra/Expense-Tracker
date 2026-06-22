import { X } from "lucide-react";
import { useState } from "react";
import { supabase } from "../../supabase/client";

function AddExpenseModal({ onClose, getExpenses, expense }) {

  const [formData, setFormData] = useState(expense || {
    title: "",
    amount: "",
    category: "Food",
    date: "",
    note: "",
  });
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  }
  // console.log(expense);
  async function handleSubmit(e) {
    e.preventDefault();
    if (expense?.id) {
      await supabase
        .from("expense")
        .update({
          title: formData.title,
          amount: Number(formData.amount),
          category: formData.category,
          created_at: formData.date,
          note: formData.note,
        })
        .eq("id", expense.id)
    } else {

      await supabase
        .from("expense")
        .insert({
          title: formData.title,
          amount: Number(formData.amount),
          category: formData.category,
          created_at: formData.date,
          note: formData.note,
        })
    }
    await getExpenses();
    onClose();
  }


  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-3xl border"
        style={{
          backgroundColor: "var(--card)",
          color: "var(--card-foreground)",
          borderColor: "var(--border)",
        }}
      >
        <div
          className="flex items-center justify-between p-6 border-b"
          style={{
            borderColor: "var(--border)",
          }}
        >
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {expense ? "Edit Expense" : "Add Expense"}
            </h2>

            <p className="text-sm text-gray-500">
              Record a new transaction
            </p>
          </div>

          <button
            onClick={onClose}
            className="hover:opacity-70 transition"
          >
            <X size={20} />
          </button>
        </div>

        <form
          className="p-6 space-y-4"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block mb-2 text-sm">
              Description
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Spotify Premium"
              className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-600"
              style={{
                backgroundColor: "var(--background)",
                color: "var(--foreground)",
                borderColor: "var(--border)",
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm">
                Amount
              </label>

              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-600"
                style={{
                  backgroundColor: "var(--background)",
                  color: "var(--foreground)",
                  borderColor: "var(--border)",
                }}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-600"
                style={{
                  backgroundColor: "var(--background)",
                  color: "var(--foreground)",
                  borderColor: "var(--border)",
                }}
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
            <label className="block mb-2 text-sm">
              Date
            </label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-600"
              style={{
                backgroundColor: "var(--background)",
                color: "var(--foreground)",
                borderColor: "var(--border)",
              }}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">
              Note
            </label>

            <textarea
              rows="3"
              name="note"
              value={formData.note}
              onChange={handleChange}
              placeholder="What was this for?"
              className="w-full rounded-xl border px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-violet-600"
              style={{
                backgroundColor: "var(--background)",
                color: "var(--foreground)",
                borderColor: "var(--border)",
              }}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border py-3 transition"
              style={{
                borderColor: "var(--border)",
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 rounded-xl bg-violet-600 py-3 text-white hover:bg-violet-500 transition"
            >
              {expense ? "Update Expense" : "Add Expense"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default AddExpenseModal;