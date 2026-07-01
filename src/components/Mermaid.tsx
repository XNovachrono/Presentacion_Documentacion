import { useEffect, useRef, useId } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "base",
  securityLevel: "loose",
  fontFamily: "Inter, system-ui, sans-serif",
  themeVariables: {
    primaryColor: "#DBEAFE",
    primaryTextColor: "#0B1B3B",
    primaryBorderColor: "#2563EB",
    lineColor: "#2563EB",
    secondaryColor: "#EFF6FF",
    tertiaryColor: "#F8FAFC",
    fontSize: "14px",
  },
});

export function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId().replace(/:/g, "");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { svg } = await mermaid.render(`m-${id}`, chart);
        if (!cancelled && ref.current) ref.current.innerHTML = svg;
      } catch (e) {
        if (ref.current) ref.current.innerHTML = `<pre class="text-xs text-destructive">${(e as Error).message}</pre>`;
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  return <div ref={ref} className="mermaid-container flex w-full justify-center overflow-x-auto" />;
}
