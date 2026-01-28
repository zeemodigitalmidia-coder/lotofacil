"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Trophy, CheckCircle2, TrendingUp } from "lucide-react"

interface AIResultProps {
  aiNumbers: number[]
  onNext: () => void
}

export function AIResult({ aiNumbers, onNext }: AIResultProps) {
  const [showResult, setShowResult] = useState(false)
  const actualNumbers = [2, 4, 6, 8, 10, 11, 13, 15, 17, 19, 20, 22, 23, 24]
  const correctCount = aiNumbers.filter((n) => actualNumbers.includes(n)).length

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowResult(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-success/10 via-background to-background flex flex-col items-center justify-start px-4 py-8 md:py-12">
      <div className="w-full max-w-2xl space-y-8">
        {showResult && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="bg-success/20 border-4 border-success rounded-2xl p-8 text-center space-y-6">
              <Trophy className="w-20 h-20 text-success mx-auto animate-bounce" />

              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-success mb-2">
                  Análise Acertou {correctCount} Pontos!
                </h2>
                <p className="text-lg text-muted-foreground">
                  O que você não conseguiu... a tecnologia acabou de provar!
                </p>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {Array.from({ length: 25 }, (_, i) => i + 1).map((num) => {
                  const isAISelected = aiNumbers.includes(num)
                  const isCorrect = isAISelected && actualNumbers.includes(num)

                  return (
                    <div
                      key={num}
                      className={`
                        aspect-square rounded-lg font-bold text-lg flex items-center justify-center transition-all
                        ${isCorrect ? "bg-success text-white shadow-lg" : ""}
                        ${isAISelected && !isCorrect ? "bg-warning text-white" : ""}
                        ${!isAISelected ? "bg-muted text-muted-foreground" : ""}
                      `}
                    >
                      {num}
                    </div>
                  )
                })}
              </div>

              <div className="bg-white rounded-lg p-6 space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-success" />
                  <p className="text-left font-semibold text-secondary">
                    A prova está aqui: enquanto você erra, a análise gera resultados reais.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  <p className="text-left text-sm text-muted-foreground">
                    Baseado em análise de mais de 2.900 sorteios anteriores
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {showResult && (
          <Button onClick={onNext} size="lg" className="w-full text-lg font-semibold h-14 animate-pulse-glow">
            🔍 Quero Ver Mais Provas
          </Button>
        )}
      </div>
    </div>
  )
}
