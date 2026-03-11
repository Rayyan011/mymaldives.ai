import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { sendBookingEmail } from "@/lib/email/resend";

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  const body = await req.json();

  if (
    !body.guestName ||
    !body.email ||
    !body.resortName ||
    !body.checkIn ||
    !body.checkOut
  ) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const success = await sendBookingEmail(body);

  if (!success) {
    return NextResponse.json(
      { error: "Failed to send booking inquiry" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Booking inquiry sent! We'll be in touch soon.",
  });
}
