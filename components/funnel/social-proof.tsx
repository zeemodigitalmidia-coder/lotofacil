"use client"

import { Button } from "@/components/ui/button"
import { Star, Play } from "lucide-react"

interface SocialProofProps {
  onNext: () => void
}

export function SocialProof({ onNext }: SocialProofProps) {
  const testimonials = [
    {
      name: "Patrícia Silva",
      age: 42,
      city: "São Paulo",
      result: "14 pontos",
      video: "/woman-smiling-testimonial.jpg",
      quote: "Usei a Loto Premiada e acertei 14 pontos pela primeira vez na vida!",
    },
    {
      name: "William Santos",
      age: 35,
      city: "Rio de Janeiro",
      result: "13 pontos",
      video: "/man-happy-testimonial.jpg",
      quote: "Depois de anos perdendo, finalmente tive um resultado real.",
    },
    {
      name: "Valdir Costa",
      age: 58,
      city: "Belo Horizonte",
      result: "14 pontos",
      video: "/older-man-testimonial.png",
      quote: "Aposentado que recuperou o investimento em uma semana!",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex flex-col items-center justify-start px-4 py-8 md:py-12">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-success/10 px-4 py-2 rounded-full border border-success/30">
            <Star className="w-5 h-5 text-success fill-success" />
            <span className="text-sm font-medium text-success">Prova Real</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-secondary text-balance">
            Pessoas comuns acertando 13 e 14 pontos!
          </h2>

          <p className="text-lg text-muted-foreground text-balance">
            Patrícia, William e Valdir contam como a Loto Premiada colocou eles no caminho da premiação
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative aspect-[3/4] bg-gradient-to-br from-primary/20 to-primary/5">
                <img
                  src={testimonial.video || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                    <Play className="w-8 h-8 text-primary ml-1" fill="currentColor" />
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-success text-white px-3 py-1 rounded-full text-sm font-bold">
                  {testimonial.result}
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div>
                  <h3 className="font-bold text-lg text-secondary">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.age} anos • {testimonial.city}
                  </p>
                </div>

                <p className="text-sm text-secondary italic">"{testimonial.quote}"</p>

                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-warning fill-warning" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-primary/10 border-2 border-primary/30 rounded-xl p-6 text-center">
          <p className="text-xl font-semibold text-secondary text-balance">
            Se eles conseguiram... por que com você seria diferente?
          </p>
        </div>

        <Button
          onClick={onNext}
          size="lg"
          className="w-full text-lg font-semibold h-14 bg-success hover:bg-success/90 text-secondary"
        >
          💰 Quero Ter os Mesmos Resultados
        </Button>
      </div>
    </div>
  )
}
