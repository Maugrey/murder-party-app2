Informations générales
La stack technique doit être basée surf React + Vite + TypeScript + Tailwind + Zustand.
Il n’y a pas de gestion d’utilisateurs. Mais faire en sorte que ça soit évolutif pour éventuellement avoir une gestion des utilisateurs plus tard.
S’il y a besoin de sauvegarder des informations ou des statuts, ça sera fait en local storage.
L’application doit être évolutive. Plus tard, je veux pouvoir facilement passer à un mode « client-serveur » qui appelle des API. Dans ce cas, les données ne seront plus stockées dans le local storage, mais sur un serveur, accessible via des API.
L’appel au local storage ne doit donc pas être fait directement depuis les pages, mais dans des fonctions ou helper qui pourront être évolués plus tard. Tu es libre de faire autre chose tant que c’est structuré et évolutif.
L’application doit être serverless, pouvant être déployée n’importe où.
L’application doit être responsive desktop, tablette, smartphone portrait/paysage.
Le code et les commentaires doivent être en anglais. Les textes doivent être en Français. Un système multilangue doit être prévu (ex : i18next) avec fichiers de type fr.json, en.json.

Structure du projet
src/
  components/
  pages/
  hooks/
  stores/
  utils/
  i18n/
  data/       <- contient les fichiers JSON (indices, conditions, souvenirs...)

Structure générale
Un compteur, toujours visible, présent sur toutes les pages, indiquera le temps depuis le début de la partie.
Il y a aussi un compteur de temps depuis le début de la phase, ainsi que le numéro de la phase en cours. Ces informations sont aussi affichées en permanence.
L’application est composée de 6 pages décrites dans la suite du document.
Tant que la partie n’a pas été commencée, les compteurs de temps sont à 0 et la phase est à 1.

Un menu est présent en haut de page, toujours visible même après le scroll. En mode desktop ou tablette, c’est un menu horizontal. En mode smartphone, c’est un menu burger. Uniquement un burger affiché, et quand on clique dessus les éléments du menu s’affichent verticalement.
Ce menu comporte les éléments suivants :
•	Accueil
•	Administration
•	Interroger
•	Fouiller
•	Acheter
•	Pensine
Chacun de ces éléments mène vers la page associée.

État global (à stocker via Zustand)

Variable	Type	Utilisation
isGameStarted	bool	Détermine si la partie a commencé ; contrôle l’accès aux pages et le lancement des compteurs.
currentPhase	number	Indique la phase actuelle du jeu ; utilisée pour filtrer la disponibilité des lieux, PNJ et souvenirs.
gameStartTime	timestamp	Stocke l’heure de début de la partie ; utilisé pour afficher le temps total écoulé.
phaseStartTime	timestamp	Stocke l’heure de début de la phase en cours ; utilisé pour afficher le temps écoulé dans la phase.
conditions	Record<string, boolean>	Représente l'état des conditions activées ou non ; influence l’accès aux indices, lieux, souvenirs.
cluesViewed	Record<string, boolean>	Stocke les indices déjà vus (clé = lieu+PNJ+niveau) ; utilisé pour afficher l’état “déjà vu”.
itemsTaken	Record<string, boolean>	Stocke les objets fouillés et récupérés (clé = lieu+endroit) ; évite de réafficher l’indice.
memoriesShown	string[]	Liste des souvenirs déjà affichés dans la Pensine ; empêche leur réapparition.

Au chargement de l’app :
•	Lire les valeurs de localStorage (gameStartTime, phase, conditions, cluesViewed, itemsTaken, memoriesShown...)
•	Reconstituer les timers

Tests
Utiliser Vitest pour les tests unitaires (utils, gestion des conditions, helpers JSON, etc.) et tests d’intégration de pages.

Pages fonctionnelles – Descriptions générales
Voici une description générale de chacune des pages.
Elle seront décrites avec plus de détail dans les parties suivantes.
•	Page d’accueil : un bouton START (Commencer la partie) si la partie n’a pas été commencé, boutons vers Interroger, Fouiller, Acheter, Pensine si la partie a commencé
•	Page Admin :
o	Bouton RESET (remise à 0)
o	Boutons phase suivante / précédente
o	Gestion des conditions (depuis JSON + on/off + persisté en localStorage)
•	Interroger :
o	Dropdown lieu + PNJ + bouton interroger (activable si deux sélections valides)
o	Gestion des phases, conditions, niveaux, indices vus
o	Si un couple lieu/PNJ a déjà été interrogé et que tous les niveaux disponibles ont été vus, une indication doit apparaître après la sélection de ce couple pour signaler que l’indice a déjà été vu. Cette mention s’affiche uniquement dans ce cas précis, sans bloquer l’accès à l’indice.
o	Lors d’un changement de lieu ou de PNJ, l’affichage de l’indice précédent doit être effacé.
•	Fouiller :
o	Dropdown lieu + endroit, bouton fouiller
o	Gestion des objets pris, affichage unique, conditions, phase
•	Pensine :
o	Mécanisme aléatoire de tirage de souvenir selon phase/type (useless, false-lead, clue)
o	Souvenirs éliminés au fur et à mesure (via localStorage)
o	Effet visuel d’apparition du souvenir
•	Acheter : page prévue, pas encore définie

