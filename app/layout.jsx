'use client'

import { CartContextProvider } from "../components/cartContext/CartContext";
import "./page.scss"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartContextProvider>
          {children}
        </CartContextProvider>
      </body>
    </html>
  );
}
