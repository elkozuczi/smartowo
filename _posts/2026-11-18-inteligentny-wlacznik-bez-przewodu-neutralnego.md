---
published: false
layout: post
title: "Inteligentny włącznik bez przewodu neutralnego"
description: "W puszce włącznika nie ma przewodu N? Shelly 1L Gen4 i 2L Gen4 sterują światłem z telefonu bez neutralnego. Jak to sprawdzić, co to jest Bypass i jak podłączyć."
excerpt: "W starszych mieszkaniach w puszce pod włącznikiem są tylko dwa przewody — i większość modułów smart odpada. Shelly 1L i 2L działają bez przewodu neutralnego. Pokazuję, jak to sprawdzić i na co uważać."
# image: /assets/blog/inteligentny-wlacznik-bez-przewodu-neutralnego/glowne.webp
# image_alt: "Otwarta puszka włącznika z dwoma przewodami i modułem Shelly 1L"
cta_tytul: "Nie masz przewodu N w puszce? Zrobię to za Ciebie"
cta_tekst: "Sprawdzę instalację, dobiorę moduł i zamontuję go bez kucia ścian — także tam, gdzie nie ma przewodu neutralnego. Zostaw numer, oddzwonię."
---

Kupujesz moduł do sterowania światłem z telefonu, odkręcasz włącznik… a w puszce są tylko dwa przewody. Instrukcja modułu wymaga przewodu neutralnego „N”, którego po prostu nie ma.

[DO UZUPEŁNIENIA: konkretna sytuacja — mieszkanie w bloku z lat …, dom po remoncie? Ile punktów świetlnych, jakie oświetlenie (LED, żyrandol, świecznikowy włącznik)?]

To bardzo częsta sytuacja w starszych instalacjach: do puszki włącznika doprowadzona jest tylko faza i przewód do lampy. Na szczęście są moduły zaprojektowane właśnie do takich instalacji — **Shelly 1L Gen4** (jeden obwód) i **Shelly 2L Gen4** (dwa obwody, np. pod włącznik świecznikowy).

<!-- ZDJĘCIE 1: otwarta puszka włącznika z dwoma przewodami (zasilanie wyłączone!) -->

## W skrócie

- W puszce są **tylko 2 przewody**? Najpewniej nie masz przewodu neutralnego — sprawdzi to elektryk albo próbnik.
- **Shelly 1L Gen4** i **2L Gen4** działają **bez przewodu N** — zasilają się z obwodu lampy.
- Przy żarówkach LED potrzebny jest mały **Bypass** montowany przy lampie. **Jest w zestawie** z oboma modułami.
- Zwykły włącznik na ścianie **działa dalej**, a dodatkowo sterujesz światłem z telefonu.

{% include zacheta.html miejsce="po-skrocie" tytul="Mieszkasz we Wrocławiu lub okolicach?" tekst="Sprawdzę instalację, dobiorę moduł i zamontuję go bez kucia — także tam, gdzie w puszce nie ma przewodu neutralnego." przycisk="Zamów montaż" %}

## Jak sprawdzić, czy masz przewód neutralny

> **Uwaga:** praca przy instalacji 230 V. Wyłącz bezpiecznik i sprawdź brak napięcia. Jeśli nie masz uprawnień — zleć to elektrykowi.

Po wykręceniu włącznika policz przewody w puszce:

- **2 przewody** (zwykły włącznik) albo **3 przewody** (włącznik świecznikowy) — to zwykle faza i przewód(y) do lampy. **Neutralnego nie ma.**
- **dodatkowy przewód** (najczęściej niebieski), zgrupowany z innymi i niepodłączony do włącznika — to może być przewód neutralny.

Kolory przewodów w starych instalacjach bywają przypadkowe, dlatego ostatecznie rozstrzyga pomiar, a nie kolor izolacji.

![Porównanie puszek włącznika: dwa przewody, faza i przewód do lampy, oznaczają brak N i moduł Shelly 1L lub 2L Gen4; dodatkowy przewód N pozwala użyć Shelly 1PM Mini Gen4](/assets/blog/inteligentny-wlacznik-bez-przewodu-neutralnego/puszka-z-n-bez-n.webp){: width="1200" height="620" loading="lazy"}

[DO UZUPEŁNIENIA: co było w puszkach w tej realizacji.]

## Sprzęt

Do jednego obwodu światła:

{% include produkt.html id="shelly-1l-gen4" opis="Moduł do puszki za włącznikiem, bez przewodu neutralnego. Maks. 200 W. Bypass do lamp LED jest w zestawie. Wi-Fi, Bluetooth, Zigbee i Matter." %}

Do włącznika świecznikowego (dwa obwody, np. żyrandol z dwiema sekcjami):

{% include produkt.html id="shelly-2l-gen4" opis="Dwukanałowy moduł bez przewodu neutralnego — pod włącznik świecznikowy. Bypass w zestawie (montowany przy lampie podłączonej do pierwszego kanału)." %}