Si la partie n’a pas commencé, seule la page d’accueil est accessible.

Page d’accueil
Tant que la partie n’a pas commencé, uniquement le bouton START sera visible. Lorsqu’on clique sur le bouton START la partie commence et les autres sections/pages deviennent accessibles. Les compteurs sont lancés.

Quand la partie est lancée, quatre boutons sont affichés, qui redirigent vers les pages associées :
•	Interroger
•	Fouiller
•	Acheter
•	Pensine

Page Admin
Dans la page admin, on trouve l’administration globale de la murder partie, et l’administration des conditions.
•	Murder Party Admin
o	Bouton RESET permettant de réinitialiser la partie : remise à 0 des compteurs, la phase est remise à 1, la partie n’est pas commencé, les compteurs sont fixés, les pages d’action redeviennent inaccessibles
o	Deux boutons : phase suivante, phase précédente : la phase en cours avance ou recule, le compteur de temps de la phase est remis à 0 et continuer à être actif (il compte le temps)
•	Conditions :
o	En fonction des évènements qui se produisent lors de la murder party, des conditions peuvent s’activer ou se désactiver. Ceci est fait manuellement via cette page.
o	Un condition correspond à : un nom + une description+ une valeur bool.
o	Les conditions sont récupérés depuis un fichier json comportant les champs :
	name : nom
	description 
o	Le fichier json ne sera qu’à la récupération des conditions. La valeurs est stockée en local storage est à false/0 par défaut.
o	La valeur est représentée sur la page par un petit « bouton slider » on/off.

Page Interroger
Interroger doit être structuré de cette manière :
•	Liste déroulante : Choix du lieu
•	Liste déroulante : Choix de la personne à interroger (PNJ)
•	Bouton « Interroger »
o	Ce bouton est inactif par défaut
o	Il devient actif lorsqu’un lieu et un PNJ ont été sélectionnés
o	Il redevient inactif si on choisit la valeur par défaut pour PNJ ou lieu
Certains PNJ ne sont disponibles que lors de certaines phases.
Si tous les PNJ d’un lieu sont indisponibles, ce lieu ne doit pas être disponible.
Les éléments indisponibles ne sont pas affichés dans les listes.
Certains indices sont conditionnels se débloquent en fonction d’autres évènements arrivés dans le jeu (paramétrables via la section « Conditions »).
Certains indices se débloquent au bout de X fois où on a interrogé le même PNJ (niveau d’indice). Un niveau d’indice s’applique à un couple lieu/PNJ. On commencera d’abord par afficher l’indice de niveau 1. Puis si on souhaite afficher l’indice pour ce même couple lieu/PNJ, on affichera ainsi l’indice de niveau 2. Et ainsi de suite jusqu’au niveau max.
Si tous les niveaux ont été vus, c’est le dernier niveau qui s’affichera lorsqu’on veut y accéder à nouveau.
Lorsque tous les niveaux ont été vus, il faut enregistrer qu’il a été déjà vu.
Lorsqu’on sélectionne un autre lieu ou PNJ, il faut effacer l’indice précédemment affiché.
Lorsqu’on sélectionne un lieu et un PNJ, si ce couple lieu/PNJ a déjà été vu, il faut afficher une mention indiquant que l’indice a déjà été vu. Ca sera juste une information visuelle, il est toujours possible d’afficher l’indice en cliquant sur le bouton. L’information indiquant que l’indice a déjà été vu doit s’afficher dès la sélection du PNJ.
Lorsqu’on sélectionne un autre lieu ou PNJ, il faut effacer la phrase indiquant que l’indice a déjà été vu.

Les indices sont récupérés depuis un fichier json comportant les champs suivants :
•	location : correspond au lieu
•	npc : correspond au PNJ
•	level : correspond au niveau
•	clue : correspond à l’indice donné
•	start_phase : phase (incluse) à partir de laquelle le PNJ est disponible
•	end_phase : phase (incluse) jusqu’à laquelle le PNJ est disponible
•	condition : correspond à la condition nécessaire pour afficher cet indice
o	Format :
	nom_de_la_condition=1 : la condition doit avoir été activée
	nom_de_la_condition=0 : la condition doit avoir été désactivé
	vide : pas de condition
