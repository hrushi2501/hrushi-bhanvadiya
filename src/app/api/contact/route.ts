import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY || "dummy_key");
    const body = await req.json();
    const { name, email, message } = body;

    // Validate
    if (!name?.trim() || !email?.includes("@") || !message?.trim()) {
      return NextResponse.json(
        { error: "All fields are required and email must be valid." },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      // Resend API key belongs to Hrushi now!
      to: "hrushi.2501@gmail.com",
      replyTo: email,
      subject: `Portfolio Contact — ${name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; background: #fafafa; border-radius: 16px;">
          <h2 style="font-size: 18px; font-weight: 500; margin: 0 0 24px 0; color: #111;">New Portfolio Enquiry</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; width: 80px; vertical-align: top;">Name</td>
              <td style="padding: 8px 0; color: #111; font-size: 14px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; vertical-align: top;">Email</td>
              <td style="padding: 8px 0; color: #111; font-size: 14px;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; vertical-align: top;">Message</td>
              <td style="padding: 8px 0; color: #111; font-size: 14px; white-space: pre-wrap;">${message}</td>
            </tr>
          </table>
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0 16px;" />
          <p style="font-size: 11px; color: #999; margin: 0;">Sent from your portfolio contact form</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
