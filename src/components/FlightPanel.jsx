export default function FlightPanel({ title, data, formatDateTime }) {
  return (
    <div className="fsPanel">
      <div className="fsPanelTitle">
        <div className="fsPanelChip">{title}</div>
      </div>

      <div className="fsPanelAirport">{data?.airport || "—"}</div>
      <div className="fsPanelMeta">
        IATA: {data?.iata || "—"}  ICAO: {data?.icao || "—"}
      </div>

      <div className="fsGrid">
        <div className="fsGridCell">
          <div className="fsGridLabel">Scheduled</div>
          <div className="fsGridValue">
            {formatDateTime(data?.scheduled)}
          </div>
        </div>

        <div className="fsGridCell">
          <div className="fsGridLabel">Estimated</div>
          <div className="fsGridValue">
            {formatDateTime(data?.estimated)}
          </div>
        </div>

        <div className="fsGridCell">
          <div className="fsGridLabel">Actual</div>
          <div className="fsGridValue">
            {formatDateTime(data?.actual)}
          </div>
        </div>

        <div className="fsGridCell">
          <div className="fsGridLabel">Runway</div>
          <div className="fsGridValue">{data?.runway || "—"}</div>
        </div>
      </div>

      <div className="fsMiniRow">
        <div className="fsMiniPill">
          <span>Terminal</span>
          <b>{data?.terminal || "—"}</b>
        </div>

        <div className="fsMiniPill">
          <span>Gate</span>
          <b>{data?.gate || "—"}</b>
        </div>
      </div>
    </div>
  );
}