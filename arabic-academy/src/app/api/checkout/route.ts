import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getCourseById } from "@/lib/courses";
import { headers } from "next/headers";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

export async function POST(req: NextRequest) {
  try {
    const { courseId } = await req.json();
    const course = getCourseById(courseId);
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    if (!stripeSecretKey) {
      return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
    }

    const stripe = new Stripe(stripeSecretKey);

    const hdrs = await headers();
    const origin = hdrs.get("origin") || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: course.currency,
            product_data: {
              name: course.title,
              description: course.description,
            },
            unit_amount: course.priceCents,
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}&courseId=${course.id}`,
      cancel_url: `${origin}/courses/${course.slug}`,
      metadata: { courseId: course.id, courseSlug: course.slug },
    });

    return NextResponse.json({ id: session.id, url: session.url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}