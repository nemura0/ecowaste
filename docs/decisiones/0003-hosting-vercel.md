# 0003 · Hosting en Vercel

**Estado:** aceptada, sujeta a la prueba de la Fase 0 · **Fecha:** 12-nov-2026

## Contexto

El presupuesto del grupo asigna $0 a hosting y dominio. Para que cualquiera del grupo opine sobre un cambio sin instalar nada, cada pull request debería generar una vista previa.

## Decisión

- [Vercel](https://vercel.com), en el plan gratuito (Hobby), conectado a la cuenta del encargado del repo.
- Una vista previa por cada pull request y publicación automática cuando algo entra a `main`.

## Alternativas consideradas

- **GitHub Pages:** es gratis para repos públicos, pero no genera una vista previa por pull request sin configuración extra.
- **Netlify o Cloudflare Pages:** ofrecen vistas previas parecidas. Se evaluarían como plan B.

## Consecuencias y riesgos

- La cuenta de Vercel es de una sola persona. Si falta, el sitio sigue publicándose solo, pero nadie más puede cambiar los ajustes. Hay un plan B en [COMO_APORTAR.md](../COMO_APORTAR.md#6-plan-b-de-despliegue).
- **Cambios de otras personas.** La [guía de Vercel](https://vercel.com/kb/guide/commits-not-triggering-deployments) dice que, en el plan Hobby, solo el dueño de la cuenta puede disparar despliegues, y no menciona una excepción para repos públicos. Si los pull requests de otros colaboradores no generan vista previa, se pierde la razón principal de esta decisión. Además, el commit que llega a `main` lleva como autor a quien hizo el cambio o el merge, así que también podría bloquearse la publicación del sitio.
- **Coautoría de agentes.** Hay reportes en el foro de Vercel de despliegues bloqueados en el plan Hobby por commits con coautoría de agentes de IA.
- **Uso no comercial.** El plan Hobby es para uso personal y no comercial, según las [reglas de uso justo](https://vercel.com/docs/limits/fair-use-guidelines) de Vercel. Este proyecto estudiantil no tiene fines comerciales.

Los dos primeros riesgos se prueban en la Fase 0 con tres casos: un pull request del encargado, uno de otro colaborador y un commit con coautoría de un agente. Si alguno falla, esta decisión se reabre.
