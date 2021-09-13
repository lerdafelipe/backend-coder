create database prueba;
use prueba;
create table `prueba`.`items2` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `categoria` VARCHAR(45) NOT NULL,
  `stock` INT NOT NULL,
  PRIMARY KEY (`id`));
insert into items set nombre=”Fideos”, stock=20, categoria=”Harinas”;
insert into items set nombre=”Leche”, stock=30, categoria=”Lacteos”;
insert into items set nombre=”Crema”, stock=15, categoria=”Lacteos”;
select * from items;
delete from  items where id =1;
update items set stock=45 where id=2;
select * from items;

