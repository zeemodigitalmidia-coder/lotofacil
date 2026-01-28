"use client"

import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { playClickSound } from "@/lib/sound-effects"
import Image from "next/image"

interface Stage1OpeningProps {
  onNext: () => void
}

export function Stage1Opening({ onNext }: Stage1OpeningProps) {
  const handleNext = () => {
    playClickSound()
    onNext()
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-lime-500/5 via-transparent to-yellow-500/5 animate-pulse-scale" />

      <div className="relative z-10 max-w-2xl w-full space-y-6 sm:space-y-8 text-center">
        <div className="relative mx-auto w-full max-w-[280px] sm:max-w-md animate-float">
          <div className="absolute inset-0 bg-lime-500/20 blur-3xl rounded-full" />
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-fQ4YwdpdGo8ruj7VI5oGnTIIKgjxb7.png"
            alt="Celular com Lotofácil"
            width={490}
            height={490}
            priority
            fetchPriority="high"
            quality={75}
            className="relative z-10 w-full h-auto shadow-2xl rounded-xl"
            sizes="(max-width: 640px) 280px, 490px"
          />
        </div>

        <div className="space-y-4 sm:space-y-6 px-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-balance leading-tight">
          Use esse <span className="text-[rgba(132,29,170,1)]">Sistema da Loto</span> para acertar 15 números essa semana.
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground text-pretty">
            <span className="font-semibold text-[rgba(237,31,240,1)]">Você não precisa pensar pra jogar.</span> Essa I.A da Loto Premiada entrega os números certos para você lucrar todos os jogos.
          </p>

          <p className="sm:text-2xl md:text-3xl font-bold text-xl text-[rgba(138,0,180,1)]">
            Veja na prática funcionando!
          </p>
        </div>

        <Button
          onClick={handleNext}
          size="lg"
          className="text-primary-foreground text-lg sm:text-xl px-8 sm:px-12 py-6 sm:py-8 h-auto rounded-full font-bold animate-neon-pulse w-full sm:w-auto touch-manipulation bg-[#a7338b] hover:bg-[#a7338b]/90"
        >
          <Sparkles className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
          Ver a Loto Premiada funcionando
        </Button>
      </div>
    </div>
  )
}
