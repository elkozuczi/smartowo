---
published: false
layout: post
title: "Czujnik zalania z powiadomieniem na telefon"
description: "Czujnik zalania Shelly Flood Gen4 pod pralką i zmywarką: głośny alarm na miejscu i powiadomienie na telefon, zanim woda zaleje sąsiadów. Montaż bez kabli."
excerpt: "Cieknący wąż od pralki albo odkręcony kran — czujnik zalania piszczy na miejscu i od razu wysyła powiadomienie na Twój telefon, zanim woda dojdzie do sąsiada."
# image: /assets/blog/czujnik-zalania-z-powiadomieniem-na-telefon/glowne.webp
# image_alt: "Sonda czujnika zalania Shelly Flood na podłodze pod pralką"
cta_tytul: "Chcesz czujniki zalania z powiadomieniami? Zamontuję je"
cta_tekst: "Dobieram miejsca na czujniki, montuję je i konfiguruję powiadomienia na Twoim telefonie — także w mieszkaniu rodziców. Zostaw numer, oddzwonię."
---

Woda z pękniętego węża od pralki potrafi w kilkanaście minut zalać łazienkę, a po godzinie — mieszkanie piętro niżej. Najgorzej, gdy dzieje się to w nocy albo gdy nikogo nie ma w domu.

[DO UZUPEŁNIENIA: konkretna sytuacja — czy to była realizacja (np. mieszkanie rodziców w ramach „Bezpiecznego Seniora”, dom z kotłownią), czy ktoś już kiedyś miał zalanie, co skłoniło do montażu.]

Czujnik zalania to jedno z najtańszych zabezpieczeń w całym smart home, a może oszczędzić tysiące złotych. Działa podwójnie: **piszczy na miejscu** i **wysyła powiadomienie na telefon** — więc wiesz o problemie także wtedy, gdy jesteś w pracy albo daleko od mieszkania rodziców.

<!-- ZDJĘCIE 1: sonda czujnika zalania pod pralką lub zmywarką -->

## W skrócie

- **Shelly Flood Gen4** wisi na ścianie, a jego **sonda na przewodzie** leży na podłodze w miejscu, gdzie woda pojawi się najpierw.
- Gdy sonda wykryje wodę, czujnik **włącza brzęczyk** i wysyła **powiadomienie na telefon**.
- Zasilanie z **4 baterii AA** — według producenta na ok. 2 lata. Bez kabli zasilających.
- Łączy się przez **Wi-Fi**, obsługuje też **Zigbee i Matter**, więc pasuje do Home Assistant i innych systemów.

{% include zacheta.html miejsce="po-skrocie" tytul="Mieszkasz we Wrocławiu lub okolicach?" tekst="Dobiorę miejsca na czujniki, zamontuję je i ustawię powiadomienia na Twoim telefonie — także w mieszkaniu rodziców." przycisk="Chcę czujniki zalania" %}

![Schemat: sonda na przewodzie wykrywa wodę, czujnik Shelly Flood Gen4 włącza brzęczyk i przez Wi-Fi wysyła powiadomienie na telefony; opcjonalnie Home Assistant wyłącza gniazdko pralki](/assets/blog/czujnik-zalania-z-powiadomieniem-na-telefon/jak-dziala.webp){: width="1200" height="600" loading="lazy"}

## Sprzęt

{% include produkt.html id="shelly-flood-gen4" opis="Czujnik zalania z sondą na przewodzie 2 m (można go przedłużyć). Brzęczyk alarmowy, 4 baterie AA na ok. 2 lata, Wi-Fi, Zigbee i Matter. Montowany na ścianie, sonda na podłodze." %}

Sonda na przewodzie to duża zaleta: sam czujnik wisi wyżej, w suchym miejscu, a pod pralkę czy za zmywarkę wsuwasz tylko płaską sondę. Producent podaje, że przewód sondy można przedłużać — łącznie nawet do 150 m.

Jeśli wolisz mniejsze urządzenie, które po prostu kładzie się na podłodze, jest też wersja kompaktowa:

{% include produkt.html id="shelly-flood-s-gen4" opis="Kompaktowy czujnik zalania z wbudowanym brzęczykiem — kładziesz go bezpośrednio w miejscu zagrożonym wyciekiem." %}

[DO UZUPEŁNIENIA: który model i ile sztuk zamontowałeś w tej realizacji.]

## Gdzie położyć czujnik

Woda zawsze spływa w najniższe miejsce, więc sondę kładziesz tam, gdzie pojawi się najpierw:

- **pod pralką i zmywarką** — wąż doprowadzający i odpływ to najczęstsze źródła zalań,
- **pod zlewem w kuchni** — wężyki baterii z czasem pękają,
- **w łazience przy WC i pod umywalką**,
- **przy piecu, bojlerze albo zbiorniku CWU** — w kotłowni,
- **przy pompie w piwnicy**, jeśli taką masz.

