export async function checkout(uid: string) {
  try {
    const res = await fetch(`/api/checkout/${uid}`, { method: "POST" });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Server Error:", errorText);
      return;
    }

    const data = await res.json();
    window.location.href = data.url;
  } catch (error) {
    console.error("Purchase Failed:", error);
  }
}
