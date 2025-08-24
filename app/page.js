import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-xl w-full text-center">
        <h1 className="text-3xl font-bold mb-3">Events App</h1>
        <p className="text-gray-300 mb-6">
          Browse upcoming events and RSVP in a click.
        </p>
        <Link
          href="/events"
          className="inline-block bg-white text-gray-900 rounded-xl px-4 py-2 font-medium"
        >
          View Events
        </Link>
      </div>
    </main>
  );
}
