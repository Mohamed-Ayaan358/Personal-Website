export default async function subscribe(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Use POST" });
  const { email } = req.body || {};
  if (!email) return res.status(400).json({ error: "Email is required" });
  const {
    MAILCHIMP_API_KEY: key,
    MAILCHIMP_API_SERVER: server,
    MAILCHIMP_AUDIENCE_ID: list,
  } = process.env;
  if (!key || !server || !list)
    return res.status(503).json({ error: "Newsletter is not configured" });
  try {
    const response = await fetch(
      `https://${server}.api.mailchimp.com/3.0/lists/${list}/members`,
      {
        method: "POST",
        headers: {
          Authorization:
            "Basic " + Buffer.from("portfolio:" + key).toString("base64"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email_address: email, status: "subscribed" }),
      },
    );
    return res
      .status(response.ok ? 201 : 500)
      .json({
        error: response.ok ? "" : "There was an error subscribing to the list.",
      });
  } catch {
    return res
      .status(500)
      .json({ error: "There was an error subscribing to the list." });
  }
}
