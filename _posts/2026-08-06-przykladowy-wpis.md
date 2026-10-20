---
published: false
layout: post
title: "Przykładowy wpis — jak wygląda relacja z instalacji"
description: "Opis do Google (do 160 znaków): problem, rozwiązanie i miejsce. Np. Jak zautomatyzowałem rolety w mieszkaniu na Jagodnie bez kucia ścian — sprzęt, koszt, montaż."
location: "Wrocław"
image: /assets/blog/nazwa-wpisu/glowne.webp
image_alt: "Co widać na zdjęciu głównym"
excerpt: "To jest szablon wpisu. Podmień tytuł, treść i zdjęcia na prawdziwą relację z instalacji, a plik zostaw jako wzór do kopiowania przy kolejnych wpisach."
# updated: 2026-11-01          ← data aktualizacji, jeśli poprawiasz wpis po publikacji
# cta: false                   ← wyłącza formularz kontaktowy pod wpisem
# cta_tytul: "Własny nagłówek formularza pod wpisem"
# cta_tekst: "Własny tekst zachęty pod nagłówkiem"
---

To jest przykładowy wpis pokazujący, jak wygląda pojedyncza relacja z instalacji. Skopiuj go
jako punkt wyjścia dla kolejnego wpisu.

## Jak dodać nowy wpis

1. Skopiuj ten plik w folderze `_posts/` i nadaj mu nazwę w formacie `RRRR-MM-DD-nazwa-wpisu.md`
   (data w nazwie pliku decyduje o dacie publikacji, a `nazwa-wpisu` o adresie `/blog/nazwa-wpisu/`).
2. Uzupełnij nagłówek na górze pliku (`title`, `description`, `location`, `image`, `excerpt`).
3. Napisz treść w formacie Markdown poniżej trzech myślników.
4. Gdy wpis jest gotowy, usuń linię `published: false`.

## Produkty i linki afiliacyjne

Produkty dodajesz raz w pliku `_data/produkty.yml`, a w artykule wstawiasz je po identyfikatorze:

```
{% raw %}{% include produkt.html id="shelly-2pm-gen4" %}{% endraw %}
```

To wstawia kartę produktu ze zdjęciem i przyciskami do sklepów. Link w zwykłym zdaniu:

```
{% raw %}Roletą steruje {% include link.html id="shelly-2pm-gen4" %} schowany w puszce.
Kupiłem {% include link.html id="shelly-2pm-gen4" tekst="ten moduł" %} w promocji.{% endraw %}
```

Informacja o linkach afiliacyjnych (i formułka Amazon, jeśli są linki do Amazon) pojawia się
na górze wpisu automatycznie. Formularz kontaktowy pod wpisem też dodaje się sam.

## Dodawanie zdjęć

Wrzuć zdjęcia do folderu `assets/blog/nazwa-wpisu/` (najlepiej WebP, szerokość 1200 px),
a następnie odwołaj się do nich tak:

```
![Opis zdjęcia](/assets/blog/nazwa-wpisu/montaz.webp)
```

Zdjęcie główne (`image`) powinno mieć proporcje 1200×630 — pojawia się na górze wpisu,
na liście bloga i jako podgląd przy udostępnianiu na Facebooku.
