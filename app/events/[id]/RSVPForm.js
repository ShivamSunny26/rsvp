"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function RSVPForm({ eventId }) {
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  const handleRSVP = async () => {
    if (!status) {
      setMessage("Please select an RSVP option.");
      return;
    }

    const { error } = await supabase.from("RSVPs").insert([
      {
        event_id: eventId,
        user_id: 1, // TODO: replace with auth user
        status,
      },
    ]);

    if (error) {
      setMessage("❌ Error saving RSVP.");
    } else {
      setMessage("✅ RSVP saved successfully!");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <select
        className="p-2 border rounded-lg"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">Select RSVP</option>
        <option value="Yes">✅ Yes</option>
        <option value="No">❌ No</option>
        <option value="Maybe">🤔 Maybe</option>
      </select>

      <button
        onClick={handleRSVP}
        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
      >
        Submit RSVP
      </button>

      {message && <p className="text-sm text-gray-600">{message}</p>}
    </div>
  );
}
