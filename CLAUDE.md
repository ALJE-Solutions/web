# AnD Code — Contexto del proyecto

## Qué es
Web corporativa de **AnD Code**, agencia española de desarrollo web, tiendas online, apps y automatización con IA. Objetivo: captar leads (auditoría gratuita / presupuesto) para pymes y autónomos.

## Stack
- **Astro 6** (`astro.config.mjs`), sin framework JS adicional — todo `.astro` con `<style>` y `<script>` embebidos.
- `@astrojs/sitemap` como única integración.
- Sin CSS framework (todo CSS plano a mano, mobile-first con breakpoints 900/768/600/480).
- `npm run dev` (puerto 4321), `npm run build`, `npm run preview`.

## Estructura
- `src/layouts/Layout.astro` — layout único: SEO completo (meta, OG, Twitter cards, JSON-LD ProfessionalService), `<Header/>` + `<Footer/>`, botón flotante WhatsApp, CTA fijo flotante, banner de cookies con `localStorage`.
- `src/pages/header.astro` y `footer.astro` — se importan como componentes desde el layout (viven en `pages/` por comodidad, no son rutas reales del sitio).
- `src/pages/index.astro` — home, todo en una sola página larga con secciones ancla: `#inicio` (hero), sectores, `#servicios`, `#packs`, `#nosotros`, `#proceso`, `#trabajos` (portfolio), `#contacto` (formulario FormSubmit).
- `src/pages/casos-de-exito.astro` — versión detallada del portfolio (problema/solución/resultado + métricas) para los mismos 3 proyectos del home.
- `src/pages/servicios.astro` — página standalone con los 3 packs (Esencial/Profesional/Premium), visualmente alineada con el resto del sitio (fondo oscuro, mismo estilo de cards).
- `src/pages/contacto.astro` — formulario de contacto standalone (FormSubmit, mismo destino que el del home).
- `src/pages/nosotros.astro` y `src/pages/packs.astro` — **páginas huérfanas**: no están enlazadas desde header/footer (la nav usa anclas `#nosotros`/`#packs` dentro de `index.astro`), y tienen un estilo visual distinto (gradientes claros tipo `#e0eafc`) que no coincide con la identidad del resto del sitio. `packs.astro` además tiene precios en **USD** ($199/$399/$799), inconsistente con el resto (sin precios públicos). Candidatas a eliminar o rehacer si se usan.
- `src/pages/privacidad.astro`, `terminos.astro` — legal, excluidas del sitemap a propósito pero enlazadas públicamente desde el footer.
- `src/images/` — capturas de los 3 proyectos del portfolio (`hermandad.png`, `flitly.png`, `541.png`) + logo.

## Identidad visual
- Fondo oscuro principal: `#1c1c2e`. Acento: `#5B6BF5` (hover `#4452d8`).
- Tipografía: Inter (Google Fonts), pesos 400–900.
- Estética "code window" (terminal falsa con dots rojo/amarillo/verde) en el hero y en la sección de sectores, con efecto typewriter en JS vanilla.
- Alternancia de fondo por sección: sectores=blanco, servicios=oscuro, packs=claro (`#f5f7fa`), nosotros=oscuro, proceso=claro, trabajos=oscuro, contacto=blanco.

## Contacto / negocio
- Email: `andcodeinfo@gmail.com`.
- WhatsApp: `+34 638 266 952`.
- Formularios vía **FormSubmit** (`https://formsubmit.co/andcodeinfo@gmail.com`), con honeypot anti-spam y captcha.
- Ubicación: España (sin dirección física pública).

## Inconsistencias detectadas (pendientes de decidir)
1. **Dominio duplicado**: `astro.config.mjs` usa `site: 'https://aljesolutions.com'`; `Layout.astro` usa `siteUrl = 'https://andcode.es'` para OG/JSON-LD; `packs.astro` y `contacto.astro` referencian `aljesolutions.com` en `canonical`/`_next`. Hay que decidir cuál es el dominio canónico real y unificar.
2. `nosotros.astro` y `packs.astro` desalineadas visualmente y no enlazadas en la navegación (ver arriba).

## Portfolio actual (3 casos)
1. **Hermandad de Santa Ángela** (`hermandaddesantaangela.com`) — web institucional/cofrade.
2. **Flitly** (`flitly.es`) — web + app móvil, alquiler de material deportivo entre particulares.
3. **541 Top** (`541top.com`) — web corporativa, empresa de vela/Sailcoach.

## Cómo trabajar aquí
- Antes de tocar nada, leer este archivo para tener el contexto sin tener que re-explorar todo el repo.
- Cada vez que hagamos un cambio relevante (nueva sección, página, fix, decisión de diseño/contenido), añadir una entrada breve al final del historial de abajo con fecha.

## Historial de cambios
- **2026-06-18**: Creación de este documento de contexto tras explorar todo el repo por primera vez.
- **2026-06-18**: Flitly pasa a ser el caso de éxito destacado (es el proyecto más grande: web + app móvil). Reordenado como caso 1 en `index.astro` (portfolio) y `casos-de-exito.astro`, con badge "Nuestro proyecto más grande" / "★ Nuestro proyecto más grande hasta la fecha" y borde de color distintivo. Contenido enriquecido con datos reales extraídos de flitly.es: marketplace con +50 categorías de equipos deportivos/acuáticos, búsqueda con filtros avanzados, reserva instantánea, chat integrado, reseñas verificadas, pagos protegidos, seguro incluido, panel de propietarios, atención 24/7.
- **2026-06-18**: `casos-de-exito.astro` ahora muestra únicamente el caso de Flitly (se quitaron Hermandad y 541 Top de esa página; siguen apareciendo en la sección "Nuestros Trabajos" del home). Fix de bug: en `header.astro` el menú quedaba invisible (texto blanco sobre fondo blanco) al entrar en páginas distintas a la home, porque el header solo se volvía opaco/oscuro al hacer scroll (`scrolled` class). Ese comportamiento transparente solo tiene sentido en la home, donde el header se solapa con el hero oscuro. Ahora el script de `header.astro` detecta `window.location.pathname === '/'` y solo aplica la lógica de scroll transparente→blanco en home; en el resto de páginas el header arranca directamente en su estado "scrolled" (blanco/oscuro).
- **2026-06-18**: Dos fixes más sobre lo anterior: (1) los enlaces del menú (header y footer) eran anclas puras (`#servicios`, `#nosotros`, `#portfolio`, `#contacto`) que solo funcionan estando ya en la home; en cualquier otra página no hacían nada. Cambiados a `/#servicios`, `/#nosotros`, `/#trabajos`, `/#contacto` (rutas absolutas a home + ancla) en `header.astro` y `footer.astro`. De paso se corrigió que "Portfolio" enlazaba a `#portfolio`, un id que no existe — el id real de esa sección en `index.astro` es `trabajos`. (2) Quedaba un hueco blanco feo entre el header y el contenido en páginas sin hero, porque `main:not(:has(.hero))` reservaba 80px de padding-top pensados para el header expandido de la home, pero fuera de la home el header siempre está en su estado compacto "scrolled" (~58-64px de alto). Ajustado el padding-top a 64px en `Layout.astro` (antes 80px/70px) para que coincida con la altura real.
