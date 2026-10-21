---
published: false
layout: post
title: "Powiadomienie, gdy pralka skończy prać"
description: "Inteligentne gniazdko Shelly Plug M Gen3 mierzy pobór prądu pralki i wysyła powiadomienie na telefon, gdy pranie się skończy. Bez prac elektrycznych."
excerpt: "Pranie skończyło się godzinę temu i leży mokre w bębnie? Gniazdko z pomiarem prądu „widzi”, kiedy pralka przestaje pracować, i wysyła powiadomienie na telefon."
# image: /assets/blog/powiadomienie-koniec-prania/glowne.webp
# image_alt: "Pralka podłączona przez gniazdko Shelly Plug M, na telefonie powiadomienie „pranie skończone”"
cta_tytul: "Chcesz więcej takich udogodnień w domu?"
cta_tekst: "Montuję smart home we Wrocławiu i okolicach — od gniazdek i oświetlenia po rolety i ogrzewanie. Zostaw numer, oddzwonię i doradzę, od czego zacząć."
---

Pralka w łazience albo w piwnicy, a Ty w drugim końcu domu. Sygnał końca prania słychać tylko, gdy stoisz obok — więc pranie leży mokre w bębnie godzinę albo dwie, zanim ktoś sobie o nim przypomni.

[DO UZUPEŁNIENIA: konkretna sytuacja — u Ciebie czy u klienta, gdzie stoi pralka, co przeszkadzało. Ewentualnie także suszarka/zmywarka.]

Rozwiązanie kosztuje tyle co jedno gniazdko i zajmuje kilka minut: pralkę podłączasz przez **inteligentne gniazdko z pomiarem energii**. Gniazdko widzi, ile prądu pobiera pralka — a gdy pobór spada do zera i tak zostaje, wysyła powiadomienie: „pranie skończone”.

<!-- ZDJĘCIE 1: gniazdko Shelly Plug M z wtyczką pralki -->

## W skrócie

- **Shelly Plug M Gen3** wpinasz między gniazdko w ścianie a wtyczkę pralki.
- Gniazdko **mierzy pobór mocy** — widać, kiedy pralka grzeje wodę, wiruje i kiedy kończy.
- **Automatyzacja** wysyła powiadomienie, gdy pobór spadnie i nie rośnie przez kilka minut.
- Bez prac elektrycznych — gniazdko po prostu wkładasz do kontaktu.

![Schemat: Shelly Plug M Gen3 wpięty między gniazdko w ścianie a pralkę mierzy moc i przez Wi-Fi przekazuje ją do Home Assistant, który wysyła na telefon powiadomienie o końcu prania](/assets/blog/powiadomienie-koniec-prania/schemat-gniazdka.webp){: width="1200" height="520" loading="lazy"}

## Sprzęt

{% include produkt.html id="shelly-plug-m-gen3" opis="Gniazdko z pomiarem energii: 13 A, do 3000 W (obciążenie rezystancyjne). Wtyczka CEE 7/7 pasuje do polskich gniazdek z bolcem. Wi-Fi, Bluetooth i Matter." %}

Dlaczego ten model? Pralka podczas grzania wody pobiera sporo mocy, więc gniazdko musi mieć zapas. Plug M Gen3 według producenta przełącza do 13 A i 3000 W przy obciążeniu rezystancyjnym. Do tego ma wtyczkę **CEE 7/7**, która pasuje zarówno do gniazdek typu E (polskich, z bolcem), jak i F (Schuko).

Sprawdź moc swojej pralki na tabliczce znamionowej albo w instrukcji — musi mieścić się w parametrach gniazdka.

[DO UZUPEŁNIENIA: jaką pralkę i jakie gniazdko masz/zamontowałeś.]

## Jak „rozpoznać” koniec prania

Pralka nie pracuje równo: grzeje wodę (duży pobór), obraca bęben (mały pobór), robi przerwy, wiruje. Dlatego automatyzacja nie może reagować na pierwszy spadek mocy — musi poczekać, aż pobór **zostanie niski przez kilka minut**.

