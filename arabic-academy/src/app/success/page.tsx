import Stripe from "stripe";
import Link from "next/link";
import { getCourseById } from "@/lib/courses";

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ session_id?: string; courseId?: string }> }) {
  const { session_id, courseId } = await searchParams;
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  const course = courseId ? getCourseById(courseId) : undefined;

  let paid = false;
  if (session_id && stripeSecretKey) {
    const stripe = new Stripe(stripeSecretKey);
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      paid = session.payment_status === "paid";
    } catch {
      paid = false;
    }
  }

  return (
    <div className="min-h-screen px-6 py-10 max-w-3xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">شكرًا لك!</h1>
      {paid ? (
        <>
          <p className="mb-6">تم استلام الدفع بنجاح. يمكنك الآن بدء التعلم.</p>
          {course ? (
            <Link href={`/learn/${course.slug}`} className="rounded-full px-4 py-2 text-sm bg-emerald-600 text-white hover:bg-emerald-700">اذهب إلى الدورة</Link>
          ) : null}
        </>
      ) : (
        <>
          <p className="mb-6">ننتظر تأكيد الدفع أو حدث خطأ في التحقق.</p>
          <Link href="/" className="underline">العودة إلى الرئيسية</Link>
        </>
      )}
    </div>
  );
}