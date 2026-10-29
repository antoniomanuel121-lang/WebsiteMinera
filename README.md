# MINERA — Website

## v0.4.1 — 29/10/2026 · Orbital Morph Prototype

- Corrigido o desalinhamento global: removido o recuo artificial da secção Soluções e uniformizada a largura das secções em desktop.
- Substituída a linha independente da v0.4 por **três trajetórias SVG que interpolam geometricamente** entre órbitas e o contorno de um browser.
- A interpolação e o movimento horizontal respondem à posição do scroll, incluindo o movimento inverso ao subir.
- Os anéis 3D originais mantêm-se no Hero e desvanecem durante a passagem para as trajetórias.
- Mantidos os efeitos de cursor, grelha e botões magnéticos.
- Em ecrãs menores e com movimento reduzido, o efeito experimental não é apresentado.

**Limitação consciente:** esta versão testa a primeira transformação (anéis → browser). Ainda não há morph contínuo entre browser, software, IA e smartphone. O efeito usa uma representação SVG das órbitas para transitar do elemento 3D para linhas 2D.

# MINERA — Website

## Histórico de versões

### v0.4 — Orbital Journey (29/10/2026)
- Aumentada a largura útil do layout em ecrãs grandes para corrigir o excesso de espaço nas margens.
- Mantidos os anéis originais, iluminação reativa, grelha e botões magnéticos.
- Adicionada a primeira experiência de **Orbital Journey**: assinatura luminosa na margem esquerda, revelada pelo scroll, com quatro formas SVG (browser, software, rede de IA e smartphone) que mudam conforme a secção.
- Animação reversível ao subir a página, desativada em ecrãs pequenos e para utilizadores com preferência por movimento reduzido.
- **Protótipo:** nesta iteração, a passagem dos anéis para a linha é uma transição visual; a geometria dos anéis ainda não se transforma literalmente no traço. A continuidade e o posicionamento serão afinados após avaliação no browser.

# MINERA — Website

## Histórico de versões

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


## v0.4.2 — Persistent Orbital Transformation (29/10/2026)
- Substituída a sobreposição de novas linhas por **um único SVG persistente**: as próprias trajetórias dos anéis deformam-se até formar o browser.
- Anéis permanecem visíveis durante a saída do Hero; transformação progressiva ao longo de ~1,6 ecrãs e reversível com scroll.
- Volume e brilho dos anéis diminuem enquanto as linhas se tornam o desenho do browser.
- Mantidos os efeitos anteriores e a versão original dos anéis como fallback em telemóveis/redução de movimento.
- Reforçada a largura comum dos contentores em desktop.

**Nota de protótipo:** o browser é formado pelas mesmas trajetórias SVG, mas a geometria tridimensional original em CSS é aproximada por gradientes SVG. A fidelidade visual e o timing precisam de validação no browser real. As outras formas (Software, IA, Apps) ficam para uma próxima iteração.
