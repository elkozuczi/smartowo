---
published: false
layout: post
title: "Ile prądu zużywa Twój dom? Licznik Shelly w rozdzielnicy"
description: "Licznik energii Shelly EM Gen3 lub Pro 3EM w rozdzielnicy pokazuje zużycie prądu na żywo. Znajdź prądożerne urządzenia i sprawdź autokonsumpcję PV."
excerpt: "Rachunek za prąd mówi tylko, ile zapłaciłeś. Licznik Shelly w rozdzielnicy pokazuje, kiedy i na co — na żywo w telefonie, z dokładnością do minuty. Pomaga znaleźć „prądożerców” i lepiej wykorzystać fotowoltaikę."
# image: /assets/blog/ile-pradu-zuzywa-dom-licznik-shelly/glowne.webp
# image_alt: "Licznik energii Shelly w rozdzielnicy, obok telefon z wykresem zużycia prądu"
cta_tytul: "Chcesz widzieć zużycie prądu w telefonie? Zamontuję licznik"
cta_tekst: "Montuję liczniki energii w rozdzielnicy i konfiguruję panel zużycia w Home Assistant — także z fotowoltaiką. Zostaw numer, oddzwonię."
---

Rachunek za prąd przychodzi raz na jakiś czas i mówi tylko jedno: ile zapłaciłeś. Nie mówi, **co** tyle zużywa — pompa ciepła, bojler, stara zamrażarka w piwnicy, a może urządzenia, które „śpią” całą noc i pobierają prąd bez przerwy.

[DO UZUPEŁNIENIA: konkretna sytuacja — dom/mieszkanie, instalacja 1- czy 3-fazowa, czy jest fotowoltaika lub pompa ciepła, co chciał sprawdzić klient.]

Licznik energii Shelly montowany w rozdzielnicy mierzy zużycie całego domu na żywo. W telefonie widzisz moc w tej chwili, wykres z każdej godziny i dnia — a w Home Assistant pełny panel energii, także z produkcją z fotowoltaiki.

<!-- ZDJĘCIE 1: licznik w rozdzielnicy -->

## W skrócie

- **Licznik Shelly** montuje się w rozdzielnicy — mierzy prąd przez **przekładniki (cęgi)** zakładane na przewody.
- Do instalacji **jednofazowej** — Shelly EM Gen3, do **trójfazowej** — Shelly Pro 3EM.
- Widzisz **zużycie na żywo** i **historię**, a w Home Assistant — panel energii z kosztami.
- Pro 3EM mierzy przepływ energii **w obie strony**, więc nadaje się do instalacji z **fotowoltaiką**.
- Montaż w rozdzielnicy to **praca dla elektryka**.

{% include zacheta.html miejsce="po-skrocie" tytul="Mieszkasz we Wrocławiu lub okolicach?" tekst="Zamontuję licznik w Twojej rozdzielnicy i skonfiguruję panel zużycia energii w Home Assistant — także z fotowoltaiką." przycisk="Zamów montaż" %}

## Który licznik wybrać

![Porównanie liczników: Shelly EM Gen3 dla instalacji jednofazowej z przekładnikiem 50 A i Shelly Pro 3EM dla instalacji trójfazowej na szynę DIN z pomiarem w obie strony](/assets/blog/ile-pradu-zuzywa-dom-licznik-shelly/ktory-licznik.webp){: width="1200" height="600" loading="lazy"}

**Instalacja jednofazowa** (typowe mieszkanie):

{% include produkt.html id="shelly-em-gen3" opis="Licznik energii dla instalacji jednofazowej: 2 kanały pomiarowe, przekładnik 50 A w zestawie (zakres pomiaru do 80 A). Montowany w rozdzielnicy lub puszce, Wi-Fi. Ma też styk do sterowania stycznikiem." %}

**Instalacja trójfazowa** (typowy dom jednorodzinny, pompa ciepła, fotowoltaika):

{% include produkt.html id="shelly-pro-3em" opis="Trójfazowy licznik energii na szynę DIN, z Wi-Fi i złączem LAN. Mierzy energię w obu kierunkach — gotowy na fotowoltaikę. Według producenta klasa dokładności B (1%) i zapis danych co minutę przez co najmniej 45 dni." %}

Jak sprawdzić, czy masz instalację jednofazową czy trójfazową? Spójrz na bezpiecznik główny przy liczniku od dostawcy prądu: trzy połączone ze sobą „bezpieczniki” obok siebie to zwykle instalacja trójfazowa. Pewność da elektryk.

