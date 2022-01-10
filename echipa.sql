CREATE DATABASE proiecttw
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'ro-RO-x-icu'
    LC_CTYPE = 'ro-RO'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

CREATE USER andrei with encrypted password 'andrei';
GRANT ALL PRIVILEGES ON DATABASE proiectTW TO andrei;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO andrei;

CREATE TYPE tip_compartiment AS ENUM('gramada', 'troacar');
create type tip_pozitie as enum('linia 1', 'linia 2', 'linia 3', 'demi', 'uvertura', 'centru', 'aripa', 'fundas');

create table if not exists jucatori (
	id serial primary key,
	nume varchar(50) unique NOT NULL,
	descriere text,
	compartiment tip_compartiment default 'gramada',
	pozitie tip_pozitie default 'linia 3',
	inaltime numeric(8,2),
	greutate int,
	data_nasterii timestamp default current_timestamp,
	foste_echipe varchar[],
	statut_JS boolean default false,
	poza varchar(100)
);

insert into jucatori(nume,descriere,compartiment,pozitie,inaltime,greutate,foste_echipe,statut_JS,poza) values
('Budeanu', 'Tanc rusesc', 'gramada', 'linia 1', 1.8, 120, null, False,'budeanu.jpg'),
('Chitic', 'Animal feroce', 'gramada', 'linia 1', 1.8, 110, '{"Metrorex"}', False,'chitic.jpg'),
('Ailincai', 'Nu te pune cu moldoveanul', 'gramada', 'linia 1', 1.75, 126, null, False,'ailincai.jpg'),
('Antonescu', 'Spaidarman', 'gramada', 'linia 2', 1.95, 90, '{"Metrorex"}', True,'antonescu.jpg'),
('Podoleanu', 'Podo nebunul', 'gramada', 'linia 2', 1.89, 100, null, False,'podoleanu.jpg'),
('Mercone', 'Chelutu', 'gramada', 'linia 3', 1.7, 84, '{"Golescu"}', True,'rmercone.jpg'),
('Glavan', 'Sageata albastra', 'gramada', 'linia 3', 1.85, 94, '{"Golescu"}', True,'glavan.jpg'),
('Ispas', 'Il Capitano', 'gramada', 'linia 3', 1.9, 100, '{"Steaua"}', False,'ispas.jpg'),
('Homiuc', 'Omi cel viteaz', 'troacar', 'demi', 1.77, 74, '{"Tomitanii","Steaua"}', False,'homiuc.jpg'),
('Patrascu', 'Talent pur sange', 'troacar', 'uvertura', 1.7, 84, '{"Tomitanii","Steaua"}', False,'patrascu.jpg'),
('Turcu', 'Bestia din Pantelimon', 'troacar', 'aripa', 1.8, 94, null, False,'turcu.jpg'),
('Cotoc', 'Bestia din Joita', 'troacar', 'centru', 1.8, 94, null, False,'cotoc.jpgc'),
('Preda', 'Batran dar bun', 'troacar', 'centru', 1.8, 85, null, False,'preda.jpg'),
('Mircea Silviu', 'Gazela 1', 'troacar', 'aripa', 1.75, 78, null, False,'mircea.jpg'),
('Mircea Alex', 'Gazela 2', 'troacar', 'fundas', 1.75, 78, null, False,'mircea.jpg');

alter table jucatori
add column tara varchar(50);

update jucatori
set tara='Romania'
where id='1';

update jucatori
set tara='Romania'
where id='2';

update jucatori
set tara='Romania'
where id='3';

update jucatori
set tara='Anglia'
where id='4';

update jucatori
set tara='Franta'
where id='5';

update jucatori
set tara='Franta'
where id='6';

update jucatori
set tara='Franta'
where id='7';

update jucatori
set tara='Anglia'
where id='8';

update jucatori
set tara='Africa de Sud'
where id='9';

update jucatori
set tara='Africa de Sud'
where id='10';

update jucatori
set tara='Romania'
where id='11';

update jucatori
set tara='Romania'
where id='12';

update jucatori
set tara='Romania'
where id='13';

update jucatori
set tara='Romania'
where id='14';

update jucatori
set tara='Romania'
where id='15';