import { NextResponse } from "next/server";
import { SquareClient, SquareEnvironment, SquareError } from "square";
import type { Square } from "square";
import { randomUUID } from "crypto";
import { BASE_PRICE, ORDERING_MACHINE_PRICE, ORDERING_MACHINE_SETUP_FEE } from "@/lib/pricing";

interface CheckoutBody {
  addOrderingMachine: boolean;
  customerEmail: string;
  customerName: string;
}

export async function POST(req: Request) {
  const { SQUARE_ACCESS_TOKEN, SQUARE_LOCATION_ID, SQUARE_ENVIRONMENT } = process.env;

  if (!SQUARE_ACCESS_TOKEN || !SQUARE_LOCATION_ID) {
    console.error("Missing Square environment variables");
    return NextResponse.json({ success: false, error: "Server configuration error" }, { status: 500 });
  }

  let body: CheckoutBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request body" }, { status: 400 });
  }

  const { addOrderingMachine, customerEmail, customerName } = body;

  const lineItems: Square.OrderLineItem[] = [];

  lineItems.push({
    name: "Firewood Website — Website Plan (Monthly)",
    quantity: "1",
    basePriceMoney: { amount: BigInt(BASE_PRICE * 100), currency: "USD" as Square.Currency },
  });

  if (addOrderingMachine) {
    lineItems.push({
      name: "The Ordering Machine (Monthly)",
      quantity: "1",
      basePriceMoney: { amount: BigInt(ORDERING_MACHINE_PRICE * 100), currency: "USD" as Square.Currency },
    });
    lineItems.push({
      name: "The Ordering Machine — One-Time Setup",
      quantity: "1",
      basePriceMoney: { amount: BigInt(ORDERING_MACHINE_SETUP_FEE * 100), currency: "USD" as Square.Currency },
    });
  }

  const client = new SquareClient({
    token: SQUARE_ACCESS_TOKEN,
    environment:
      SQUARE_ENVIRONMENT === "production"
        ? SquareEnvironment.Production
        : SquareEnvironment.Sandbox,
  });

  try {
    const response = await client.checkout.paymentLinks.create({
      idempotencyKey: randomUUID(),
      order: {
        locationId: SQUARE_LOCATION_ID,
        lineItems,
        referenceId: `firewoodwebsite-${Date.now()}`,
      },
      checkoutOptions: {
        askForShippingAddress: false,
        redirectUrl: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://firewoodwebsite.com"}/confirmation`,
        merchantSupportEmail: "hello@firewoodwebsite.com",
      },
      prePopulatedData: {
        buyerEmail: customerEmail,
      },
      paymentNote: `New client: ${customerName} — ${customerEmail}`,
    });

    const url = response.paymentLink?.url;
    if (!url) {
      console.error("[Square] Payment link created but URL is missing. Full response:", JSON.stringify(response, null, 2));
      return NextResponse.json({ success: false, error: "Square did not return a checkout URL" }, { status: 502 });
    }

    console.log("[Square] Payment link created successfully:", url);
    return NextResponse.json({ success: true, checkoutUrl: url });
  } catch (err) {
    if (err instanceof SquareError) {
      console.error("[Square] API error —", {
        statusCode: err.statusCode,
        message: err.message,
        errors: JSON.stringify(err.errors, null, 2),
        body: JSON.stringify(err.body, null, 2),
      });
    } else {
      console.error("[Square] Unexpected error —", err);
    }
    return NextResponse.json({ success: false, error: "Failed to create checkout session" }, { status: 502 });
  }
}
