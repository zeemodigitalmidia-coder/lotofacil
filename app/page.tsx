"use client"

import { useState } from "react"
import { FixedHeader } from "@/components/fixed-header"
import { CaixaFooter } from "@/components/caixa-footer"
import { Stage1Opening } from "@/components/funnel/stage-1-opening"
import { Stage2ChooseNumbers } from "@/components/funnel/stage-2-choose-numbers"
import { Stage3UserDraw } from "@/components/funnel/stage-3-user-draw"
import { Stage4UserResult } from "@/components/funnel/stage-4-user-result"
import { Stage5AIAction } from "@/components/funnel/stage-5-ai-action"
import { Stage6AIDraw } from "@/components/funnel/stage-6-ai-draw"
import { Stage7AIResult } from "@/components/funnel/stage-7-ai-result"
import { Stage8FinalResult } from "@/components/funnel/stage-8-final-result"
import { Stage9SocialProof } from "@/components/funnel/stage-9-social-proof"
import Stage10Offer from "@/components/funnel/stage-10-offer"

export default function LotoFunnel() {
  const [currentStep, setCurrentStep] = useState(1)
  const [userNumbers, setUserNumbers] = useState<number[]>([])
  const [aiNumbers, setAiNumbers] = useState<number[]>([])
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([])
  const [userScore, setUserScore] = useState(0)
  const [aiScore, setAiScore] = useState(0)
  const [balance, setBalance] = useState(0)
  const [showWinAnimation, setShowWinAnimation] = useState(false)

  const handleNextStep = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    setCurrentStep((prev) => prev + 1)
  }

  const handleUserSelection = (numbers: number[]) => {
    setUserNumbers(numbers)
    handleNextStep()
  }

  const handleUserDraw = (drawn: number[], score: number) => {
    setDrawnNumbers(drawn)
    setUserScore(score)
    handleNextStep()
  }

  const handleAISelection = (numbers: number[]) => {
    setAiNumbers(numbers)
    handleNextStep()
  }

  const handleAIDraw = (score: number) => {
    setAiScore(score)
    handleNextStep()
  }

  const handleWinAmount = (amount: number) => {
    setBalance(amount)
    setShowWinAnimation(true)
  }

  return (
    <>
      <FixedHeader balance={balance} showWinAnimation={showWinAnimation} />

      <main className="min-h-screen bg-background pt-16 sm:pt-20">
        {currentStep === 1 && <Stage1Opening onNext={handleNextStep} />}
        {currentStep === 2 && <Stage2ChooseNumbers onComplete={handleUserSelection} />}
        {currentStep === 3 && <Stage3UserDraw userNumbers={userNumbers} onComplete={handleUserDraw} />}
        {currentStep === 4 && <Stage4UserResult score={userScore} onNext={handleNextStep} />}
        {currentStep === 5 && <Stage5AIAction onComplete={handleAISelection} />}
        {currentStep === 6 && (
          <Stage6AIDraw aiNumbers={aiNumbers} drawnNumbers={drawnNumbers} onComplete={handleAIDraw} />
        )}
        {currentStep === 7 && <Stage7AIResult score={aiScore} onNext={handleNextStep} onWinAmount={handleWinAmount} />}
        {currentStep === 8 && <Stage8FinalResult aiScore={aiScore} onNext={handleNextStep} />}
        {currentStep === 9 && <Stage9SocialProof onNext={handleNextStep} />}
        {currentStep === 10 && <Stage10Offer />}
      </main>

      <CaixaFooter />
    </>
  )
}
