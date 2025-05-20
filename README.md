# Attendee Registration

Application mobile de gestion d'inscriptions aux événements, conçue spécifiquement pour un usage optimal sur tablette.

## Fonctionnalités

- **Authentification sécurisée** : Connexion utilisateur avec gestion des sessions
- **Liste des événements** : Vue des événements futurs et passés
- **Recherche avancée** : Filtrage rapide des événements par nom ou lieu
- **Inscription de participants** : Formulaire complet pour l'enregistrement des participants
- **Interface adaptative** : Design responsive optimisé pour les tablettes
- **Mode master-detail** : Exploitation efficace de l'espace sur grands écrans

## Structure du projet

L'application est organisée selon une architecture moderne basée sur React Native avec TypeScript :

```
attendee registration/
├── src/
│   ├── assets/         # Ressources statiques (couleurs, images, styles)
│   ├── components/     # Composants réutilisables
│   ├── navigation/     # Configuration de la navigation
│   ├── redux/          # Gestion d'état centralisée
│   ├── screens/        # Écrans de l'application
│   ├── services/       # Services API et logique métier
│   └── utils/          # Utilitaires et helpers
└── ...
```

## Design adapté aux tablettes

L'application a été conçue dès le départ pour offrir une expérience optimale sur tablette :

- **Interfaces flexibles** qui s'adaptent automatiquement aux dimensions de l'écran
- **Layout master-detail** pour les listes d'événements, affichant les détails côte à côte sur tablette
- **Formulaires optimisés** avec disposition en colonnes sur grands écrans
- **Éléments d'interface redimensionnés** pour une meilleure ergonomie tactile
- **Navigation repensée** pour exploiter l'espace disponible

## Installation et démarrage

1. Cloner le dépôt
2. Installer les dépendances : `npm install`
3. Lancer l'application :
   - iOS : `npm run ios`
   - Android : `npm run android`

## Personnalisation

L'application utilise une palette de couleurs cohérente définie dans `src/assets/colors/colors.tsx`. Vous pouvez facilement adapter l'apparence en modifiant ce fichier.
