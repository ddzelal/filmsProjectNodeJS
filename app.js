const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const port = 3000;
const { v4: uuidv4 } = require('uuid');
app.use(express.json());

const filmsFilePath = path.join(__dirname, 'data', 'films.json');
const salasFilePath = path.join(__dirname, 'data', 'salas.json');
const projekcijeFilePath = path.join(__dirname, 'data', 'projekcije.json');
const rezervacijeFilePath = path.join(__dirname, 'data', 'rezervacije.json');

// Funkcija za čitanje JSON fajla
function readJsonFile(filePath) {
  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileData);
  } else {
    return [];
  }
}

// Funkcija za pisanje u JSON fajl
function writeJsonFile(filePath, data) {
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFileSync(filePath, jsonData, 'utf8');
}

app.get('/films', (req, res) => {
  const films = readJsonFile(filmsFilePath);
  res.json({ success: true, data: films });
});

app.post('/films', (req, res) => {
  const film = req.body;
  film.id = uuidv4(); // Generisanje jedinstvenog ID-a za film
  const films = readJsonFile(filmsFilePath);
  films.push(film);
  writeJsonFile(filmsFilePath, films);
  res.status(201).json({ success: true, data: film });
});

app.delete('/films/:id', (req, res) => {
  const filmId = req.params.id;
  const films = readJsonFile(filmsFilePath);
  const index = films.findIndex((film) => film.id === String(filmId)); // Konvertuj filmId u string
  if (index !== -1) {
    films.splice(index, 1);
    writeJsonFile(filmsFilePath, films);
    res.json({ success: true, message: 'Film je uspešno obrisan.' });
  } else {
    res.status(404).json({ success: false, message: 'Film nije pronađen.' });
  }
});

app.put('/films/:id', (req, res) => {
  const filmId = req.params.id;
  const updatedFilm = req.body;
  const films = readJsonFile(filmsFilePath);
  const index = films.findIndex((film) => film.id === filmId);
  if (index !== -1) {
    films[index] = { ...films[index], ...updatedFilm };
    writeJsonFile(filmsFilePath, films);
    res.json({
      success: true,
      message: 'Film je uspešno ažuriran.',
      data: films[index],
    });
  } else {
    res.status(404).json({ success: false, message: 'Film nije pronađen.' });
  }
});

app.get('/sale', (req, res) => {
  const sale = readJsonFile(salasFilePath);
  res.json({ success: true, data: sale });
});

app.post('/sale', (req, res) => {
  const sala = req.body;
  const sale = readJsonFile(salasFilePath);
  sala.id = uuidv4(); // Generisanje jedinstvenog ID-a za novu salu
  sale.push(sala);
  writeJsonFile(salasFilePath, sale);
  res.status(201).json({ success: true, data: sala });
});

app.delete('/sale/:id', (req, res) => {
  const salaId = req.params.id;
  let sale = readJsonFile(salasFilePath);
  const index = sale.findIndex((sala) => sala.id === salaId);
  if (index !== -1) {
    sale.splice(index, 1);
    writeJsonFile(salasFilePath, sale);
    res.json({ success: true, message: 'Sala je uspešno obrisana.' });
  } else {
    res.status(404).json({ success: false, message: 'Sala nije pronađena.' });
  }
});

app.put('/sale/:id', (req, res) => {
  const salaId = req.params.id;
  const updatedSala = req.body;
  let sale = readJsonFile(salasFilePath);
  const index = sale.findIndex((sala) => sala.id === salaId);
  if (index !== -1) {
    sale[index] = { ...sale[index], ...updatedSala };
    writeJsonFile(salasFilePath, sale);
    res.json({
      success: true,
      message: 'Podaci o sali su uspešno ažurirani.',
      data: sale[index],
    });
  } else {
    res.status(404).json({ success: false, message: 'Sala nije pronađena.' });
  }
});

app.get('/projekcije', (req, res) => {
  const projekcije = readJsonFile(projekcijeFilePath);
  res.json({ success: true, data: projekcije });
});