L’information indiquant que l’indice a été vu n’est pas enregistrée dans le fichier json mais en localstorage.

Page Fouiller
Fouiller doit être structuré de cette manière :
•	Liste déroulante : Choix du lieu
•	Liste déroulante : Choix de l’endroit à fouiller dans ce lieu (ex : une armoire, sur la table, sous le lit, …)
•	Bouton « Fouiller » : L’indice s’affiche
Certains lieux ne sont disponibles ne sont disponibles que lors de certaines phases.
Certains lieux sont conditionnels et se débloquent en fonction d’autres évènements arrivés dans le jeu (paramétrables via la section « Conditions »).
L’indice peut être un objet ou une observation. Exemple :
•	Un livre dans une bibliothèque est un objet.
•	Une trace de sang est une observation.
Un objet peut être enlevé par le joueur. Dans ce cas il faut prévoir un bouton « garder l’indice ». Dans ce cas, l’indice sera conservé par le joueur (par l’intermédiaire du MJ qui utilise l’appli). Cette information s’affiche à la place de l’indice, après le clic sur le bouton Fouiller.
Aucune information ne s’affiche tant qu’on n’a pas cliqué sur le bouton « Fouiller ».
Si par la suite on accède à nouveau à ce couple lieu/endroit l’indice ne sera plus affiche. A la place, il y aura un message indiquant « quelque chose ici a été enlevé ».
Les indices sont récupérés depuis un fichier json comportant les champs suivants :
•	location : correspond au lieu
•	place : correspond à l’endroit dans le lieu
•	clue : correspond à l’indice donné
•	type : le type d’indice
o	object : l’indice est de type objet, il peut être gardé en appuyant sur le bouton « garder l’indice »
o	observation : juste une observation, le bouton « garder l’indice » ne s’affiche pas
•	start_phase : phase (incluse) à partir de laquelle le lieu est disponible
•	end_phase : phase (incluse) jusqu’à laquelle le lieu est disponible
•	condition : correspond à la condition nécessaire à l’affichage de ce lieu
o	Format :
	nom_de_la_condition=1 : la condition doit avoir été activée
	nom_de_la_condition=0 : la condition doit avoir été désactivé
	vide : pas de condition
L’information indiquant que l’indice a été enlevé (gardé par le joueur) n’est pas enregistrée dans le fichier json mais en localstorage.

Page Pensine
La pensine est un mécanisme qui donne des indices de manière aléatoire parmi une liste d(indices. L’indice décrit une scène. C’est un souvenir.
Certains sont des vrais indices, d’autres sont des fausses pistes, et d’autres souvenirs inutiles qui ne sont pas des indices. 
La liste des indices de la pensine est récupéréé depuis un fichier pensine.json, structuré de cette manière :
•	location : le lien dans lequel se déroule le souvenir
•	type : le type de souvenir
o	useless : le souvenir décrit n’est pas un indice
o	false-lead : le souvenir est une fausse piste
o	clue : le souvenir est un indice
•	phase : la phase à partir de la quelle le souvenir doit être présent dans la pensine
•	memory : la scène décrivant le souvenir
Chaque fois qu’un souvenir est tiré au hasard, il est enlevé de la pensine. Le souvenir n’est pas réellement retiré du fichier json, il faut uniquement stocker cette information dans le local storage.
S’il n’y a plus (ou pas) d’indice disponible dans la pensine (s’ils ont été tous retirés ou que la phase en cours ne permet pas de charger plus de souvenirs, ou s’il n’y a plus de souvenir « clue » lors de l’étape 5), un message indiquera « La pensine du professeur Reeves est vide. ».
Sinon, un bouton sera affiché avec le texte « Plonger dans la pensine ».
Un souvenir sera tiré au hasard, suivant les règles suivantes :
•	Phase 2 ou inférieure :
o	1/3 de chance de tirer un souvenir de type useless
o	1/3 de chance de tirer un souvenir de type false-lead
o	1/3 de chance de tirer un souvenir de type clue
•	Phase 3 :
o	1/9 de chance de tirer un souvenir de type useless
o	2/9 de chance de tirer un souvenir de type false-lead
o	2/3 de chance de tirer un souvenir de type clue
•	Phase 4 et plus :
o	Uniquement un souvenir de type clue
Structure le code de manière à ce que je puisse facilement adapter ces règles.

Au sein d’un même type de souvenir, tous les souvenirs ont la même chance d’être tiré.
S’il n’y a plus de souvenir dans le type qui doit être tiré, il faut tirer un autre souvenir, peu importe son type, de manière aléatoire.
Le souvenir ainsi sélectionné s’affichera avec un effet progressif. Il faut un effet d’apparition dégradé vertical.

Page Acheter
Cette action n’est pas encore définie, mais il faut lui prévoir sa page.
