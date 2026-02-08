export default function FlightSegment({
  icon,
  placeholder,
  value,
  onChange,
  type = "text",
}) {
  return (
    <div className="fsSeg">
      <span className="fsIcon">{icon}</span>
      <input
        className="fsSegInput"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}