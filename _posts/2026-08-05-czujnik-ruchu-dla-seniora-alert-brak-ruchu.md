---
published: false
layout: post
title: "Czujnik ruchu dla seniora: alert, gdy rano nie było ruchu"
description: "Jak dostać powiadomienie na telefon, gdy mama lub tata rano się nie poruszyli. Czujnik ruchu Shelly BLU, Home Assistant, bez kamer i bez abonamentu."
excerpt: "Rano telefon sam daje znać, że u mamy wszystko w porządku — a jeśli do 9:00 nie było ruchu, dostajesz wiadomość, że warto zadzwonić. Bez kamer i bez abonamentu."
# image: /assets/blog/czujnik-ruchu-dla-seniora-alert-brak-ruchu/glowne.webp
# image_alt: "Czujnik ruchu na ścianie w kuchni, obok telefon z powiadomieniem „ruch wykryty — wszystko OK”"
cta_tytul: "Chcesz takiego spokoju o rodziców? Zamontuję to"
cta_tekst: "Montuję czujniki w mieszkaniu rodziców i konfiguruję powiadomienia na Twoim telefonie i telefonach rodzeństwa. Zostaw numer — oddzwonię i doradzę, od czego zacząć."
---

Dzwonisz do mamy codziennie rano, „żeby tylko sprawdzić”? A gdy nie odbiera, od razu robi się nerwowo — może jest w łazience, może wyszła po bułki, a może coś się stało.

[DO UZUPEŁNIENIA: konkretna sytuacja z realizacji — kto (np. „syn pani Ireny z Krzyków”), dlaczego się zgłosił, co go martwiło. Jeśli to nie była realizacja, tylko pomysł z oferty — napisać wstęp jako poradnik.]

Rozwiązanie, które montuję w takich sytuacjach, jest proste: czujnik ruchu w kuchni albo w przedpokoju i jedna reguła. Jeśli do ustalonej godziny nikt się w mieszkaniu nie poruszył, na Twój telefon przychodzi wiadomość. Bez kamer, bez nagrywania, bez abonamentu — i bez żadnej obsługi po stronie rodziców.

<!-- ZDJĘCIE 1: czujnik ruchu na ścianie w kuchni lub przedpokoju (dyskretnie, na wysokości ok. 2 m) -->

## W skrócie

- **Czujnik ruchu Shelly BLU Motion** wisi w miejscu, przez które rodzic przechodzi każdego ranka — w kuchni albo w przedpokoju.
- **O 6:00** system zaczyna „czekać” na pierwszy ruch.
- **O 9:00** sprawdza, czy ruch był. Jeśli nie — dostajesz wiadomość: „Brak ruchu od 6:00. Warto zadzwonić”.
- **Gdy mama wstanie później**, przychodzi druga wiadomość: „Ruch wykryty — wszystko OK”.
- Godziny dopasowujesz do rytmu dnia rodziców, a na czas wyjazdu alert wstrzymujesz jednym przełącznikiem.

{% include zacheta.html miejsce="po-skrocie" tytul="Rodzice mieszkają we Wrocławiu lub okolicach?" tekst="Zamontuję czujniki, skonfiguruję powiadomienia na telefonach całej rodziny i wytłumaczę wszystko rodzicom. Bez kamer i bez abonamentu." przycisk="Chcę taki alert" %}

![Schemat: czujnik ruchu Shelly BLU Motion w mieszkaniu rodziców wysyła sygnał przez moduł Shelly do Home Assistant, który o 9:00 sprawdza, czy był ruch, i wysyła powiadomienie na telefony rodziny](/assets/blog/czujnik-ruchu-dla-seniora-alert-brak-ruchu/schemat-systemu.webp){: width="1200" height="620" loading="lazy"}

## Sprzęt

Najważniejszy jest czujnik ruchu. Wystarczy model na baterię, bez żadnych przewodów — przykleja się go albo przykręca do ściany:

{% include produkt.html id="shelly-blu-motion" opis="Czujnik ruchu na Bluetooth z czujnikiem natężenia światła. Zasilany jedną baterią CR2477 — według producenta wystarcza do 5 lat. Zasięg w pomieszczeniu do ok. 10 m." %}

Czujnik wysyła sygnał przez Bluetooth, więc w jego zasięgu musi być urządzenie, które przekaże go dalej do sieci Wi-Fi. Może to być dowolny moduł Shelly nowszej generacji zamontowany w mieszkaniu (np. za włącznikiem światła) albo osobna bramka:

