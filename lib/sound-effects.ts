export const playClickSound = () => {
  if (typeof window !== "undefined" && typeof Audio !== "undefined") {
    try {
      // Som de caixa eletrônico antigo (bip curto mecânico)
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.value = 1200
      oscillator.type = "square"

      gainNode.gain.setValueAtTime(0.15, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.08)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.08)
    } catch (error) {
      // Silently fail if audio is blocked
      console.log("[v0] Audio playback blocked or failed")
    }
  }
}

export const playSuccessSound = () => {
  if (typeof Audio !== "undefined") {
    try {
      const audio = new Audio(
        "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBzGH0fPTgjMGHm7A7+OZRA==",
      )
      audio.volume = 0.5
      audio.play().catch(() => {})
    } catch (error) {
      // Silently fail
    }
  }
}

export const playDrawSound = () => {
  if (typeof Audio !== "undefined") {
    try {
      const audio = new Audio(
        "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBzGH0fPTgjMGHm7A7+OZRA==",
      )
      audio.volume = 0.4
      audio.play().catch(() => {})
    } catch (error) {
      // Silently fail
    }
  }
}
