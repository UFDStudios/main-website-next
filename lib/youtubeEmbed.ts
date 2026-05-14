/** Returns the YouTube watch/embed video id, or null if the URL is not a recognized YouTube link. */
export function getYouTubeVideoId(url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed) return null;

  let parsed: URL;
  try {
    parsed = new URL(/^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`);
  } catch {
    return null;
  }

  const host = parsed.hostname.replace(/^www\./i, "");

  if (host === "youtu.be") {
    const id = parsed.pathname.split("/").filter(Boolean)[0];
    return id || null;
  }

  if (host === "youtube.com" || host === "m.youtube.com" || host === "music.youtube.com") {
    if (parsed.pathname.startsWith("/embed/")) {
      const id = parsed.pathname.split("/")[2];
      return id || null;
    }
    if (parsed.pathname.startsWith("/shorts/")) {
      const id = parsed.pathname.split("/")[2];
      return id || null;
    }
    const v = parsed.searchParams.get("v");
    if (v) return v;
  }

  return null;
}

export function getYouTubeEmbedSrc(url: string): string | null {
  const id = getYouTubeVideoId(url);
  return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
}

export function isYouTubeUrl(url: string): boolean {
  return getYouTubeVideoId(url) !== null;
}
