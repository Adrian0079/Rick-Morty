PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Seasons" (
	"NumT"	INTEGER,
	"Appear"	INTEGER,
	"Power"	TEXT,
	"name"	TEXT,
	PRIMARY KEY("NumT" AUTOINCREMENT)
);
INSERT INTO Seasons VALUES(1,1,'Pistola de portales para viajes interdimensionales','Rick Sanchez');
INSERT INTO Seasons VALUES(3,0,'Materialización instantánea para cumplir un propósito y dejar de existir','Mr. Meeseeks');
INSERT INTO Seasons VALUES(4,1,'Inteligencia extrema, manipulación política y control del multiverso','Evil Morty');
INSERT INTO Seasons VALUES(5,1,'Casco amplificador de inteligencia canina y armadura robótica','Snowball');
INSERT INTO Seasons VALUES(7,1,'Vuelo, fuerza sobrehumana y resurrección cibernética (como Phoenixperson)','Birdperson');
INSERT INTO Seasons VALUES(8,0,'Telepatía, alteración de la materia y cantar canciones psicodélicas','Fart');
INSERT INTO Seasons VALUES(9,1,'Resiliencia extrema y habilidad para romper la cuarta pared','Mr. Poopybutthole');
INSERT INTO Seasons VALUES(11,1,'Time Split','Evil Morty');
INSERT INTO Seasons VALUES(12,1,'poder3','FREFR');
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('Seasons',12);
COMMIT;
