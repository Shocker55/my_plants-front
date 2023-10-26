import { AuthProvider } from "@/context/AuthContext";
import Meta from "@/components/Meta";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Meta />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}
