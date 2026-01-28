"use client"

import { useEffect, useState } from "react"
import { CheckCircle2 } from "lucide-react"

interface WinNotificationProps {
  matches: number
  onComplete?: () => void
}

export function WinNotification({ matches, onComplete }: WinNotificationProps) {
  const [show, setShow] = useState(false)

  // Calculate prize based on matches
  const getPrizeValue = (matches: number): string => {
    if (matches >= 10 && matches <= 12) return "R$ 250,00"
    if (matches === 13) return "R$ 569,58"
    if (matches >= 14 && matches <= 15) return "R$ 1.845,00"
    return "R$ 0,00"
  }

  const prizeValue = getPrizeValue(matches)

  useEffect(() => {
    // Show notification after a brief delay
    const showTimer = setTimeout(() => {
      setShow(true)

      // Play the winning sound
      const audio = new Audio("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cashier-quotka-chingquot-sound-effect-129698%20%28online-audio-converter.com%29%20%281%29-xaURHldd3o7gz3oZSu5l7spdUw0quM.wav")
      audio.play().catch((err) => console.error("[v0] Error playing audio:", err))
    }, 500)

    // Hide notification after 4 seconds
    const hideTimer = setTimeout(() => {
      setShow(false)
      if (onComplete) {
        setTimeout(onComplete, 300) // Wait for fade out animation
      }
    }, 4500)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [matches, onComplete])

  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div
        className={`
          bg-[#04a80c] text-white rounded-2xl shadow-2xl px-8 py-6 
          transform transition-all duration-500 ease-out pointer-events-auto
          ${show ? "scale-100 opacity-100" : "scale-50 opacity-0"}
        `}
      >
        <div className="flex items-center gap-4">
          <CheckCircle2 className="h-12 w-12 animate-bounce" />
          <div className="space-y-1">
            <p className="text-lg font-semibold">Você ganhou:</p>
            <p className="text-4xl font-bold">{prizeValue}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
