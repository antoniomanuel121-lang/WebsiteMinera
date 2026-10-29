## v0.5.1 — Digital Core refinado · 29/10/2026

- Mais tempo para apreciar cada serviço: cartões/linhas de serviços mais altos no desktop.
- Transformações de scroll recalibradas: cada forma mantém-se durante a maior parte da respetiva secção.
- Website com browser, barra superior, conteúdo e navegação; Software com painel, módulos e gráfico; IA com rede neural mais detalhada.
- Forma de smartphone preservada e enriquecida com detalhes discretos.
- Digital Core com flutuação, órbitas, pontos de luz, traços energizados e nós de IA; respeita a preferência por movimento reduzido.
- Anéis originais do Hero e layout equilibrado mantidos.

## v0.5 — Digital Core (experimental) · 29/10/2026

- Partindo da v0.3.3, preservámos integralmente os anéis originais, a luz do cursor, a grelha e os botões magnéticos.
- Novo elemento independente à esquerda, persistente durante o scroll em desktop.
- As **mesmas três trajetórias SVG** mudam continuamente entre Digital Core, browser, módulos de software, rede de IA e smartphone, com progresso reversível ao subir.
- Adicionados IDs reais às quatro áreas de serviço para sincronização com o scroll.
- Em ecrãs inferiores a 1100 px, o Digital Core é ocultado para não obstruir os conteúdos.
- Demonstração experimental: podemos ajustar escala, posicionamento e ritmo após testar no browser.

# MINERA — Website

## Histórico de versões

### v0.3.3 — 29/10/2026 — Layout equilibrado
- Base restaurada da v0.3.2, com os anéis 3D originais e todos os efeitos do Hero preservados.
- Largura e margens unificadas entre navegação, Hero e restantes secções.
- Proporções ajustadas nas linhas dos serviços para reduzir espaços vazios.
- Mantido o comportamento responsivo. Nenhuma animação de transformação dos anéis.

### v0.3.2 — 29/10/2026 — Hero / Tipografia & Navegação
- Introduzida a fonte Satoshi no Hero, com fallback para fontes de sistema.
- Refinados peso, tamanho, espaçamento e hierarquia do título e da descrição.
- Removido o seletor de frases do Hero, substituído por uma barra horizontal elegante com quatro serviços clicáveis, posicionada na parte inferior do primeiro ecrã.
- Melhorada a etiqueta acima do título, com detalhe luminoso discreto.
- Mantidos anéis, grelha reativa, iluminação dinâmica e efeitos magnéticos da v0.3.1.
- Adaptada a barra de serviços para duas colunas em ecrãs pequenos.

### v0.3.1 — Interactive Refinement (29/10/2026)
- Removidos os dois cartões flutuantes do Hero, para recuperar espaço e dar destaque aos anéis.
- Refinado o halo de luz que acompanha o cursor.
- Adicionada grelha subtil que se ilumina perto do cursor.
- Adicionada inclinação suave e efeito de profundidade ao conjunto de anéis.
- Adicionados movimentos magnéticos e brilho discreto aos botões principais.
- Melhorias para dispositivos táteis e preferência de movimento reduzido.
- Mantidas as restantes secções e o fluxo de publicação do GitHub Pages.

## Notas da versão anterior — MINERA — Website

Website institucional Minera, desenvolvido com React, TypeScript, Vite e Motion.

## Histórico de versões

### v0.3 — 29/10/2026
- Mantidos os anéis animados originais como elemento principal do Hero.
- Adicionados dois cartões flutuantes ilustrativos para mostrar websites e software (dados fictícios devidamente identificados).
- Acrescentadas órbitas, pontos luminosos, grelha discreta e iluminação reativa ao rato.
- Criado seletor interativo de quatro mensagens sobre os serviços.
- Ajustes responsivos e respeito pela preferência de movimento reduzido.

### v0.2.1 — 29/10/2026
- Corrigido erro de compilação TypeScript: removido import não utilizado `ChevronDown` em `src/App.tsx`.
- Adicionado histórico de versões ao README.

### v0.2 — 29/10/2026
- Hero redesenhado com tipografia de grande escala, composição imersiva e escultura animada.
- Ajustes de responsividade e navegação.

### v0.1 — 29/10/2026
- Estrutura inicial com secções de serviços, projetos, processo e contacto.
- Configuração de publicação para GitHub Pages.

## Publicação

O GitHub Actions publica automaticamente a branch `main` após cada commit. O site utiliza o prefixo `/WebsiteMinera/` no GitHub Pages.

## Desenvolvimento local (opcional)

```bash
npm install
npm run dev
npm run build
```

## Próximos passos

- Refinar o hero e a experiência de navegação.
- Desenvolver experiências visuais nas quatro áreas de negócio.
- Substituir conteúdos provisórios e configurar contacto real antes do lançamento.
