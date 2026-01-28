"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles, Cpu } from "lucide-react"

interface AIDemoProps {
  onComplete: (numbers: number[]) => void
}

export function AIDemo({ onComplete }: AIDemoProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(true)
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([])
  const [showNumbers, setShowNumbers] = useState(false)

  const aiNumbers = [2, 4, 6, 8, 10, 11, 13, 15, 17, 19, 20, 22, 23, 24, 25]

  useEffect(() => {
    // Simulate AI analysis
    const timer = setTimeout(() => {
      setIsAnalyzing(false)
      setShowNumbers(true)

      // Animate numbers appearing
      aiNumbers.forEach((num, index) => {
        setTimeout(() => {
          setSelectedNumbers((prev) => [...prev, num])
        }, index * 150)
      })
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  const handleContinue = () => {
    onComplete(aiNumbers)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary via-secondary/95 to-secondary/90 text-white flex flex-col items-center justify-start px-4 py-8 md:py-12">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-primary/20 px-4 py-2 rounded-full">
            <Cpu className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-sm font-medium">Tecnologia em Ação</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold">
            {isAnalyzing ? "Analisando Padrões..." : "Análise Completa!"}
          </h2>

          <p className="text-lg text-muted-foreground text-balance">
            {isAnalyzing
              ? "A tecnologia está processando milhares de sorteios anteriores"
              : "Veja os 15 números selecionados pela análise estatística"}
          </p>
        </div>

        {isAnalyzing && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Analisando frequências</span>
                <Sparkles className="w-4 h-4 text-primary animate-spin" />
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-primary h-2 rounded-full animate-shimmer"></div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Identificando padrões</span>
                <Sparkles className="w-4 h-4 text-success animate-spin" />
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-success h-2 rounded-full animate-shimmer" style={{ animationDelay: "0.5s" }}></div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Calculando probabilidades</span>
                <Sparkles className="w-4 h-4 text-warning animate-spin" />
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-warning h-2 rounded-full animate-shimmer" style={{ animationDelay: "1s" }}></div>
              </div>
            </div>
          </div>
        )}

        {showNumbers && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-5 gap-2 md:gap-3">
              {Array.from({ length: 25 }, (_, i) => i + 1).map((num) => {
                const isSelected = selectedNumbers.includes(num)

                return (
                  <div
                    key={num}
                    className={`
                      aspect-square rounded-lg font-bold text-lg flex items-center justify-center transition-all duration-300
                      ${
                        isSelected
                          ? "bg-primary text-white scale-95 shadow-lg shadow-primary/50 animate-pulse"
                          : "bg-white/10 text-white/40 border border-white/20"
                      }
                    `}
                  >
                    {num}
                  </div>
                )
              })}
            </div>

            {selectedNumbers.length === 15 && (
              <Button
                onClick={handleContinue}
                size="lg"
                className="w-full text-lg font-semibold bg-success hover:bg-success/90 text-secondary h-14 animate-pulse-glow"
              >
                📊 Ver Resultado da Análise
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
