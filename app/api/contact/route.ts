import { Resend } from "resend";
import { NextResponse } from "next/server";

const FROM_ADDRESS = process.env.CONTACT_FROM_ADDRESS ?? "Firewood Website <noreply@housecallwebs.com>";
const TO_ADDRESS = process.env.CONTACT_TO_ADDRESS ?? "hello@housecallwebs.com";

export async function POST(req: Request) {
  if (!process.env.RESEND_API_KEY) {
    console.error("Missing RESEND_API_KEY environment variable");
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { name, business, phone, bestTime, deliveryArea, message } = await req.json();

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#f9fafb;border-radius:12px;">
      <div style="background:linear-gradient(135deg,#e8590c,#f2994a);padding:24px 32px;border-radius:8px 8px 0 0;">
        <h1 style="color:#000;margin:0;font-size:20px;font-weight:900;">
          🔥 New Quote Request — Firewood Website
        </h1>
      </div>
      <div style="background:#ffffff;padding:32px;border-radius:0 0 8px 8px;border:1px solid #e5e7eb;">
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;width:40%;color:#6b7280;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Name</td>
            <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#111827;font-size:15px;font-weight:600;">${name}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Business</td>
            <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#111827;font-size:15px;font-weight:600;">${business}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Phone</td>
            <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#111827;font-size:15px;font-weight:600;">${phone}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Best Time to Call</td>
            <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#111827;font-size:15px;">${bestTime}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#6b7280;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Delivery Area</td>
            <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;color:#111827;font-size:15px;">${deliveryArea}</td>
          </tr>
          ${message ? `
          <tr>
            <td style="padding:10px 0;color:#6b7280;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;vertical-align:top;padding-top:14px;">Message</td>
            <td style="padding:10px 0;color:#111827;font-size:15px;padding-top:14px;">${message}</td>
          </tr>` : ""}
        </table>
        <div style="margin-top:28px;padding:16px;background:#fff7ed;border-radius:8px;border-left:4px solid #e8590c;">
          <p style="margin:0;color:#92400e;font-size:13px;">
            📞 <strong>Action required:</strong> Follow up with ${name} at <strong>${phone}</strong> — best time: ${bestTime}.
          </p>
        </div>
      </div>
      <p style="text-align:center;color:#9ca3af;font-size:12px;margin-top:20px;">
        Sent from the Firewood Website contact form
      </p>
    </div>
  `;

  try {
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: TO_ADDRESS,
      subject: `New Quote Request — ${name} (${business})`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}