{% include produkt.html id="shelly-blu-gateway" opis="Bramka Bluetooth–Wi-Fi zasilana z gniazdka USB. Potrzebna tylko wtedy, gdy w mieszkaniu nie ma innego modułu Shelly w zasięgu czujnika." %}

Do tego potrzebny jest internet w mieszkaniu rodziców — zwykły router Wi-Fi wystarczy. Rodzice nie potrzebują smartfona: aplikację i powiadomienia masz Ty.

[DO UZUPEŁNIENIA: co zamontowałeś w tej realizacji poza czujnikiem ruchu — np. czujnik zalania, czujka dymu, czujnik drzwi, Home Assistant na jakim sprzęcie (Raspberry Pi, Home Assistant Green itp.).]

## Gdzie powiesić czujnik

To najważniejsza decyzja w całym montażu. Czujnik musi „widzieć” miejsce, przez które rodzic **na pewno** przechodzi rano:

- **kuchnia** — śniadanie, herbata, leki: najpewniejsze miejsce,
- **przedpokój między sypialnią a łazienką** — dobry, jeśli łazienka jest pierwszym punktem dnia,
- **nie sypialnia** — czujnik wykryje przewracanie się na łóżku i alert straci sens.

Unikaj miejsc, w których ruch zrobi ktoś inny: okna z firanką poruszaną przez kaloryfer, legowiska psa czy kota. [DO UZUPEŁNIENIA: gdzie powiesiłeś czujnik w tej realizacji i dlaczego; czy w mieszkaniu jest zwierzę.]

<!-- ZDJĘCIE 2: rzut mieszkania albo zdjęcie miejsca montażu z zaznaczonym polem widzenia czujnika -->

## Jak działa reguła „brak ruchu rano”

Czujnik sam z siebie wysyła tylko informację „jest ruch” albo „nie ma ruchu”. Całą logikę — od której godziny liczymy, kiedy sprawdzamy i komu wysyłamy wiadomość — ustawiam w Home Assistant. Działa to w trzech krokach:

1. **6:00** — system kasuje wczorajszy ruch i zaczyna czekać na pierwszy dzisiejszy.
2. **Pierwszy ruch po 6:00** — system zapamiętuje, że rano był ruch.
3. **9:00** — jeśli ruchu nie było (a alert nie jest wstrzymany), wysyła powiadomienie. Gdy ruch pojawi się później, wysyła drugie: „wszystko OK”.

Stan „był ruch” jest zapisywany w Home Assistant, więc krótki zanik prądu albo restart systemu go nie kasuje.

![Oś czasu poranka: od 6:00 system czeka na ruch; w zwykły dzień ruch o 7:10 i brak wiadomości; gdy mama śpi dłużej, o 9:00 alert, a po ruchu o 9:14 wiadomość wszystko OK](/assets/blog/czujnik-ruchu-dla-seniora-alert-brak-ruchu/os-poranka.webp){: width="1200" height="600" loading="lazy"}

<!-- ZDJĘCIE 3: zrzut ekranu powiadomienia na telefonie -->

### Konfiguracja w Home Assistant krok po kroku

Jeśli chcesz zrobić to sam, potrzebujesz trzech pomocników typu **przełącznik** (Ustawienia → Urządzenia i usługi → Pomocnicy → Utwórz pomocnika → Przełącznik):

- `input_boolean.ruch_rano` — czy dziś rano był ruch,
- `input_boolean.alert_wyslany` — czy wysłaliśmy już alert,
- `input_boolean.alert_wstrzymany` — włączasz go na czas wyjazdu rodziców.

Potem trzy automatyzacje. Poniżej wersja w YAML — nazwę czujnika (`binary_sensor.czujnik_ruchu_kuchnia_motion`) i usługę powiadomień (`notify.mobile_app_twoj_telefon`) zmień na swoje:

