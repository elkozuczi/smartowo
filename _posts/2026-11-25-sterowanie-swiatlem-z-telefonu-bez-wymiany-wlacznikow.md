---
published: false
layout: post
title: "Sterowanie światłem z telefonu bez wymiany włączników"
description: "Moduł Shelly 1PM Mini Gen4 za zwykłym włącznikiem: światło z telefonu, harmonogramy i sceny, a włącznik na ścianie działa jak dotąd. Bez kucia ścian."
excerpt: "Zostawiasz swoje włączniki, a za nimi chowasz mały moduł. Światło włączasz jak dotąd ręką — albo z telefonu, głosem, o zmierzchu czy jednym przyciskiem „wyłącz wszystko” przy wyjściu."
# image: /assets/blog/sterowanie-swiatlem-z-telefonu-bez-wymiany-wlacznikow/glowne.webp
# image_alt: "Moduł Shelly 1PM Mini w dłoni na tle zwykłego włącznika światła"
cta_tytul: "Chcesz sterować światłem z telefonu? Zamontuję to"
cta_tekst: "Montuję moduły za Twoimi włącznikami, bez kucia i bez wymiany osprzętu, i konfiguruję sceny oraz harmonogramy. Zostaw numer — oddzwonię."
---

Wychodzisz z domu i w połowie drogi zastanawiasz się, czy zgasiło się światło w łazience. Albo wieczorem obchodzisz cały dom, żeby wszystko powyłączać. Albo po prostu chcesz, żeby lampa w przedpokoju zapalała się sama o zmierzchu.

[DO UZUPEŁNIENIA: konkretna sytuacja — czyje mieszkanie/dom, ile punktów świetlnych, co przeszkadzało.]

Nie trzeba do tego wymieniać włączników na „smart” ani kuć ścian. Za każdym zwykłym włącznikiem, w tej samej puszce, chowa się mały moduł. Włącznik działa jak dotąd, a dodatkowo światłem sterujesz z telefonu i automatyzacjami.

<!-- ZDJĘCIE 1: moduł w dłoni na tle włącznika -->

## W skrócie

- **Shelly 1PM Mini Gen4** mieści się w puszce za zwykłym włącznikiem — ma 29 × 34 × 16 mm.
- **Twoje włączniki zostają** i działają jak dotąd — moduł podłącza się do nich przewodami.
- Światłem sterujesz **z telefonu**, ustawiasz **harmonogramy** i **sceny** (np. „wyłącz wszystko” przy wyjściu).
- Moduł **mierzy zużycie energii** i obsługuje **Matter**, więc działa z Apple Home, Google Home i Alexą.
- Wymaga **przewodu neutralnego** w puszce. Jeśli go nie ma — zobacz moduły bez neutralnego (Shelly 1L/2L).

{% include zacheta.html miejsce="po-skrocie" tytul="Mieszkasz we Wrocławiu lub okolicach?" tekst="Zamontuję moduły za Twoimi włącznikami i ustawię sceny oraz harmonogramy. Bez kucia ścian i bez wymiany osprzętu." przycisk="Zamów montaż" %}

![Schemat blokowy: Shelly 1PM Mini Gen4 w puszce włącznika zasilany z L i N, włącznik podłączony do wejścia SW, wyjście do lampy; sterowanie przez Wi-Fi z telefonu i Home Assistant](/assets/blog/sterowanie-swiatlem-z-telefonu-bez-wymiany-wlacznikow/schemat-modulu.webp){: width="1200" height="620" loading="lazy"}

## Sprzęt

{% include produkt.html id="shelly-1pm-mini-gen4" opis="Mini moduł do puszki za włącznikiem: 1 obwód do 8 A, pomiar energii, Wi-Fi, Bluetooth, Zigbee i Matter. Wymaga przewodu neutralnego. Wymiary 29 × 34 × 16 mm." %}

Jeden moduł steruje jednym obwodem światła. Do włącznika świecznikowego (dwa obwody) potrzebne są dwa moduły albo moduł dwukanałowy.

Jeśli po podłączeniu żarówki LED lekko migają albo żarzą się po wyłączeniu, pomaga tłumik zakłóceń montowany przy lampie:

{% include produkt.html id="shelly-rc-snubber" opis="Mały tłumik RC montowany równolegle do lampy — pomaga, gdy żarówki LED migają lub żarzą się po wyłączeniu." %}

[DO UZUPEŁNIENIA: ile modułów zamontowałeś, czy był potrzebny snubber.]

## Montaż krok po kroku

