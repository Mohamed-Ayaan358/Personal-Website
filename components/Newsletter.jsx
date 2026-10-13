"use client";
import { useState } from "react";
export default function Newsletter() {
  const [status, setStatus] = useState("");
  async function subscribe(event) {
    event.preventDefault();
    setStatus("Subscribing…");
    try {
      const response = await fetch("/api/buttondown", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: new FormData(event.currentTarget).get("email"),
        }),
      });
      setStatus(
        response.ok
          ? "You’re subscribed."
          : "Subscription unavailable. Please try again later.",
      );
    } catch {
      setStatus("Subscription unavailable. Please try again later.");
    }
  }
  return (
    <form className="newsletter" onSubmit={subscribe}>
      <h2>Follow the next thought.</h2>
      <label htmlFor="newsletter-email">Email address</label>
      <input id="newsletter-email" name="email" type="email" required />
      <button className="button" type="submit">
        Subscribe ↗
      </button>
      <p role="status">{status}</p>
    </form>
  );
}