```yaml
- alias: "Senior – nowy dzień o 6:00"
  triggers:
    - trigger: time
      at: "06:00:00"
  actions:
    - action: input_boolean.turn_off
      target:
        entity_id:
          - input_boolean.ruch_rano
          - input_boolean.alert_wyslany

- alias: "Senior – ruch w mieszkaniu"
  triggers:
    - trigger: state
      entity_id: binary_sensor.czujnik_ruchu_kuchnia_motion
      to: "on"
  conditions:
    - condition: time
      after: "06:00:00"
  actions:
    - action: input_boolean.turn_on
      target:
        entity_id: input_boolean.ruch_rano
    - if:
        - condition: state
          entity_id: input_boolean.alert_wyslany
          state: "on"
      then:
        - action: notify.mobile_app_twoj_telefon
          data:
            title: "Mama"
            message: "Ruch wykryty — wszystko OK."
        - action: input_boolean.turn_off
          target:
            entity_id: input_boolean.alert_wyslany

- alias: "Senior – kontrola o 9:00"
  triggers:
    - trigger: time
      at: "09:00:00"
  conditions:
    - condition: state
      entity_id: input_boolean.ruch_rano
      state: "off"
    - condition: state
      entity_id: input_boolean.alert_wstrzymany
      state: "off"
  actions:
    - action: notify.mobile_app_twoj_telefon
      data:
        title: "Mama"
        message: "Brak ruchu od 6:00. Warto zadzwonić."
    - action: input_boolean.turn_on
      target:
        entity_id: input_boolean.alert_wyslany
```

Żeby wiadomość trafiła do kilku osób naraz (np. do Ciebie i rodzeństwa), zamiast jednego telefonu użyj grupy powiadomień — każdy instaluje aplikację Home Assistant na swoim telefonie.

## Jak dobrać godziny

Godziny to jedyna rzecz, którą naprawdę trzeba przemyśleć. Za wczesna kontrola — i dostajesz fałszywe alarmy w każdą sobotę. Za późna — i alert traci sens.

Dobra zasada: **godzina kontroli to najpóźniejsza godzina, o której rodzic zwykle już jest na nogach, plus zapas**. Jeśli mama wstaje między 6:30 a 7:30, kontrola o 9:00 daje półtorej godziny marginesu.

[DO UZUPEŁNIENIA: jakie godziny ustawiliście w tej realizacji i czy trzeba je było po kilku dniach zmieniać.]

{% include zacheta.html miejsce="po-konfiguracji" tytul="Nie chcesz konfigurować Home Assistant sam?" tekst="Zrobię to za Ciebie: dobiorę czujniki, zamontuję je, ustawię godziny pod rytm dnia rodziców i powiadomienia na telefonach całej rodziny." %}

## Rozmowa z rodzicami

To bywa trudniejsze niż sam montaż. Rodzice często boją się, że będą „podglądani”. Warto od razu powiedzieć wprost:

- czujnik ruchu **nie nagrywa obrazu ani dźwięku** — wysyła tylko informację „ktoś się poruszył”,
- w domu **nic się nie zmienia** — żadnych nowych przycisków ani aplikacji,
- to ma uspokoić Ciebie, żebyś **nie musiał dzwonić co rano**.

[DO UZUPEŁNIENIA: jak zareagowali rodzice w tej realizacji — czy były obawy i co przekonało.]

## Ile to kosztuje i ile trwa

[DO UZUPEŁNIENIA: koszt sprzętu w tej realizacji (bez cen z Amazona — podaj, ile zapłaciłeś), czas montażu i konfiguracji.]

Jeśli wolisz rozwiązanie z montażem, zobacz pakiet [Bezpieczny Senior](/senior/) — obok alertu braku ruchu są w nim czujniki zalania, czujka dymu i czujnik drzwi wejściowych.

## Efekt po kilku tygodniach

[DO UZUPEŁNIENIA: ile czasu działa, ile było fałszywych alarmów, czy alert kiedyś „zadziałał naprawdę”, co mówi rodzina.]

## Najczęstsze pytania

**Czy rodzice muszą mieć smartfon?**
Nie. Smartfon z aplikacją ma osoba, która dostaje powiadomienia. W mieszkaniu rodziców potrzebny jest tylko domowy internet (router Wi-Fi).

**Czy czujnik ruchu nagrywa obraz?**
Nie. Czujnik ruchu nie ma kamery ani mikrofonu — wysyła tylko informację, że w jego polu widzenia ktoś się poruszył, oraz poziom oświetlenia.

**Co, jeśli mama wyjedzie albo dłużej pośpi?**
Na czas wyjazdu włączasz przełącznik „alert wstrzymany”. A gdy mama wstanie później niż zwykle, po alercie dostajesz od razu drugą wiadomość: „ruch wykryty — wszystko OK”.

**Jak często trzeba wymieniać baterię w czujniku?**
Według producenta bateria CR2477 w Shelly BLU Motion wystarcza do 5 lat. Poziom baterii widać w aplikacji, więc wymianę można zaplanować z wyprzedzeniem.