> **Uwaga:** montaż wymaga pracy przy instalacji 230 V. Jeśli nie masz uprawnień elektrycznych, zleć go elektrykowi — albo [napisz do mnie](#kontakt), zrobię to za Ciebie.

**1. Wyłącz bezpiecznik** obwodu oświetlenia i sprawdź próbnikiem brak napięcia.

**2. Sprawdź puszkę.** Potrzebujesz fazy (L), przewodu neutralnego (N) i przewodu do lampy. Bez przewodu N ten moduł nie zadziała.

**3. Podłącz moduł:** L i N do zacisków zasilania, przewód do lampy do wyjścia, a włącznik między fazę a wejście SW modułu. Dokładny schemat jest w instrukcji modułu.

**4. Włącz zasilanie i dodaj moduł do aplikacji Shelly.** Ustaw typ włącznika:
- **przełącznik** — zwykły włącznik, który zostaje w pozycji „włączony” albo „wyłączony”,
- **przycisk** — włącznik, który po naciśnięciu wraca na miejsce (dzwonkowy).

**5. Wsuń moduł do puszki i przykręć włącznik.**

[DO UZUPEŁNIENIA: co było trudne — miejsce w puszce, brak N w części puszek, migotanie LED.]

<!-- ZDJĘCIE 2: moduł podłączony w puszce przed wsunięciem włącznika (zasilanie wyłączone!) -->

{% include zacheta.html miejsce="po-montazu" tytul="Nie chcesz robić tego sam?" tekst="Sprawdzę puszki, zamontuję moduły za włącznikami i skonfiguruję wszystko w aplikacji. Z zewnątrz nic się nie zmienia." %}

## Sceny i automatyzacje, które się przydają

Samo włączanie światła z telefonu szybko się nudzi. Prawdziwą wygodę dają automatyzacje:

- **„Wychodzę”** — jeden przycisk (w aplikacji albo bezprzewodowy przy drzwiach) gasi wszystkie światła,
- **światło o zmierzchu** — lampa w przedpokoju albo na zewnątrz zapala się sama, bez przestawiania godzin,
- **symulacja obecności** — podczas wyjazdu światła zapalają się wieczorem w różnych pokojach,
- **„noc”** — o ustalonej godzinie gasną światła, których ktoś zapomniał.

![Cztery automatyzacje światła: Wychodzę gasi wszystkie światła, o zmierzchu lampa zapala się sama, Noc gasi zapomniane światła, Wyjazd symuluje obecność](/assets/blog/sterowanie-swiatlem-z-telefonu-bez-wymiany-wlacznikow/sceny.webp){: width="1200" height="560" loading="lazy"}

W Home Assistant przykład „gaś wszystko przy wyjściu” wygląda tak:

```yaml
- alias: "Wychodzę – zgaś wszystkie światła"
  triggers:
    - trigger: state
      entity_id: input_button.wychodze
  actions:
    - action: light.turn_off
      target:
        entity_id: all
```

`input_button.wychodze` to pomocnik typu „przycisk” — możesz go podpiąć pod przycisk na pulpicie albo pod bezprzewodowy przycisk przy drzwiach. Moduł Shelly może pojawić się w Home Assistant jako przełącznik (`switch`) — wtedy w ustawieniach encji zmień „Pokaż jako” na „Światło” albo dodaj `switch.turn_off` z listą przełączników.

[DO UZUPEŁNIENIA: jakie sceny i automatyzacje ustawiłeś w tej realizacji.]

## Pomiar energii — bonus, o którym mało kto wie

Wersja „PM” mierzy, ile energii zużywa podłączone światło. Przy oświetleniu LED to zwykle niewiele, ale pomiar przydaje się do wykrycia, że lampa świeciła całą noc, albo do sprawdzenia, ile naprawdę pobiera oświetlenie ogrodu.

## Ile to kosztuje

[DO UZUPEŁNIENIA: ile modułów, koszt sprzętu (ile zapłaciłeś), czas montażu.]

Sterowanie oświetleniem jest w pakiecie Start — zobacz [cennik](/#cennik).

## Efekt po kilku tygodniach

[DO UZUPEŁNIENIA: z czego domownicy korzystają najczęściej, czy coś nie działało.]

## Najczęstsze pytania

**Czy muszę wymieniać włączniki na smart?**
Nie. Moduł montuje się w puszce za zwykłym włącznikiem, który działa dalej tak jak dotąd.

**Czy Shelly 1PM Mini Gen4 potrzebuje przewodu neutralnego?**
Tak. Jeśli w puszce nie ma przewodu N, potrzebny jest moduł do instalacji bez neutralnego, np. Shelly 1L Gen4.

**Czy światło zadziała, gdy nie ma internetu?**
Tak. Włącznik na ścianie działa zawsze, a sterowanie z aplikacji w domowej sieci i z Home Assistant działa lokalnie. Internet jest potrzebny tylko do sterowania spoza domu przez chmurę.

**Jakie obciążenie wytrzyma moduł?**
Shelly 1PM Mini Gen4 przełącza do 8 A przy 240 V. Do oświetlenia domowego to z dużym zapasem.
