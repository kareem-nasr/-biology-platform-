"use client";

import { useState } from "react";

export function BuyButton({ courseId, label }: { courseId: string; label?: string }) {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId }),
      });
      if (!res.ok) throw new Error("Failed to create checkout session");
      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url as string;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err) {
      alert("حدث خطأ أثناء بدء الدفع. حاول مرة أخرى.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={onClick} disabled={loading} className="rounded-full px-4 py-2 text-sm bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50">
      {loading ? "...جاري المعالجة" : label ?? "اشتري الآن"}
    </button>
  );
}