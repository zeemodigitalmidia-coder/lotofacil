"use client"

import { useEffect, useState } from "react"
import { Check, Mail, MessageCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function ThankYouPage() {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    setShowConfetti(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl space-y-8 text-center">
        {showConfetti && (
          <div className="animate-in zoom-in duration-700">
            <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
              <Check className="w-16 h-16 text-green-500 animate-bounce" />
            </div>
          </div>
        )}

        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
          <h1 className="text-4xl md:text-5xl font-bold text-primary text-balance">
            Pagamento Confirmado!
          </h1>

          <p className="text-xl text-muted-foreground text-balance">
            Bem-vindo à Loto Premiada! Seu acesso está sendo preparado.
          </p>
        </div>

        <div className="bg-card rounded-2xl shadow-2xl p-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300 border-2 border-primary/20">
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-primary/10 rounded-lg text-left">
              <Mail className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg">Verifique seu e-mail</h3>
                <p className="text-sm text-muted-foreground">
                  Enviamos suas credenciais de acesso para o e-mail cadastrado. Não esqueça de verificar a caixa de spam.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-secondary/10 rounded-lg text-left">
              <MessageCircle className="w-8 h-8 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg">Acesse o grupo VIP</h3>
                <p className="text-sm text-muted-foreground">
                  Junte-se à nossa comunidade exclusiva no WhatsApp e Telegram para receber dicas e suporte.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-accent/10 rounded-lg text-left">
              <Check className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg">Comece a usar agora</h3>
                <p className="text-sm text-muted-foreground">
                  O sistema já está disponível! Faça login e comece a usar a IA para melhorar seus jogos.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <Button
              size="lg"
              className="w-full text-lg font-bold h-14 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              onClick={() => window.location.href = '/login'}
            >
              Acessar Sistema Agora
            </Button>
          </div>
        </div>

        <div className="bg-primary/5 border border-primary/10 rounded-lg p-6">
          <p className="text-sm text-muted-foreground">
            Qualquer dúvida? Entre em contato com nosso suporte via WhatsApp ou e-mail.
          </p>
        </div>
      </div>
    </div>
  )
}
