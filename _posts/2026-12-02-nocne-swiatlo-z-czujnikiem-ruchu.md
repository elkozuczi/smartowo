---
published: false
layout: post
title: "Nocne światło z czujnikiem ruchu do łazienki i korytarza"
description: "Delikatne światło zapala się samo, gdy wstajesz w nocy, i gaśnie po chwili. Czujnik ruchu Shelly BLU, ściemniacz i Home Assistant — bez kucia ścian."
excerpt: "Wstajesz w nocy do łazienki, a w korytarzu samo zapala się przygaszone światło — na tyle jasne, żeby się nie potknąć, i na tyle słabe, żeby nikogo nie obudzić. Po chwili gaśnie."
# image: /assets/blog/nocne-swiatlo-z-czujnikiem-ruchu/glowne.webp
# image_alt: "Korytarz nocą oświetlony przygaszonym światłem, na ścianie czujnik ruchu"
cta_tytul: "Chcesz nocne światło z czujnikiem ruchu? Zamontuję je"
cta_tekst: "Dobieram czujniki i oświetlenie, montuję je bez kucia ścian i ustawiam tak, żeby światło było jasne dokładnie tyle, ile trzeba. Zostaw numer, oddzwonię."
---

Nocne wyjście do łazienki po ciemku to dla wielu osób codzienność — i jedno z najczęstszych miejsc potknięć, zwłaszcza u seniorów. Zapalenie górnego światła z kolei oślepia i budzi resztę domowników.

[DO UZUPEŁNIENIA: konkretna sytuacja — czyje mieszkanie (np. rodzice w ramach „Bezpiecznego Seniora”), jaka trasa: sypialnia → korytarz → łazienka, co przeszkadzało.]

Rozwiązanie: czujnik ruchu w korytarzu i przygaszone światło, które zapala się samo tylko w nocy. Po kilku minutach bez ruchu gaśnie. W dzień czujnik nic nie robi — światło działa normalnie z włącznika.

<!-- ZDJĘCIE 1: korytarz nocą z przygaszonym światłem -->

## W skrócie

- **Czujnik ruchu Shelly BLU Motion** w korytarzu wykrywa, że ktoś wstał.
- **Między 22:00 a 6:30** światło zapala się samo na **10% jasności**.
- Po **kilku minutach bez ruchu** gaśnie.
- W dzień wszystko działa normalnie, a zwykły włącznik na ścianie zostaje.

{% include zacheta.html miejsce="po-skrocie" tytul="Mieszkasz we Wrocławiu lub okolicach?" tekst="Zamontuję czujnik i ściemniacz, ustawię godziny i jasność tak, żeby nikt się nie potykał i nikogo nie budziło." przycisk="Chcę nocne światło" %}

## Sprzęt

Czujnik ruchu na baterię — bez kabli, przykręcany albo przyklejany do ściany:

{% include produkt.html id="shelly-blu-motion" opis="Czujnik ruchu z czujnikiem natężenia światła, na Bluetooth. Bateria CR2477 — według producenta do 5 lat. Zasięg w pomieszczeniu do ok. 10 m." %}

Do sterowania jasnością istniejącej lampy — ściemniacz montowany w puszce za włącznikiem:

{% include produkt.html id="shelly-dimmer-gen4" opis="Ściemniacz do puszki za włącznikiem — pozwala zapalać lampę na kilka procent jasności. Do lamp LED (ściemnialnych) do 150 W. Wi-Fi, Zigbee i Matter." %}

Alternatywa, jeśli nie chcesz używać górnego światła: taśma LED przy podłodze albo pod łóżkiem, sterowana przez:

{% include produkt.html id="shelly-plus-rgbw-pm" opis="Sterownik taśm LED 12–24 V — np. delikatne podświetlenie przy podłodze w korytarzu albo pod łóżkiem." %}

Czujnik BLU wysyła sygnał przez Bluetooth — Shelly Dimmer Gen4 działa jako bramka Bluetooth, więc odbiera go i przekazuje do sieci Wi-Fi. Ściemniacz może pracować także bez przewodu neutralnego, ale wtedy według producenta minimalne obciążenie to 20 W (chyba że zamontujesz Bypass) — przy jednej żarówce LED to za mało.

[DO UZUPEŁNIENIA: co zamontowałeś w tej realizacji — ściemniacz na istniejącą lampę czy taśmę LED; czy żarówki były ściemnialne.]

## Gdzie powiesić czujnik

- **w korytarzu, na trasie z sypialni do łazienki** — tak, żeby wykrył ruch zaraz po wyjściu z sypialni,
- **nie w sypialni** — czujnik wykryje przewracanie się na łóżku i światło będzie się zapalać bez potrzeby,
- **na wysokości ok. 2 m**, skierowany wzdłuż korytarza.

