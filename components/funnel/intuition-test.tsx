"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface IntuitionTestProps {
  onComplete: (numbers: number[]) => void
}

export function IntuitionTest({ onComplete }: IntuitionTestProps) {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)
  const [actualNumbers] = useState([3, 7, 9, 12, 14, 16, 18, 20, 21, 22, 23, 24, 25])

  const toggleNumber = (num: number) => {
    if (showResult) return

    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== num))
    } else if (selectedNumbers.length < 15) {
      setSelectedNumbers([...selectedNumbers, num])
    }
  }

  const handleConfirm = () => {
    if (selectedNumbers.length === 15) {
      setShowResult(true)
      setTimeout(() => {
        onComplete(selectedNumbers)
      }, 3000)
    }
  }

  const correctCount = selectedNumbers.filter((n) => actualNumbers.includes(n)).length

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex flex-col items-center justify-start px-4 py-8 md:py-12">
      <div className="w-full max-w-2xl space-y-6">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary">🎯 Teste sua Intuição</h2>
          <p className="text-lg text-muted-foreground text-balance">
            Escolha 15 números e descubra porque a intuição sozinha nunca é suficiente
          </p>

          <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
            <p className="text-sm font-medium text-secondary">
              Números selecionados: <span className="text-primary font-bold text-xl">{selectedNumbers.length}/15</span>
            </p>
          </div>
        </div>

        {/* Number Grid */}
        <div className="grid grid-cols-5 gap-2 md:gap-3">
          {Array.from({ length: 25 }, (_, i) => i + 1).map((num) => {
            const isSelected = selectedNumbers.includes(num)
            const isCorrect = showResult && isSelected && actualNumbers.includes(num)
            const isWrong = showResult && isSelected && !actualNumbers.includes(num)

            return (
              <button
                key={num}
                onClick={() => toggleNumber(num)}
                disabled={showResult}
                className={`
                  aspect-square rounded-lg font-bold text-lg transition-all duration-200
                  ${isSelected && !showResult ? "bg-primary text-primary-foreground scale-95 shadow-lg" : ""}
                  ${!isSelected && !showResult ? "bg-white text-secondary border-2 border-border hover:border-primary hover:scale-105" : ""}
                  ${isCorrect ? "bg-success text-white animate-pulse" : ""}
                  ${isWrong ? "bg-destructive text-white" : ""}
                  ${showResult ? "cursor-not-allowed" : "cursor-pointer active:scale-90"}
                `}
              >
                {num}
              </button>
            )
          })}
        </div>

        {!showResult ? (
          <Button
            onClick={handleConfirm}
            disabled={selectedNumbers.length !== 15}
            size="lg"
            className="w-full text-lg font-semibold h-14"
          >
            ✅ Confirmar Escolha
          </Button>
        ) : (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-destructive/10 border-l-4 border-destructive rounded-lg p-6 text-center">
              <X className="w-12 h-12 text-destructive mx-auto mb-3" />
              <p className="text-2xl font-bold text-destructive mb-2">Você acertou apenas {correctCount} números</p>
              <p className="text-sm text-muted-foreground">Como 99% dos apostadores, você não levaria nada hoje.</p>
            </div>
            <p className="text-center text-sm text-muted-foreground animate-pulse">
              Preparando demonstração da tecnologia...
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
