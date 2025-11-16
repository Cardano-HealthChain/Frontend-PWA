import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer"

// This layout wraps all pages inside the (public) folder
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
