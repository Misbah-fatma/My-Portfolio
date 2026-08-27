import https from "node:https";

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function formatFrom(value) {
  const raw = String(value || "beth.t@example.com").trim();
  if (raw.includes("<") && raw.includes(">")) return raw;
  return `Portfolio <${raw}>`;
}

function postResend(apiKey, body) {
  const data = Buffer.from(JSON.stringify(body));
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: "api.resend.com",
        path: "/emails",
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "Content-Length": data.length,
        },
      },
      (res) => {
        let raw = "";
        res.on("data", (chunk) => {
          raw += chunk;
        });
        res.on("end", () => {
          let json = {};
          try {
            json = raw ? JSON.parse(raw) : {};
          } catch {
            reject(new Error(raw || "Resend returned invalid JSON"));
            return;
          }
          if (res.statusCode >= 400) {
            reject(
              new Error(json.message || json.name || `Resend HTTP ${res.statusCode}`)
            );
            return;
          }
          resolve(json);
        });
      }
    );
    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

export async function sendContactEmail(payload) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error("RESEND_API_KEY is missing");
  }

  const to = process.env.CONTACT_TO || "misbah7370@gmail.com";
  const from = formatFrom(process.env.RESEND_FROM);
  const name = escapeHtml(payload.name);
  const email = escapeHtml(payload.email);
  const inquiry = escapeHtml(payload.project || "Not specified");
  const body = escapeHtml(payload.message).replaceAll("\n", "<br />");

  return postResend(key, {
    from,
    to: [to],
    reply_to: payload.email,
    subject: `Portfolio inquiry from ${payload.name}`,
    html: `
      <div style="font-family:Georgia,serif;line-height:1.5;color:#111">
        <p>New message from the portfolio contact form.</p>
        <p><strong>Name:</strong> ${name}<br />
        <strong>Email:</strong> ${email}<br />
        <strong>Inquiry:</strong> ${inquiry}</p>
        <p>${body}</p>
      </div>
    `,
    text: [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Inquiry: ${payload.project || "Not specified"}`,
      "",
      payload.message,
    ].join("\n"),
  });
}
