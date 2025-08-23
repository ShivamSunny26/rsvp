import { supabase } from "../../lib/supabaseClient";   // relative import

export default async function EventsPage() {
  // Fetch events from Supabase
  const { data: events, error } = await supabase
    .from("events")
    .select("id, title, date, city")
    .order("date", { ascending: true });

  if (error) {
    return <p>Error loading events: {error.message}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Upcoming Events</h1>
      {events?.length === 0 && <p>No events available.</p>}
      <ul>
        {events?.map((ev) => (
          <li key={ev.id} className="p-2 border-b">
            <a
              href={`/events/${ev.id}`}
              className="text-blue-500 hover:underline"
            >
              {ev.title}
            </a>{" "}
            – {ev.city} ({new Date(ev.date).toDateString()})
          </li>
        ))}
      </ul>
    </div>
  );
}
