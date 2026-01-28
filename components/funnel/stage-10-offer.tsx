"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Check,
  Clock,
  Shield,
  Zap,
  MessageCircle,
  SquareCheckBig,
  CircleHelp,
  Lock,
  ChevronDown,
  Smartphone,
  Bell,
  TrendingUp,
  Users,
  FileDown,
  BarChart3,
  RefreshCw,
  HeadphonesIcon,
} from "lucide-react"
import { playClickSound } from "@/lib/sound-effects"
import Image from "next/image"
import Script from "next/script"

export default function IaLiberadaPage() {
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes
  const [spotsLeft, setSpotsLeft] = useState(20)
  const [currentDate, setCurrentDate] = useState("")

  useEffect(() => {
    const date = new Date()
    const formattedDate = date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
    })
    setCurrentDate(formattedDate)

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    const spotsTimer = setInterval(() => {
      setSpotsLeft((prev) => (prev > 5 ? prev - 1 : prev))
    }, 15000)

    return () => {
      clearInterval(timer)
      clearInterval(spotsTimer)
    }
  }, [])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  const handlePurchase = () => {
    playClickSound()
    window.location.href = "https://go.perfectpay.com.br/PPU38CQ4IHN"
  }

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/notiflix@3.2.7/dist/notiflix-aio-3.2.7.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (window.Notiflix) {
            window.Notiflix.Notify.init({
              position: "left-bottom",
              cssAnimationStyle: "from-left",
              timeout: 4000,
              plainText: false,
            })
          }
        }}
      />
      <Script id="notiflix-notification" strategy="lazyOnload">
        {`
          var product_name = "Loto IA";
          var phrase = "acabou de adquirir o";
          var timeout = 4000;
          var min_time = 4;
          var max_time = 20;
          var names_masc = ['Jose', 'Joao', 'Antonio', 'Francisco', 'Carlos', 'Paulo', 'Pedro', 'Lucas', 'Luiz', 'Marcos', 'Luis', 'Gabriel', 'Rafael', 'Daniel', 'Marcelo', 'Bruno', 'Eduardo', 'Felipe', 'Rodrigo', 'Manoel', 'Mateus', 'Andre', 'Fernando', 'Fabio', 'Leonardo', 'Gustavo', 'Guilherme', 'Leandro', 'Tiago', 'Anderson', 'Ricardo', 'Marcio', 'Jorge', 'Alexandre', 'Roberto', 'Edson', 'Diego', 'Vitor', 'Sergio', 'Claudio', 'Matheus', 'Thiago', 'Geraldo', 'Adriano', 'Luciano', 'Julio', 'Renato', 'Alex', 'Vinicius', 'Rogerio', 'Samuel', 'Ronaldo', 'Mario', 'Flavio', 'Douglas', 'Igor', 'Davi', 'Manuel', 'Jeferson', 'Cicero', 'Victor', 'Miguel', 'Robson', 'Mauricio', 'Danilo', 'Henrique', 'Caio', 'Reginaldo', 'Joaquim', 'Benedito', 'Gilberto', 'Marco', 'Alan', 'Nelson', 'Cristiano', 'Elias', 'Wilson', 'Valdir', 'Emerson', 'Luan', 'David', 'Renan', 'Severino', 'Fabricio', 'Mauro', 'Jonas', 'Gilmar', 'Jean', 'Fabiano', 'Wesley', 'Diogo', 'Adilson', 'Jair', 'Alessandro', 'Everton', 'Osvaldo', 'Gilson', 'Willian', 'Joel', 'Silvio', 'Helio', 'Maicon', 'Reinaldo', 'Pablo', 'Artur', 'Vagner', 'Valter', 'Celso', 'Ivan', 'Cleiton', 'Vanderlei', 'Vicente', 'Arthur', 'Milton', 'Domingos', 'Wagner', 'Sandro', 'Moises', 'Edilson', 'Ademir', 'Adao', 'Evandro', 'Cesar', 'Valmir', 'Murilo', 'Juliano', 'Edvaldo', 'Ailton', 'Junior', 'Breno', 'Nicolas', 'Ruan', 'Alberto', 'Rubens', 'Nilton', 'Augusto', 'Cleber', 'Osmar', 'Nilson', 'Hugo', 'Otavio', 'Vinicios', 'Italo', 'Wilian', 'Alisson', 'Aparecido'];
          var names_fem = ['Maria', 'Ana', 'Francisca', 'Antonia', 'Adriana', 'Juliana', 'Marcia', 'Fernanda', 'Patricia', 'Aline', 'Sandra', 'Camila', 'Amanda', 'Bruna', 'Jessica', 'Leticia', 'Julia', 'Luciana', 'Vanessa', 'Mariana', 'Gabriela', 'Vera', 'Vitoria', 'Larissa', 'Claudia', 'Beatriz', 'Rita', 'Luana', 'Sonia', 'Renata', 'Eliane'];
          
          function show_notification() {
              var msg_final = "";
              var array_aux = ["masc", "fem"];
              if (array_aux[Math.floor(Math.random() * array_aux.length)] == "masc") {
                  msg_final = "<strong>" + names_masc[Math.floor(Math.random() * names_masc.length)] + "</strong>";
              } else {
                  msg_final = "<strong>" + names_fem[Math.floor(Math.random() * names_fem.length)] + "</strong>";
              }
              msg_final += " " + phrase + " " + product_name;
              
              if (window.Notiflix && window.Notiflix.Notify) {
                  window.Notiflix.Notify.success(msg_final);
              }
              
              var rand = Math.floor(Math.random() * (max_time - min_time + 1) + min_time);
              setTimeout(show_notification, rand * 1000);
          }
          
          function initNotiflix() {
            if (window.Notiflix && window.Notiflix.Notify) {
              setTimeout(show_notification, 4 * 1000);
            } else {
              setTimeout(initNotiflix, 200);
            }
          }
          
          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initNotiflix);
          } else {
            initNotiflix();
          }
        `}
      </Script>

      <div className="w-full p-2 text-center text-sm font-bold text-primary-foreground py-2 bg-[#04a80c]">
        <div className="flex items-center justify-center gap-2">
          <span>VÁLIDO SOMENTE HOJE! ({currentDate})</span>
        </div>
      </div>

      <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 sm:py-20 py-2.5">
        <div className="max-w-3xl w-full space-y-6 sm:space-y-8">
          <div className="text-center space-y-3 sm:space-y-4 px-2">
            <p className="mt-2 text-black text-xl sm:text-4xl">
              Acesse agora a <span className="font-bold text-primary">LOTOFÁCIL com inteligência artificial.</span> Faça
              12 pontos ou mais HOJE mesmo
            </p>

            <div className="w-full flex justify-center px-2 sm:px-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-HCSMU5cQeVTahaHLr2AT4Hi5lIoQ5G.png"
                alt="Use a IA Lucrativa para lucrar todo dia na Lotofácil - Por Sergio Abravanel"
                width={600}
                height={600}
                className="w-full max-w-[280px] sm:max-w-[400px] md:max-w-[500px] h-auto sm:rounded-2xl shadow-lg rounded-xl"
              />
            </div>

            <p className="text-base sm:text-lg md:text-xl text-red-500">
              {"RESTAM APENAS 15 VAGAS!"}
            </p>
          </div>

          <div className="bg-card border-2 border-primary rounded-xl sm:rounded-2xl p-3 sm:p-8 space-y-2 sm:space-y-6">
            <div className="space-y-2 sm:space-y-4 text-center">
              <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
                <span className="text-base sm:text-xl md:text-2xl text-muted-foreground line-through">
                  Valor normal: R$ 197,00
                </span>
              </div>

              <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
                <span className="text-xl sm:text-3xl md:text-4xl font-bold text-[#04a80c] animate-pulse text-green-600">
                  Hoje apenas: R$ 37,00
                </span>
              </div>

              <div className="inline-block border rounded-full px-3 sm:px-6 py-1.5 sm:py-3 border-card bg-[#04a80c]">
                <span className="text-sm sm:text-lg md:text-xl font-bold text-background">
                  Economize R$160,10 ainda hoje
                </span>
              </div>
            </div>

            <div className="space-y-2 sm:space-y-4 pt-3 sm:pt-6 border-t-2 border-border">
              {[
                { icon: MessageCircle, text: "Receba o Acesso Imediatemente no WhatsApp" },
                { icon: Smartphone, text: "Sistema direto no celular" },
                { icon: RefreshCw, text: "100% seguro e confiável" },
                { icon: Check, text: "Inteligência Artificial exclusiva" },
                { icon: TrendingUp, text: "Análise de tendências e padrões" },
                { icon: BarChart3, text: "Grupos de números com maior probabilidade" },
                { icon: Bell, text: "Atualizações em tempo real" },
                { icon: HeadphonesIcon, text: "Suporte prioritário 24/7" },
                { icon: Bell, text: "Notificação de novos sorteios" },
                { icon: TrendingUp, text: "Análise de dezenas quentes/frias" },
                { icon: Users, text: "Comunidade VIP de jogadores" },
                { icon: FileDown, text: "Exportação de jogos para impressão" },
                { icon: Zap, text: "Simulador de jogos ilimitado" },
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 sm:gap-4">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-4 h-4 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <span className="text-sm sm:text-lg font-semibold text-left">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-2 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center animate-neon-pulse-red py-2 px-2 bg-background border-green-600">
            <p className="text-lg sm:text-xl md:text-2xl font-bold leading-tight text-green-600">
              67% DE DESCONTO ATIVO aproveite antes do sistema cortar!
            </p>
          </div>

          <Button
            onClick={handlePurchase}
            size="lg"
            className="w-full text-white tracking-normal text-xl sm:text-2xl px-8 sm:px-12 py-8 sm:py-10 h-auto rounded-2xl font-bold animate-bounce-attention touch-manipulation bg-[#04a80c] hover:bg-[#04a80c]/90"
          >
            Liberar Acesso Agora🍀
          </Button>

          <p className="flex items-center justify-center gap-2 text-sm text-foreground">
            <Lock className="h-4 w-4" />
            Pagamento 100% seguro • Acesso imediato
          </p>

          <div className="flex items-center justify-center gap-2 sm:gap-4 text-lg sm:text-xl md:text-2xl font-bold flex-wrap">
            <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            <span className="text-green-600">
              Tempo restante: {minutes}:{seconds.toString().padStart(2, "0")}
            </span>
          </div>

          <div className="space-y-8 sm:space-y-12 sm:pt-12 pt-0">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-full max-w-md sm:max-w-lg relative rounded-xl sm:rounded-2xl overflow-hidden border-2 border-primary/30 shadow-lg">
                <Image
                  src="/images/design-mode/prova_social3.jpg.png"
                  alt="Prova social - Usuário bateu 13 pontos e nunca tinha passado de 9"
                  width={600}
                  height={1200}
                  className="w-full h-auto"
                />
              </div>
              <p className="text-center text-sm sm:text-base md:text-lg text-muted-foreground px-4 max-w-lg">
                Mais um que garantiu o acesso e já tá lucrando com a IA.
              </p>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <div className="w-full max-w-md sm:max-w-lg relative rounded-xl sm:rounded-2xl overflow-hidden border-2 border-primary/30 shadow-lg">
                <Image
                  src="/images/design-mode/prova_social4.jpg.png"
                  alt="Prova social - Usuária acertou 14 pontos usando a IA pela manhã e à noite"
                  width={600}
                  height={1200}
                  className="w-full h-auto"
                />
              </div>
              <p className="text-center text-sm sm:text-base md:text-lg text-muted-foreground px-4 max-w-lg">
                Confiança final: prints reais de quem não joga mais no escuro.
              </p>
            </div>

            <div className="rounded-lg border-2 border-[#04a80c] bg-card p-4 text-center">
              <SquareCheckBig className="mx-auto h-8 w-8 text-[#04a80c] mb-2" />
              <h2 className="text-lg sm:text-xl font-bold text-[#04a80c]">Garantia Incondicional de 30 Dias</h2>
              <p className="mt-2 text-black/90 text-sm sm:text-base">
                Use a IA por 30 dias e se não faturar{" "}
                <span className="font-bold text-red-500">10x o valor investido</span>, devolvemos seu dinheiro sem
                perguntas.
              </p>
            </div>

            <Button
              onClick={handlePurchase}
              size="lg"
              className="w-full text-white tracking-normal text-xl sm:text-2xl px-8 sm:px-12 py-8 sm:py-10 h-auto rounded-2xl font-bold animate-pulse-glow touch-manipulation bg-[#04a80c] hover:bg-[#04a80c]/90"
            >
              Liberar acesso Loto IA agora🍀
            </Button>

            <div className="space-y-4">
              <h2 className="flex items-center justify-center gap-2 text-lg font-bold text-primary">
                <MessageCircle className="h-5 w-5" />
                Depoimentos Reais
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Image
                    src="/images/design-mode/1OuDdip.png"
                    alt="Depoimento de Carlos S."
                    width={48}
                    height={48}
                    className="rounded-full border-2 border-primary"
                  />
                  <div>
                    <h3 className="font-bold text-primary">Carlos S.</h3>
                    <p className="text-sm italic text-black/90">
                      "Voltei a acreditar. Em 2 semanas já vi 14 pontos no meu jogo."
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Image
                    src="/images/design-mode/v5KhtAt.png"
                    alt="Depoimento de Sílvia R."
                    width={48}
                    height={48}
                    className="rounded-full border-2 border-primary"
                  />
                  <div>
                    <h3 className="font-bold text-primary">Sílvia R.</h3>
                    <p className="text-sm italic text-black/90">
                      "Parecia impossível... 14 pontos em uma quinta! A IA faz o que eu não conseguia."
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Image
                    src="/images/design-mode/9JoRIIe.png"
                    alt="Depoimento de Ana Maria L."
                    width={48}
                    height={48}
                    className="rounded-full border-2 border-primary"
                  />
                  <div>
                    <h3 className="font-bold text-primary">Ana Maria L.</h3>
                    <p className="text-sm italic text-black/90">
                      "Só segui o painel. Resultado: 14 pontos. Sem achismo, só método."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-center text-sm">
              <p className="flex items-center justify-center gap-2 font-bold text-red-500">
                Restam apenas 2 acessos liberados hoje
              </p>
              <p className="flex items-center justify-center gap-2 text-black/70">
                <Lock className="h-4 w-4" />
                Pagamento 100% seguro • Acesso imediato
              </p>
            </div>

            <div className="w-full space-y-4 pt-4">
              <h2 className="flex items-center justify-center gap-2 text-lg font-bold text-primary">
                <CircleHelp className="h-5 w-5" />
                Perguntas Frequentes
              </h2>
              <div className="w-full space-y-2">
                <details className="border-b group">
                  <summary className="flex flex-1 items-center justify-between py-4 font-medium cursor-pointer hover:underline">
                    Como funciona o acesso?
                    <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <div className="pb-4 text-sm text-muted-foreground">
                    Após a confirmação do pagamento, você receberá imediatamente um e-mail com seus dados de acesso à
                    plataforma Loto IA.
                  </div>
                </details>
                <details className="border-b group">
                  <summary className="flex flex-1 items-center justify-between py-4 font-medium cursor-pointer hover:underline">
                    Funciona para qualquer loteria?
                    <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <div className="pb-4 text-sm text-muted-foreground">
                    A Loto IA é especializada em Lotofácil, onde nossa inteligência artificial tem os melhores
                    resultados comprovados.
                  </div>
                </details>
                <details className="border-b group">
                  <summary className="flex flex-1 items-center justify-between py-4 font-medium cursor-pointer hover:underline">
                    Preciso ter conhecimento técnico?
                    <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <div className="pb-4 text-sm text-muted-foreground">
                    Não! A plataforma é totalmente intuitiva. Basta seguir as recomendações da IA para fazer seus jogos.
                  </div>
                </details>
                <details className="border-b group">
                  <summary className="flex flex-1 items-center justify-between py-4 font-medium cursor-pointer hover:underline">
                    A garantia é real?
                    <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <div className="pb-4 text-sm text-muted-foreground">
                    Sim! Você tem 30 dias para testar. Se não faturar 10x o valor investido, devolvemos 100% do seu
                    dinheiro, sem burocracia.
                  </div>
                </details>
              </div>
            </div>
          </div>

          <div className="sm:pt-12 space-y-0 pt-0">
            <div className="bg-primary/20 border-2 border-primary rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-4 leading-tight">
                Última Chance de Garantir o Desconto!
              </h3>
              <p className="text-base sm:text-lg text-muted-foreground mb-6">
                Não deixe para depois. O desconto de 67% está acabando e as vagas são limitadas.
              </p>
              <Button
                onClick={handlePurchase}
                size="lg"
                className="w-full text-white tracking-normal text-xl sm:text-2xl px-8 sm:px-12 py-8 sm:py-10 h-auto rounded-2xl font-bold animate-pulse-scale touch-manipulation shadow-2xl bg-[#04a80c] hover:bg-[#04a80c]/90"
              >
                GARANTIR ACESSO COM 67% OFF AGORA🍀
              </Button>
            </div>

            <div className="flex items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-muted-foreground flex-wrap my-2 py-2">
              <div className="flex items-center gap-1 sm:gap-2">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                <span>Compra 100% Segura</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                <span>Satisfação Garantida</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                <span>Resultados Comprovados</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
