---
published: false
layout: post
title: "Powiadomienie o braku prądu i bezpieczne wyłączenie NAS-a — UPS w Home Assistant"
description: "UPS podłączony do Home Assistant: powiadomienie na telefon, gdy w domu zabraknie prądu i gdy wróci, oraz automatyczne wyłączenie NAS-a przy niskiej baterii."
location: "Wrocław"
excerpt: "Jesteś w pracy, a w domu wysiadł prąd. Lodówka, piec, akwarium, serwer z danymi — o niczym nie wiesz. U mnie Home Assistant wysyła powiadomienie w chwili zaniku zasilania, a gdy bateria UPS-a się kończy, sam bezpiecznie wyłącza dysk sieciowy."
image: /assets/blog/brak-pradu-powiadomienie-ups-home-assistant/glowne.webp
image_alt: "Ilustracja: ciemny pokój podczas awarii prądu, na półce świecą diody UPS-a, routera i dysku sieciowego"
cta_tytul: "Chcesz wiedzieć, gdy w domu zabraknie prądu?"
cta_tekst: "Konfiguruję Home Assistant z zasilaniem awaryjnym i powiadomieniami — tak, żeby dom dawał znać o awarii także wtedy, gdy Cię nie ma. Wrocław i okolice."
---

O braku prądu zwykle dowiadujesz się po fakcie: migający zegar w piekarniku, rozmrożona szuflada w zamrażarce, wychłodzony dom po powrocie z weekendu. A jeśli masz w domu dysk sieciowy ze zdjęciami z dziesięciu lat, każde nagłe odcięcie zasilania to ryzyko dla danych.

U siebie załatwiłem to jednym urządzeniem, które i tak warto mieć: UPS-em. Podtrzymuje router, serwer z Home Assistant i dysk sieciowy, a przy okazji mówi Home Assistantowi, czy pracuje z sieci, czy z baterii. Reszta to trzy krótkie automatyzacje.

## W skrócie

- **UPS** podtrzymuje internet, Home Assistant i NAS, więc powiadomienie ma jak wyjść z domu.
- **Brak prądu** → powiadomienie na telefon od razu.
- **Prąd wrócił** → drugie powiadomienie.
- **Bateria poniżej 40%** albo sygnał „niska bateria” → Home Assistant sam wyłącza NAS, zanim zrobi to brak zasilania.

![Schemat: po zaniku zasilania UPS przechodzi na baterię i informuje o tym Home Assistant przez integrację NUT; Home Assistant wysyła powiadomienie na telefon, przy baterii poniżej 40 procent bezpiecznie wyłącza NAS, a po powrocie zasilania wysyła drugie powiadomienie](/assets/blog/brak-pradu-powiadomienie-ups-home-assistant/schemat-systemu.webp){: width="1200" height="600" loading="lazy"}

{% include zacheta.html miejsce="po-skrocie" tytul="Mieszkasz we Wrocławiu lub okolicach?" tekst="Dobiorę UPS do Twojego sprzętu, podłączę go do Home Assistant i ustawię powiadomienia o awarii zasilania na telefonach domowników." przycisk="Chcę takie powiadomienia" %}

## Czego użyłem

- **UPS Armac** z portem USB. Model nie ma znaczenia — ważne, żeby miał złącze komunikacyjne, a nie tylko gniazdka.
- **Integracja NUT** (Network UPS Tools) w Home Assistant. Pokazuje stan UPS-a („z sieci” / „z baterii”), poziom baterii w procentach, napięcie i obciążenie.
- **NAS Synology** z oficjalną integracją w Home Assistant — daje między innymi przycisk „wyłącz”.
- **Aplikacja Home Assistant** na telefonie do powiadomień.

Żeby to miało sens, do UPS-a muszą być podpięte trzy rzeczy naraz: **router** (i wszystko, co daje internet), **serwer z Home Assistant** i **NAS**. Jeśli router zgaśnie razem z prądem, powiadomienie nie wyjdzie z domu.

U mnie ten zestaw obciąża UPS w kilkunastu procentach, więc na baterii pracuje długo — z zapasem na typowe, kilkuminutowe przerwy.

## Automatyzacja 1 i 2: brak prądu i powrót

```yaml
- alias: "Brak prądu"
  triggers:
    - trigger: state
      entity_id: sensor.ups_status
      from: "Online"
      to: "On Battery"
  actions:
    - action: notify.mobile_app_twoj_telefon
      data:
        title: "Dom"
        message: "Brak prądu – UPS pracuje na baterii."

- alias: "Prąd wrócił"
  triggers:
    - trigger: state
      entity_id: sensor.ups_status
      from: "On Battery"
      to: "Online"
  actions:
    - action: notify.mobile_app_twoj_telefon
      data:
        title: "Dom"
        message: "Prąd wrócił."
```

Zwróć uwagę na `from` i `to`. UPS zgłasza też stany pośrednie — u mnie kilka razy na dobę pojawia się na minutę „Online, Battery Discharging”, gdy UPS koryguje napięcie albo testuje baterię. Gdyby automatyzacja reagowała na każdą zmianę stanu, telefon brzęczałby bez powodu. Dokładne nazwy stanów sprawdź w historii swojego czujnika.

## Automatyzacja 3: wyłącz NAS, zanim padnie bateria

Dysk sieciowy źle znosi nagłe odcięcie zasilania. Dlatego gdy przerwa się przedłuża, Home Assistant wyłącza go sam, „po ludzku”.

