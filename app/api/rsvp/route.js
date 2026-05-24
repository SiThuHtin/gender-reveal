import { Resend } from "resend";
import { NextResponse } from "next/server";
import { eventConfig } from "../../components/eventConfig";

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmailHtml({ name, response, numberOfGuests, wish }) {
  const attending = response === "Yes";
  const statusLabel = attending ? "Joyfully Accept" : "Regretfully Decline";
  const statusColor = attending ? "#E89EB1" : "#7FB6D8";

  return `
    <!DOCTYPE html>
    <html>
      <body style="margin:0;padding:0;background:#f8f4f0;font-family:Arial,sans-serif;color:#2d3436;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f4f0;padding:32px 16px;">
          <tr>
            <td align="center">
              <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.08);">
                <tr>
                  <td style="padding:28px 32px;background:linear-gradient(135deg,#f7c8d3,#bcdcef);text-align:center;">
                    <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#2d3436;">Gender Reveal RSVP</p>
                    <h1 style="margin:0;font-size:28px;color:#2d3436;">${escapeHtml(eventConfig.couple.joined)}</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding:32px;">
                    <p style="margin:0 0 20px;font-size:16px;">You have a new RSVP from <strong>${escapeHtml(name)}</strong>.</p>

                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                      <tr>
                        <td style="padding:12px 0;border-bottom:1px solid #eee;font-size:14px;color:#666;">Guest</td>
                        <td style="padding:12px 0;border-bottom:1px solid #eee;font-size:14px;text-align:right;font-weight:bold;">${escapeHtml(name)}</td>
                      </tr>
                      <tr>
                        <td style="padding:12px 0;border-bottom:1px solid #eee;font-size:14px;color:#666;">Response</td>
                        <td style="padding:12px 0;border-bottom:1px solid #eee;font-size:14px;text-align:right;font-weight:bold;color:${statusColor};">${statusLabel}</td>
                      </tr>
                      ${
                        attending
                          ? `<tr>
                        <td style="padding:12px 0;border-bottom:1px solid #eee;font-size:14px;color:#666;">Guests</td>
                        <td style="padding:12px 0;border-bottom:1px solid #eee;font-size:14px;text-align:right;font-weight:bold;">${escapeHtml(numberOfGuests || "1")}</td>
                      </tr>`
                          : ""
                      }
                    </table>

                    <div style="background:#fdf6f0;border-left:4px solid #e89eb1;padding:16px 20px;border-radius:8px;margin-bottom:24px;">
                      <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.15em;text-transform:uppercase;color:#999;">Wish for Baby</p>
                      <p style="margin:0;font-size:15px;line-height:1.6;font-style:italic;">${
                        wish
                          ? escapeHtml(wish).replace(/\n/g, "<br>")
                          : '<span style="color:#999;">No wish left</span>'
                      }</p>
                    </div>

                    <div style="background:#f8f4f0;padding:16px 20px;border-radius:8px;">
                      <p style="margin:0 0 6px;font-size:12px;letter-spacing:0.15em;text-transform:uppercase;color:#999;">Event Details</p>
                      <p style="margin:0 0 4px;font-size:14px;"><strong>${escapeHtml(eventConfig.reveal.displayDate)}</strong></p>
                      <p style="margin:0 0 4px;font-size:14px;">${escapeHtml(eventConfig.reveal.displayTime)}</p>
                      <p style="margin:0 0 4px;font-size:14px;">${escapeHtml(eventConfig.venue.name)}</p>
                      <p style="margin:0;font-size:13px;color:#666;">${escapeHtml(eventConfig.venue.address)}</p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

export async function POST(request) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const toEmail = process.env.RSVP_TO_EMAIL;

  if (!apiKey || !fromEmail || !toEmail) {
    console.error("Missing Resend environment variables");
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, response, numberOfGuests, wish } = body;

  if (!name?.trim()) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (response !== "Yes" && response !== "No") {
    return NextResponse.json({ error: "Invalid RSVP response." }, { status: 400 });
  }
  if (response === "Yes" && !numberOfGuests) {
    return NextResponse.json({ error: "Number of guests is required." }, { status: 400 });
  }

  const trimmedWish = wish?.trim() || "";

  const attending = response === "Yes";
  const subject = attending
    ? `✅ RSVP Yes — ${name.trim()} (${numberOfGuests} guest${Number(numberOfGuests) === 1 ? "" : "s"})`
    : `❌ RSVP No — ${name.trim()}`;

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    subject,
    html: buildEmailHtml({
      name: name.trim(),
      response,
      numberOfGuests,
      wish: trimmedWish,
    }),
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
