# Loto Premiada - Funil de Conversão Gamificado

Funil de vendas completo e responsivo para IA de previsão da Lotofácil.

## Características

- **10 Etapas Estratégicas**: Desde o impacto inicial até a oferta final
- **Visual Futurista Dark**: Tema escuro com efeitos neon (verde-limão, dourado, vermelho)
- **Gamificação Completa**: Teste de intuição vs. IA com sorteios simulados
- **Mobile-First**: Totalmente otimizado para dispositivos móveis
- **Efeitos Sonoros**: Feedback auditivo em interações importantes
- **Animações Suaves**: Transições e efeitos visuais com Framer Motion
- **Urgência Real**: Contadores de tempo e vagas limitadas
- **Prova Social**: Depoimentos reais de pessoas que acertaram 14 pontos

## Estrutura do Funil

1. **Abertura**: Impacto visual com imagem real do celular
2. **Escolha de Números**: Usuário seleciona 15 números
3. **Sorteio do Usuário**: Simulação do sorteio com números escolhidos
4. **Resultado do Usuário**: Revelação de baixa pontuação
5. **Ação da IA**: IA indica números otimizados
6. **Sorteio da IA**: Mesmos números sorteados, agora com seleção da IA
7. **Resultado da IA**: Revelação de alta pontuação (14 pontos)
8. **Comparação Final**: Contraste entre falha humana e sucesso da IA
9. **Prova Social**: Depoimentos de clientes reais
10. **Oferta**: 67% de desconto com urgência e escassez

## Tecnologias

- Next.js 16 (App Router)
- React 19.2
- TypeScript
- Tailwind CSS v4
- Framer Motion
- shadcn/ui Components
- Lucide Icons

## Deploy

O projeto está pronto para deploy no Vercel. Use o botão "Publish" no v0 para fazer o deploy automaticamente.

## Personalização

Para personalizar o link de compra, edite o componente `stage-10-offer.tsx` e altere a URL no método `handlePurchase`:

\`\`\`tsx
window.open("https://pay.hotmart.com/SEU-LINK-AQUI", "_blank")
\`\`\`

## SEO

O projeto inclui metadados otimizados para SEO com palavras-chave relevantes para Lotofácil e loteria.
