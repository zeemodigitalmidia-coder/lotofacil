"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Check, Zap, Clock, Users, Shield, MessageSquare } from 'lucide-react'

interface OfferProps {
  onNext: () => void
}

export function Offer({ onNext }: OfferProps) {
  const [timeLeft, setTimeLeft] = useState(15 * 60) // 15 minutes in seconds
  const [spotsLeft, setSpotsLeft] = useState(8)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) return 0
        return prev - 1
      })
    }, 1000)

    const spotsTimer = setInterval(() => {
      setSpotsLeft((prev) => {
        if (prev <= 3) return prev
        return Math.max(3, prev - 1)
      })
    }, 30000) // Decrease every 30 seconds

    return () => {
      clearInterval(timer)
      clearInterval(spotsTimer)
    }
  }, [])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  const benefits = [
    { icon: Check, text: "Acesso imediato ao sistema completo" },
    { icon: Check, text: "Análise de todos os jogos da Lotofácil" },
    { icon: Check, text: "Grupo VIP exclusivo no Telegram" },
    { icon: Check, text: "Suporte dedicado 7 dias por semana" },
    { icon: Check, text: "Atualizações automáticas" },
    { icon: Check, text: "Garantia de 7 dias" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-success/5 via-background to-warning/5 flex flex-col items-center justify-start px-4 py-8 md:py-12">
      <div className="w-full max-w-2xl space-y-6">
        {/* Urgency Banner */}
        <div className="bg-destructive text-white rounded-xl p-4 text-center space-y-2 animate-pulse">
          <div className="flex items-center justify-center gap-2">
            <Zap className="w-5 h-5" />
            <span className="font-bold text-lg">OFERTA RELÂMPAGO</span>
          </div>
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="text-2xl font-mono font-bold">
                {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="font-bold">{spotsLeft} vagas restantes</span>
            </div>
          </div>
        </div>

        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary text-balance">Desconto Exclusivo Para Você!</h2>
          <p className="text-lg text-muted-foreground">Aproveite esta condição especial para as primeiras 20 pessoas</p>
        </div>

        {/* Pricing Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-success">
          <div className="bg-gradient-to-r from-success to-primary p-6 text-center text-white">
            <p className="text-sm font-medium mb-2">DESCONTO DE 62%</p>
            <div className="flex items-center justify-center gap-4">
              <span className="text-2xl line-through opacity-70">R$ 97,00</span>
              <span className="text-5xl font-bold">R$ 37</span>
            </div>
            <p className="text-sm mt-2">Economia de R$ 60,00</p>
          </div>

          <div className="p-8 space-y-6">
            <div>
              <h3 className="font-bold text-xl text-secondary mb-4">O que está incluso:</h3>
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 animate-in fade-in slide-in-from-left-4 duration-500"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <benefit.icon className="w-4 h-4 text-success" />
                    </div>
                    <span className="text-secondary font-medium">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-6 space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 text-primary" />
                <span>Pagamento 100% seguro via Stripe</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MessageSquare className="w-4 h-4 text-primary" />
                <span>Garantia incondicional de 7 dias</span>
              </div>
            </div>

            <Button
              onClick={onNext}
              size="lg"
              className="w-full text-lg font-bold h-16 bg-gradient-to-r from-success to-primary hover:opacity-90 text-white animate-pulse-glow"
            >
              <a 
                href="https://go.perfectpay.com.br/PPU38CQ3FN2"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-full flex items-center justify-center"
              >
                💥 GARANTIR ACESSO COM 62% DE DESCONTO
              </a>
            </Button>

            <p className="text-center text-xs text-destructive font-semibold animate-pulse">
              ⚠️ Promoção por tempo limitado — pode acabar a qualquer momento!
            </p>
          </div>
        </div>

        <div className="bg-warning/10 border border-warning/30 rounded-lg p-4 text-center">
          <p className="text-sm text-secondary">
            <strong>Mais de 347 pessoas</strong> adquiriram nas últimas 24 horas
          </p>
        </div>
      </div>
    </div>
  )
}
