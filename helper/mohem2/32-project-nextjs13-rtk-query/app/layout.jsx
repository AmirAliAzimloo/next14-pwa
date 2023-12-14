import "../styles/globals.css";
import ReduxProvider from "./redux-provider";

export default function RootLayout({ children }) {
   return (
      <html lang="en">
         <body>
            <ReduxProvider>{children}</ReduxProvider>
         </body>
      </html>
   );
}
