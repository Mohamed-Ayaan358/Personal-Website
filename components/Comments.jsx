"use client";
import { useEffect, useRef } from "react";
export default function Comments() {
  const ref = useRef(null);
  useEffect(() => {
    const values = {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      "repo-id": process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      "category-id": process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
    };
    if (Object.values(values).some((value) => !value)) return;
    const container = ref.current;
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    Object.entries({
      ...values,
      mapping: "pathname",
      theme: "light",
      "reactions-enabled": "1",
      lang: "en",
    }).forEach(([key, value]) => script.setAttribute("data-" + key, value));
    container.append(script);
    return () => container.replaceChildren();
  }, []);
  return <div ref={ref} />;
}
