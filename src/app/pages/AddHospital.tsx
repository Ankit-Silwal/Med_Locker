import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";

export default function AddHospital() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");

  const handleAddHospital = () => {
    console.log({ name, location, password });
    alert("Button working ✅ (Firebase next step)");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-2xl font-bold">Add Hospital</h1>

      <input
        type="text"
        placeholder="Hospital Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded w-64"
      />

      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="border p-2 rounded w-64"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded w-64"
      />

      <button
        onClick={handleAddHospital}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Hospital
      </button>
    </div>
  );
}