![Gdzie położyć sondy czujnika zalania: w łazience pod pralką, umywalką i przy WC, w kuchni pod zlewem i zmywarką, w kotłowni przy piecu i bojlerze](/assets/blog/czujnik-zalania-z-powiadomieniem-na-telefon/gdzie-czujniki.webp){: width="1200" height="640" loading="lazy"}

Sondę połóż płasko na podłodze, najlepiej w zagłębieniu albo przy ścianie, w którą „spływa” podłoga. [DO UZUPEŁNIENIA: gdzie położyłeś sondy w tej realizacji.]

<!-- ZDJĘCIE 2: czujnik na ścianie, przewód sondy schowany przy listwie -->

## Montaż krok po kroku

Montaż nie wymaga prac przy instalacji elektrycznej — czujnik działa na baterie.

**1. Włóż baterie** i dodaj czujnik do aplikacji Shelly (albo do Home Assistant przez Zigbee lub Matter).

**2. Przykręć lub przyklej czujnik do ściany** w suchym miejscu, w zasięgu Wi-Fi.

**3. Poprowadź przewód sondy** wzdłuż listwy i wsuń sondę pod pralkę, zmywarkę albo zlew.

**4. Przetestuj.** Zwilż sondę mokrą szmatką — czujnik powinien zapiszczeć, a na telefon powinno przyjść powiadomienie. Testuj tak każdy czujnik po montażu.

[DO UZUPEŁNIENIA: co było trudne — zasięg Wi-Fi w łazience/kotłowni, prowadzenie przewodu.]

## Powiadomienia i automatyzacje

W aplikacji Shelly powiadomienie o zalaniu ustawisz w kilka kliknięć. Producent przewidział też trzy tryby głośności alarmu, więc brzęczyk można dopasować do pomieszczenia.

W Home Assistant można pójść krok dalej — np. przy zalaniu pod pralką od razu wyłączyć pralkę (jeśli jest podłączona przez inteligentne gniazdko) i wysłać wiadomość do całej rodziny:

```yaml
- alias: "Zalanie pod pralką"
  triggers:
    - trigger: state
      entity_id: binary_sensor.czujnik_zalania_lazienka_flood
      to: "on"
  actions:
    - action: switch.turn_off
      target:
        entity_id: switch.gniazdko_pralka
    - action: notify.mobile_app_twoj_telefon
      data:
        title: "Zalanie!"
        message: "Czujnik pod pralką wykrył wodę. Pralka została wyłączona."
```

Nazwy encji zmień na swoje. Jeśli nie masz gniazdka przy pralce, usuń pierwszą akcję.

{% include zacheta.html miejsce="po-konfiguracji" tytul="Chcesz, żeby ktoś zrobił to porządnie?" tekst="Zamontuję czujniki zalania w Twoim domu albo u rodziców, przetestuję każdy z nich i ustawię powiadomienia na telefonach całej rodziny." %}

## Ile to kosztuje

[DO UZUPEŁNIENIA: ile czujników, koszt sprzętu (ile zapłaciłeś), czas montażu.]

Czujniki zalania są częścią pakietu [Bezpieczny Senior](/senior/) — razem z czujką dymu, czujnikiem drzwi i alertem braku ruchu rano.

## Efekt po kilku tygodniach

[DO UZUPEŁNIENIA: czy czujnik kiedyś zadziałał (prawdziwy wyciek albo fałszywy alarm), jak długo działa na bateriach, opinia domowników.]

## Najczęstsze pytania

**Czy czujnik zalania działa bez internetu?**
Brzęczyk alarmowy działa na miejscu zawsze. Powiadomienie na telefon poza domem wymaga internetu — przez chmurę Shelly albo przez Home Assistant z dostępem zdalnym.

**Na ile wystarczą baterie?**
Shelly Flood Gen4 działa na 4 baterie AA. Według producenta wystarczają na ok. 2 lata — zależnie od baterii, sposobu użycia i siły sygnału sieci.

**Gdzie najczęściej dochodzi do zalania w mieszkaniu?**
Najczęściej pod pralką i zmywarką (węże doprowadzające i odpływowe), pod zlewem (wężyki baterii) i w łazience. W domu jednorodzinnym dochodzi kotłownia: piec, bojler i zbiornik ciepłej wody.

**Czy czujnik sam zakręci wodę?**
Nie — czujnik wykrywa wodę i alarmuje. Do automatycznego zakręcania wody potrzebny jest dodatkowo elektrozawór na rurze, sterowany np. przez Home Assistant.
