"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default async function IndexPage() {
  const searchParams = useSearchParams();
  const GA_ID = searchParams?.get("gps_adid");

  useEffect(() => {
    window.dataLayer.push({ event: "gtm.load", "gtm.uniqueEventId": 3 });

    if (typeof window !== "undefined") {
      const tg = (window as any)?.Telegram?.WebApp;

      if (tg) {
        tg.ready(); // Ensure Telegram WebApp is initialized

        if (tg?.initDataUnsafe && tg?.initDataUnsafe?.user) {
          const userId = tg?.initDataUnsafe?.user.id; // User's Telegram ID
          alert("User Chat ID:" + userId);
        } else {
          alert("Unable to retrieve user ID.");
        }
      } else {
        alert("Telegram WebApp is not initialized");
      }
    }
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center flex-col gap-8">
      <div className="text-white">
        Youre Google Ads Id is {`${GA_ID ?? ""}`}
      </div>

      <button
        onClick={() => {
          window.dataLayer.push({
            event: "gtm.click",
            gtm: {
              uniqueEventId: 6,
              start: 1731309362362,
              element:
                "HTMLDivElement: html.__variable_a617f6 > body.w-full.bg" +
                "-neutral-50 > div.w-full.px-1.h-full > div.w-full.h-ful" +
                "l.flex.items-center.justify-center.flex-col.gap-8",
              elementClasses:
                "w-full h-full flex items-center justify-center f" +
                "lex-col gap-8",
              elementId: "",
              elementTarget: "",
              triggers: "2,3",
              elementUrl: "",
            },
          });
        }}
      >
        Click To Trigger
      </button>
    </div>
  );
}
