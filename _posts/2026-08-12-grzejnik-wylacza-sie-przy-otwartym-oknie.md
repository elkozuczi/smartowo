---
published: false
layout: post
title: "Grzejnik sam się wyłącza, gdy otworzysz okno"
description: "Inteligentne głowice Shelly BLU TRV i czujnik okna: grzejnik przestaje grzać przy wietrzeniu i wraca do temperatury po zamknięciu okna. Montaż bez narzędzi."
excerpt: "Otwierasz okno, żeby przewietrzyć — grzejnik sam przestaje grzać. Zamykasz — wraca do ustawionej temperatury. Do tego harmonogram ogrzewania dla każdego pokoju z osobna."
# image: /assets/blog/grzejnik-wylacza-sie-przy-otwartym-oknie/glowne.webp
# image_alt: "Grzejnik z inteligentną głowicą Shelly pod uchylonym oknem z czujnikiem otwarcia"
cta_tytul: "Chcesz takie ogrzewanie u siebie? Zamontuję je"
cta_tekst: "Montuję inteligentne głowice i czujniki okien, ustawiam harmonogramy dla każdego pokoju i Home Assistant. Zostaw numer — oddzwonię i powiem, ile to będzie kosztować."
---

Klasyka sezonu grzewczego: otwierasz okno, żeby przewietrzyć pokój, a termostat na grzejniku „czuje” zimne powietrze i odkręca grzanie na maksimum. Ciepło ucieka przez okno, a Ty za nie płacisz.

[DO UZUPEŁNIENIA: konkretna sytuacja — czyje mieszkanie/dom, ile grzejników, jakie ogrzewanie (gaz, miejskie, pompa ciepła), co przeszkadzało: wietrzenie, grzanie pustego mieszkania w ciągu dnia, zimna łazienka rano?]

Rozwiązanie składa się z dwóch elementów: inteligentnej głowicy termostatycznej zamiast zwykłej i małego czujnika na oknie. Gdy okno się otwiera, grzejnik przestaje grzać. Gdy się zamyka — wraca do ustawionej temperatury. Przy okazji każdy pokój dostaje własny harmonogram: cieplej, gdy jesteś w domu, chłodniej w nocy i gdy wychodzisz.

<!-- ZDJĘCIE 1: grzejnik z głowicą Shelly BLU TRV pod oknem z czujnikiem otwarcia -->

## W skrócie

- **Głowica Shelly BLU TRV** zastępuje zwykłe pokrętło termostatyczne na grzejniku — bez spuszczania wody i bez hydraulika.
- **Czujnik okna** daje znać, że okno jest otwarte. Grzejnik przestaje grzać, a po zamknięciu okna wraca do zadanej temperatury.
- **Harmonogram** dla każdego pokoju osobno: np. 21 °C rano i wieczorem, 18 °C w nocy i w ciągu dnia, gdy nikogo nie ma.
- **Home Assistant** łączy głowice, czujniki okien i harmonogramy w jedno miejsce.

{% include zacheta.html miejsce="po-skrocie" tytul="Mieszkasz we Wrocławiu lub okolicach?" tekst="Zamontuję głowice i czujniki okien, ustawię harmonogramy dla każdego pokoju i pokażę, jak zmieniać temperaturę z telefonu." przycisk="Chcę takie ogrzewanie" %}

![Schemat: czujnik okna i głowica Shelly BLU TRV łączą się przez Bluetooth z bramką BLU Gateway Gen3, a Home Assistant przy oknie otwartym dłużej niż minutę obniża temperaturę i przywraca ją po zamknięciu](/assets/blog/grzejnik-wylacza-sie-przy-otwartym-oknie/schemat-systemu.webp){: width="1200" height="640" loading="lazy"}

## Sprzęt

Podstawą jest głowica termostatyczna. Sprzedawana jest też w zestawie z bramką, która łączy głowice z siecią Wi-Fi:

