"use client";

import { useEffect } from "react";

export function TrackArticleView({
  articleId,
  categoryId,
}: {
  articleId: string;
  categoryId: string;
}) {
  useEffect(() => {
    const key = `cronica_tracked_${articleId}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");

    void fetch("/api/track-view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ articleId, categoryId }),
      keepalive: true,
    });
  }, [articleId, categoryId]);

  return null;
}
