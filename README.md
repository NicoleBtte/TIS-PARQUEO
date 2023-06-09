# TIS-PARQUEO
Sistema de parqueo, con react y laravel version 8 - php 7.4.22

Bienvenido al sistema de parqueo de la FCyT, elaborado por el equipo de CATSOFT.
--------------------------------------------------------------------------------------------------------------

-----> Antes de comenzar, siga los siguientes pasos posterior a clonar el repositorio:
- Dentro del directorio “back”, ejecute el comando: composer install. Si presenta problemas puede borrar la carpeta vendor e intentar de nuevo.
- En phpmyadmin cree una base de datos llamada “mydb”, seleccionando utf8_unicode_ci. 
- Dentro del directorio “back”, ejecute el comando: php artisan migrate. Esto ejecutara el script sql con la base de datos.
- Dentro del directorio “front”, ejecute el comando: npm install

-----> Iniciar el sistema de manera local
1.Para iniciar el sistema, abra xampp e inicie Apache y MySQL
2.Posteriormente, desde el directorio “back” ejecute el comando: php artisan serve
3.Por último, desde el directorio “front” ejecute el comando: npm start

-----> Cuenta Administrador
En la base de datos esta registrada una cuenta de administrador que podrá usar para ingresar al sistema:
Numero de C.I.: 13456746
Contraseña:  Admin123.

-----> Para hacer uso del sistema puede seguir los siguientes pasos:
1.	Inicie sesión como administrador
2.	Haga clic en “Parqueo” del Navbar
3.	Cree un nuevo parqueo
4.	Una vez creado, haga clic en “Ver detalles” del parqueo
5.	Haga clic en una zona
6.	Presione el botón “Actualizar”
7.	Ingrese el numero de sitios que desea que tenga la zona y otras modificaciones si lo desea
8.	Guarde los cambios y repita el proceso para las demás zonas
9.	Haga clic en “Convocatoria” del Navbar
10.	Cree una nueva convocatoria
11.	Una vez creada, ya podrá hacer uso de las demás funcionalidades

-----> Cuentas de usuario
- Con el parqueo y convocatoria creados, los clientes podrán registrarse a la convocatoria y obtener sitios de estacionamiento. 
- El administrador podrá crear operadores y guardias desde la opción “Usuarios”.

¡Ya puede empezar a explorar las opciones del sistema!
