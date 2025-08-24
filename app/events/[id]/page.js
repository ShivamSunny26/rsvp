import { supabase } from "../../../lib/supabaseClient";
import RSVPForm from "./RSVPForm";

export const dynamic = "force-dynamic";

export default async function EventPage({ params }) {
  const { id } = params;

  const { data: event, error } = await supabase
    .from("events")
    .select("*, users(name)")
    .eq("id", id)
    .single();

  if (error || !event) {
    return <p className="text-red-500 p-6">Event not found.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-3">{event.title}</h1>
        <p className="text-gray-700 mb-4">{event.description}</p>
        <p className="text-sm text-gray-500 mb-2">📍 {event.city}</p>
        <p className="text-sm text-gray-500 mb-2">📅 {new Date(event.date).toLocaleDateString()}</p>
        <p className="text-sm text-gray-500 mb-6">
          👤 Organized by {event.Users?.name}
        </p>

        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">RSVP</h2>
          <RSVPForm eventId={event.id} />
        </div>
      </div>
    </div>
  );
}
