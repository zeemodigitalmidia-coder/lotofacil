"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Cpu } from 'lucide-react'
import { playClickSound } from "@/lib/sound-effects"

interface Stage5AIActionProps {
  onComplete: (numbers: number[]) => void
}

export function Stage5AIAction({ onComplete }: Stage5AIActionProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(true)
  const [aiSelected, setAiSelected] = useState<number[]>([])
  const [userSelected, setUserSelected] = useState<number[]>([])

  useEffect(() => {
    const analyzeAndSelect = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000))

      const numbers: number[] = []
      const allNumbers = Array.from({ length: 25 }, (_, i) => i + 1)
      
      // This simulates analyzing historical patterns and gives the appearance of AI insight
      const weightedNumbers = [
        ...allNumbers.filter(n => n >= 8 && n <= 18).map(n => n),
        ...allNumbers.filter(n => n >= 8 && n <= 18).map(n => n), // Double weight middle numbers
        ...allNumbers.filter(n => n < 8 || n > 18)
      ]

      while (numbers.length < 15) {
        const randomIndex = Math.floor(Math.random() * weightedNumbers.length)
        const num = weightedNumbers[randomIndex]
        if (!numbers.includes(num)) {
          numbers.push(num)
        }
      }

      setAiSelected(numbers.sort((a, b) => a - b))
      setIsAnalyzing(false)
    }

    analyzeAndSelect()
  }, [])

  const toggleNumber = (num: number) => {
    playClickSound()
    if (userSelected.includes(num)) {
      setUserSelected(userSelected.filter((n) => n !== num))
    } else if (userSelected.length < 15) {
      setUserSelected([...userSelected, num])
    }
  }

  const handleConfirm = () => {
    if (userSelected.length === 15) {
      playClickSound()
      onComplete(aiSelected)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="max-w-2xl w-full space-y-6 sm:space-y-8">
        <div className="text-center space-y-3 sm:space-y-4 px-2">
          <div className="inline-flex items-center gap-2 sm:gap-3 bg-primary/20 border-2 border-primary rounded-full px-4 sm:px-8 py-2 sm:py-3 animate-neon-pulse">
            <Cpu className="w-6 h-6 sm:w-8 sm:h-8 text-primary animate-spin" />
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-primary">ANÁLISE EM TEMPO REAL</span>
          </div>

          <h1 className="sm:text-2xl md:text-3xl lg:text-4xl font-bold text-balance leading-tight text-lg">
            A IA indica <span className="text-primary">exatamente os números</span>. Toque nos que ela mandar
          </h1>

          {isAnalyzing ? (
            <p className="text-base sm:text-lg md:text-xl text-secondary font-semibold animate-pulse">
              IA analisando milhares de combinações...
            </p>
          ) : (
            <div className="space-y-2">
              <p className="sm:text-xl font-bold text-primary text-base">
                Indicados: {aiSelected.length}/15 | Selecionados: {userSelected.length}/15
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">Toque nos números indicados pela IA abaixo:</p>
            </div>
          )}
        </div>

        {!isAnalyzing && (
          <>
            <div className="grid grid-cols-5 gap-2 sm:gap-3 max-w-lg mx-auto px-2">
              {Array.from({ length: 25 }, (_, i) => i + 1).map((num) => {
                const isAISelected = aiSelected.includes(num)
                const isUserSelected = userSelected.includes(num)

                return (
                  <button
                    key={num}
                    onClick={() => toggleNumber(num)}
                    className={cn(
                      "aspect-square rounded-lg sm:rounded-xl text-lg sm:text-xl md:text-2xl font-bold transition-all duration-200 border-2 relative",
                      "active:scale-95 touch-manipulation",
                      isUserSelected
                        ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/50 scale-105"
                        : isAISelected
                          ? "bg-secondary/20 text-secondary border-secondary animate-neon-pulse-gold scale-105"
                          : "bg-card text-foreground border-border",
                    )}
                  >
                    {num}
                    {isAISelected && !isUserSelected && <span className="absolute -top-1 -right-1 text-xs">🤖</span>}
                  </button>
                )
              })}
            </div>

            <div className="flex justify-center px-2">
              <Button
                onClick={handleConfirm}
                disabled={userSelected.length !== 15}
                size="lg"
                className={cn(
                  "text-lg sm:text-xl px-8 sm:px-12 py-6 sm:py-8 h-auto rounded-full font-bold w-full sm:w-auto touch-manipulation",
                  userSelected.length === 15
                    ? "bg-primary hover:bg-primary/90 animate-neon-pulse"
                    : "bg-muted text-muted-foreground cursor-not-allowed",
                )}
              >
                Confirmar seleção da IA
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
