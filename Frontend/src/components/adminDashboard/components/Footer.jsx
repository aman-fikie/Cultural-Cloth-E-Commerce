import React from "react";

export default function Footer() {
  return (
    <footer
      style={{
        marginTop: "auto",
        padding: "1.25rem 2rem",
        backgroundColor: "#FFFFFF",
        borderTop: "1px solid #E8E2D5",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "0.825rem",
        color: "#6E6E6E",
      }}
    >
      <div>
        © {new Date().getFullYear()}{" "}
        <strong style={{ color: "#7A1E2C" }}>Cultural Cloth</strong> Ecommerce
        Administration. All rights reserved.
      </div>
      <div style={{ display: "flex", gap: "1.25rem" }}>
        <a href="#privacy" style={{ color: "#6E6E6E", textDecoration: "none" }}>
          Privacy Policy
        </a>
        <a href="#terms" style={{ color: "#6E6E6E", textDecoration: "none" }}>
          Terms of Service
        </a>
        <a
          href="#support"
          style={{
            color: "#2E5D50",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          System Support
        </a>
      </div>
    </footer>
  );
}