Jeśli przewód neutralny jednak jest, lepszym wyborem będzie zwykły moduł z pomiarem energii — o tym w osobnym artykule o sterowaniu światłem z telefonu.

## Co to jest Bypass i po co

Moduł bez przewodu neutralnego musi się z czegoś zasilać — robi to przez obwód lampy. Przy zwykłej żarówce to działa, ale **żarówki LED pobierają bardzo mało prądu** i potrafią przez to migać albo żarzyć się po wyłączeniu.

**Bypass** to małe urządzenie, które montuje się **przy lampie, równolegle do niej** — np. w puszce sufitowej albo w rozecie żyrandola. Według producenta dla Shelly 1L Gen4 Bypass jest **wymagany przy lampach LED**, a z nim moduł może sterować dowolnym obciążeniem do 200 W.

![Schemat blokowy: faza z rozdzielnicy idzie do Shelly 1L Gen4 w puszce włącznika, przewód do lampy prowadzi do lampy LED, a Bypass jest podłączony równolegle do lampy; przewód N dochodzi tylko do lampy](/assets/blog/inteligentny-wlacznik-bez-przewodu-neutralnego/schemat-bypass.webp){: width="1200" height="620" loading="lazy"}

<!-- ZDJĘCIE 2: Bypass zamontowany w rozecie lampy -->

## Montaż krok po kroku

> **Uwaga:** praca przy instalacji 230 V. Wyłącz bezpiecznik i sprawdź brak napięcia. Bez uprawnień — zleć montaż elektrykowi albo [napisz do mnie](#kontakt).

**1. Wyłącz zasilanie** obwodu oświetlenia i sprawdź próbnikiem, że w puszce nie ma napięcia.

**2. Zamontuj Bypass przy lampie** — równolegle do lampy, w puszce sufitowej lub w rozecie.

**3. Podłącz moduł w puszce włącznika:** fazę do zacisku L, przewód do lampy do wyjścia modułu, a włącznik do wejść modułu. Moduł ma osobny zacisk do zasilania włącznika — **dokładny schemat dla Twojego wariantu (1L / 2L, włącznik pojedynczy / świecznikowy) jest w instrukcji modułu** i trzeba się go trzymać.

**4. Włącz zasilanie i dodaj moduł do aplikacji Shelly.** Ustaw typ włącznika, który masz na ścianie.

**5. Złóż włącznik.** Z zewnątrz nic się nie zmienia.

[DO UZUPEŁNIENIA: co było trudne — miejsce w puszce, dostęp do lampy przy montażu Bypassa, migotanie LED przed założeniem Bypassa?]

{% include zacheta.html miejsce="po-montazu" tytul="Nie chcesz robić tego sam?" tekst="Montaż bez przewodu neutralnego wymaga pracy przy 230 V i w dwóch miejscach: w puszce włącznika i przy lampie. Zrobię to za Ciebie, bez kucia ścian." %}

## Konfiguracja

Po dodaniu do aplikacji Shelly sterujesz światłem z telefonu, ustawiasz harmonogramy i sceny. Moduły obsługują też **Matter**, więc możesz je dodać bezpośrednio do Apple Home, Google Home czy Alexy, a w Home Assistant pojawiają się jako zwykłe światła.

[DO UZUPEŁNIENIA: jakie automatyzacje ustawiłeś w tej realizacji — np. wyłączanie wszystkich świateł przy wyjściu, światło o zmierzchu.]

## Ile to kosztuje

[DO UZUPEŁNIENIA: ile modułów, koszt sprzętu (ile zapłaciłeś), czas montażu.]

Sterowanie oświetleniem jest w pakiecie Start — zobacz [cennik](/#cennik).

## Efekt po kilku tygodniach

[DO UZUPEŁNIENIA: czy LED-y nie migają, jak działa włącznik, co mówią domownicy.]

## Najczęstsze pytania

**Jak sprawdzić, czy mam przewód neutralny w puszce włącznika?**
Jeśli w puszce są tylko 2 przewody (albo 3 przy włączniku świecznikowym), zwykle nie ma przewodu neutralnego. Pewność daje pomiar — zleć go elektrykowi.

**Czy Shelly 1L działa z żarówkami LED?**
Tak, ale przy lampach LED potrzebny jest Bypass montowany przy lampie. W przypadku Shelly 1L Gen4 i 2L Gen4 Bypass jest w zestawie.

**Jaką moc mogę podłączyć do Shelly 1L Gen4?**
Według producenta maksymalnie 200 W. W Shelly 2L Gen4 pierwszy kanał obsługuje do 200 W (z Bypassem), a drugi do 700 W.

**Czy zwykły włącznik będzie dalej działał?**
Tak. Włącznik podłącza się do wejścia modułu, więc działa jak dotychczas, a dodatkowo sterujesz światłem z telefonu.
