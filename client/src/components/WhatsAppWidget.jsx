import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function WhatsAppWidget() {
  const location = useLocation(); // ✅ detects route change

  useEffect(() => {
    // 🔥 Remove existing widget script if already present
    const existingScript = document.getElementById("aisensy-wa-widget");
    if (existingScript) {
      existingScript.remove();
    }

    // ✅ Create new script and append
    const script = document.createElement("script");
    script.src = "https://d3mkw6s8thqya7.cloudfront.net/integration-plugin.js";
    script.type = "text/javascript";
    script.id = "aisensy-wa-widget";
    script.setAttribute("widget-id", "aaanum"); // 🔺 Replace with correct widget ID
    document.body.appendChild(script);

    return () => {
      // Cleanup on unmount
      script.remove();
    };
  }, [location]); // ✅ re-executes on every route change

  return null;
}

export default WhatsAppWidget;
