import React, { useState } from "react";
import "./FlightSearch.css";
import "./FlightSegment.css";
import "./FlightHeader.css";
import "./FlightPanel.css";
import "./FlightResultCard.css";
import FlightSegment from "./FlightSegment";
import FlightResultCard from "./FlightResultCard.jsx";


const API_BASE = "https://api.aviationstack.com/v1/flights";

function formatDateTime(dt) {
  if (!dt) return "—";
  const d = new Date(dt);
  if (Number.isNaN(d.getTime())) return dt;
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}
function statusBadge(status) {
  const s = (status || "").toLowerCase();

  if (s.includes("active") || s.includes("en-route") || s.includes("airborne")) {
    return { label: "Airborne", tone: "good", sub: "On Time" };
  }
  if (s.includes("landed")) return { label: "Landed", tone: "good", sub: "Completed" };
  if (s.includes("scheduled")) return { label: "Scheduled", tone: "neutral", sub: "Upcoming" };
  if (s.includes("cancel")) return { label: "Cancelled", tone: "bad", sub: "Check airline" };
  if (s.includes("delay")) return { label: "Delayed", tone: "warn", sub: "Check updates" };

  return { label: status || "Unknown", tone: "warn", sub: "" };
}

function stripSpaces(str) {
  return (str || "").replace(/\s/g, "");
}

export default function FlightSearch() {
  const apiKey = import.meta.env.VITE_AVIATIONSTACK_KEY;

  const [airline, setAirline] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [date, setDate] = useState(() => {
    const t = new Date();
    const yyyy = t.getFullYear();
    const mm = String(t.getMonth() + 1).padStart(2, "0");
    const dd = String(t.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [flights, setFlights] = useState([]);

  async function onSearch(e) {
    e.preventDefault();
    setError("");
    setFlights([]);

    if (!apiKey) {
      setError("Missing API key.");
      return;
    }

    const fn = stripSpaces(flightNumber).toUpperCase();
    if (!fn) {
      setError("Please enter a valid flight number");
      return;
    }

    setLoading(true);

    try {
      const params = new URLSearchParams({
        access_key: apiKey,
        limit: "50",
      });

      const hasLetters = /[A-Z]/.test(fn);
      if (hasLetters) {
        params.set("flight_iata", fn);
      } else {
        params.set("flight_number", fn);
      }

      const url = `${API_BASE}?${params.toString()}`;

      const res = await fetch(url);
      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        const apiMsg = json?.error?.message || "Request rejected by Aviationstack";
        const apiCode = json?.error?.code ? ` (${json.error.code})` : "";
        throw new Error(`${apiMsg}${apiCode} [HTTP ${res.status}]`);
      }

      const data = Array.isArray(json?.data) ? json.data : [];

      if (data.length === 0) {
        throw new Error(
          "No flights found for that flight number right now. Try another flight number or try again later."
        );
      }
      setFlights(data);
    } catch (err) {
      setError(err?.message || "Could not fetch flight data.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fsPage">
      <div className="fsTopbar">
        <form className="fsFormBar" onSubmit={onSearch}>
          <FlightSegment
            icon="✈︎"
            placeholder="Airline"
            value={airline}
            onChange={(e) => setAirline(e.target.value)}
          />

          <div className="fsDivider" />

          <FlightSegment
            icon="✈️"
            placeholder="Flight Number"
            value={flightNumber}
            onChange={(e) => setFlightNumber(stripSpaces(e.target.value))}
          />

          <div className="fsDivider" />

          <FlightSegment
            icon="🛫"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <button className="fsSearchBtn" type="submit" disabled={loading}>
            {loading ? "SEARCHING..." : "SEARCH FLIGHT"}
          </button>
        </form>
      </div>

      {error && <div className="fsError">{error}</div>}

      {flights.length > 0 && (
        <div className="fsCardList">
          {flights.map((flight, index) => (
            <FlightResultCard
              key={flight.flight?.icao ?? flight.flight?.iata ?? index}
              flight={flight}
              badge={statusBadge(flight?.flight_status)}
              formatDateTime={formatDateTime}
            />
          ))}
        </div>
      )}
    </div>
  );
}