Najlepiej najpierw podejrzeć jedno pranie na wykresie mocy w aplikacji Shelly albo w Home Assistant. Zobaczysz:

- **ile pobiera pralka w czuwaniu** (wyłączona, ale z włączonym wyświetlaczem) — zwykle kilka watów,
- **jak długie są przerwy** w trakcie prania.

Próg „pralka pracuje” ustaw wyraźnie powyżej czuwania, a czas „koniec” — dłuższy niż najdłuższa przerwa w programie.

![Poglądowy wykres poboru mocy pralki: grzanie wody, pranie z przerwami, wirowanie i koniec; próg pracy powyżej 10 W przez 2 minuty, koniec poniżej 3 W przez 3 minuty uruchamia powiadomienie](/assets/blog/powiadomienie-koniec-prania/wykres-mocy.webp){: width="1200" height="600" loading="lazy"}

<!-- ZDJĘCIE 2: wykres poboru mocy jednego prania z aplikacji -->

## Automatyzacja w Home Assistant

Przykład: pralka pracuje, gdy pobiera ponad 10 W przez 2 minuty. Pranie jest skończone, gdy pobór spadnie poniżej 3 W i zostanie tak przez 3 minuty:

```yaml
- alias: "Pralka – koniec prania"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.gniazdko_pralka_power
      above: 10
      for: "00:02:00"
  actions:
    - wait_for_trigger:
        - trigger: numeric_state
          entity_id: sensor.gniazdko_pralka_power
          below: 3
          for: "00:03:00"
    - action: notify.mobile_app_twoj_telefon
      data:
        title: "Pralka"
        message: "Pranie skończone — można wieszać."
```

Progi 10 W i 3 W to przykład — dopasuj je do wykresu swojej pralki. Nazwę `sensor.gniazdko_pralka_power` zmień na encję mocy swojego gniazdka.

Tę samą automatyzację możesz skopiować dla suszarki albo zmywarki.

[DO UZUPEŁNIENIA: jakie progi i czasy sprawdziły się u Ciebie.]

## Bonus: ile prądu zużywa pralka

Gniazdko liczy zużytą energię, więc po kilku praniach wiesz, ile kosztuje jedno pranie w danym programie — i czy program „eko” naprawdę oszczędza.

[DO UZUPEŁNIENIA: ile kWh zużywa jedno pranie u Ciebie (tylko jeśli masz realne dane).]

{% include zacheta.html miejsce="po-konfiguracji" tytul="Chcesz więcej takich udogodnień w domu?" tekst="Montuję smart home we Wrocławiu i okolicach: oświetlenie, rolety, ogrzewanie i automatyzacje, które oszczędzają czas. Bez kucia ścian." przycisk="Zapytaj o montaż" %}

## Ile to kosztuje

Jedno gniazdko z pomiarem energii — i tyle. [DO UZUPEŁNIENIA: ile zapłaciłeś, ile trwała konfiguracja.]

## Efekt po kilku tygodniach

[DO UZUPEŁNIENIA: czy powiadomienia przychodzą we właściwym momencie, czy były fałszywe.]

## Najczęstsze pytania

**Czy inteligentne gniazdko wytrzyma pralkę?**
Shelly Plug M Gen3 według producenta przełącza do 13 A i 3000 W przy obciążeniu rezystancyjnym. Sprawdź moc swojej pralki na tabliczce znamionowej — musi się mieścić w tych parametrach.

**Czy Shelly Plug M pasuje do polskich gniazdek?**
Tak. Ma wtyczkę CEE 7/7, która pasuje do gniazdek typu E (z bolcem, standard w Polsce) i typu F (Schuko).

**Czy do powiadomienia potrzebny jest Home Assistant?**
Nie musi. Proste powiadomienia o zmianie mocy ustawisz też w aplikacji Shelly. Home Assistant daje więcej kontroli — np. czas, przez jaki pobór musi być niski.

**Czy można tak samo z suszarką i zmywarką?**
Tak. Wystarczy osobne gniazdko i ta sama automatyzacja z progami dopasowanymi do danego urządzenia.
