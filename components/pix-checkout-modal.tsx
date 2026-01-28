"use client"

import { useState, useEffect } from "react"
import { X, Copy, Check, Loader2, Info, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface PixCheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  pixCode: string
  pixQRCode: string
  amount: number
  externalId: string
  transactionData?: {
    createdAt: string
    buyer: any
    product: any
    offer: any
    tracking: any
  }
}

export function PixCheckoutModal({
  isOpen,
  onClose,
  pixCode,
  pixQRCode,
  amount,
  externalId,
  transactionData,
}: PixCheckoutModalProps) {
  const [copied, setCopied] = useState(false)
  const [checking, setChecking] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "paid">("pending")
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedBank, setSelectedBank] = useState("Nubank")

  useEffect(() => {
    if (!isOpen || !externalId) return

    const interval = setInterval(async () => {
      try {
        setChecking(true)
        const response = await fetch(`/api/check-payment?externalId=${externalId}`)
        const data = await response.json()

        if (data.success && data.status === "paid") {
          setPaymentStatus("paid")
          clearInterval(interval)

          if (transactionData) {
            console.log("[v0] Payment confirmed, sending paid status to Utmify for order:", externalId)
            try {
              const utmifyResponse = await fetch("/api/send-to-utmify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  orderId: externalId,
                  status: "paid",
                  createdAt: transactionData.createdAt,
                  approvedDate: new Date().toISOString(),
                  buyer: transactionData.buyer,
                  product: transactionData.product,
                  offer: transactionData.offer,
                  amount: amount,
                  tracking: transactionData.tracking,
                }),
              })
              const utmifyData = await utmifyResponse.json()
              console.log("[v0] Utmify response for paid status:", utmifyData)
            } catch (utmifyError) {
              console.error("[v0] Error sending paid status to Utmify:", utmifyError)
            }
          }

          setTimeout(() => {
            window.location.href = "/obrigado"
          }, 3000)
        }
      } catch (error) {
        console.error("[v0] Error checking payment:", error)
      } finally {
        setChecking(false)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [isOpen, externalId, transactionData, amount])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pixCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("[v0] Error copying to clipboard:", error)
    }
  }

  if (!isOpen) return null

  if (paymentStatus === "paid") {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-8 text-center space-y-4 shadow-xl border-2 border-accent animate-in zoom-in duration-300">
          <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto">
            <Check className="w-10 h-10 text-accent" />
          </div>
          <h2 className="text-2xl font-bold text-accent">Pagamento Confirmado!</h2>
          <p className="text-foreground">Seu pagamento foi aprovado. Você receberá o acesso por e-mail em instantes.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-lg w-full my-auto shadow-2xl border-2 animate-in zoom-in duration-300 max-h-[90vh] overflow-y-auto border-background">
        <div className="flex items-center justify-between p-3 sm:p-4 md:p-6 border-b border-border bg-primary/5 sticky top-0 z-10 bg-white">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">Pagamento via PIX</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        <div className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6">
          <div className="text-center space-y-2">
            <p className="text-sm sm:text-base text-muted-foreground">Valor a pagar</p>
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-600">R$ {(amount / 100).toFixed(2)}</p>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-lg border-2 border-border shadow-sm">
            <div className="flex items-center justify-center">
              <Image
                src={`data:image/png;base64,${pixQRCode}`}
                alt="QR Code PIX"
                width={300}
                height={300}
                className="w-full max-w-[200px] sm:max-w-[240px] md:max-w-[300px] h-auto"
                priority
              />
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm sm:text-base font-medium text-center text-foreground">
              Escaneie o QR Code ou copie o código PIX
            </p>
            <div className="flex gap-2">
              <div className="flex-1 bg-muted p-3 sm:p-4 rounded-lg border border-border min-h-[60px] flex items-center">
                <code className="text-xs sm:text-sm break-all text-foreground w-full">{pixCode}</code>
              </div>
              <Button
                onClick={handleCopy}
                className="flex-shrink-0 text-white h-auto py-3 px-4 bg-[#a7338b] hover:bg-[#a7338b]/90"
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          <div className="border-2 rounded-lg p-2.5 sm:p-3 md:p-4 space-y-1.5 sm:space-y-2 bg-background border-primary">
            <div className="flex items-center justify-center gap-2">
              {checking && <Loader2 className="w-4 h-4 animate-spin text-primary" />}
              <p className="text-xs sm:text-sm font-medium text-center text-primary">
                Aguardando confirmação do pagamento...
              </p>
            </div>
            <p className="text-xs text-center text-muted-foreground">O pagamento é processado em até 2 minutos</p>
          </div>

          <div className="bg-white text-left shadow-md border rounded-lg relative p-4 sm:p-6 space-y-4">
            <div
              aria-hidden="true"
              className="absolute left-0 right-0 top-0 border-t-2 border-dotted border-black/12"
            ></div>
            <div
              aria-hidden="true"
              className="absolute left-0 right-0 bottom-0 border-t-2 border-dotted border-black/12"
            ></div>

            <h3 className="text-base sm:text-lg font-semibold text-gray-800 text-center md:text-left">
              Para realizar o pagamento:
            </h3>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 p-4 mx-1 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-800 flex-shrink-0">
                  1
                </div>
                <p className="text-gray-800 text-sm">Abra o aplicativo do seu banco.</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 p-4 mx-1 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-800 flex-shrink-0">
                  2
                </div>
                <p className="text-gray-800 text-sm">
                  Escolha a opção PIX e cole o código ou use a câmera do celular para pagar com QR Code.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 p-4 mx-1 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-800 flex-shrink-0">
                  3
                </div>
                <p className="text-gray-800 text-sm">Confirme as informações e finalize o pagamento.</p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start gap-2">
              <Info className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-800">
                Os bancos reforçaram a segurança do Pix e podem exibir avisos preventivos. Não se preocupe, sua
                transação está protegida.
              </p>
            </div>

            <div className="border-t border-gray-200">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between py-3 text-gray-800 font-medium text-sm hover:text-gray-600 transition-colors"
              >
                <span>Saiba mais</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
              </button>

              {isExpanded && (
                <div className="pb-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {["Nubank", "Itaú", "Bradesco", "Santander"].map((bank) => {
                      const isSelected = selectedBank === bank
                      return (
                        <button
                          key={bank}
                          type="button"
                          onClick={() => setSelectedBank(bank)}
                          className={`px-4 py-1.5 border rounded-full text-sm font-medium transition ${
                            isSelected
                              ? "bg-[#f7edd9] border-[#f7edd9] text-gray-900"
                              : "bg-white border-gray-300 text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          {bank}
                        </button>
                      )
                    })}
                  </div>

                  <div className="flex justify-center">
                    <div className="relative max-w-[200px] sm:max-w-[240px]">
                      <Image
                        src={`https://www.ggcheckout.com/_next/image?url=%2Fimages%2Fpix-images%2F${selectedBank.toLowerCase()}.png&w=640&q=100`}
                        alt={`Alerta de segurança ${selectedBank}`}
                        width={240}
                        height={480}
                        className="w-full h-auto rounded-lg shadow-lg"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="text-center space-y-1 border-t border-border pt-2 sm:pt-3">
            <p className="text-xs text-muted-foreground">
              Após o pagamento, você receberá o acesso imediatamente por e-mail
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