{% raw %}
```yaml
- alias: "UPS – niska bateria: wyłącz NAS"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.ups_battery_charge
      below: 40
      for: "00:01:00"
    - trigger: template
      value_template: "{{ 'LB' in states('sensor.ups_status_data').split() }}"
    - trigger: state
      entity_id: sensor.ups_status
      to: "On Battery"
      for: "00:02:00"
    - trigger: homeassistant
      event: start
  conditions:
    # Tylko podczas pracy na baterii (OB)...
    - condition: template
      value_template: "{{ 'OB' in states('sensor.ups_status_data').split() }}"
    # ...i tylko gdy bateria jest niska
    - condition: template
      value_template: >-
        {{ 'LB' in states('sensor.ups_status_data').split()
           or states('sensor.ups_battery_charge') | float(100) < 40 }}
  actions:
    - action: notify.mobile_app_twoj_telefon
      data:
        title: "UPS – niska bateria"
        message: "Bateria UPS {{ states('sensor.ups_battery_charge') }}%. Wyłączam NAS."
    - if:
        - condition: template
          value_template: "{{ states('button.nas_shut_down') != 'unavailable' }}"
      then:
        - action: button.press
          target:
            entity_id: button.nas_shut_down
```
{% endraw %}

Jak to czytać:

- **Cztery wyzwalacze, dwa warunki.** Wyzwalacze tylko „budzą” automatyzację. O tym, czy NAS zostanie wyłączony, decydują warunki: UPS pracuje na baterii **i** bateria jest niska.
- **`OB` i `LB`** to surowe flagi z UPS-a: „On Battery” i „Low Battery”. Flaga LB to sygnał samego UPS-a, że zaraz odetnie zasilanie — działa nawet wtedy, gdy odczyt procentów jest niedokładny.
- **Wyzwalacz przy starcie Home Assistant** jest na wypadek, gdyby serwer uruchomił się ponownie w trakcie awarii. Bez niego automatyzacja przegapiłaby moment przekroczenia progu.
- **Próg 40%** dobrałem z zapasem: NAS potrzebuje paru minut na zamknięcie, a stara bateria potrafi spaść z 30% do zera szybciej, niż wynika z wykresu.

## Na co uważać

- **NAS sam się nie włączy.** Po powrocie zasilania trzeba go uruchomić ręcznie albo ustawić w nim automatyczny start po przywróceniu zasilania.
- **Bateria UPS-a się starzeje.** Po 3–4 latach podtrzymanie bywa o połowę krótsze. Raz na jakiś czas warto wyjąć wtyczkę UPS-a z gniazdka i sprawdzić, ile naprawdę wytrzyma.
- **Powiadomienie wymaga internetu.** Jeśli awaria obejmuje też nadajnik operatora albo światłowód w budynku, wiadomość dojdzie dopiero po powrocie łącza.

{% include zacheta.html miejsce="po-konfiguracji" tytul="Wolisz, żebym ustawił to za Ciebie?" tekst="Dobiorę UPS, podłączę go do Home Assistant i przetestuję cały scenariusz awarii — od powiadomienia po bezpieczne wyłączenie sprzętu." przycisk="Zapytaj o montaż" %}

## Ile to kosztuje

UPS do routera, małego serwera i dysku sieciowego to wydatek rzędu 300–600 zł, zależnie od mocy i czasu podtrzymania. Integracje w Home Assistant są darmowe. Konfiguracja zajęła mi jeden wieczór, z czego większość to testy: wyciąganie wtyczki i patrzenie, co się stanie.

## Jak to działa w praktyce

Ostatnia prawdziwa przerwa w zasilaniu zdarzyła się u mnie 6 listopada tuż przed 14:00. Powiadomienie „Brak prądu” przyszło od razu, a minutę później — „Prąd wrócił”. Bateria nie zdążyła nawet drgnąć, więc NAS pracował dalej.

I właśnie tak powinno to wyglądać przez większość czasu: krótka informacja, żadnej akcji. Automatyzacja wyłączająca NAS nie musiała jeszcze zadziałać „na ostro” — sprawdziłem ją tylko w teście, odłączając UPS od gniazdka i czekając, aż bateria spadnie poniżej progu.

Największa korzyść jest mało spektakularna: gdy jestem poza domem i dostaję „Brak prądu” bez „Prąd wrócił” przez dłuższy czas, wiem, że trzeba zadzwonić do sąsiada albo sprawdzić stronę operatora — zanim rozmrozi się zamrażarka.

## Najczęstsze pytania

**Czy do powiadomienia o braku prądu potrzebny jest UPS?**
W praktyce tak. Bez podtrzymania router i Home Assistant gasną razem z prądem i nie ma kto wysłać wiadomości.

**Jaki UPS działa z Home Assistant?**
Większość modeli z portem USB lub sieciowym, obsługiwanych przez NUT (Network UPS Tools). Przed zakupem warto sprawdzić listę zgodności NUT.

**Na jak długo UPS podtrzyma router i Home Assistant?**
To zależy od pojemności baterii i obciążenia. Router, mały serwer i dysk sieciowy biorą łącznie kilkadziesiąt watów, więc nawet niewielki UPS daje zwykle kilkanaście minut lub więcej.

**Czy Home Assistant może wyłączyć też komputer?**
Tak, jeśli komputer da się wyłączyć zdalnie — na przykład przez integrację albo polecenie sieciowe. Zasada jest ta sama co przy dysku sieciowym.
