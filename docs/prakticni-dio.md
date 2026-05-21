# Prakticni dio diplomskog rada

Tema diplomskog rada:

**Napredak modernih Frontend Framework-a i njihov doprinos efikasnijem pisanju koda**

## Opis prakticnog primjera

Za prakticni dio rada razvijena je aplikacija **Studentski planer obaveza**. Aplikacija predstavlja jednostavan alat za unos i pracenje studentskih obaveza tokom semestra.

Funkcionalnosti aplikacije obuhvataju dodavanje nove obaveze, izbor predmeta, roka i prioriteta, filtriranje obaveza, oznacavanje obaveze kao zavrsene i cuvanje podataka u lokalnom skladistu browsera.

## Razlog izbora aplikacije

Ovakva aplikacija je pogodna za diplomski rad jer sadrzi tipicne elemente modernih frontend aplikacija:

- unos podataka kroz formu
- prikaz liste elemenata
- promjenu stanja aplikacije
- filtriranje podataka
- cuvanje podataka
- ponovno koristenje istih vizuelnih dijelova interfejsa

## Vanilla JavaScript verzija

U prvoj verziji aplikacija je implementirana pomocu osnovnih tehnologija: HTML-a, CSS-a i JavaScripta. Ovaj pristup pokazuje kako programer sam mora povezati podatke, dogadjaje i prikaz.

Kod ove verzije posebno se uocava potreba za rucnim:

- dohvatanjem HTML elemenata pomocu `querySelector`
- dodavanjem `event listenera`
- generisanjem HTML sadrzaja kroz JavaScript
- azuriranjem DOM-a nakon svake promjene
- sinhronizacijom lokalnog stanja i prikaza

## React verzija

U drugoj verziji aplikacija je implementirana pomocu React framework/biblioteke pristupa. Aplikacija je razdvojena na vise komponenti:

- `IntroPanel`
- `StatCard`
- `TaskForm`
- `FilterBar`
- `TaskList`
- `TaskCard`

Ovakva struktura omogucava da svaki dio interfejsa ima jasnu odgovornost. Promjene u podacima se cuvaju u stanju aplikacije, a React automatski osvjezava prikaz kada se stanje promijeni.

## Poredjenje

Vanilla verzija je korisna za razumijevanje osnovnih principa web developmenta, ali kod vecih aplikacija postaje teze odrzavati veliki broj rucnih DOM operacija.

React verzija pokazuje prednosti modernih frontend frameworka:

- bolju organizaciju koda
- manju kolicinu ponavljanja
- jasniju podjelu odgovornosti
- lakse dodavanje novih funkcionalnosti
- efikasnije odrzavanje aplikacije

## Zakljucak prakticnog dijela

Prakticni primjer pokazuje da moderni frontend frameworki ne sluze samo za brzu izradu korisnickog interfejsa, nego i za dugorocnu organizaciju projekta. Kroz komponentni pristup i upravljanje stanjem, React pojednostavljuje razvoj aplikacije i smanjuje kompleksnost koja se javlja kod rucnog upravljanja DOM-om.

