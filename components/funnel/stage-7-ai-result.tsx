"use client"

import { Button } from "@/components/ui/button"
import { Trophy } from "lucide-react"
import { playClickSound } from "@/lib/sound-effects"
import { useEffect, useState } from "react"

interface Stage7AIResultProps {
  score: number
  onNext: () => void
  onWinAmount: (amount: number) => void
}

export function Stage7AIResult({ score, onNext, onWinAmount }: Stage7AIResultProps) {
  const [showNotification, setShowNotification] = useState(false)
  const [winAmount, setWinAmount] = useState(0)

  useEffect(() => {
    let amount = 0
    if (score >= 10 && score <= 12) {
      amount = 250.0
    } else if (score === 13) {
      amount = 569.58
    } else if (score >= 14 && score <= 15) {
      amount = 1845.0
    }

    if (amount > 0) {
      setWinAmount(amount)

      const audio = new Audio("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cashier-quotka-chingquot-sound-effect-129698%20%28online-audio-converter.com%29%20%281%29-xaURHldd3o7gz3oZSu5l7spdUw0quM.wav")
      audio.play().catch((err) => console.log("[v0] Audio play failed:", err))

      setTimeout(() => {
        setShowNotification(true)
        onWinAmount(amount)
      }, 500)

      setTimeout(() => {
        setShowNotification(false)
      }, 3500)
    }
  }, [score, onWinAmount])

  const handleNext = () => {
    playClickSound()
    onNext()
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      {showNotification && (
        <div className="fixed top-24 right-4 sm:right-8 z-50 animate-in fade-in slide-in-from-top-2 duration-500">
          <div className="bg-[#04a80c] text-white px-4 py-2 rounded-lg shadow-lg border-2 border-green-400">
            <p className="text-sm sm:text-base font-bold">Você ganhou: R$ {winAmount.toFixed(2).replace(".", ",")}</p>
          </div>
        </div>
      )}

      <div className="max-w-2xl w-full space-y-12 text-center">
        <div className="space-y-6">
          <div className="mx-auto w-32 h-32 rounded-full bg-primary/20 border-4 border-primary flex items-center justify-center animate-neon-pulse">
            <Trophy className="w-16 h-16 text-primary" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-balance"> Sorteio finalizado!</h1>

          <p className="text-5xl md:text-6xl font-bold text-primary animate-pulse-scale">IA acertou {score} números!</p>
        </div>

        <Button
          onClick={handleNext}
          size="lg"
          className="text-white text-xl px-12 py-8 h-auto rounded-full font-bold bg-primary"
        >
          QUERO ACESSO AGORA
        </Button>
      </div>
    </div>
  )
}
