---
published: true
layout: post
title: "Czujnik ruchu dla seniora: alert, gdy rano brak ruchu"
location: "Wrocław, Olimpia Port"
description: "Czujnik ruchu dla seniora: powiadomienie na telefon, gdy mama rano się nie poruszy. Shelly BLU i aplikacja Shelly — bez kamer i bez abonamentu."
excerpt: "Rodzina martwiła się o mamę w podeszłym wieku. Teraz, jeśli rano do 10:00 nie było w mieszkaniu ruchu, dzieci dostają powiadomienie na telefon. Bez kamer, montaż w godzinę."
image: /assets/blog/czujnik-ruchu-dla-seniora-alert-brak-ruchu/glowne.webp
image_alt: "Czujnik ruchu Shelly BLU Motion na ścianie, obok telefon z powiadomieniem z aplikacji Shelly"
cta_tytul: "Chcesz takiego spokoju o rodziców? Zamontuję to"
cta_tekst: "Montuję czujniki w mieszkaniu rodziców i konfiguruję powiadomienia na Twoim telefonie i telefonach rodzeństwa. Zostaw numer — oddzwonię i doradzę, od czego zacząć."
---

Dzwonisz do mamy codziennie rano, „żeby tylko sprawdzić”? A gdy nie odbiera, od razu robi się nerwowo — może jest w łazience, może wyszła po bułki, a może coś się stało.

Z taką sytuacją zgłosiła się do mnie rodzina z Wrocławia, która martwiła się o swoją mamę ze względu na jej podeszły wiek. Mama mieszka na osiedlu Olimpia Port. Dzieci chciały po prostu wiedzieć, że rano wszystko jest w porządku — bez kamer i bez dzwonienia co rano.

Zamontowałem czujnik ruchu w przedpokoju i ustawiłem jedną regułę: jeśli rano do 10:00 nikt się w mieszkaniu nie poruszył, na telefony dzieci przychodzi powiadomienie. Do tego czujnik zalania w kuchni i czujniki otwarcia drzwi wejściowych i balkonowych. Regułę liczy mały skrypt na module Shelly, a powiadomienia wysyła aplikacja Shelly — **Home Assistant nie był potrzebny**.

![Czujnik ruchu Shelly BLU Motion przyklejony do ściany w przedpokoju — mała, biała kostka, która nie rzuca się w oczy](/assets/blog/czujnik-ruchu-dla-seniora-alert-brak-ruchu/czujnik-na-scianie.webp){: width="1200" height="900" loading="lazy"}

## W skrócie

- **Czujnik ruchu Shelly BLU Motion** wisi w przedpokoju — mama przechodzi tamtędy każdego ranka.
- **Między 6:00 a 10:00** system czeka na pierwszy ruch.
- **Jeśli do 10:00 ruchu nie było**, dzieci dostają powiadomienie na telefon i mogą od razu zadzwonić.
- Do tego **czujnik zalania w kuchni** i **czujniki otwarcia drzwi** wejściowych i balkonowych.
- Regułę liczy **skrypt na module Shelly 1PM Mini Gen4**, a powiadomienia wysyła **aplikacja Shelly** — bez Home Assistant, bez kamer i bez abonamentu.
- **Montaż: ok. 1 godziny.**

{% include zacheta.html miejsce="po-skrocie" tytul="Rodzice mieszkają we Wrocławiu lub okolicach?" tekst="Zamontuję czujniki, skonfiguruję powiadomienia na telefonach całej rodziny i wytłumaczę wszystko rodzicom. Bez kamer i bez abonamentu." przycisk="Chcę taki alert" %}

![Schemat: czujnik ruchu i dwa czujniki drzwi łączą się przez Bluetooth z modułem Shelly 1PM Mini Gen4, na którym skrypt między 6:00 a 10:00 czeka na ruch i przy jego braku włącza przełącznik; scena w aplikacji Shelly wysyła wtedy powiadomienie na telefony dzieci; czujnik zalania Flood S Gen4 łączy się przez Wi-Fi](/assets/blog/czujnik-ruchu-dla-seniora-alert-brak-ruchu/schemat-systemu.webp){: width="1200" height="640" loading="lazy"}

