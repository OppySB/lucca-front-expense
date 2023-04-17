# LuccaFrontExpense

Ce repo est mon implémentation de l'[Exercice](https://github.com/LuccaTest/RecruitmentTest.Angular.Sebastien.Bienvenu) qui m'a été soumis, à savoir une application de saisie des dépenses.

## Installation du projet

*Pour info, le projet est constitué d'une librairie pouvant être exportée dans un autre projet et d'une partie application "app" qui utilise cette librairie.*

Après avoir cloner le projet, il faut tout d'abord installer les dépendances
```batch
npm install
```

Ensuite il faut donc build l'application (app + lib) :
```batch
npm run build:all
```

Pour effectuer le build de la lib (cas de changement de traduction par exemple) :
```batch
npm run build:lib
```

Pour lancer l'application : 
```batch
npm start
```
L'application va utiliser le fichier proxy.conf.json à la racine du projet pour savoir comment joindre le backend.

### Tests

Pour lancer les tests de la lib
```batch
npm run test:lib
```
Cela devrait effectuer l'analyse de couverture de code
![code coverage](/projects/expense-app/src/assets/img/codecoverage.png)

### Fonctionnement de l'application

Voici un lien qui explique coment utiliser l'application :
[Guide d'utilisation de Lucca Expense](https://scribehow.com/shared/Guide_for_Creating_a_New_Expenditure_Record___KXRQUDiTPqNOigZxqP3kA)

![Guide d'utilisation de Lucca Expense](/projects/expense-app/src/assets/img/guide.png)
Cette documentation a été créé avec l'outil Scribe.

### Choix de conception et pistes d'amélioration

le projet est développé dans une librairie et utilisé par l'application. J'ai utilisé *Primeng* pour la grille de la liste des dépenses( en effet la grille primeng est très rapide au chargement).
D'habitude plus habitué aux composants *Material*, j'ai utilisé les autres composants de primeng pour essayer. J'utilise d'habitude tailwind comme framework css, mais j'ai vu que primeng avait le même genre d'outil. J'ai donc essayer *PrimeFlex* sur le projet pour rajouter un peu de style.

Le projet ne possède qu'une seule page (On reste sur la même page pour l'édition d'une dépense, le formulaire s'affiche dans un panel sur la droite de l'écran). Je trouve c'est plus simple et plus ergonomique de rester sur la même page pour le besoin.

J'ai choisi de charger le formulaire d'édition avec des données valides plutôt que de charger un formulaire vide avec des champs en erreur. Arriver sur un formulaire en erreur n'est pas très engageant.
Je n'ai mis qu'un filtre dans la grille (sur la nature du déplacement) pour ne pas surcharger l'affichage.

J'aurais voulu rajouter des tests fonctionnels automatisés avec *Cypress* ou *nightwatch*.