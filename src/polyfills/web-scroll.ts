/**
 * Web Scroll Polyfill for React Native DrawingCanvas
 *
 * Handles scroll conflicts between native ScrollView and drawing gestures on web
 */

import { Platform } from "react-native";

// Web-specific scroll fix
if (Platform.OS === "web") {
  // Add CSS for better scrolling on web
  const style = document.createElement("style");
  style.textContent = `
    /* Improve scrolling performance on React Native Web */
    [data-react-native-web="true"] {
      -webkit-overflow-scrolling: touch;
      overflow-scrolling: touch;
    }
    
    /* Ensure scroll containers can scroll */
    .RNSVScrollView,
    .rn-scrollview {
      overflow-y: auto !important;
      -webkit-overflow-scrolling: touch !important;
      touch-action: pan-y pinch-zoom !important;
    }
    
    /* Prevent pan interference on canvas areas */
    svg {
      touch-action: none;
    }
    
    /* Allow scrolling but prevent horizontal pan */
    .rn-view {
      touch-action: pan-y pinch-zoom;
    }
  `;

  // Inject styles when DOM is ready
  if (document.head) {
    document.head.appendChild(style);
  } else {
    document.addEventListener("DOMContentLoaded", () => {
      document.head.appendChild(style);
    });
  }
}

export {};
