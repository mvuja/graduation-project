# Napredak modernih Frontend Framework-a i njihov doprinos efikasnijem pisanju koda

Ovaj projekat je prakticni dio diplomskog rada na temu:

**Napredak modernih Frontend Framework-a i njihov doprinos efikasnijem pisanju koda**

Prakticni dio koristi istu aplikaciju u dvije verzije:

- `vanilla/` - aplikacija napisana osnovnim HTML, CSS i JavaScript kodom
- `react/` - ista aplikacija organizovana kroz React komponente

Ideja je da se kroz isti primjer pokaze razlika izmedju tradicionalnog frontend pristupa i modernog framework pristupa.

## Aplikacija

Aplikacija se zove **Studentski planer obaveza**. Namijenjena je studentu koji prati fakultetske obaveze kao sto su ispiti, seminarski radovi, projekti i prezentacije.

Glavne funkcionalnosti:

- dodavanje nove obaveze
- izbor predmeta, prioriteta i roka
- oznacavanje obaveze kao zavrsene
- filtriranje obaveza po statusu i prioritetu
- prikaz statistike
- cuvanje podataka u `localStorage`

## Problem u radu

Kod razvoja aplikacije samo sa HTML, CSS i JavaScript tehnologijama, kod brzo postaje tezi za odrzavanje zato sto programer mora rucno upravljati:

- elementima na stranici
- izmjenama u DOM-u
- ponavljanjem HTML strukture
- sinhronizacijom podataka i prikaza
- organizacijom funkcionalnosti u vecoj aplikaciji

## Rjesenje u radu

Moderni frontend framework, u ovom primjeru React, omogucava:

- podjelu interfejsa na komponente
- lakse ponovno koristenje dijelova koda
- jasnije upravljanje stanjem aplikacije
- automatsko osvjezavanje prikaza nakon promjene podataka
- bolju organizaciju projekta

## Pokretanje

Vanilla verzija:

1. Otvoriti `vanilla/index.html` u browseru.

React verzija:

1. Otvoriti terminal u folderu `react/`.
2. Pokrenuti `npm install`.
3. Pokrenuti `npm run dev`.

## Kako koristiti u diplomskom radu

U teorijskom dijelu rada mogu se objasniti HTML, CSS, JavaScript, biblioteke i frameworki.

U prakticnom dijelu rada ova aplikacija se moze koristiti za poredjenje:

- kako se forma i lista zadataka rucno prave u vanilla JavaScript verziji
- kako se ista forma i lista razdvajaju u React komponente
- kako React smanjuje potrebu za rucnim DOM manipulacijama
- kako komponentni pristup olaksava dodavanje novih funkcionalnosti

