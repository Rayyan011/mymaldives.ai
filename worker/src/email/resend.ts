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

export function buildBookingEmailHtml(details: BookingDetails): string {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #0077B6;">New Booking Inquiry — MyMaldives.ai</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px; font-weight: bold;">Guest Name</td><td style="padding: 8px;">${details.guestName}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Email</td><td style="padding: 8px;">${details.email}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Resort</td><td style="padding: 8px;">${details.resortName}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Check-in</td><td style="padding: 8px;">${details.checkIn}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Check-out</td><td style="padding: 8px;">${details.checkOut}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Guests</td><td style="padding: 8px;">${details.adults} adults, ${details.children} children</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Budget</td><td style="padding: 8px;">${details.budget}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Special Requests</td><td style="padding: 8px;">${details.specialRequests || 'None'}</td></tr>
      </table>
    </div>
  `;
}

export async function sendBookingEmail(
  apiKey: string,
  details: BookingDetails
): Promise<boolean> {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'MyMaldives.ai <onboarding@resend.dev>',
      to: [details.email],
      subject: `Booking Inquiry: ${details.resortName} — ${details.guestName}`,
      html: buildBookingEmailHtml(details),
    }),
  });

  return res.ok;
}
