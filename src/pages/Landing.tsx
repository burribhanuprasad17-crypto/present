import { useEffect } from "react";

export default function Landing() {
  useEffect(() => {
    window.location.replace("/intro.html");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-muted-foreground animate-pulse">
        Loading birthday surprise…
      </p>
    </div>
  );
}
