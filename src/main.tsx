import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import BookPage from "./Book.tsx";
import PaymentPage from "./Payment.tsx";
import ReservationPage from "./reservation.tsx";


import Privacy from "./Privacy.tsx";
import Terms from "./Terms.tsx";
import Cookies from "./Cookies.tsx";

import "./index.css";

function Root() {
  const path = window.location.pathname.replace(/\/$/, "");

  switch (path) {
    case "/payment":
      return <PaymentPage />;

    case "/reservation":
      return <ReservationPage />;

    case "/book":
      return <BookPage />;


    case "/privacy":
      return <Privacy />;

    case "/terms":
      return <Terms />;

    case "/cookies":
      return <Cookies />;

    case "":
    case "/":
      return <App />;

    default:
      return (
        <div className="h-screen flex items-center justify-center bg-black text-white">
          <h1 className="text-2xl font-semibold">
            404 - Page Not Found
          </h1>
        </div>
      );
  }
}

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container missing");
}

const root = createRoot(container);

root.render(
  <StrictMode>
    <Root />
  </StrictMode>
);