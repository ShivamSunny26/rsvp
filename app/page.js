import { supabase } from "../lib/supabaseClient";

export default async function Home() {
  const { data: events, error } = await supabase
    .from("events")
    .select("id, title, city, date");

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Events from Supabase</h1>
      <ul>
        {events?.map(ev => (
          <li key={ev.id}>
            {ev.title} – {ev.city} ({new Date(ev.date).toDateString()})
          </li>
        ))}
      </ul>
    </main>
  );
}