app.post('/projekcije', (req, res) => {
  const projekcija = req.body;
  const projekcije = readJsonFile(projekcijeFilePath);
  projekcija.id = uuidv4(); // Generisanje jedinstvenog ID-a za novu projekciju
  projekcije.push(projekcija);
  writeJsonFile(projekcijeFilePath, projekcije);
  res.status(201).json({ success: true, data: projekcija });
});

app.delete('/projekcije/:id', (req, res) => {
  const projekcijaId = req.params.id;
  let projekcije = readJsonFile(projekcijeFilePath);
  const index = projekcije.findIndex(
    (projekcija) => projekcija.id === projekcijaId
  );
  if (index !== -1) {
    projekcije.splice(index, 1);
    writeJsonFile(projekcijeFilePath, projekcije);
    res.json({ success: true, message: 'Projekcija je uspešno obrisana.' });
  } else {
    res
      .status(404)
      .json({ success: false, message: 'Projekcija nije pronađena.' });
  }
});

app.get('/rezervacije', (req, res) => {
  const rezervacije = readJsonFile(rezervacijeFilePath);
  res.json({ success: true, data: rezervacije });
});

app.post('/rezervacije', (req, res) => {
  const rezervacija = req.body;
  const rezervacije = readJsonFile(rezervacijeFilePath);
  rezervacija.id = uuidv4(); // Generisanje jedinstvenog ID-a za novu rezervaciju
  rezervacije.push(rezervacija);
  writeJsonFile(rezervacijeFilePath, rezervacije);
  res.status(201).json({ success: true, data: rezervacija });
});

app.delete('/rezervacije/:id', (req, res) => {
  const rezervacijaId = req.params.id;
  let rezervacije = readJsonFile(rezervacijeFilePath);
  const index = rezervacije.findIndex(
    (rezervacija) => rezervacija.id === rezervacijaId
  );
  if (index !== -1) {
    rezervacije.splice(index, 1);
    writeJsonFile(rezervacijeFilePath, rezervacije);
    res.json({ success: true, message: 'Rezervacija je uspešno obrisana.' });
  } else {
    res
      .status(404)
      .json({ success: false, message: 'Rezervacija nije pronađena.' });
  }
});

app.put('/rezervacije/:id', (req, res) => {
  const rezervacijaId = req.params.id;
  const updatedReservation = req.body;
  let rezervacije = readJsonFile(rezervacijeFilePath);
  const index = rezervacije.findIndex(
    (rezervacija) => rezervacija.id === rezervacijaId
  );
  if (index !== -1) {
    rezervacije[index] = { ...rezervacije[index], ...updatedReservation };
    writeJsonFile(rezervacijeFilePath, rezervacije);
    res.json({ success: true, message: 'Rezervacija je uspešno ažurirana.' });
  } else {
    res
      .status(404)
      .json({ success: false, message: 'Rezervacija nije pronađena.' });
  }
});

app.listen(port, () => {
  console.log(`Server je pokrenut na portu ${port}`);
});

// Film:

// id (jedinstveni identifikator filma)
// naziv (naziv filma)
// godinaIzlaska (godina izlaska filma)
// zanr (žanr filma)
// trajanje (trajanje filma u minutima)
// Sala:

// id (jedinstveni identifikator sale)
// naziv (naziv sale)
// kapacitet (broj mesta u sali)
// Projekcija:

// id (jedinstveni identifikator projekcije)
// filmId (ID filma koji se prikazuje na projekciji)
// salaId (ID sale u kojoj se projekcija održava)
// datum (datum projekcije)
// vreme (vreme projekcije)
// cena (cena karte za projekciju)
// Rezervacija:

// id (jedinstveni identifikator rezervacije)
// projekcijaId (ID projekcije za koju je napravljena rezervacija)
// ime (ime osobe koja je napravila rezervaciju)
// prezime (prezime osobe koja je napravila rezervaciju)
// brojKarata (broj rezervisanih karata)