{% include produkt.html id="shelly-blu-trv-gateway" opis="Głowica wkręcana w miejsce zwykłego pokrętła termostatycznego plus bramka BLU Gateway Gen3 zasilana z USB. Głowica działa na 2 baterie AA — według producenta do 2 lat. Do jednej bramki można podłączyć do 5 głowic." %}

Na okno — mały czujnik otwarcia na baterię, przyklejany do ramy i skrzydła:

{% include produkt.html id="shelly-blu-door-window-mini-zb" opis="Miniaturowy czujnik otwarcia okna na Bluetooth i Zigbee. Głowice BLU TRV współpracują z czujnikami okien z serii Shelly BLU ZB." %}

[DO UZUPEŁNIENIA: ile głowic i czujników zamontowałeś w tej realizacji, ile bramek, czy były czujniki temperatury w pokojach (np. Shelly BLU H&T ZB).]

## Czy głowica pasuje do Twojego grzejnika?

To pierwsza rzecz do sprawdzenia przed zakupem. Shelly BLU TRV ma gwint **M30 × 1,5** — najpopularniejszy w grzejnikach z zaworem termostatycznym. W zestawie są też adaptery do zaworów **Danfoss (RA, RAV, RAVL), Caleffi, Giacomini i M28 × 1,5**. Do innych zaworów (np. Oventrop) można dokupić adapter innej firmy.

![Zgodność Shelly BLU TRV: bezpośrednio gwint M30 x 1,5; adaptery w zestawie do Danfoss RA, RAV, RAVL, Caleffi, Giacomini i M28 x 1,5; do innych zaworów, np. Oventrop, adapter innej firmy](/assets/blog/grzejnik-wylacza-sie-przy-otwartym-oknie/zgodnosc-zaworow.webp){: width="1200" height="600" loading="lazy"}

Jak to sprawdzić: odkręć obecne pokrętło termostatyczne i zobacz, co jest pod spodem — producent i oznaczenie często są wybite na korpusie zaworu. Jeśli masz wątpliwości, zrób zdjęcie i porównaj z listą zgodności w instrukcji głowicy.

[DO UZUPEŁNIENIA: jakie zawory były w tej realizacji i czy któryś wymagał adaptera.]

<!-- ZDJĘCIE 2: zawór grzejnika po zdjęciu starej głowicy, z widocznym gwintem / adapterem -->

## Montaż krok po kroku

Montaż głowicy **nie wymaga spuszczania wody z instalacji** — wymieniasz tylko pokrętło, a zawór zostaje na miejscu.

**1. Zdejmij starą głowicę.** Ustaw ją na maksimum (wtedy najłatwiej schodzi) i odkręć nakrętkę mocującą.

**2. Załóż adapter, jeśli jest potrzebny.** Przy zaworze M30 × 1,5 głowicę wkręcasz bezpośrednio.

**3. Włóż baterie i przykręć głowicę.** Głowica sama się kalibruje po zamontowaniu — przesuwa trzpień zaworu, żeby poznać jego zakres. Kalibracja nie uda się przy słabych bateriach, więc używaj nowych.

**4. Dodaj głowicę do aplikacji i do bramki.** Bramkę podłącz do zasilacza USB w miejscu, z którego „sięga” do głowic — zasięg Bluetooth w pomieszczeniu to według producenta do ok. 10 m, a ściany go skracają.

**5. Przyklej czujnik na okno.** Większa część na ramie, magnes na skrzydle — tak, żeby przy zamkniętym oknie były blisko siebie.

[DO UZUPEŁNIENIA: co było trudne — np. zasięg bramki przez ściany, ciasno przy zaworze, zapieczona stara głowica.]

<!-- ZDJĘCIE 3: czujnik otwarcia przyklejony do okna -->

## Wyłączanie grzania przy otwartym oknie

Producent podaje, że głowice BLU TRV współpracują z czujnikami okien z serii Shelly BLU ZB — sposób ich powiązania znajdziesz w instrukcji głowicy.

