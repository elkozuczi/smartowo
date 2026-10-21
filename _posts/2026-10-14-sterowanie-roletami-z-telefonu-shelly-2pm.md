---
published: false
layout: post
title: "Sterowanie roletami z telefonu bez kucia — Shelly 2PM"
description: "Jak zautomatyzowałem rolety Shelly 2PM: otwieranie o wschodzie, zamykanie o zachodzie słońca, jeden przycisk do wszystkich rolet i integracja z Home Assistant."
excerpt: "Rolety, które same otwierają się o wschodzie i zamykają o zachodzie słońca, jeden przycisk do zamknięcia wszystkich naraz i sterowanie z telefonu — bez kucia ścian i bez wymiany łączników."
# image: /assets/blog/sterowanie-roletami-z-telefonu-shelly-2pm/glowne.webp
# image_alt: "Okno z roletą zamykającą się o zachodzie słońca, w dłoni telefon z aplikacją Shelly"
cta_tytul: "Chcesz takie rolety u siebie? Zrobię to za Ciebie"
cta_tekst: "Montuję Shelly 2PM w istniejących puszkach, konfiguruję harmonogramy, przyciski i Home Assistant. Zostaw numer — oddzwonię i powiem, ile to będzie kosztować w Twoim domu."
---

Znasz ten poranny rytuał? Chodzisz od okna do okna i trzymasz przycisk, aż roleta dojedzie do góry. Wieczorem to samo w drugą stronę. A gdy wyjeżdżasz na kilka dni, rolety albo są cały czas zamknięte, albo cały czas otwarte — i z ulicy od razu widać, że nikogo nie ma.

