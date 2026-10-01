// Apply the saved theme before the page paints. Portuguese is always the default.
window.portfolioPreferences = (() => {
  let language = 'pt-BR';
  let theme = 'dark';
  try {
    if (localStorage.getItem('portfolio-language') === 'en') language = 'en';
    if (localStorage.getItem('portfolio-theme') === 'light') theme = 'light';
  } catch { /* Preferences also work when storage is unavailable. */ }
  document.documentElement.dataset.theme = theme;
  const translations = {
    'Pular para o conteúdo': 'Skip to content',
    'Felipe Bernardo, início': 'Felipe Bernardo, home',
    'Navegação principal': 'Main navigation',
    'Projetos': 'Projects', 'Sobre': 'About', 'Trajetória': 'Experience',
    'Vamos conversar': "Let’s talk", 'Abrir menu': 'Open menu', 'Fechar menu': 'Close menu',
    'DESENVOLVEDOR FULL STACK': 'FULL STACK DEVELOPER', 'BRASIL · PORTFÓLIO': 'BRAZIL · PORTFOLIO',
    'Ideias ganham forma.': 'Ideas take shape.', 'Experiências ganham vida.': 'Experiences come to life.',
    'Código, design e atenção aos detalhes.': 'Code, design and attention to detail.',
    'Construindo uma web que faz sentido.': 'Building a web that makes sense.',
    'Explorar projetos': 'Explore projects', 'SCROLL PARA EXPLORAR': 'SCROLL TO EXPLORE',
    'INTERFACES COM PROPÓSITO': 'PURPOSEFUL INTERFACES', 'CÓDIGO COM PERSONALIDADE': 'CODE WITH PERSONALITY', 'EXPERIÊNCIAS DIGITAIS': 'DIGITAL EXPERIENCES',
    '01 / PROJETOS SELECIONADOS': '01 / SELECTED PROJECTS', 'Do conceito': 'From concept', 'ao': 'to', 'clique.': 'click.',
    'Uma seleção de projetos dos quais participei.': 'A selection of projects I contributed to.',
    'Desafios diferentes. O mesmo cuidado com a experiência.': 'Different challenges. The same care for the experience.',
    'Interface da plataforma Futrading': 'Futrading platform interface', 'Site da agência Easy Mídia': 'Easy Mídia agency website',
    'Interface da aplicação Pet&pet': 'Pet&pet application interface',
    'Prolar: plataforma de soluções em serviços técnicos e assistência residencial': 'Prolar: technical services and home assistance platform',
    'PLATAFORMA DIGITAL · FRONT-END': 'DIGITAL PLATFORM · FRONT-END', 'SITE INSTITUCIONAL · WEB': 'COMPANY WEBSITE · WEB',
    'APLICAÇÃO WEB · INTERFACE': 'WEB APPLICATION · INTERFACE', 'PLATAFORMA DE SERVIÇOS TÉCNICOS · WEB': 'TECHNICAL SERVICES PLATFORM · WEB',
    'MAIS EXPLORAÇÕES': 'MORE TO EXPLORE', '02 / ALÉM DO CÓDIGO': '02 / BEYOND THE CODE', 'UM POUCO SOBRE MIM': 'A LITTLE ABOUT ME',
    'DESENVOLVEDOR & CURIOSO POR NATUREZA': 'DEVELOPER & CURIOUS BY NATURE',
    'Interfaces intuitivas.': 'Intuitive interfaces.', 'Experiência única.': 'Unique experiences.', 'Atenção a cada detalhe.': 'Attention to every detail.',
    'Sou Felipe, desenvolvedor full stack. Transformo ideias em interfaces intuitivas e elegantes, conectando o cuidado visual à funcionalidade de cada projeto.': 'I’m Felipe, a full stack developer. I turn ideas into intuitive, elegant interfaces, combining visual care with the functionality of each project.',
    'Atualmente, trabalho no Grupo Ribeiro Araujo, desenvolvendo sistemas web e mobile com PHP, Laravel, Filament, React, React Native e TypeScript. Integro APIs REST e MySQL, crio testes com Pest e utilizo Git e Docker no desenvolvimento. Gosto de colaborar, aprender e encontrar soluções que tornem o digital mais simples para quem usa.': 'I currently work at Grupo Ribeiro Araujo, developing web and mobile systems with PHP, Laravel, Filament, React, React Native and TypeScript. I integrate REST APIs and MySQL, write tests with Pest, and use Git and Docker in development. I enjoy collaborating, learning and finding solutions that make digital experiences simpler for users.',
    'Mais sobre minha trajetória': 'More about my experience', '03 / TRAJETÓRIA': '03 / EXPERIENCE', 'Em constante': 'Always', 'evolução.': 'evolving.',
    'Experiência que conecta desenvolvimento,': 'Experience connecting development,', 'colaboração e problemas reais.': 'collaboration and real-world problems.',
    'OUT 2025 - ATUAL (CLT)': 'OCT 2025 – PRESENT (EMPLOYEE)', 'JUN 2025 - ATUAL (FREELANCER)': 'JUN 2025 – PRESENT (FREELANCE)',
    'MAR 2023 — AGO 2024 (PJ)': 'MAR 2023 – AUG 2024 (CONTRACT)', 'MAR 2022 — MAI 2025 (PJ)': 'MAR 2022 – MAY 2025 (CONTRACT)',
    'MAR 2021 — MAR 2022 (CLT)': 'MAR 2021 – MAR 2022 (EMPLOYEE)',
    'Desenvolvedor Full Stack': 'Full Stack Developer', 'Desenvolvedor Full-Stack': 'Full Stack Developer', 'Desenvolvedor Front-end': 'Front-end Developer', 'Analista de sistemas': 'Systems Analyst',
    'Desenvolvimento e manutenção de sistemas e aplicações web e mobile utilizando PHP, Laravel, Filament, React e React Native.': 'Development and maintenance of web and mobile systems and applications using PHP, Laravel, Filament, React and React Native.',
    'Implementação de regras de negócio e APIs REST, integrando aplicações a bancos de dados relacionais com Laravel e MySQL. Criação de interfaces front-end responsivas e componentizadas com React, React Native, TypeScript, JavaScript, HTML5 e CSS3.': 'Implementation of business logic and REST APIs, integrating applications with relational databases using Laravel and MySQL. Creation of responsive, component-based front-end interfaces with React, React Native, TypeScript, JavaScript, HTML5 and CSS3.',
    'Testes automatizados:': 'Automated testing:', 'criação e manutenção de testes com Pest para aumentar a qualidade e a confiabilidade e reduzir regressões.': 'creating and maintaining Pest tests to improve quality and reliability and reduce regressions.',
    'padronização dos ambientes de desenvolvimento. Uso de Git para versionamento de código e colaboração em equipe.': 'standardizing development environments. Using Git for version control and team collaboration.',
    'Aplicação de boas práticas de desenvolvimento, Clean Code e princípios de manutenibilidade, performance e escalabilidade.': 'Applying development best practices, Clean Code and principles of maintainability, performance and scalability.',
    'Testes automatizados (Pest)': 'Automated testing (Pest)', 'APIs REST': 'REST APIs', 'MySQL · SQL · APIs REST': 'MySQL · SQL · REST APIs',
    'Suporte a sistemas e desenvolvimento de novas funcionalidades, landing pages e sites institucionais.': 'Systems support and development of new features, landing pages and company websites.',
    'Desenvolvimento de telas e funcionalidades para a plataforma de franquias. Colaboração com a equipe e avaliação da qualidade dos layouts, com foco na experiência dos franqueados.': 'Development of screens and features for the franchise platform. Team collaboration and layout quality reviews focused on the franchisee experience.',
    'Desenvolvimento de plataforma de gerenciamento e venda de moedas virtuais do FIFA (EAFC). Interfaces orientadas a UX/UI que contribuíram para uma redução aproximada de 35% nos chamados ao suporte.': 'Development of a platform for managing and selling FIFA (EAFC) virtual coins. UX/UI-focused interfaces that helped reduce support requests by approximately 35%.',
    'Suporte a software de gestão escolar e capacitação de mais de 15 profissionais. Participação ativa no fechamento de quatro novos clientes nos primeiros três meses.': 'School management software support and training for over 15 professionals. Active involvement in securing four new clients in the first three months.',
    '04 / FERRAMENTAS DE TRABALHO': '04 / TOOLS OF THE TRADE', 'As stacks por trás': 'The stacks behind', 'das': 'the', 'experiência.': 'experiences.',
    'INTERFACES & APLICAÇÕES': 'INTERFACES & APPLICATIONS', 'ESTILO & SISTEMAS VISUAIS': 'STYLE & VISUAL SYSTEMS', 'INTEGRAÇÃO & COLABORAÇÃO': 'INTEGRATION & COLLABORATION',
    '05 / PRÓXIMO PASSO': '05 / NEXT STEP', 'BOAS IDEIAS COMEÇAM COM UMA CONVERSA.': 'GREAT IDEAS START WITH A CONVERSATION.',
    'VAMOS CRIAR': 'LET’S CREATE', 'ALGO': 'SOMETHING', 'JUNTOS?': 'TOGETHER?',
    'Copiar endereço de e-mail': 'Copy email address', 'Copiar ↗': 'Copy ↗', 'FEITO COM INTENÇÃO. DESENVOLVIDO POR MIM.': 'MADE WITH INTENTION. DEVELOPED BY ME.', 'Voltar ao topo ↑': 'Back to top ↑',
    'Desativar efeitos ↗': 'Disable effects ↗', 'Ativar efeitos ↗': 'Enable effects ↗', 'Ver projeto ↗': 'View project ↗',
    'E-mail copiado! Vamos conversar.': 'Email copied! Let’s talk.', 'Não foi possível copiar. Use o link de e-mail ao lado.': 'Could not copy. Use the email link beside this button.',
    'Idioma': 'Language', 'Ativar tema claro': 'Switch to light theme', 'Ativar tema escuro': 'Switch to dark theme',
    'Felipe Bernardo — Desenvolvedor Full Stack': 'Felipe Bernardo — Full Stack Developer',
    'Felipe Bernardo, desenvolvedor full stack. Interfaces, experiências digitais e aplicações com React, TypeScript e atenção a cada detalhe.': 'Felipe Bernardo, full stack developer. Interfaces, digital experiences and applications with React, TypeScript and attention to every detail.'
  };
  const t = text => language === 'en' ? (translations[text] || text) : text;
  const save = (key, value) => { try { localStorage.setItem(key, value); } catch {} };
  document.addEventListener('DOMContentLoaded', () => {
    // Retain original text nodes so switching languages preserves markup and listeners.
    const texts = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (!node.parentElement.closest('script, style, .motion-toggle, .project-cursor, #toast')) {
        if (translations[node.nodeValue.trim()]) texts.push([node, node.nodeValue]);
      }
    }
    const attributes = [];
    document.querySelectorAll('[aria-label], [alt], meta[name="description"]').forEach(element => {
      if (element.matches('.menu-toggle, #theme-toggle')) return;
      ['aria-label', 'alt', 'content'].forEach(attr => {
        const value = element.getAttribute(attr);
        if (translations[value]) attributes.push([element, attr, value]);
      });
    });
    const languageSelect = document.querySelector('#language');
    const themeToggle = document.querySelector('#theme-toggle');
    function updateTheme() {
      document.documentElement.dataset.theme = theme;
      themeToggle.firstElementChild.textContent = theme === 'dark' ? '☀' : '☾';
      themeToggle.setAttribute('aria-label', t(theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'));
      themeToggle.title = themeToggle.getAttribute('aria-label');
      themeToggle.setAttribute('aria-pressed', String(theme === 'light'));
      document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#161814' : '#f5f5ee';
    }
    function updateLanguage() {
      document.documentElement.lang = language;
      languageSelect.dataset.language = language;
      languageSelect.querySelectorAll('button').forEach(button => {
        button.setAttribute('aria-pressed', String(button.dataset.language === language));
      });
      texts.forEach(([node, original]) => { node.nodeValue = original.replace(original.trim(), t(original.trim())); });
      attributes.forEach(([element, attr, original]) => element.setAttribute(attr, t(original)));
      document.title = t('Felipe Bernardo — Desenvolvedor Full Stack');
      const whatsapp = document.querySelector('a[href*="api.whatsapp.com"]');
      const url = new URL(whatsapp.href);
      url.searchParams.set('text', language === 'en' ? 'Hello! I visited your portfolio and was really interested. Can we talk?' : 'Olá! Acessei seu portfólio e me interessei bastante. Podemos conversar?');
      whatsapp.href = url.href;
      document.querySelector('#toast').classList.remove('show');
      updateTheme();
      document.dispatchEvent(new Event('languagechange'));
    }
    languageSelect.addEventListener('click', event => {
      const button = event.target.closest('button[data-language]');
      if (!button) return;
      language = button.dataset.language;
      save('portfolio-language', language);
      updateLanguage();
    });
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    let switchingTheme = false;
    themeToggle.addEventListener('click', async () => {
      if (switchingTheme) return;
      const applyTheme = () => {
        theme = theme === 'dark' ? 'light' : 'dark';
        save('portfolio-theme', theme);
        updateTheme();
      };
      switchingTheme = true;
      const root = document.documentElement;
      try {
        // Install transitions and resolve the old colors before changing the theme.
        // This works without View Transitions, including browsers that skip snapshots.
        root.classList.add('theme-fade');
        getComputedStyle(document.body).backgroundColor;
        applyTheme();
        if (!reducedMotion.matches) themeToggle.classList.add('theme-switching');
        await new Promise(resolve => setTimeout(resolve, reducedMotion.matches ? 250 : 850));
      }
      finally {
        root.classList.remove('theme-fade');
        themeToggle.classList.remove('theme-switching');
        switchingTheme = false;
      }
    });
    updateLanguage();
  });
  return { t };
})();