## Sprzęt, który zamontowałem

Najważniejszy jest czujnik ruchu. Działa na baterii, bez żadnych przewodów — przykleja się go albo przykręca do ściany:

{% include produkt.html id="shelly-blu-motion" opis="Czujnik ruchu na Bluetooth z czujnikiem natężenia światła. Zasilany jedną baterią CR2477 — według producenta wystarcza do 5 lat. Zasięg w pomieszczeniu do ok. 10 m." %}

Na drzwiach wejściowych i balkonowych — dwa czujniki otwarcia:

{% include produkt.html id="shelly-blu-door-window" opis="Czujnik otwarcia drzwi i okien na Bluetooth, na baterii CR2032. W tej instalacji: jeden na drzwiach wejściowych, drugi na balkonowych." %}

W kuchni — czujnik zalania:

{% include produkt.html id="shelly-flood-s-gen4" opis="Płaski czujnik zalania kładziony na podłodze, ze stalowymi stykami i brzęczykiem. Wi-Fi, bateria CR123A na ok. 2 lata (wg producenta), obudowa IP67. Alarmuje na miejscu i wysyła powiadomienie na telefon." %}

Czujniki BLU wysyłają sygnał przez Bluetooth, więc w ich zasięgu musi być urządzenie, które przekaże go do sieci Wi-Fi. W tej instalacji robi to mały moduł Shelly — i to na nim działa skrypt z regułą „brak ruchu rano”:

{% include produkt.html id="shelly-1pm-mini-gen4" opis="Mini moduł z Wi-Fi i Bluetooth. Tutaj pracuje jako odbiornik sygnałów z czujników BLU i to na nim działa skrypt alertu braku ruchu. Wymaga zasilania 230 V (L i N)." %}

**Warunek konieczny: w mieszkaniu musi być internet z Wi-Fi.** Zwykły router wystarczy — ale bez niego powiadomienia nie dotrą na telefony rodziny, bo wysyła je aplikacja Shelly przez chmurę Shelly. Jeśli rodzice nie mają internetu, wystarczy prosty router z kartą SIM albo internet od dowolnego dostawcy. Mama nie potrzebuje za to smartfona: aplikację i powiadomienia mają dzieci.

## Gdzie powiesić czujnik ruchu

To najważniejsza decyzja w całym montażu. Czujnik musi „widzieć” miejsce, przez które rodzic **na pewno** przechodzi rano. W tym mieszkaniu czujnik zawisł w **przedpokoju**. To centralne miejsce małego, 45-metrowego mieszkania — mama zawsze rano przez nie przechodzi.

Ogólne zasady:

- **przedpokój albo kuchnia** — miejsca, przez które przechodzi się każdego ranka,
- **nie sypialnia** — czujnik wykryje przewracanie się na łóżku i alert straci sens,
- **uwaga na zwierzęta** — pies czy kot w polu widzenia czujnika „zrobią” ruch za domownika. W tym mieszkaniu zwierząt nie ma, więc problem nie wystąpił.

![Czujnik ruchu nad framugą drzwi w przedpokoju — z tej wysokości obejmuje całe przejście](/assets/blog/czujnik-ruchu-dla-seniora-alert-brak-ruchu/czujnik-nad-drzwiami.webp){: width="1200" height="900" loading="lazy"}

## Jak działa reguła „brak ruchu rano”

Czujnik sam z siebie wysyła tylko informację „jest ruch” albo „nie ma ruchu”. Logika — od której godziny czekamy i kiedy podnosimy alarm — działa w krótkim skrypcie na module Shelly 1PM Mini Gen4. Powiadomienie wysyła scena w aplikacji Shelly:

