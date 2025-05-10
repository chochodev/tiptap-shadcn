import * as React from "react"
import "./globals.css"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"

type RootLayoutProps = {
  children: React.ReactNode
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="font-sans antialiased">
        <SiteHeader />
        {children}
        <SiteFooter />
      </div>
    </ThemeProvider>
  )
}

export default RootLayout
