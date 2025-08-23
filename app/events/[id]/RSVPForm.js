"use client";   // ✅ now this is a client component

import { useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

export default function RSVPForm({ eventId }) {
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  const handleRSVP = async () => {
    if (!status) {
      setMessage("Please select an option.");
      return;
    }

    // Demo: hardcode user_id = 1 (later replace with auth)
    const { error } = await supabase.from("rsvps").insert([
      {
        user_id: 1,
        event_id: eventId,
        status,
      },
    ]);

    if (error) {
      setMessage("Error: " + error.message);
    } else {
      setMessage("Your RSVP has been recorded!");
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold">RSVP</h2>
      <div className="flex gap-4 mt-2">
        <select
          className="border p-2 rounded"
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">-- Select --</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="Maybe">Maybe</option>
        </select>
        <button
          onClick={handleRSVP}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>
      {message && <p className="mt-2 text-green-600">{message}</p>}
    </div>
  );
}
