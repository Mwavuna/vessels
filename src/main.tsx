
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";

  createRoot(document.getElementById("root")!).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #0f172a, #1e293b)",
      color: "white",
      fontFamily: "Arial, sans-serif",
      padding: "20px",
      boxSizing: "border-box",
    }}
  >
    <div
      style={{
        textAlign: "center",
        maxWidth: "600px",
        padding: "40px",
        borderRadius: "20px",
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
      }}
    >
      <div style={{ fontSize: "64px", marginBottom: "20px" }}>🚧</div>

      <h1
        style={{
          margin: 0,
          fontSize: "2.5rem",
          marginBottom: "16px",
        }}
      >
        Currently Under Maintenance
      </h1>

      <p
        style={{
          color: "#cbd5e1",
          lineHeight: 1.7,
          marginBottom: "30px",
          fontSize: "1.1rem",
        }}
      >
        We're making improvements to provide a better experience.
        The website will be back online shortly.
      </p>

      <a
        href="tel:+254708612010"
        style={{
          display: "inline-block",
          background: "#22c55e",
          color: "#fff",
          textDecoration: "none",
          padding: "14px 28px",
          borderRadius: "10px",
          fontWeight: "bold",
          fontSize: "1rem",
          marginBottom: "15px",
        }}
      >
        📞 Call Us: +254 708612010
      </a>

      <div>
        <a
          href="https://wa.me/254708612010"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#93c5fd",
            textDecoration: "none",
            fontSize: "0.95rem",
          }}
        >
          💬 Contact us on WhatsApp
        </a>
      </div>
    </div>
  </div>
);