1. **Od 6:00** system czeka na pierwszy ruch w przedpokoju.
2. **Jeśli ruch się pojawi** — nic się nie dzieje, żadnych wiadomości.
3. **Jeśli do 10:00 ruchu nie było** — na telefony dzieci przychodzi powiadomienie, że warto zadzwonić.

Skrypt zapamiętuje godzinę ostatniego ruchu także po zaniku prądu. Gdy alarm jest aktywny, włącza w module przełącznik wirtualny „Brak ruchu rano” — a scena w aplikacji Shelly, która go obserwuje, wysyła powiadomienie. Gdy ruch pojawi się później, skrypt sam wyłącza przełącznik.

Rodzina dostaje powiadomienia, bo urządzenie jest **udostępnione w aplikacji Shelly** każdej osobie z osobna. Na czas wyjazdu mamy alert wstrzymuje się, **wyłączając scenę** w aplikacji.

Nie potrzeba do tego ani Home Assistant, ani żadnego serwera w domu.

![Scena „Brak ruchu” w aplikacji Shelly: gdy przełącznik wirtualny „Brak ruchu rano” zmieni się na włączony, aplikacja wysyła powiadomienie na telefon o treści „Brak ruchu rano”](/assets/blog/czujnik-ruchu-dla-seniora-alert-brak-ruchu/scena-brak-ruchu.webp){: width="570" height="480" loading="lazy"}

![Oś czasu poranka: od 6:00 system czeka na ruch; w zwykły dzień ruch rano i brak wiadomości; gdy do 10:00 nie było ruchu, na telefony dzieci przychodzi alert](/assets/blog/czujnik-ruchu-dla-seniora-alert-brak-ruchu/os-poranka.webp){: width="1200" height="600" loading="lazy"}

## Skrypt krok po kroku

Jeśli chcesz zrobić to sam, poniżej jest skrypt, którego używam w tej instalacji — z kontrolą ustawioną na 10:00.

<p><a href="/assets/blog/czujnik-ruchu-dla-seniora-alert-brak-ruchu/senior-brak-ruchu.js" download class="btn btn-ghost">Pobierz skrypt senior-brak-ruchu.js</a></p>

Na początku skryptu jest blok ustawień — tylko tu trzeba coś zmieniać:

```javascript
let CONFIG = {
  BLU_MAC: "",              // MAC czujnika BLU Motion, małe litery, np. "7c:c6:b6:aa:bb:cc".
                            // Puste = skrypt wypisuje w konsoli wszystkie czujniki BLU w zasięgu.
  WINDOW_START: "06:00",    // od której godziny liczymy poranny ruch
  CHECK_TIME: "10:00",      // o której sprawdzamy (format GG:MM)
  NAME: "Mama",             // nazwa w treści powiadomienia
  VIRTUAL_NAME: "Brak ruchu rano", // nazwa przełącznika wirtualnego — skrypt sam go utworzy,
                                   // jeśli jeszcze nie istnieje (ON = alert, OFF = wszystko OK)
  NTFY_TOPIC: "",           // opcjonalnie: temat w aplikacji ntfy — puste = nie wysyłaj
  DEBUG: true               // wypisuj komunikaty w konsoli skryptu
};
```

**1. Przygotuj czujnik.** W ustawieniach Shelly BLU Motion **wyłącz szyfrowanie** — skrypt odczytuje tylko niezaszyfrowane dane (jeśli szyfrowanie jest włączone, wypisze o tym komunikat w konsoli).

**2. Wgraj skrypt.** Otwórz w przeglądarce interfejs modułu Shelly 1PM Mini Gen4 (jego adres IP w sieci domowej), przejdź do sekcji skryptów, utwórz nowy skrypt, wklej zawartość pliku, zapisz i uruchom.

**3. Znajdź adres MAC czujnika.** Przy pustym `BLU_MAC` skrypt wypisuje w konsoli wszystkie czujniki BLU w zasięgu. Poruszaj ręką przed czujnikiem, skopiuj jego adres MAC (małymi literami) do `BLU_MAC`, zapisz i uruchom skrypt ponownie.

