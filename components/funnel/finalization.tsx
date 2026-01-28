"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { PartyPopper, TrendingUp, Users, Lock } from 'lucide-react'

export function Finalization() {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    setShowConfetti(true)
    // Simulate redirect delay
    const timer = setTimeout(() => {
      // In production: window.location.href = 'https://payment-link.com'
      console.log("Redirecting to payment...")
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-success/20 via-primary/10 to-warning/20 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl space-y-8 text-center">
        {showConfetti && (
          <div className="animate-in zoom-in duration-700">
            <PartyPopper className="w-24 h-24 text-success mx-auto mb-6 animate-bounce" />
          </div>
        )}

        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary text-balance">
            🎉 Parabéns pela Decisão Inteligente!
          </h1>

          <p className="text-xl text-muted-foreground text-balance">
            Você está a poucos segundos de fazer parte do grupo que está vencendo a estatística
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-success/10 rounded-lg">
              <TrendingUp className="w-8 h-8 text-success" />
              <div className="text-left">
                <h3 className="font-bold text-secondary">Aumente suas chances</h3>
                <p className="text-sm text-muted-foreground">Análise estatística comprovada</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-primary/10 rounded-lg">
              <Users className="w-8 h-8 text-primary" />
              <div className="text-left">
                <h3 className="font-bold text-secondary">Comunidade exclusiva</h3>
                <p className="text-sm text-muted-foreground">Grupo VIP com milhares de membros</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-warning/10 rounded-lg">
              <Lock className="w-8 h-8 text-warning" />
              <div className="text-left">
                <h3 className="font-bold text-secondary">Garantia total</h3>
                <p className="text-sm text-muted-foreground">7 dias para testar sem risco</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
              <p className="text-sm font-medium text-muted-foreground">Redirecionando para pagamento seguro...</p>
            </div>

            <Button
              size="lg"
              className="w-full text-lg font-bold h-auto min-h-14 py-3 bg-gradient-to-r from-success to-primary hover:opacity-90 text-white"
              onClick={() => {
                // In production: redirect to payment
                alert("Em produção, redirecionaria para o checkout seguro")
              }}
            >
              Finalizar Compra Agora
            </Button>
          </div>
        </div>

        <div className="bg-secondary/5 border border-secondary/10 rounded-lg p-6">
          <p className="text-sm text-secondary font-medium text-balance">
            "Não continue perdendo dinheiro. Faça parte do grupo que está vencendo a estatística com a Loto Premiada."
          </p>
        </div>
      </div>
    </div>
  )
}
