export default function FlightHeader({ flight, badge }) {
  return (
    <div className="fsCardHeader">
      <div className="fsLeftTitle">
        <div className="fsFlightCode">
          {flight?.flight?.iata || flight?.flight?.icao || "—"}
        </div>
        <div className="fsAirlineName">
          {flight?.airline?.name || "—"} (
          {flight?.airline?.iata || flight?.airline?.icao || "—"})
        </div>
      </div>

      <div className="fsRoute">
        <div className="fsAirportBox">
          <div className="fsAirportCode">{flight?.departure?.iata || "—"}</div>
          <div className="fsAirportName">{flight?.departure?.airport || "—"}</div>
        </div>

        <div className="fsPlane">✈</div>

        <div className="fsAirportBox">
          <div className="fsAirportCode">{flight?.arrival?.iata || "—"}</div>
          <div className="fsAirportName">{flight?.arrival?.airport || "—"}</div>
        </div>
      </div>

      <div className={`fsBadge fs-${badge.tone}`}>
        <div className="fsBadgeMain">{badge.label}</div>
        <div className="fsBadgeSub">{badge.sub}</div>
      </div>
    </div>
  );
}