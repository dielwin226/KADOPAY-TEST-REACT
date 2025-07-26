# KadoPay - Application de Paiement Mobile

Une application React Native pour les paiements mobiles avec QR code, développée pour Android.

## Fonctionnalités

- **Écran d'accueil** : Affichage du solde, carte numérique et historique des transactions
- **Paiement QR Code** : Génération d'un QR code de paiement avec minuterie
- **Réseau de partenaires** : Carte et liste des commerces partenaires
- **Mode commerçant** : Interface pour scanner les QR codes et traiter les paiements

## Installation

### Prérequis

- Node.js (version 14 ou supérieure)
- npm ou yarn
- Expo CLI
- Android Studio (pour émulateur Android)

### Installation des dépendances

```bash
# Installer Expo CLI globalement
npm install -g @expo/cli

# Installer les dépendances du projet
npm install

# Ou avec yarn
yarn install
```

## Démarrage de l'application

```bash
# Démarrer l'application
npm start

# Ou avec yarn
yarn start
```

### Options de lancement

- **Android** : `npm run android` ou appuyer sur `a` dans le terminal Expo
- **iOS** : `npm run ios` ou appuyer sur `i` dans le terminal Expo
- **Web** : `npm run web` ou appuyer sur `w` dans le terminal Expo

## Structure du projet

```
kadopay-app/
├── App.js              # Composant principal de l'application
├── package.json        # Dépendances et scripts
├── app.json           # Configuration Expo
├── assets/            # Images et ressources
└── README.md          # Documentation
```

## Écrans de l'application

### 1. Écran d'accueil
- Affichage du solde disponible
- Carte numérique avec gradient
- Bouton de paiement principal
- Historique des transactions récentes
- Navigation vers les autres écrans

### 2. Écran de paiement
- QR code généré pour le paiement
- Minuterie de 3 minutes
- Affichage du solde disponible
- Bouton d'annulation

### 3. Écran des partenaires
- Carte des commerces partenaires
- Barre de recherche
- Liste des partenaires à proximité
- Navigation par catégorie

### 4. Mode commerçant
- Scanner de QR code
- Saisie du montant
- Confirmation de paiement
- Interface de validation

## Technologies utilisées

- **React Native** : Framework de développement mobile
- **Expo** : Plateforme de développement et déploiement
- **expo-linear-gradient** : Pour les effets de gradient
- **React Hooks** : Gestion d'état et effets

## Configuration pour Android

L'application est configurée pour Android avec :
- Package name : `com.kadopay.app`
- Orientation : Portrait
- Interface utilisateur : Light theme
- Couleurs : Palette bleue (#1f2937, #2563eb, etc.)

## Développement

### Ajout de nouvelles fonctionnalités

1. Modifier le composant principal `App.js`
2. Ajouter de nouveaux écrans si nécessaire
3. Mettre à jour la navigation
4. Tester sur émulateur ou appareil réel

### Personnalisation des styles

Les styles sont définis dans le `StyleSheet` à la fin du fichier `App.js`. Vous pouvez modifier :
- Couleurs de l'interface
- Tailles et espacements
- Typographie
- Effets visuels

## Déploiement

### Build pour production

```bash
# Build pour Android
expo build:android

# Build pour iOS
expo build:ios
```

### Publication sur les stores

1. Configurer les métadonnées dans `app.json`
2. Générer les builds de production
3. Soumettre aux stores (Google Play Store, App Store)

## Support

Pour toute question ou problème :
- Consulter la documentation Expo
- Vérifier les logs dans le terminal
- Tester sur différents appareils

## Licence

Ce projet est développé pour démonstration des fonctionnalités de paiement mobile. 