**4. Włącz uruchamianie przy starcie** („Run on startup”), żeby skrypt działał także po zaniku prądu. Sprawdź też, czy moduł ma ustawioną właściwą strefę czasową — skrypt porównuje godzinę z zegara modułu (bez synchronizacji czasu wypisze „BRAK SYNCHRONIZACJI”).

**5. Przełącznik wirtualny.** Skrypt sam tworzy w module przełącznik „Brak ruchu rano” (ON = alert). Żeby był widoczny w warunkach scen w aplikacji Shelly, dodaj go do grupy komponentów wirtualnych i wyeksportuj tę grupę jako urządzenie.

**6. Scena w aplikacji Shelly:** gdy „Brak ruchu rano” zmieni się na włączony — wyślij powiadomienie.

**7. Udostępnij urządzenie** w aplikacji Shelly osobom, które mają dostawać powiadomienia (np. rodzeństwu).

Opcjonalnie skrypt może też wysyłać wiadomości przez darmową aplikację ntfy — wystarczy wpisać nazwę tematu w `NTFY_TOPIC`. W tej instalacji nie było to potrzebne: wystarczyły powiadomienia z aplikacji Shelly.

## Jak dobrać godziny — czego się nauczyłem

Godziny to jedyna rzecz, którą naprawdę trzeba przemyśleć. Za wczesna kontrola — i fałszywe alarmy. Za późna — i alert traci sens.

Na początku ustawiłem okno **6:00–9:00**. Po jakimś czasie przeanalizowaliśmy, o której mama faktycznie wstaje — i **po konsultacji z rodziną przesunąłem kontrolę na 10:00**, bo zdarzało się, że mama po prostu dłużej spała. Zmianę zrobiłem zdalnie, bez wizyty w mieszkaniu.

Dobra zasada: **godzina kontroli to najpóźniejsza godzina, o której rodzic zwykle już jest na nogach, plus zapas**. I warto ją zweryfikować po pewnym czasie razem z rodziną.

## Zdalna pomoc po montażu

To, że ustawienia można zmieniać zdalnie, okazało się w tej instalacji bardzo ważne. Rytm dnia rodziców poznaje się dopiero po jakimś czasie, a potrzeby rodziny się zmieniają. Po ustaleniu z rodziną tymczasowego zdalnego dostępu mogę:

- **przesunąć godziny** alertu — jak tutaj, z 9:00 na 10:00,
- **dodać kolejną osobę** do powiadomień, np. rodzeństwo,
- **dodać lub zmienić reguły** — np. dla czujników drzwi czy zalania.

Bez przyjazdu i bez angażowania rodziców.

{% include zacheta.html miejsce="po-konfiguracji" tytul="Nie chcesz konfigurować tego sam?" tekst="Zrobię to za Ciebie: dobiorę czujniki, zamontuję je w godzinę, ustawię powiadomienia na telefonach całej rodziny — a gdy trzeba coś zmienić, pomogę zdalnie." %}

## Rozmowa z rodzicami

To bywa trudniejsze niż sam montaż. W tej rodzinie rodzice zrozumieli, że **dzieci po prostu się o nich martwią**. A przekonały ich dwie rzeczy:

- **nikt ich nie podgląda** — czujnik ruchu nie ma kamery ani mikrofonu, wysyła tylko informację „ktoś się poruszył”,
- **nowe urządzenia praktycznie nie rzucają się w oczy** — są małe i działają bez kabli.

W domu nic się nie zmienia: żadnych nowych przycisków ani aplikacji do obsługi.

## Ile to trwało i ile kosztuje

**Montaż zajął ok. 1 godziny.** Konfigurację — reguły i powiadomienia — zrobiłem później u siebie, po ustaleniu z rodziną tymczasowego zdalnego dostępu. Dzięki temu nie trzeba było siedzieć u mamy, aż wszystko zostanie ustawione.

