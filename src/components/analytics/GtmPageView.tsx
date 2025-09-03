"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { gtmPush } from "@/lib/gtm";

function Inner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
    gtmPush({
      event: "view_page",
      page_location: url,
      page_path: pathname,
      page_query: searchParams?.toString() || "",
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  return null;
}

export default function GtmPageView() {
  return (
    <Suspense fallback={null}>
      <Inner />
    </Suspense>
  );
}
