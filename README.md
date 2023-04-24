# Cypress Challenge 
Este challenge consiste en crear una app cypress, crear unos test cases que recorran una pagina web y analizar su comportamiento

El challenge va a estar apuntado a recorrer la pagina de un calendario
 [CallendarApp](https://calendar-challenge-six.vercel.app/)
En dicha pagina hay que marcar el Dia de la marmota el dia 2 de Febrero

Para esto hay que instalar [Cypress](https://www.cypress.io/) en una aplicacion nueva y recorrer la pagina dicha en el parrafo anterior

Para que este resuelto correctamente es *necesario* que:
- Se cree un test case que abra la pagina
- La pagina abre siempre en el mes actual, tiene que haber un test case que recorra los meses hasta llegar a Febrero ( no importa en que mes empiece )
- Se tiene que crear un test case que analice si en el 2 de Febrero ya existe el dia de la marmota, si no existe crearlo
- Se tiene que crear un test case que borre el registro del dia de la marmota


## Puntos Extra

- Crear un comando que corra todos los test
- Crear un comando que corra todos los tests menos el ultimo
- Crear un comando que corra unicamente el ultimo test case ( el que borra el dia de la marmota )
- Notificar en un mail o de alguna otra manera el resultado de los tests

## Consideraciones

Se va a analizar la arquitectura de la aplicación, los pasos de iteracion y la documentacion del mismo


# Información del proyecto base

Este proyecto fue creado usando:
- Node 16
- Cypress 12

## Scripts

Para instalar todas las dependencias necesarias:
### `npm install`

Para prender el proyecto de cypress en modo dev
### `npm run cypress:open`

## Entrega
El proyecto tiene que ser clonado usando el comando `git clone`.
Cada desarrollador debera crear un repositorio en su cuenta de github y subir el proyecto ahí dentro.
Dejandolo público para que luego alguien del equipo lo pueda analizar como corresponda.

(PD: Se puede cambiar el Remote del repositorio si sabe usar `git` correctamente)