Pełną kontrolę daje reguła w Home Assistant: łatwo w niej dodać opóźnienie i przywracanie poprzedniej temperatury. [DO UZUPEŁNIENIA: potwierdź, że w tej realizacji reguła była w Home Assistant — wtedy zmienię na „U mnie…”.] Logika jest taka:

1. Okno jest otwarte **dłużej niż minutę** (żeby krótkie uchylenie nie przestawiało ogrzewania).
2. Home Assistant zapamiętuje aktualne ustawienie głowicy i obniża temperaturę do minimum.
3. Gdy okno się zamknie, przywraca zapamiętane ustawienie.

```yaml
- alias: "Salon – okno otwarte, nie grzej"
  triggers:
    - trigger: state
      entity_id: binary_sensor.okno_salon
      to: "on"
      for: "00:01:00"
  actions:
    - action: scene.create
      data:
        scene_id: glowica_salon_przed_wietrzeniem
        snapshot_entities:
          - climate.glowica_salon
    - action: climate.set_temperature
      target:
        entity_id: climate.glowica_salon
      data:
        temperature: 5

- alias: "Salon – okno zamknięte, wracamy do grzania"
  triggers:
    - trigger: state
      entity_id: binary_sensor.okno_salon
      to: "off"
  actions:
    - action: scene.turn_on
      target:
        entity_id: scene.glowica_salon_przed_wietrzeniem
```

Nazwy `binary_sensor.okno_salon` i `climate.glowica_salon` zmień na swoje. Temperatura 5 °C to przykład „prawie wyłączonego” grzania — sprawdź, jakie minimum przyjmuje Twoja głowica.

<!-- ZDJĘCIE 4: zrzut ekranu Home Assistant — karta termostatu i stan okna -->

## Harmonogram dla każdego pokoju

Wyłączanie przy wietrzeniu to jedno, ale w praktyce równie ważny jest harmonogram. Typowy przykład:

- **sypialnia** — chłodniej w nocy, cieplej na pół godziny przed pobudką,
- **salon** — cieplej rano i wieczorem, chłodniej w ciągu dnia, gdy wszyscy są w pracy,
- **łazienka** — cieplej rano przed prysznicem.

[DO UZUPEŁNIENIA: jakie harmonogramy i temperatury ustawiliście w tej realizacji.]

{% include zacheta.html miejsce="po-konfiguracji" tytul="Nie chcesz ustawiać tego sam?" tekst="Zamontuję głowice i czujniki, ustawię harmonogramy dla każdego pokoju i wyłączanie grzania przy wietrzeniu. Montaż zwykle zajmuje jeden dzień." %}

## Ile to kosztuje

[DO UZUPEŁNIENIA: liczba grzejników i okien, koszt sprzętu (ile zapłaciłeś), czas montażu.]

Inteligentne głowice z czujnikami są w pakiecie Komfort — zobacz [cennik](/#cennik).

## Efekt po kilku tygodniach

[DO UZUPEŁNIENIA: co się zmieniło — komfort, rachunki (tylko jeśli są realne dane, bez szacunków „z sufitu”), czy domownicy zauważyli różnicę, czy coś nie działało.]

## Najczęstsze pytania

**Czy do montażu głowicy trzeba spuszczać wodę z grzejnika?**
Nie. Wymieniasz tylko pokrętło termostatyczne, a zawór grzejnika zostaje na miejscu. Instalacja grzewcza pozostaje szczelna.

**Czy Shelly BLU TRV pasuje do mojego grzejnika?**
Głowica ma gwint M30 × 1,5, a w zestawie są adaptery do zaworów Danfoss (RA, RAV, RAVL), Caleffi, Giacomini i M28 × 1,5. Do innych zaworów potrzebny jest dodatkowy adapter.

**Na ile wystarczą baterie w głowicy?**
Głowica działa na 2 baterie AA, które według producenta wystarczają do 2 lat. Poziom baterii widać w aplikacji.

**Czy głowice działają bez internetu?**
Bramka BLU Gateway Gen3 pozwala sterować głowicami lokalnie, w sieci domowej. Internet jest potrzebny tylko do sterowania spoza domu przez chmurę Shelly.
