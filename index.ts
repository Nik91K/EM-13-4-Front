import bands from './bandsDiff.json';

type MusicBand = {
  name: string;
  genre: string;
  members: BandMember[];
  originCountry: string;
  foundedYear: number;
  isStillActive: boolean;
  trackCount: number;
  albumCount: number;
  albums: Album[];
};

type BandMember = {
  name: string;
  instrument: string;
  birthYear: number;
  joinedYear: number;
  leftYear?: number; 
};

type Album = {
  title: string;
  releaseYear: number;
  tracks: Track[];
};

type Track = {
  title: string;
  durationInSeconds: number;
  releaseYear: number
};

function validTrack (track: any): track is Track {
  if (!track) {
    return false
  }
  if (typeof track.releaseYear !== 'number') {
    return false
  }
  if (typeof track.title !== 'string') {
    return false
  }
  if (typeof track.durationInSeconds !== 'number') {
    return false
  }
  if (track.durationInSeconds <= 0) {
    return false
  }
  return true
}

function validAlbum (albums: any): albums is Album {
  if (!albums) {
    return false
  }
  if (typeof albums.title !== 'string') {
    return false
  }
  if (typeof albums.releaseYear !== 'number') {
    return false
  }
  if (!Array.isArray(albums.tracks)) {
    return false
  }
  for (const track of albums.tracks) {
    if (!validTrack(track)) return false;
  }
  return true
}

function validBandMember (member: any): member is BandMember {
  if (!member) {
    return false
  }
  if (typeof member.name !== 'string' || member.name.trim() === '') {
    return false
  }
  if (typeof member.instrument !== 'string') {
    return false
  }
  if (typeof member.birthYear !== 'number') {
    return false
  }
  if (typeof member.joinedYear !== 'number') {
    return false
  }
  return true
}

function validMusicBand (band: any): band is MusicBand {
  if (!band) {
    return false
  }
  if (typeof band.name !== 'string') {
    return false
  }
  if (typeof band.genre !== 'string') {
    return false
  }
  if (typeof band.originCountry !== 'string') {
    return false
  }
  if (typeof band.foundedYear !== 'number') {
    return false
  }
  if (typeof band.isStillActive !== 'boolean') {
    return false
  }
  if (typeof band.trackCount !== 'number' || band.trackCount < 0) {
    return false
  }
  if (typeof band.albumCount !== 'number' || band.albumCount < 0) {
    return false
  }
  if (!Array.isArray(band.members)) {
    return false
  }
  for (const member of band.members) {
    if (!validBandMember(member)) {
      return false
    }
  }
  if (!Array.isArray(band.albums)) {
    return false
  }
  for (const album of band.albums) {
    if (!validAlbum(album)) {
      return false
    }
  }
  return true
}

let bandList:MusicBand[] = (bands as any[]).filter(validMusicBand)

let tracks:Track[] = bandList.flatMap(bands => bands.albums).flatMap(albums => albums.tracks)

// Завдання 1

console.log(bandList.reduce((sum, band) => sum + band.trackCount, 0))

// Завдання 2

console.log(bandList.flatMap(bands => bands.members))

// Завдання 3

console.log(bandList.reduce((sum, band) => sum + band.albumCount, 0))

// Завдання 4

const totalDuration = bandList.flatMap(bands => bands.albums).flatMap(album => album.tracks).reduce((sum, track) => sum + track.durationInSeconds, 0)

console.log(totalDuration / 60)

// Завдання 5

console.log(bandList.flatMap(bands => bands.members).flatMap(members => members.name))

// Завдання 6

console.log(bandList.filter(bands => bands.isStillActive))

// Завдання 7

console.log(Math.min(...bandList.map(bands => bands.trackCount)))

// Завдання 8

console.log(Math.min(...bandList.flatMap(band => band.albums).flatMap(album => album.tracks).map(track => track.durationInSeconds)))
console.log(Math.max(...bandList.flatMap(band => band.albums).flatMap(album => album.tracks).map(track => track.durationInSeconds)))

// Завдання 9

enum Genre {
  Rock = 1,
  Pop = 2,
  Jazz = 3,
  HipHop = 4,
  Metal = 5,
  Reggae = 6,
  Electronic = 7,
  Classical = 8,
  Blues = 9,
}

enum Instrument {
  Guitar = 1,
  Vocals = 2,
  Saxophone = 3,
  Drums = 4,
  Bass = 5,
  Piano = 6,
  Violin = 7,
  Synthesizer = 8
}

function genreConvertation(data: string): Genre | null {
  const conv = data.trim();

  if (conv in Genre) {
    return Genre[conv as keyof typeof Genre];
  }

  return null;
}

// Завдання 10

console.log(tracks.filter(tracks => tracks.durationInSeconds > 300))

// Завдання 11

console.log(tracks.filter(tracks => tracks.durationInSeconds > 180).map(track => track.title))

// Завдання 12

console.log(tracks.filter(tracks => tracks.releaseYear > 1991))

// Завдання 13

const countries = bandList.map(bands => bands.originCountry)
let uniqueOriginCountry: string[] = []

countries.forEach(originCountry => {
    if (!uniqueOriginCountry.includes(originCountry)) {
        uniqueOriginCountry.push(originCountry)
    }
})

console.log(uniqueOriginCountry)

// Завдання 14

type AlbumSummary = {
  bandName: string
  albumTitle: string
  numberTracks: number
}

const bandAlbum: AlbumSummary[] = bandList.flatMap(bands => bands.albums.map(albums => ({
  bandName: bands.name,
  albumTitle: albums.title,
  numberTracks: albums.tracks.length
})))

console.log(bandAlbum)

// Завдання 15

const tracksArray = bandList.flatMap(bands => bands.albums).flatMap(albums => albums.tracks)
console.log('____ задача 15 ____')
console.log(tracksArray.sort(function(a, b) {
  return b.durationInSeconds - a.durationInSeconds
}))

// Завдання 16

console.log(bandList.flatMap(bands => bands.members).filter(members => members.leftYear === undefined))

// Завдання 17

type BandSong = {
  bandName: string
  trackTitle: string
}

const bandSongs:BandSong[] = bandList.flatMap(bands => bands.albums.flatMap(
  albums => albums.tracks.map(tracks => ({
    bandName: bands.name,
    trackTitle: tracks.title
  }))
))

console.log(bandSongs)

// Завдання 17

const arrayRoad = bandList.flatMap(bands => bands.albums.flatMap(
  albums => albums.tracks.filter(track => track.title.includes('Road'))
))

console.log(arrayRoad)

// Завдання 19
const songsPerBand: Record<string, number> = {}

bandList.flatMap(bands => bands.albums.forEach(albums => {
  const totalTracks = bands.albums.reduce((sum, albums) => sum + albums.tracks.length, 0)
  songsPerBand[bands.name] = totalTracks
}))

console.log(songsPerBand)

// Завдання 20

function trackDuration (): number[] {
  return bandList.flatMap(bands => bands.albums.flatMap(albums => albums.tracks.map(tracks => tracks.durationInSeconds)))
}

function mathDuration (): void {
  const durations = trackDuration()
  
  durations.forEach(durations => {
    let min = Math.floor(durations / 60)
    let second = durations % 60
    console.log(`${min} хвилин ${second} секунд`)
  })
}

mathDuration()

// Завдання 21

const rockBands = bandList.filter(bands => bands.genre === 'Rock')
console.log(rockBands[rockBands.length - 1])

