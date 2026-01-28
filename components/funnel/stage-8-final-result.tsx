"use client"

import { Button } from "@/components/ui/button"
import { playClickSound } from "@/lib/sound-effects"

interface Stage8FinalResultProps {
  aiScore: number
  onNext: () => void
}

export function Stage8FinalResult({ aiScore, onNext }: Stage8FinalResultProps) {

  const handleNext = () => {
    playClickSound()
    onNext()
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full space-y-8 text-center">
        {/* Headline única */}
        <h1 className="text-3xl md:text-4xl font-bold text-balance">
          Você não precisa jogar sozinho, meu sistema{" "}
          <span className="text-primary">entrega os números certo pra você.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-base md:text-lg -mt-4 text-foreground">
          {"Assista o vídeo de Sergio Abravanel, Goiano de 63 anos que criou o sistema que entrega os números da LotoFácil."} 
        </p>

        {/* Vídeo Panda */}
        <div className="w-full overflow-hidden rounded-2xl border">
          <div style={{ position: "relative", paddingTop: "56.25%" }}>
            <iframe
              id="panda-9e6e366b-83d9-4d65-a52d-d82a92e654ab"
              src="https://player-vz-796cc82c-715.tv.pandavideo.com.br/embed/?v=9e6e366b-83d9-4d65-a52d-d82a92e654ab"
              style={{ border: "none", position: "absolute", top: 0, left: 0 }}
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              width="100%"
              height="100%"
              fetchPriority="high"
              title="Panda Video"
            />
          </div>
        </div>

        {/* (Opcional) Mantém o score embaixo do vídeo */}
        <p className="text-muted-foreground text-lg">
          Resultado: <span className="font-bold text-primary">I.A acertou {aiScore} pontos</span>
        </p>

        {/* Botão visível imediatamente */}
        <Button
          onClick={handleNext}
          size="lg"
          className="text-primary-foreground text-xl px-12 py-8 h-auto rounded-full font-bold bg-[#a7338b] hover:bg-[#a7338b]/90 animate-neon-pulse"
        >
          QUERO O SISTEMA DA LOTO
        </Button>
      </div>
    </div>
  )
}
