import "../styles/globals.css";
import ReduxProvider from "./redux-provider";
import ReduxDefaultValues from "./providers/reduxDefaultValues";

export default function RootLayout({ children }) {
   return (
      <html lang="en">
         <body>
            <ReduxProvider><ReduxDefaultValues>{children}</ReduxDefaultValues></ReduxProvider>
         </body>
      </html>
   );
}
