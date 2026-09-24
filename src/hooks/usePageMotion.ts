import { useEffect } from 'react';

export function usePageMotion(pathname: string) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    const revealItems = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal], [data-reveal-text]')
    );

    /**
     * Stagger por grupo: irmãos que revelam juntos entram em cascata em vez de
     * um bloco só. O índice é relativo ao pai, então grids (SolutionGrid) e
     * listas ganham o escalonamento sem precisar marcar cada item na mão.
     */
    const groupIndex = new Map<Element, number>();
    revealItems.forEach((item) => {
      const parent = item.parentElement;
      if (!parent) return;
      const index = groupIndex.get(parent) ?? 0;
      groupIndex.set(parent, index + 1);
      if (index === 0) return;

      // SolutionGrid, SolutionPage e InstitutionalPages já calculam o próprio
      // --reveal-delay inline. Sobrescrever aqui descartaria a cadência que eles
      // definiram (e o React devolveria o valor dele no próximo render de todo
      // jeito). Só preenche quem não declarou nada.
      if (item.style.getPropertyValue('--reveal-delay')) return;
      item.style.setProperty('--reveal-delay', `${Math.min(index * 80, 480)}ms`);
    });
    const header = document.querySelector<HTMLElement>('.site-header');

    /**
     * 'motion-arming' zera a duração das transições no primeiro frame. Sem ele,
     * ao entrar 'motion-ready' o estado oculto (opacity 0) era alcançado *por
     * transição* a partir de 1 — e o 'is-visible' chegava ~27ms depois mandando
     * de volta pra 1. O texto acima da dobra nunca chegava a ficar oculto, então
     * não havia entrada pra animar.
     */
    root.classList.add('motion-ready', 'motion-arming');

    let observer: IntersectionObserver | undefined;
    let startFrame = 0;

    /**
     * Antes 'reduce' caía aqui e revelava tudo de uma vez, sem observer — logo
     * sem entrada nem saída. Agora só a ausência de IntersectionObserver faz
     * esse atalho. Sob 'reduce' o ciclo continua, e o CSS zera os deslocamentos
     * deixando apenas o fade: movimento é o que incomoda, opacidade não.
     */
    if (typeof IntersectionObserver === 'undefined') {
      revealItems.forEach((item) => item.classList.add('is-visible'));
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const target = entry.target as HTMLElement;

            if (entry.isIntersecting) {
              target.classList.add('is-visible');
              target.dataset.revealSeen = 'true';
              return;
            }

            /**
             * Antes o elemento era descartado com unobserve na primeira entrada,
             * então nunca havia saída. Agora ele continua observado e recua ao
             * deixar a viewport — mas só depois de ter entrado uma vez, senão o
             * que está abaixo da dobra "sairia" já no load.
             */
            if (!target.dataset.revealSeen) return;
            target.classList.remove('is-visible');
          });
        },
        { threshold: 0, rootMargin: '-8% 0px -12% 0px' }
      );

      /**
       * Sequência em três frames, necessária para o herói acima da dobra:
       * 1) estado oculto é pintado sem transição (motion-arming);
       * 2) transições liberadas, elemento ainda oculto;
       * 3) observer entra e dispara is-visible, agora com o que animar.
       */
      const observeAll = () => {
        startFrame = 0;
        revealItems.forEach((item) => observer?.observe(item));
      };

      startFrame = window.requestAnimationFrame(() => {
        root.classList.remove('motion-arming');
        startFrame = window.requestAnimationFrame(observeAll);
      });
    }

    /**
     * O parallax vivia aqui, mas os únicos elementos com [data-parallax] eram as
     * fotos de fundo do herói e do bloco de conversão, que saíram quando o fundo
     * virou degradê. Sobrava um getBoundingClientRect() por scroll sobre lista
     * vazia. Restou o estado do header, que é usado de fato.
     */
    let frame = 0;
    const updateScrollMotion = () => {
      frame = 0;
      header?.classList.toggle('site-header--scrolled', window.scrollY > 18);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateScrollMotion);
    };

    updateScrollMotion();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer?.disconnect();
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      if (startFrame) window.cancelAnimationFrame(startFrame);
      root.classList.remove('motion-ready', 'motion-arming');
    };
  }, [pathname]);
}