![Rzut nocnej trasy z sypialni przez korytarz do łazienki: czujnik ruchu w korytarzu, przygaszone światło 10 procent, czujnik nie w sypialni](/assets/blog/nocne-swiatlo-z-czujnikiem-ruchu/trasa-nocna.webp){: width="1200" height="620" loading="lazy"}

[DO UZUPEŁNIENIA: gdzie zawisł czujnik w tej realizacji.]

<!-- ZDJĘCIE 2: czujnik ruchu na ścianie w korytarzu -->

## Montaż

Czujnik montujesz bez narzędzi elektrycznych: wkładasz baterię, dodajesz go w aplikacji Shelly i przyklejasz albo przykręcasz do ściany.

Ściemniacz montuje się w puszce za włącznikiem — to **praca przy instalacji 230 V**. Jeśli nie masz uprawnień elektrycznych, zleć ją elektrykowi albo [napisz do mnie](#kontakt). Dokładny schemat podłączenia jest w instrukcji ściemniacza. Sprawdź też, czy Twoje żarówki LED są **ściemnialne** — informacja jest na opakowaniu.

[DO UZUPEŁNIENIA: co było trudne przy montażu.]

## Automatyzacja w Home Assistant

Logika: ruch w nocy → światło na 10% → po 2 minutach bez ruchu → zgaś. Tryb `restart` sprawia, że każdy kolejny ruch „odnawia” czas świecenia:

```yaml
- alias: "Nocne światło – korytarz"
  mode: restart
  triggers:
    - trigger: state
      entity_id: binary_sensor.czujnik_ruchu_korytarz_motion
      to: "on"
  conditions:
    - condition: time
      after: "22:00:00"
      before: "06:30:00"
  actions:
    - action: light.turn_on
      target:
        entity_id: light.korytarz
      data:
        brightness_pct: 10
    - wait_for_trigger:
        - trigger: state
          entity_id: binary_sensor.czujnik_ruchu_korytarz_motion
          to: "off"
          for: "00:02:00"
    - action: light.turn_off
      target:
        entity_id: light.korytarz
```

Nazwy encji zmień na swoje. Dobrze wiedzieć: Shelly BLU Motion po wykryciu ruchu przez minutę nie wysyła kolejnych sygnałów, a stan „brak ruchu” zgłasza po minucie spokoju. Światło zgaśnie więc mniej więcej 3 minuty po ostatnim ruchu.

![Oś czasu: ruch zapala światło na 10 procent, czujnik zgłasza brak ruchu minutę po ostatnim ruchu, automatyzacja czeka 2 minuty i gasi światło](/assets/blog/nocne-swiatlo-z-czujnikiem-ruchu/os-czasu.webp){: width="1200" height="520" loading="lazy"}

Zamiast stałych godzin możesz użyć czujnika światła wbudowanego w BLU Motion — np. zapalaj światło tylko wtedy, gdy w korytarzu jest ciemno.

[DO UZUPEŁNIENIA: jakie godziny, jasność i czas świecenia ustawiliście w tej realizacji.]

{% include zacheta.html miejsce="po-konfiguracji" tytul="Nie chcesz ustawiać tego sam?" tekst="Zamontuję czujnik i ściemniacz, dobiorę jasność i godziny tak, żeby światło pomagało, a nie budziło." %}

## Ile to kosztuje

[DO UZUPEŁNIENIA: koszt sprzętu (ile zapłaciłeś), czas montażu.]

Nocne światło jest jedną z funkcji pakietu [Bezpieczny Senior](/senior/).

## Efekt po kilku tygodniach

[DO UZUPEŁNIENIA: jak działa w praktyce, czy jasność jest dobra, opinia domowników.]

## Najczęstsze pytania

**Czy światło będzie się zapalać także w dzień?**
Nie, jeśli w automatyzacji ustawisz godziny (np. 22:00–6:30) albo warunek „ciemno” z czujnika światła. W dzień światło działa normalnie z włącznika.

**Czy czujnik ruchu potrzebuje kabla?**
Nie. Shelly BLU Motion działa na baterii CR2477, która według producenta wystarcza do 5 lat.

**Czy każda żarówka LED da się ściemniać?**
Nie. Ściemniać można tylko żarówki i oprawy LED oznaczone jako ściemnialne — informacja jest na opakowaniu.

**Czy zwykły włącznik będzie dalej działał?**
Tak. Ściemniacz montuje się za włącznikiem, który dalej zapala i gasi światło jak dotąd.
