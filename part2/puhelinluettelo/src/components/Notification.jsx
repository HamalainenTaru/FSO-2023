const success = {
  color: "green",
  backgroundColor: "lightgray",
  border: "3px solid",
  padding: "10px",
  borderRadius: "5px",
  fontSize: "20px",
  marginBottom: "10px",
};
const fail = {
  color: "red",
  backgroundColor: "lightgray",
  border: "3px solid",
  padding: "10px",
  borderRadius: "5px",
  fontSize: "20px",
  marginBottom: "10px",
};

export default function Notification({ error }) {
  if (error.message === null) return null;
  return (
    <div style={error.type === "success" ? success : fail} className="error">
      {error.message}
    </div>
  );
}
