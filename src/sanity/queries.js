import { client, urlFor } from "./client";

// Fetch all players, grouped by division
export async function fetchPlayers() {
    console.log("📡 fetchPlayers() called - starting Sanity query...");

    try {
        const query = `*[_type == "player"] | order(division asc, jerseyNumber asc) {
      _id,
      name,
      jerseyNumber,
      position,
      gradYear,
      division,
      bio,
      image
    }`;

        console.log("📡 Executing query:", query);
        const players = await client.fetch(query);
        console.log("📡 Raw players received:", players);

        // Group by division
        const rosterByDivision = {};
        for (const player of players) {
            const division = player.division || "Other";
            if (!rosterByDivision[division]) {
                rosterByDivision[division] = [];
            }
            rosterByDivision[division].push({
                id: player._id,
                name: player.name,
                jerseyNumber: player.jerseyNumber,
                position: player.position,
                gradYear: player.gradYear,
                image: player.image ? urlFor(player.image).url() : "/images/webp/player1.webp",
                bio: player.bio || "",
            });
        }

        console.log("📡 Grouped roster:", rosterByDivision);
        return rosterByDivision;
    } catch (error) {
        console.error("📡 fetchPlayers ERROR:", error);
        throw error;
    }
}

// Fetch schedule events
export async function fetchScheduleEvents(eventType) {
    const typeFilter = eventType ? `&& eventType == "${eventType}"` : "";
    const query = `*[_type == "scheduleEvent" ${typeFilter}] | order(sortOrder asc) {
    _id,
    name,
    eventType,
    date,
    location,
    country,
    time,
    result,
    sortOrder
  }`;

    const events = await client.fetch(query);

    return events.map((event) => ({
        name: event.name,
        country: event.country || "",
        location: event.location,
        date: event.date,
        time: event.time || "TBA",
        result: event.result || "",
    }));
}
