import { Resend } from "resend";

interface BookingDetails {
  guestName: string;
  email: string;
  resortName: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  budget: string;
  specialRequests: string;
}

function buildBookingEmailHtml(details: BookingDetails): string {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #000;">New Booking Inquiry — MyMaldives.ai</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px; font-weight: bold;">Guest Name</td><td style="padding: 8px;">${details.guestName}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Email</td><td style="padding: 8px;">${details.email}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Resort</td><td style="padding: 8px;">${details.resortName}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Check-in</td><td style="padding: 8px;">${details.checkIn}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Check-out</td><td style="padding: 8px;">${details.checkOut}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Guests</td><td style="padding: 8px;">${details.adults} adults, ${details.children} children</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Budget</td><td style="padding: 8px;">${details.budget}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Special Requests</td><td style="padding: 8px;">${details.specialRequests || "None"}</td></tr>
      </table>
    </div>
  `;
}

export async function sendBookingEmail(
  details: BookingDetails
): Promise<boolean> {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: "MyMaldives.ai <onboarding@resend.dev>",
    to: [details.email],
    subject: `Booking Inquiry: ${details.resortName} — ${details.guestName}`,
    html: buildBookingEmailHtml(details),
  });

  return !error;
}