U mnie w domu rolety robią to same. Te od strony ulicy rano otwierają się o wschodzie słońca, a wieczorem zamykają o zachodzie. Gdy chcę zamknąć wszystkie naraz — naciskam jeden bezprzewodowy przycisk. A z telefonu steruję nimi z dowolnego miejsca. Wszystko to [bez kucia ścian](/#uslugi), bez wymiany łączników i bez nowych przewodów.

<!-- ZDJĘCIE 1: dom / okna z roletami w połowie zamknięte o zachodzie słońca -->

W tym wpisie pokazuję, jak to zrobiłem, jakiego sprzętu użyłem i jak go skonfigurować — krok po kroku.

## W skrócie

- **Każda roleta** dostała moduł Shelly 2PM schowany w puszce za istniejącym łącznikiem. Łącznik działa dalej tak jak wcześniej.
- **Harmonogramy** otwierają rolety od strony ulicy o wschodzie i zamykają je o zachodzie słońca — godziny same przesuwają się z porami roku.
- **Automatyzacja „upał”** zamyka rolety, gdy na zewnątrz jest gorąco i mocno świeci słońce.
- **Przycisk Shelly BLU RC Button 4** w przedpokoju otwiera lub zamyka wszystkie rolety jednocześnie.
- **Home Assistant** wykrywa wszystkie moduły automatycznie i steruje nimi lokalnie, bez chmury — u mnie to w nim są zdefiniowane wszystkie automatyzacje rolet.
- **Aplikacja Shelly** to druga droga sterowania każdą roletą z telefonu.

![Schemat: łącznik roletowy (przewodowo) i przycisk Shelly BLU RC Button 4 (Bluetooth) sterują modułem Shelly 2PM Gen4, który zasila silnik rolety; Home Assistant i telefon łączą się z modułem przez Wi-Fi](/assets/blog/sterowanie-roletami-z-telefonu-shelly-2pm/schemat-systemu.webp){: width="1200" height="680" loading="lazy"}

{% include zacheta.html miejsce="po-skrocie" tytul="Mieszkasz we Wrocławiu lub okolicach?" tekst="Jeśli wolisz nie grzebać w puszkach pod napięciem — zamontuję i skonfiguruję to wszystko za Ciebie: moduły, przycisk, harmonogramy i Home Assistant." przycisk="Chcę takie rolety" %}

## Sprzęt, którego użyłem

Sercem całego systemu jest moduł do sterowania roletami. Montuje się go w puszce elektrycznej, za łącznikiem, którym dotąd sterowałeś roletą. Przez dwa lata używałem Shelly 2PM drugiej generacji, a teraz mam w domu najnowszą, czwartą:

{% include produkt.html id="shelly-2pm-gen4" opis="Jeden moduł na jedną roletę. Mieści się w puszce za łącznikiem, mierzy pobór prądu silnika, dzięki czemu zna dokładną pozycję rolety." %}

Jeśli nie potrzebujesz Zigbee ani Matter, sprawdzi się też tańszy {% include link.html id="shelly-2pm-gen3" %} — w trybie rolety działa tak samo.

Do sterowania wszystkimi roletami jednocześnie używam bezprzewodowego przycisku:

{% include produkt.html id="shelly-blu-rc-button-4-zb" opis="Na baterię (do 2 lat pracy), bez kabli. Cztery przyciski, każdy z wielokrotnym kliknięciem — do 16 akcji. Trzyma się na magnetycznym uchwycie na puszce lub ścianie, a w razie potrzeby można go zdjąć i używać jak pilota." %}

## Jak działa Shelly 2PM w trybie rolety

Shelly 2PM ma dwa wyjścia: jedno podaje napięcie na kierunek „w górę”, drugie na „w dół”. W trybie rolety moduł pilnuje, żeby nigdy nie były włączone oba naraz — tak samo jak zwykły łącznik roletowy.

Do wejść modułu podłącza się istniejący łącznik. Dzięki temu domownicy nie muszą niczego się uczyć — roletę dalej otwiera się przyciskiem na ścianie. Telefon, harmonogramy i automatyzacje to dodatkowe możliwości, a nie zamiennik.

Najważniejsza zaleta 2PM to **pomiar mocy**. Moduł „czuje”, kiedy silnik dojechał do krańcówki, więc po kalibracji zna czas przejazdu rolety i jej aktualne położenie. Możesz ustawić roletę na 30% albo 70%, a nie tylko „góra” albo „dół”. Moduł potrafi też zatrzymać roletę, gdy wykryje nagły wzrost poboru prądu — np. gdy coś zablokuje jej ruch.

## Montaż krok po kroku

> **Uwaga:** montaż wymaga pracy przy instalacji 230 V. Jeśli nie masz uprawnień elektrycznych, zleć go elektrykowi — albo [napisz do mnie](#kontakt), zrobię to za Ciebie.

<!-- ZDJĘCIE 2: Shelly 2PM w dłoni, widać zaciski i opisy -->

**1. Wyłącz zasilanie.** Wyłącz bezpiecznik obwodu rolet i sprawdź próbnikiem, że w puszce nie ma napięcia.

**2. Sprawdź puszkę.** Wykręć łącznik i zobacz, co jest w środku. Potrzebujesz przewodu fazowego (L), neutralnego (N) i dwóch przewodów do silnika rolety (góra/dół). Shelly 2PM **wymaga przewodu neutralnego**. Zmierz też głębokość puszki: **jeśli ma co najmniej 6 cm, moduł zmieści się razem ze standardowym łącznikiem roletowym.** W płytszych puszkach zamiast zwykłego łącznika stosuję płaski przełącznik Shelly — moduł montuje się w jego uchwycie i wszystko się mieści:

![Przekrój puszki podtynkowej: w puszce o głębokości co najmniej 6 cm moduł Shelly 2PM Gen4 mieści się za standardowym łącznikiem, w płytszej montuje się go w uchwycie płaskiego przełącznika Shelly](/assets/blog/sterowanie-roletami-z-telefonu-shelly-2pm/puszka-glebokosc.webp){: width="1200" height="660" loading="lazy"}

{% include produkt.html id="shelly-wall-switch-2" opis="Płaski łącznik z dwoma przyciskami (góra/dół) do płytkich puszek. Moduł Shelly montuje się w jego uchwycie. Ramkę kupuje się osobno." %}

Do przełącznika potrzebna jest ramka — ja używam {% include link.html id="shelly-wall-frame-1" tekst="pojedynczej ramki Shelly Wall Frame 1" %}.

<!-- ZDJĘCIE 3: otwarta puszka z podłączonym modułem, przed wsunięciem łącznika (zasilanie wyłączone!) -->

**3. Podłącz moduł.** Moduł ma dwa zaciski L — oba podłączasz do fazy, a zacisk N do przewodu neutralnego. Wspólny przewód silnika rolety też łączysz z N, a przewody kierunków (góra/dół) z wyjściami O1 i O2. Łącznik roletowy podłączasz do wejść S1 i S2, a jego wspólny zacisk zasilasz z fazy. Przewód ochronny PE silnika łączysz z PE instalacji — nie z modułem. Zawsze sprawdź schemat w instrukcji modułu i opis przewodów silnika.

![Schemat podłączenia Shelly 2PM Gen4 w trybie rolety: zaciski O1, L, L, O2, S1, S2, N; oba L do fazy, N i wspólny przewód silnika do neutralnego, kierunki silnika do O1 i O2, łącznik roletowy między fazą a S1 i S2](/assets/blog/sterowanie-roletami-z-telefonu-shelly-2pm/schemat-podlaczenia.webp){: width="1200" height="720" loading="lazy"}

**4. Włącz zasilanie i dodaj moduł do aplikacji.** W aplikacji Shelly dodajesz nowe urządzenie — telefon znajdzie je przez Bluetooth lub Wi-Fi. Następnie przełączasz profil urządzenia na **„Roleta”** (Cover) i wybierasz typ łącznika, który masz na ścianie.

**5. Skalibruj roletę.** Uruchamiasz kalibrację w aplikacji — roleta sama przejedzie w górę i w dół, a moduł zapamięta czas przejazdu. Od tej chwili widzisz położenie rolety w procentach.

<!-- ZDJĘCIE 4: zrzut ekranu z aplikacji Shelly — kalibracja lub suwak pozycji rolety -->

**6. Złóż wszystko z powrotem.** Wsuwasz moduł do puszki, przykręcasz łącznik. Z zewnątrz nie widać żadnej różnicy.

{% include zacheta.html miejsce="po-montazu" tytul="Nie chcesz robić tego sam?" tekst="Montaż przy 230 V to praca dla elektryka. Mogę go zrobić za Ciebie — sprawdzę puszki, dobiorę łączniki, zamontuję moduły i skalibruję rolety." %}

## Automatyczne otwieranie o wschodzie i zamykanie o zachodzie słońca

To funkcja, której używam najczęściej — a właściwie nie używam, bo działa sama.

W ustawieniach każdego modułu Shelly można dodać **harmonogram**, który zamiast konkretnej godziny korzysta ze wschodu lub zachodu słońca dla Twojej lokalizacji. Zimą rolety zamykają się więc około 16:00, latem około 21:00 — bez przestawiania czegokolwiek.

<!-- ZDJĘCIE 5: zrzut ekranu harmonogramu „o zachodzie słońca” w aplikacji Shelly -->

Kilka ustawień, które polecam:

- **Przesunięcie względem wschodu/zachodu.** Możesz ustawić np. zamykanie 15 minut po zachodzie, żeby w pokoju nie zrobiło się ciemno za wcześnie.
- **Sypialnia rządzi się swoimi prawami.** W czerwcu słońce wschodzi przed 5:00 — mało kto chce wtedy pobudki. Dla sypialni lepiej ustawić otwieranie o stałej godzinie, a w weekend osobny, późniejszy harmonogram.
- **Rolety jako wygląd zamieszkanego domu.** Gdy wyjeżdżasz, rolety dalej otwierają się rano i zamykają wieczorem. Z ulicy dom wygląda normalnie.

Ważne: harmonogramy zapisane w samym module działają **lokalnie** — nawet gdy w domu nie ma internetu.

U mnie harmonogram mają **rolety od strony ulicy**: o zachodzie słońca same się zamykają, a o wschodzie — otwierają. Wieczorem nikt z ulicy nie zagląda do środka, a rano nie muszę o nich pamiętać. Mam to ustawione jako automatyzację w Home Assistant (o tym niżej), ale ten sam efekt da się uzyskać samym harmonogramem w aplikacji Shelly.

## Jeden przycisk do wszystkich rolet

Harmonogram to podstawa, ale czasem trzeba coś zmienić ręcznie — np. zamknąć wszystkie rolety naraz przed wyjściem z domu albo gdy zaczyna się burza.

Do tego służy przycisk **Shelly BLU RC Button 4 ZB**. Nie wymaga żadnych przewodów: działa na baterii i komunikuje się przez Bluetooth (ma też Zigbee). Trzyma się na magnesie, więc w każdej chwili można go zdjąć ze ściany i użyć jak pilota. Shelly 2PM Gen4 (i Gen3) można z nim sparować bezpośrednio (funkcja BTHome Components), więc nie potrzebujesz dodatkowej centralki.

<!-- ZDJĘCIE 6: przycisk BLU na ścianie, w miejscu, w którym naprawdę wisi -->

Ma cztery przyciski, a każdy rozpoznaje wielokrotne kliknięcia — razem można im przypisać do 16 różnych akcji. U mnie przycisk wisi w przedpokoju: **jedno kliknięcie zamyka wszystkie rolety, dwa kliknięcia — otwierają**. Te akcje również mam zdefiniowane w Home Assistant.

<!-- ZDJĘCIE 7: zrzut ekranu automatyzacji przycisku w Home Assistant -->

## Bez Home Assistant: reguły i sceny w aplikacji Shelly

Jeśli nie masz Home Assistant, sporo zrobisz w samej aplikacji Shelly. Poza harmonogramami można w niej tworzyć **sceny** — reguły w stylu „jeśli…, to…”. Kilka przykładów, które warto rozważyć:

- zamknij rolety od południa, gdy temperatura w pokoju przekroczy 25°C (z czujnikiem temperatury, np. {% include link.html id="shelly-blu-ht-zb" %}),
- zamknij wszystkie rolety jednym przyciskiem w aplikacji przed wyjściem z domu,
- otwórz rolety w salonie do połowy w weekendowe poranki.

Dobrze wiedzieć: sceny w aplikacji Shelly działają przez chmurę, więc wymagają internetu. Harmonogramy zapisane w samym module — nie.

<!-- ZDJĘCIE 8: zrzut ekranu listy scen / reguł w aplikacji Shelly -->

## Integracja z Home Assistant

Jeśli korzystasz z Home Assistant, Shelly to jeden z najwygodniejszych wyborów. Moduły pojawiają się w Home Assistant same — system wykrywa je w sieci i proponuje dodanie. Każda roleta to osobna encja z położeniem w procentach, którą widzisz na pulpicie i możesz użyć w automatyzacjach.

Komunikacja odbywa się **lokalnie**, bez pośrednictwa chmury, więc działa szybko i niezależnie od internetu.

U mnie Home Assistant to centrum sterowania roletami: są w nim zdefiniowane wszystkie sceny i automatyzacje — harmonogram rolet od ulicy i akcje przycisku w przedpokoju — i z jego pulpitu mogę też sterować każdą roletą bezpośrednio. Aplikacja Shelly zostaje jako druga droga sterowania z telefonu.

Mam tam też automatyzację zależną od pogody: **rolety zamykają się same, gdy na zewnątrz robi się gorąco i mocno świeci słońce.** Home Assistant bierze pod uwagę temperaturę zewnętrzną i nasłonecznienie, więc w upalne dni słońce nie nagrzewa pokoi, zanim ktokolwiek zdąży o tym pomyśleć.

![Oś dnia: o wschodzie słońca rolety od ulicy się otwierają, przy upale i mocnym słońcu rolety się zamykają, o zachodzie rolety od ulicy się zamykają; o każdej porze przycisk w przedpokoju zamyka (1×) lub otwiera (2×) wszystkie rolety](/assets/blog/sterowanie-roletami-z-telefonu-shelly-2pm/automatyzacje-dzien.webp){: width="1200" height="640" loading="lazy"}

<!-- ZDJĘCIE 9: zrzut ekranu pulpitu Home Assistant z roletami -->

Dzięki Home Assistant możesz połączyć rolety z resztą domu, np.:

- zamykać rolety, gdy uzbroisz alarm,
- sterować roletami głosem przez Asystenta Google, Alexę lub Siri,
- otwierać rolety stopniowo rano zamiast budzika.

Shelly 2PM Gen4 obsługuje dodatkowo standard **Matter**, więc można go dodać bezpośrednio do Apple Home, Google Home czy Alexy — nawet bez Home Assistant.

## Ile to kosztuje

Koszt jest prosty do policzenia: jeden moduł Shelly 2PM na każdą roletę plus jeden przycisk BLU. Nie potrzebujesz centralki, a przy puszkach o głębokości co najmniej 6 cm — także nowych łączników.

U mnie wygląda to tak:

- **Rolet:** 10.
- **Moduł Shelly 2PM:** ok. 140 zł za sztukę, czyli ok. 1400 zł za cały dom.
- **Płaski przełącznik Shelly:** ok. 40 zł + ramka ok. 23 zł — tylko tam, gdzie puszka jest płytsza niż 6 cm.
- **Montaż:** ok. 10–15 minut na jedną roletę.

Przy 10 roletach to więc mniej więcej 2–2,5 godziny pracy, bez kucia i bez brudu.

Wolisz gotowe rozwiązanie z montażem? Zobacz [pakiety w cenniku](/#cennik) — rolety ze sterowaniem z telefonu i harmonogramami są już w pakiecie Start.

{% include zacheta.html miejsce="po-kosztach" tytul="Ile to będzie kosztować u Ciebie?" tekst="Zostaw numer pod wpisem — oddzwonię, zapytam o liczbę rolet i puszki, i powiem, ile będzie kosztował sprzęt z montażem w Twoim domu." przycisk="Zapytaj o wycenę" %}

## Efekt po dwóch latach użytkowania

Rolety mam zautomatyzowane od dwóch lat. Zaczynałem na modułach Shelly 2PM drugiej generacji (Shelly Plus 2PM), a niedawno wymieniłem je na Gen4, żeby mieć dodatkowe funkcje: **Matter** oraz **bezpośrednie parowanie z przyciskiem Shelly BLU**, bez pośredników.

Najlepsze w tym rozwiązaniu jest to, że o roletach po prostu przestałem myśleć. Otwierają się i zamykają same, a gdy potrzebuję czegoś innego — mam przycisk na ścianie, przycisk BLU albo telefon.

Co zmieniło się na co dzień:

- **W domu jest chłodniej** — rolety zamykają się, zanim słońce nagrzeje pokoje.
- **Czujemy się bezpieczniej po zmroku** — rolety od ulicy zamykają się same o zachodzie słońca.
- **Wszystko obsługujemy z telefonu** albo dedykowanym przyciskiem w przedpokoju.

I najważniejsze: przez dwa lata **nie było żadnych kłopotów**.

## Najczęstsze pytania

**Czy Shelly 2PM potrzebuje przewodu neutralnego?**
Tak. Bez przewodu neutralnego w puszce moduł nie zadziała. W większości instalacji roletowych przewód N jest dostępny, ale warto to sprawdzić przed zakupem.

**Czy zwykły łącznik na ścianie dalej działa?**
Tak. Łącznik podłącza się do wejść modułu, więc roletę otwierasz i zamykasz tak samo jak wcześniej.

**Czy rolety działają bez internetu?**
Tak. Łącznik, przycisk BLU, harmonogramy zapisane w module i Home Assistant działają lokalnie. Bez internetu nie zadziałają tylko sceny z chmury Shelly i sterowanie spoza domu.

**Czy można sterować roletami głosem?**
Tak — przez Home Assistant albo bezpośrednio przez Matter (Shelly 2PM Gen4) w Google Home, Alexie lub Apple Home.

**Czy montaż wymaga kucia ścian?**
Nie. Moduł mieści się w istniejącej puszce za łącznikiem, a przycisk BLU jest bezprzewodowy.
