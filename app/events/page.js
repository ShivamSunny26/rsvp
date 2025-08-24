import { supabase } from "../../lib/supabaseClient";

export const dynamic = "force-dynamic";


export default async function EventsPage() {
  let events = [];

  try {
    const { data, error } = await supabase.from("events").select("*");
    if (error) throw error;
    events = data;
  } catch (err) {
    console.error("Supabase error:", err.message);
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Upcoming Events</h1>
      {events.length === 0 ? (
        <p className="text-gray-400">No events found.</p>
      ) : (
        <ul className="grid md:grid-cols-2 gap-4">
          {events.map((event) => (
            <li key={event.id} className="p-4 bg-gray-800 rounded-xl">
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p className="text-gray-300">{event.description}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
