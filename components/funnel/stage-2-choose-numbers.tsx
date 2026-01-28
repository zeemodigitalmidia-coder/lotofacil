"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { playClickSound } from "@/lib/sound-effects"

interface Stage2ChooseNumbersProps {
  onComplete: (numbers: number[]) => void
}

export function Stage2ChooseNumbers({ onComplete }: Stage2ChooseNumbersProps) {
  const [selected, setSelected] = useState<number[]>([])

  const toggleNumber = (num: number) => {
    playClickSound()
    if (selected.includes(num)) {
      setSelected(selected.filter((n) => n !== num))
    } else if (selected.length < 15) {
      setSelected([...selected, num])
    }
  }

  const handleConfirm = () => {
    playClickSound()
    onComplete(selected)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="max-w-2xl w-full space-y-6 sm:space-y-8">
        <div className="text-center space-y-3 sm:space-y-4 px-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-balance leading-tight">
            Escolha <span className="text-primary">15 números</span>
          </h1>
          

          <div className="inline-block bg-card border-2 border-primary rounded-full px-4 sm:px-8 py-2 sm:py-3 animate-neon-pulse">
            <p className="text-xl sm:text-2xl font-bold text-primary">Selecionados: {selected.length}/15</p>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2 sm:gap-3 max-w-lg mx-auto px-2">
          {Array.from({ length: 25 }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => toggleNumber(num)}
              className={cn(
                "aspect-square rounded-lg sm:rounded-xl text-lg sm:text-xl md:text-2xl font-bold transition-all duration-200 border-2",
                "active:scale-95 touch-manipulation",
                selected.includes(num)
                  ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/50 scale-105"
                  : "bg-card text-foreground border-border hover:border-primary/50 hover:scale-105",
              )}
            >
              {num}
            </button>
          ))}
        </div>

        <div className="flex justify-center px-2">
          <Button
            onClick={handleConfirm}
            disabled={selected.length !== 15}
            size="lg"
            className={cn(
              "text-lg sm:text-xl px-8 sm:px-12 py-6 sm:py-8 h-auto rounded-full font-bold w-full sm:w-auto touch-manipulation",
              selected.length === 15
                ? "bg-[#a7338b] hover:bg-[#a7338b]/90 animate-neon-pulse"
                : "bg-muted text-muted-foreground cursor-not-allowed",
            )}
          >
            Confirmar escolha
          </Button>
        </div>
      </div>
    </div>
  )
}
