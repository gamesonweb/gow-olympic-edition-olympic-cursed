// Importez les modules "scene1.js" et "scene2.js" pour accéder à leurs fonctionnalités
import * as level1 from './scene1.js'; // Remplacez './scene1.js' par le chemin vers votre fichier de scène 1
import * as level2 from './scene2.js'; // Remplacez './scene2.js' par le chemin vers votre fichier de scène 2

// Fonction principale
function Main() {
    // Appelez la fonction "launch" du module "level2" pour lancer la scène 2
    //level1.launch();
    level2.launch(); // Vous pouvez également activer la scène 1 en décommentant la ligne correspondante
}

// Exécute la fonction principale
Main();
