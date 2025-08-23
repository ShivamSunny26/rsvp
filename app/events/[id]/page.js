import { supabase } from "../../../lib/supabaseClient";
import RSVPForm from "./RSVPForm";

export default async function EventDetailPage({ params }) {
  const { id } = params;

  // Fetch event details
  const { data: event, error } = await supabase
    .from("events")
    .select("id, title, description, date, city")
    .eq("id", id)
    .single();

  if (error) {
    return <p>Error loading event: {error.message}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{event.title}</h1>
      <p className="text-gray-600">{new Date(event.date).toDateString()}</p>
      <p className="mt-2">{event.description}</p>
      <p className="mt-2 font-semibold">Location: {event.city}</p>

      {/* RSVP form (client component) */}
      <RSVPForm eventId={event.id} />
    </div>
  );
}
