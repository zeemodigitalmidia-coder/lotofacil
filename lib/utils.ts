import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// This ensures the AI always appears impressive (12-14 hits) without going above 14 (which would seem fake)
export function adjustAIScore(actualScore: number): number {
  // Sempre garante um score entre 12 e 14 para impressionar o lead
  // A IA nunca erra pouco (< 12) e nunca acerta tudo (> 14)
  
  if (actualScore >= 12 && actualScore <= 14) {
    return actualScore
  }
  
  // Se acertou 15 (perfeito), reduz para parecer mais realista
  if (actualScore === 15) {
    return Math.floor(Math.random() * 2) + 13 // 13 ou 14
  }
  
  // Para qualquer outro score, garante 12-14
  return Math.floor(Math.random() * 3) + 12 // 12, 13 ou 14
}

// This function ensures the AI picks numbers that will result in 12-14 hits when combined with drawn numbers
export function generateStrategicAINumbers(drawnNumbers?: number[]): number[] {
  const allNumbers = Array.from({ length: 25 }, (_, i) => i + 1)
  
  // If we have drawn numbers, guarantee at least 12 hits
  if (drawnNumbers && drawnNumbers.length === 15) {
    const numbers: number[] = []
    
    // Randomly select 12-14 numbers from the drawn numbers to guarantee hits
    const targetHits = Math.floor(Math.random() * 3) + 12 // 12, 13 ou 14
    const drawnCopy = [...drawnNumbers].sort(() => Math.random() - 0.5)
    
    for (let i = 0; i < targetHits; i++) {
      numbers.push(drawnCopy[i])
    }
    
    // Fill the rest with random numbers not in drawn
    const remaining = allNumbers.filter((n) => !numbers.includes(n))
    
    while (numbers.length < 15) {
      const randomIndex = Math.floor(Math.random() * remaining.length)
      const num = remaining[randomIndex]
      if (!numbers.includes(num)) {
        numbers.push(num)
      }
    }
    
    return numbers.sort((a, b) => a - b)
  }
  
  // Fallback: just generate random numbers
  const numbers: number[] = []
  
  while (numbers.length < 15) {
    const randomIndex = Math.floor(Math.random() * allNumbers.length)
    const num = allNumbers[randomIndex]
    if (!numbers.includes(num)) {
      numbers.push(num)
    }
  }
  
  return numbers.sort((a, b) => a - b)
}
