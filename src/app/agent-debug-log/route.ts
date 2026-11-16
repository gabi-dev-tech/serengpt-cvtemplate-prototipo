// #region agent log
// Temporary relay so a phone on the LAN can reach the local debug log server.
export async function POST(req: Request) {
  const body = await req.text();
  await fetch("http://127.0.0.1:7499/ingest/84df4dbd-5e06-4352-9fff-1c47127cb330", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "edd178" },
    body,
  }).catch(() => {});
  return new Response(null, { status: 204 });
}
// #endregion
