// export default function initSse() {
//   const url = '/events';
//   const es = new EventSource(url);

//   es.addEventListener('open', () => console.debug('[SSE] connected'));
//   es.addEventListener('error', (e) => console.warn('[SSE] error', e));

//   es.addEventListener('message', (ev: MessageEvent) => {
//     try {
//       const obj = JSON.parse(ev.data);
//       const type = obj?.type ?? 'message';
//       const payload = obj?.payload ?? obj;

//       // generic event
//       window.dispatchEvent(new CustomEvent('sse:message', { detail: { type, payload } }));

//       // typed event (e.g. 'list.item.deleted' -> 'sse:list.item.deleted')
//       if (type) window.dispatchEvent(new CustomEvent(`sse:${type}`, { detail: payload }));
//     } catch (err) {
//       console.warn('[SSE] parse error', err, ev.data);
//     }
//   });

//   return es;
// }
// ...existing code...
export default function initSse() {
  const candidates = [
    '/events',
    `${location.origin}/events`,
    'http://localhost:9000/events' // fallback for direct backend dev port
  ];

  let es: EventSource | null = null;
  for (const url of candidates) {
    try {
      console.debug('[SSE] attempting EventSource ->', url);
      es = new EventSource(url);
      // if constructed, break (we'll still check events)
      console.debug('[SSE] EventSource constructed for', url);
      break;
    } catch (err) {
      console.warn('[SSE] EventSource constructor failed for', url, err);
      es = null;
    }
  }

  if (!es) {
    console.error('[SSE] all EventSource constructor attempts failed');
    return null;
  }

  es.addEventListener('open', () => console.debug('[SSE] connected (readyState=' + es!.readyState + ')'));
  es.addEventListener('error', (e) => {
    console.warn('[SSE] error (readyState=' + es!.readyState + ')', e);
    // also log last network info if available (some browsers omit details)
  });

  es.addEventListener('message', (ev: MessageEvent) => {
    try {
      const obj = JSON.parse(ev.data);
      const type = obj?.type ?? 'message';
      const payload = obj?.payload ?? obj;
      window.dispatchEvent(new CustomEvent('sse:message', { detail: { type, payload } }));
      if (type) window.dispatchEvent(new CustomEvent(`sse:${type}`, { detail: payload }));
      console.debug('[SSE] message', type, payload);
    } catch (err) {
      console.warn('[SSE] parse error', err, ev.data);
    }
  });

  // quick periodic readyState log for debugging (clears after 10s)
  const rid = setInterval(() => console.debug('[SSE] readyState=', es!.readyState), 2000);
  setTimeout(() => { clearInterval(rid); console.debug('[SSE] stopped periodic readyState log'); }, 10000);

  return es;
}
// ...existing code...