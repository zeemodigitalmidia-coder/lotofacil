"use client"

import { Button } from "@/components/ui/button"
import { playClickSound } from "@/lib/sound-effects"
import { Film } from "lucide-react"

interface Stage9SocialProofProps {
  onNext: () => void
}

export function Stage9SocialProof({ onNext }: Stage9SocialProofProps) {
  const handleNext = () => {
    playClickSound()
    onNext()
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 py-12 sm:py-20">
      <div className="max-w-4xl w-full space-y-8 sm:space-y-12">
        <div className="mb-6 flex flex-col items-center justify-center space-y-2">
          <Film className="h-8 w-8 text-foreground" />
          <h1 className="text-xl sm:text-2xl font-bold text-center text-foreground">
            Veja o Resultado de quem usou o sistema da Loto I.A<br />
            <span className="text-primary">William & Dona Sandra</span>
          </h1>
          
        </div>

        <div className="sm:space-y-3.5">
          {/* Primeira imagem de prova social */}
          <div className="flex flex-col items-center space-y-4"></div>

          {/* Segunda imagem de prova social */}
          <div className="flex flex-col items-center space-y-4"></div>

          {/* Adicionado William's heading e vídeo */}
          <div className="flex flex-col items-center space-y-4">
            <h2 className="flex items-center sm:text-lg font-bold text-primary text-sm gap-2">
              <Film className="h-5 w-5" />
              William — Osasco/SP (43 anos)
            </h2>
            <div className="w-full max-w-md sm:max-w-lg relative rounded-xl sm:rounded-2xl overflow-hidden border-2 border-primary/30 shadow-lg">
              <div style={{ padding: "177.78% 0 0 0", position: "relative" }}>
                <iframe
                  src="https://player.vimeo.com/video/1137729850?badge=0&autopause=0&player_id=0&app_id=58479"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                  title="William - Resultado Lotofácil"
                />
              </div>
            </div>
            <p className="text-center sm:text-base text-muted-foreground px-4 max-w-lg text-sm py-1 my-1.5">
              Na <span className="font-bold">segunda semana</span> usando o sistema, William já acertou{" "}
              <span className="font-bold text-green-400">14 pontos</span> com a ajuda da Loto IA.
            </p>
          </div>

          {/* Adicionado Dona Sandra's heading e vídeo */}
          <div className="flex flex-col items-center space-y-4">
            <h2 className="flex items-center sm:text-lg font-bold text-primary text-justify text-sm gap-2 my-3">
              <Film className="h-5 w-5" />
              Dona Sandra (55 anos) — Resultado real
            </h2>
            <div className="w-full max-w-md sm:max-w-lg relative rounded-xl sm:rounded-2xl overflow-hidden border-2 border-primary/30 shadow-lg">
              <div style={{ padding: "177.78% 0 0 0", position: "relative" }}>
                <iframe
                  src="https://player.vimeo.com/video/1137731023?badge=0&autopause=0&player_id=0&app_id=58479"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                  title="Dona Sandra - Resultado Lotofácil"
                />
              </div>
            </div>
            <p className="text-center sm:text-base md:text-lg text-muted-foreground px-4 max-w-lg text-sm">
              Sandra tentou de tudo: bolões, grupos de WhatsApp, até adivinhações...{" "}
              <span className="font-bold text-destructive">nunca passava de 11 pontos</span>. Com a{" "}
              <span className="font-bold text-primary">Loto IA</span>, na primeira semana já fez 13 pontos e depois 14.
              Resultado que ela <span className="font-bold text-primary">nunca imaginou!</span>
            </p>
          </div>
        </div>

        <div className="text-center space-y-6 pt-4 sm:pt-8">
          <Button
            onClick={handleNext}
            size="lg"
            className="text-primary-foreground px-8 sm:px-12 py-6 sm:py-8 h-auto rounded-full font-bold animate-neon-pulse w-full max-w-2xl text-lg sm:text-xl touch-manipulation bg-[#a7338b] hover:bg-[#a7338b]/90"
          >
            Ter Acesso Agora
          </Button>
        </div>
      </div>
    </div>
  )
}
