"use client"

import { useEffect, useState } from "react"

interface FixedHeaderProps {
  balance?: number
  showWinAnimation?: boolean
}

export function FixedHeader({ balance = 0, showWinAnimation = false }: FixedHeaderProps) {
  const [displayBalance, setDisplayBalance] = useState(0)
  const [isGreen, setIsGreen] = useState(false)

  useEffect(() => {
    if (balance > 0 && showWinAnimation) {
      const duration = 2000
      const steps = 60
      const increment = balance / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= balance) {
          setDisplayBalance(balance)
          setIsGreen(true)
          clearInterval(timer)
        } else {
          setDisplayBalance(current)
        }
      }, duration / steps)

      return () => clearInterval(timer)
    } else if (balance > 0) {
      setDisplayBalance(balance)
      setIsGreen(true)
    }
  }, [balance, showWinAnimation])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#a7348b] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex-shrink-0">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo_da_Lotof%C3%A1cil-NOmc9DRgYPzMrdDLMlMWnNVq4Nfz8l.png" alt="Caixa" className="h-10 sm:h-12 w-auto" />
          </div>

          <div
            className={`flex items-center gap-2 sm:gap-3 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-lg border transition-all duration-500 ${
              isGreen ? "bg-green-500/90 border-green-400" : "bg-white/10 border-white/20"
            }`}
          >
            <span className="text-white text-base sm:text-lg font-bold">
              R$ {displayBalance.toFixed(2).replace(".", ",")}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