[DO UZUPEŁNIENIA: który licznik zamontowałeś w tej realizacji i dlaczego.]

## Montaż

> **Uwaga:** montaż w rozdzielnicy to praca przy instalacji 230/400 V. Wykonuje ją wyłącznie elektryk z uprawnieniami. Jeśli mieszkasz we Wrocławiu lub okolicach — [napisz do mnie](#kontakt).

Przekładniki prądowe zakłada się na przewody **bez ich przecinania** — obejmują przewód jak klamra. Licznik potrzebuje dodatkowo podłączenia do napięcia (do pomiaru napięcia i własnego zasilania) — zgodnie ze schematem z instrukcji. Ważne, żeby każdy przekładnik trafił na właściwą fazę i był założony w dobrym kierunku — inaczej pomiar będzie błędny.

![Schemat blokowy rozdzielnicy trójfazowej: za licznikiem dostawcy przekładniki na fazach L1, L2, L3 podłączone do Shelly Pro 3EM, który przez LAN lub Wi-Fi przekazuje dane do panelu energii Home Assistant](/assets/blog/ile-pradu-zuzywa-dom-licznik-shelly/schemat-rozdzielnicy.webp){: width="1200" height="640" loading="lazy"}

[DO UZUPEŁNIENIA: ile trwał montaż, czy w rozdzielnicy było miejsce na szynie DIN, co było trudne.]

<!-- ZDJĘCIE 2: przekładniki założone na przewody w rozdzielnicy -->

## Co możesz zobaczyć

**Zużycie „w spoczynku”.** Sprawdź moc w nocy, gdy wszystko jest wyłączone. To, co wtedy widać, pobiera prąd przez całą dobę: router, lodówka, urządzenia w trybie czuwania. Czasem okazuje się, że to więcej, niż się spodziewasz.

**Prądożerne urządzenia.** Włączasz czajnik, bojler albo grzejnik i od razu widzisz skok mocy. Tak najłatwiej sprawdzić, które urządzenie ile naprawdę pobiera.

**Fotowoltaika.** Z licznikiem mierzącym w obie strony widzisz, kiedy oddajesz energię do sieci, a kiedy ją pobierasz — i możesz przesunąć pranie czy grzanie wody na godziny z produkcją.

[DO UZUPEŁNIENIA: co ciekawego wyszło w tej realizacji — np. zużycie w spoczynku, jakieś zaskoczenie (tylko realne dane).]

<!-- ZDJĘCIE 3: zrzut ekranu panelu energii w Home Assistant -->

## Panel energii w Home Assistant

Licznik Shelly pojawia się w Home Assistant automatycznie. W **Ustawienia → Panele → Energia** wskazujesz:

- encję energii pobranej z sieci (licznik zużycia),
- jeśli masz fotowoltaikę — encję energii oddanej do sieci i produkcji,
- cenę za kWh — wtedy panel liczy też koszty.

Od tego momentu masz wykresy dzienne, tygodniowe i miesięczne, które możesz porównywać z rachunkiem.

{% include zacheta.html miejsce="po-konfiguracji" tytul="Nie chcesz grzebać w rozdzielnicy?" tekst="Montaż licznika w rozdzielnicy to praca dla elektryka. Zamontuję go i skonfiguruję panel energii — zobaczysz zużycie domu w telefonie jeszcze tego samego dnia." %}

## Ile to kosztuje

[DO UZUPEŁNIENIA: koszt licznika (ile zapłaciłeś) i montażu.]

## Efekt po kilku tygodniach

[DO UZUPEŁNIENIA: co się zmieniło w zużyciu albo w nawykach — tylko realne dane.]

## Najczęstsze pytania

**Czy licznik Shelly zastępuje licznik od dostawcy prądu?**
Nie. Licznik od dostawcy zostaje i to on jest podstawą rozliczeń. Shelly to dodatkowy pomiar dla Ciebie — pokazuje zużycie na żywo i jego historię.

**Czy mogę zamontować licznik sam?**
Montaż w rozdzielnicy wymaga pracy przy napięciu 230/400 V i powinien go wykonać elektryk z uprawnieniami.

**Czy Shelly mierzy produkcję z fotowoltaiki?**
Shelly Pro 3EM mierzy energię w obu kierunkach (producent określa go jako gotowy na fotowoltaikę), więc widzi zarówno pobór z sieci, jak i oddawanie nadwyżek.

**Jak dokładny jest pomiar?**
Shelly Pro 3EM według producenta ma klasę dokładności B (1%). Shelly EM Gen3 podaje dokładność pomiaru prądu ±2% w zakresie 2–50 A.
