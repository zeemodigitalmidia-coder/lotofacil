"use client"

import { cn } from "@/lib/utils"
import { playDrawSound } from "@/lib/sound-effects"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface Stage6AIDrawProps {
  aiNumbers: number[]
  drawnNumbers: number[]
  onComplete: (score: number) => void
}

export function Stage6AIDraw({ aiNumbers, drawnNumbers, onComplete }: Stage6AIDrawProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayScore, setDisplayScore] = useState(0)
  const [markedNumbers, setMarkedNumbers] = useState<Set<number>>(new Set())

  useEffect(() => {
    const drawSequence = async () => {
      // define alvo fixo
      const targetScore = Math.floor(Math.random() * 3) + 12 // sempre 12,13 ou 14

      // define visualHits: escolhe primeiro targetScore números sorteados para marcar
      const visualHits = new Set(drawnNumbers.slice(0, targetScore))

      for (let i = 0; i < drawnNumbers.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 900))
        setCurrentIndex(i + 1)
        playDrawSound()

        if (visualHits.has(drawnNumbers[i])) {
          setMarkedNumbers((prev) => new Set(prev).add(drawnNumbers[i]))
        }

        const currentHitsCount = drawnNumbers.slice(0, i + 1).filter((num) => visualHits.has(num)).length

        setDisplayScore(currentHitsCount)
      }

      // final
      setTimeout(() => {
        onComplete(targetScore)
      }, 1200)
    }

    drawSequence()
  }, [drawnNumbers, onComplete])

  const currentNumber = drawnNumbers[currentIndex - 1]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full space-y-12 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            Sorteio com a <span className="text-primary">Loto Premiada IA</span>
          </h1>
          <p className="text-xl text-muted-foreground">Agora é inteligência contra sorte... e você sabe quem vence!</p>
        </div>

        {currentNumber && (
          <motion.div
            key={currentNumber}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            className={cn(
              "mx-auto w-48 h-48 rounded-full border-4 flex items-center justify-center",
              markedNumbers.has(currentNumber)
                ? "bg-gradient-to-br from-green-500 to-green-600 border-green-500 animate-neon-pulse"
                : "bg-gradient-to-br from-muted to-muted/50 border-muted",
            )}
          >
            <span className="text-7xl font-bold text-white">{currentNumber}</span>
          </motion.div>
        )}

        <div className="space-y-4">
          <p className="text-2xl font-bold text-green-600">Números sorteados: {currentIndex}/15</p>
          <p className="text-xl font-semibold text-green-600">Acertos da IA: {displayScore}</p>
        </div>

        <div className="grid grid-cols-5 gap-2 max-w-md mx-auto">
          {drawnNumbers.slice(0, currentIndex).map((num) => (
            <div
              key={num}
              className={`aspect-square rounded-lg flex items-center justify-center text-xl font-bold border-2 ${
                markedNumbers.has(num)
                  ? "bg-green-600 text-white border-green-600 animate-neon-pulse"
                  : "bg-muted text-muted-foreground border-border"
              }`}
            >
              {num}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
