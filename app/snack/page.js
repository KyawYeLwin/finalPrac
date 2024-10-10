"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export default function Home() {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;
  console.debug("API_BASE", API_BASE);
  const { register, handleSubmit, reset } = useForm();
  const [snack, setSnack] = useState([]);
  const [editSnack, setEditSnack] = useState(false);
  const [editSnackId, setEditSnackId] = useState(null);

  async function fetchSnack() {
    const data = await fetch(`${API_BASE}/snack`);
    const c = await data.json();
    setSnack(c);
  }

  const createSnack = (data) => {
    fetch(`${API_BASE}/snack`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => fetchSnack());
  };

  const deleteById = (id) => async () => {
    if (!confirm("Are you sure?")) return;

    await fetch(`${API_BASE}/snack/${id}`, {
      method: "DELETE",
    });
    fetchSnack();
  };

  const updateById = (data) => {
    alert("update");
    fetch(`${API_BASE}/snack/${editSnackId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      fetchSnack();
      cancel();
      reset();
    });
  };

  useEffect(() => {
    fetchSnack();
    // fetchProducts();
  }, []);

  const handleEdit = (id) => {
    setEditSnackId(id);
    setEditSnack(true);
    console.log("edit snack", id);
    console.log("edit snack", snack);
  };

  const cancel = () => {
    setEditSnack(false);
    setEditSnackId(null);
  };
  console.log(editSnack);
  console.log(editSnackId);
  return (
    <div>
      <div className="flex-1 w-64 ">
        <form onSubmit={handleSubmit(editSnack ? updateById : createSnack)}>
          <div className="flex gap-4 m-4 w-full">
            <div>Name:</div>
            <div>
              <input
                name="name"
                type="text"
                defaultValue={
                  editSnack
                    ? snack.find((p) => p._id === editSnackId)?.name
                    : ""
                }
                {...register("name", { required: true })}
                className="border border-black w-full min-w-96"
              />
            </div>

            <div className="col-span-2">
              <input
                type="submit"
                value={editSnack ? "Update" : "Add"}
                className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              />
            </div>
            {editSnack && (
              <button
                className="bg-red-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={() => cancel()}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
      <div className="border p-12  bg-slate-300 flex-1 w-full">
        <h1 className="text-2xl">Products ({snack.length})</h1>
        <div>
          {snack.map((p) => (
            <div key={p._id} className="flex w-full mt-12">
              <div className="w-96">
                <Link href={`/snack/${p._id}`} className="font-bold">
                  {p.name}
                </Link>
              </div>
              <button
                className="border border-black p-2"
                onClick={() => handleEdit(p._id)}
              >
                edit
              </button>{" "}
              <button
                className="border border-black p-2"
                onClick={deleteById(p._id)}
              >
                delete
              </button>{" "}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
