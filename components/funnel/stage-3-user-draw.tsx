"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { playDrawSound } from "@/lib/sound-effects"

interface Stage3UserDrawProps {
  userNumbers: number[]
  onComplete: (drawnNumbers: number[], score: number) => void
}

export function Stage3UserDraw({ userNumbers, onComplete }: Stage3UserDrawProps) {
  const [currentNumber, setCurrentNumber] = useState<number | null>(null)
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([])
  const [isComplete, setIsComplete] = useState(false)
  const [isMatch, setIsMatch] = useState(false)

  useEffect(() => {
    const drawSequence = async () => {
      const allNumbers = Array.from({ length: 25 }, (_, i) => i + 1)
      const drawn: number[] = []

      for (let i = 0; i < 15; i++) {
        await new Promise((resolve) => setTimeout(resolve, 800))

        const remaining = allNumbers.filter((n) => !drawn.includes(n))
        const randomIndex = Math.floor(Math.random() * remaining.length)
        const number = remaining[randomIndex]

        drawn.push(number)
        setCurrentNumber(number)
        setDrawnNumbers([...drawn])
        setIsMatch(userNumbers.includes(number))

        playDrawSound()
      }

      setIsComplete(true)

      // Calculate score
      let score = drawn.filter((n) => userNumbers.includes(n)).length
      if (score < 9) {
        score = Math.floor(Math.random() * 3) + 6 // 6, 7 ou 8
      }

      setTimeout(() => {
        onComplete(drawn, score)
      }, 2000)
    }

    drawSequence()
  }, [userNumbers, onComplete])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="max-w-2xl w-full space-y-8 sm:space-y-12 text-center">
        <div className="space-y-3 sm:space-y-4 px-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-balance leading-tight">
            Sorteio com a <span className="text-[--color-lottery-red]">sua jogada</span>
          </h1>
          
        </div>

        {currentNumber && (
          <motion.div
            key={currentNumber}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            className={`mx-auto w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full border-4 flex items-center justify-center shadow-2xl transition-all duration-500 ${
              isMatch
                ? "bg-green-600 border-green-700 animate-pulse-green"
                : "bg-red-600 border-red-700 animate-pulse-red"
            }`}
          >
            <span className="text-5xl sm:text-6xl md:text-7xl font-bold text-white drop-shadow-lg">{currentNumber}</span>
          </motion.div>
        )}

        <div className="space-y-3 sm:space-y-4 px-2">
          <p className="text-xl sm:text-2xl font-bold text-[--color-lottery-red]">Números sorteados: {drawnNumbers.length}/15</p>

          {!isComplete && (
            <p className="text-base sm:text-lg text-muted-foreground animate-pulse">Aguarde o resultado final...</p>
          )}
        </div>

        <div className="grid grid-cols-5 gap-1.5 sm:gap-2 max-w-md mx-auto px-2">
          {drawnNumbers.map((num) => (
            <div
              key={num}
              className={`aspect-square rounded-lg flex items-center justify-center text-base sm:text-lg md:text-xl font-bold border-2 transition-all ${
                userNumbers.includes(num)
                  ? "bg-green-600 text-white border-green-700 border-4 shadow-lg scale-105"
                  : "bg-gray-200 text-gray-700 border-gray-300"
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
