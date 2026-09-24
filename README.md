# ISIS3710-ParcialPractico-202620

Danna Garcia - 202320823

# Revisión de Accesibilidad y Usabilidad


## 1. La página de inicio no tiene encabezado principal
- **Ubicación:** `src/app/page.tsx`
- **Regla incumplida:** `page-has-heading-one` (WCAG 1.3.1 Información y relaciones)
- **Por qué es un problema:** el título "¿Buscas planes?" era un `<p>` con estilo de título. Visualmente parece encabezado, pero un lector de pantalla no lo anuncia como tal y quien navega por encabezados no encuentra el título de la página.
- **Corrección:** cambiar `<p>` por `<h1>`.

## 2. Salto en el orden de los encabezados
- **Ubicación:** `src/app/plans/page.tsx`
- **Regla incumplida:** `heading-order` (WCAG 1.3.1)
- **Por qué es un problema:** después del `<h1>` "Explorar planes" el nombre de cada plan era un `<h4>`, saltándose el h2 y el h3. La estructura del documento queda incoherente para quien la recorre con lector de pantalla.
- **Corrección:** cambiar `<h4>` por `<h2>`.

## 3. Imágenes de los planes sin texto alternativo
- **Ubicación:** `src/app/plans/page.tsx`
- **Regla incumplida:** `image-alt` 
- **Por qué es un problema:** el `<img>` no tenía `alt`, así que el lector de pantalla lee la URL de la imagen o simplemente "imagen", sin decir de qué plan se trata. Además la imagen está dentro del enlace, por lo que el enlace pierde parte de su nombre accesible.
- **Corrección:** agregar `alt={plan.name}`.

## 4. El documento no declara idioma
- **Ubicación:** `src/app/layout.tsx`
- **Regla incumplida:** `html-has-lang` 
- **Por qué es un problema:** sin `lang`, el lector de pantalla usa el idioma por defecto del sistema y puede leer el contenido en español con pronunciación en inglés.
- **Corrección:** agregar `lang="es"` a la etiqueta `<html>`.

## 5. Contraste insuficiente en el texto de las tarjetas
- **Ubicación:** `src/app/plans/page.tsx`
- **Regla incumplida:** `color-contrast`
- **Por qué es un problema:** el creador del plan y el precio usaban `text-slate-300` sobre fondo `slate-50. Es casi ilegible para personas con baja visión o con la pantalla al sol.
- **Corrección:** cambiar `text-slate-300` por `text-slate-500` (aprox. 4.6:1).


Se hicieron otras correcciones que no aparecen en el ReadMe (como no alcance a hacer pruebasss, ahi un bonito ;D)