Sprzęt z tej instalacji:

| Urządzenie | Ilość | Cena | Razem |
|---|---|---|---|
| Shelly BLU Motion (czujnik ruchu) | 1 | 95 zł | 95 zł |
| Shelly BLU Door/Window (czujnik otwarcia) | 2 | 77 zł | 154 zł |
| Shelly Flood S Gen4 (czujnik zalania) | 1 | 86 zł | 86 zł |
| Shelly 1PM Mini Gen4 (odbiornik + skrypt) | 1 | 100 zł | 100 zł |
| **Razem** | | | **ok. 435 zł** |

Ceny ze sklepu producenta (shelly.com) z października 2026 — w innych sklepach mogą się różnić. Bez abonamentu: po montażu nie ma żadnych opłat miesięcznych.

Jeśli wolisz rozwiązanie z montażem, zobacz pakiet [Bezpieczny Senior](/senior/) — obok alertu braku ruchu są w nim czujniki zalania, czujka dymu i czujnik drzwi wejściowych.

## Efekt po dwóch miesiącach

Wiadomość przychodzi tylko wtedy, gdy rano nie było ruchu. Po przesunięciu kontroli na 10:00 — uzgodnionym z rodziną i zrobionym zdalnie — alert nie budzi już niepokoju, gdy mama po prostu dłużej śpi.

System działa od **dwóch miesięcy**. Do tej pory przydał się raz — i to nie czujnik ruchu, tylko czujnik drzwi. Późnym wieczorem rodzina dostała powiadomienie, że **drzwi balkonowe są otwarte**. Okazało się, że mama po prostu zapomniała ich zamknąć przed snem.

To dobrze pokazuje, po co obok czujnika ruchu są czujniki drzwi: drobne sytuacje, o których nikt by się nie dowiedział, a które w nocy mogą mieć znaczenie.

## Najczęstsze pytania

**Czy do alertu braku ruchu potrzebny jest Home Assistant?**
Nie. W tej instalacji regułę liczy krótki skrypt na module Shelly 1PM Mini Gen4, a powiadomienia wysyła scena w aplikacji Shelly. Home Assistant nie był potrzebny.

**Czy rodzice muszą mieć smartfon?**
Nie. Smartfon z aplikacją mają osoby, które dostają powiadomienia. W mieszkaniu rodziców potrzebny jest tylko domowy internet (router Wi-Fi).

**Czy do powiadomień potrzebny jest internet?**
Tak. W mieszkaniu musi działać internet z Wi-Fi — powiadomienia wysyła aplikacja Shelly przez chmurę. Gdy internet przestanie działać, powiadomienia nie dotrą (brzęczyk czujnika zalania alarmuje na miejscu niezależnie od internetu). Jeśli w mieszkaniu nie ma internetu, wystarczy router z kartą SIM albo internet od dowolnego dostawcy.

**Czy czujnik ruchu nagrywa obraz?**
Nie. Czujnik ruchu nie ma kamery ani mikrofonu — wysyła tylko informację, że w jego polu widzenia ktoś się poruszył, oraz poziom oświetlenia.

**Co, jeśli mama dłużej pośpi?**
Dlatego godzinę kontroli warto ustawić z zapasem. W tej instalacji po konsultacji z rodziną przesunąłem ją zdalnie z 9:00 na 10:00, bo mama czasem dłużej spała.

**Czy po montażu można zmienić ustawienia?**
Tak. Po ustaleniu z rodziną tymczasowego zdalnego dostępu zmieniam godziny, osoby dostające powiadomienia i reguły bez przyjazdu do mieszkania.

**Jak często trzeba wymieniać baterię w czujniku?**
Według producenta bateria CR2477 w Shelly BLU Motion wystarcza do 5 lat. Poziom baterii widać w aplikacji, więc wymianę można zaplanować z wyprzedzeniem.
