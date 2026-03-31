import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        gap: "1rem",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "6rem", fontWeight: 700, color: "#1a56db" }}>
        404
      </h1>
      <p style={{ fontSize: "1.25rem", color: "#6b7280" }}>
        Page not found
      </p>
      <Link
        href="/"
        style={{
          marginTop: "1rem",
          padding: "0.75rem 2rem",
          backgroundColor: "#1a56db",
          color: "#fff",
          borderRadius: "0.5rem",
          fontWeight: 500,
        }}
      >
        Go Home
      </Link>
    </div>
  );
}
