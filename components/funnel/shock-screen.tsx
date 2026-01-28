"use client"

import { Button } from "@/components/ui/button"
import { TrendingDown, AlertTriangle } from "lucide-react"

interface ShockScreenProps {
  onNext: () => void
}

export function ShockScreen({ onNext }: ShockScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary via-secondary/95 to-secondary/90 text-white flex flex-col items-center justify-start px-4 py-8 md:py-12">
      <div className="w-full max-w-2xl space-y-8">
        {/* Stats Animation */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <TrendingDown className="w-6 h-6 text-destructive" />
            <span className="text-sm font-medium text-muted-foreground">Estatísticas Lotofácil</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-destructive">99%</div>
              <div className="text-xs text-muted-foreground mt-1">Perdem</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-destructive">R$ 500M+</div>
              <div className="text-xs text-muted-foreground mt-1">Perdidos/Ano</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-warning">1%</div>
              <div className="text-xs text-muted-foreground mt-1">Ganham</div>
            </div>
          </div>
        </div>

        {/* Phone Mockup */}
        <div className="flex justify-center my-8 animate-float">
          <div className="relative w-64 h-96 bg-gradient-to-br from-white/20 to-white/5 rounded-3xl border-4 border-white/30 shadow-2xl p-4">
            <div className="w-full h-full bg-primary/20 rounded-2xl flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 mx-auto bg-success rounded-2xl flex items-center justify-center">
                  <span className="text-3xl">🎰</span>
                </div>
                <p className="text-sm font-medium">Lotofácil</p>
                <p className="text-xs text-muted-foreground">Sorteio #2991</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Message */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-balance">
            Vai continuar <span className="text-destructive">doando dinheiro</span> pra Lotofácil?
          </h1>

          <div className="bg-warning/20 border-l-4 border-warning rounded-lg p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-1" />
            <div className="text-left">
              <p className="font-semibold text-warning">99% das pessoas perdem porque jogam no escuro.</p>
              <p className="text-sm text-muted-foreground mt-1">Veja agora a tecnologia que está mudando tudo.</p>
            </div>
          </div>

          <Button
            onClick={onNext}
            size="lg"
            className="w-full text-lg font-semibold bg-success hover:bg-success/90 text-secondary shadow-lg animate-pulse-glow h-14"
          >
            🚀 Ver a Loto Premiada Funcionando
          </Button>

          <p className="text-xs text-muted-foreground">Mais de 10.000 pessoas já descobriram o segredo</p>
        </div>
      </div>
    </div>
  )
}
