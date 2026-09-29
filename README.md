# Portfólio — Felipe Bernardo

Site estático em HTML, CSS e JavaScript, sem etapa de build. Abra `index.html` ou sirva esta pasta com um servidor HTTP local. Para testar cópia de e-mail, use localhost ou HTTPS.

## Modernização

Referência visual: https://landonorris.com/ (consultada em setembro de 2026).

### Análise do site anterior

- Os projetos apareciam depois de longos blocos de apresentação e experiência, dificultando uma avaliação rápida do trabalho.
- As descrições profissionais dependiam de hover e usavam alturas fixas, prejudicando a navegação por toque e teclado.
- Bootstrap, jQuery, bibliotecas de ícones e Three.js eram carregados para uma página com interações simples.
- A hierarquia de títulos, os nomes acessíveis dos controles e a estrutura do rodapé precisavam de ajustes.
- O texto mencionava “mais de 2 anos” apesar de incluir uma trajetória desde 2021. A nova apresentação evita contagens desatualizadas.

### Direção adotada

Tipografia expressiva, composição editorial, contraste escuro/lima, projetos com maior destaque e alternância de fundos para separar capítulos. A referência inspira escala e identidade, sem reutilizar sua marca ou seus materiais. Mantida a arquitetura estática existente.

### Implementação

- Layout responsivo, grade de projetos com uma coluna em celulares e duas em telas maiores.
- Menu móvel com estado acessível, fechamento ao selecionar uma seção e tecla Escape.
- Experiências em elementos nativos `details`/`summary`, utilizáveis por toque e teclado.
- Elemento decorativo que reage ao ponteiro, hovers sutis e respeito a `prefers-reduced-motion`.
- Link para pular ao conteúdo, foco visível, descrições das imagens, navegação por âncoras e feedback de cópia de e-mail.
- Imagens de projetos carregadas sob demanda. Removido o carregamento das bibliotecas antigas; arquivos legados não utilizados permanecem no repositório.
- Mantidos os seis destinos de projetos, contatos, histórico profissional e identificação existente do Google Analytics.
- Fontes Barlow Condensed e DM Sans via Google Fonts, com fontes de sistema como alternativa.

### Verificações

- Sintaxe JavaScript: `node --check public/js/index.js`.
- Inspeção visual no navegador em desktop e celular de 390 × 844.
- Sem overflow horizontal nas larguras verificadas; âncoras internas existentes e imagens carregadas sem erro.
- Menu abre e fecha ao navegar; experiência Futrading expande; cópia de e-mail retorna sucesso em localhost.

Não foi realizada publicação, auditoria Lighthouse ou validação de disponibilidade dos sites externos. As descrições profissionais usam as informações já presentes no portfólio; confirme especialmente a indicação de emprego atual antes de publicar.
