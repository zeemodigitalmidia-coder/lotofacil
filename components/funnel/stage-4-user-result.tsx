"use client"

import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import { playClickSound } from "@/lib/sound-effects"

interface Stage4UserResultProps {
  score: number
  onNext: () => void
}

export function Stage4UserResult({ score, onNext }: Stage4UserResultProps) {
  const handleNext = () => {
    playClickSound()
    onNext()
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="max-w-2xl w-full space-y-8 sm:space-y-12 text-center">
        <div className="space-y-4 sm:space-y-6 px-2">
          <div className="mx-auto w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-red/20 border-4 border-red-400 flex items-center justify-center animate-neon-pulse-red">
            <AlertCircle className="w-12 h-12 sm:w-16 sm:h-16 text-red-400" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-red-400">
            Você acertou apenas {score} números!
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground text-pretty">
            Como <span className="font-semibold text-red-400">99% dos apostadores</span>, você não levaria nada hoje.
          </p>
        </div>

        <Button
          onClick={handleNext}
          size="lg"
          className="text-primary-foreground text-lg sm:text-xl px-8 sm:px-12 py-6 sm:py-8 h-auto rounded-full font-bold animate-neon-pulse w-full sm:w-auto touch-manipulation bg-[#a7338b] hover:bg-[#a7338b]/90"
        >
          Use a IA na Prática
        </Button>
      </div>
    </div>
  )
}
