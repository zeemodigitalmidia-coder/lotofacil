import { Info } from "lucide-react"

export function CaixaFooter() {
  return (
    <footer className="w-full mt-auto">
      {/* Top section with icons */}
      <div className="bg-[#F4F7F9] py-6 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-8 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">X</span>
            </div>
            <div className="text-[#a7348b] text-sm">
              <div className="font-normal text-foreground">Programa</div>
              <div className="font-semibold text-popover-foreground">Integridade</div>
            </div>
          </div>

          <div className="w-px h-12 bg-gray-300" />

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FFB81C] rounded-full flex items-center justify-center">
              <Info className="w-6 h-6 text-white" />
            </div>
            <div className="text-[#005CA9] text-sm">
              <div className="font-normal text-black">Acesso à</div>
              <div className="font-semibold text-foreground">Informação</div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle section with navigation links */}
      <div className="bg-[#EDF2F4] py-8 px-4">
        <nav className="max-w-7xl mx-auto">
          <ul className="flex items-center justify-center gap-6 flex-wrap text-sm text-[#555]">
            <li>
              <a href="#" className="hover:text-[#005CA9] transition-colors">
                Ouvidoria
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#005CA9] transition-colors">
                Aviso de privacidade
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#005CA9] transition-colors">
                Segurança
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#005CA9] transition-colors">
                Termos de uso
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#005CA9] transition-colors">
                CAIXA Notícias
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#005CA9] transition-colors">
                Trabalhe na CAIXA
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#005CA9] transition-colors">
                Página Inicial
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Bottom blue bar */}
      <div className="bg-[#a7348b] py-4 px-4 text-primary">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white text-xs sm:text-sm">
            SERGIO ABRAVANEL SISTEMA - CNPJ 00.360.305/0001-04, SBS QUADRA 4 LT 3/4, ASA SUL – CEP 70.070-140 BRASÍLIA – DF
          </p>
        </div>
      </div>
    </footer>
  )
}
