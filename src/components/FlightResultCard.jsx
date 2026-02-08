import FlightHeader from "./FlightHeader.jsx";
import FlightPanel from "./FlightPanel.jsx";

export default function FlightResultCard({ flight, badge, formatDateTime }) {
  if (!flight) return null;

  return (
    <div className="fsCard">
      <FlightHeader flight={flight} badge={badge} />

      <div className="fsPanels">
        <FlightPanel
          title="Departure"
          data={flight.departure}
          formatDateTime={formatDateTime}
        />

        <FlightPanel
          title="Arrival"
          data={flight.arrival}
          formatDateTime={formatDateTime}
        />
      </div>

      <div className="fsFooter">
        <ul>
        <li>Departure Timezone: {flight?.departure?.timezone || "—"}</li>
        <li>Arrival Timezone: {flight?.arrival?.timezone || "—"}</li>
        </ul>
      </div>
    </div>
  );
}