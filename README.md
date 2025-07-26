# KadoPay - Application de Paiement Mobile

Une application de paiement mobile développée avec React Native pour Android, permettant aux utilisateurs de gérer leur portefeuille digital et d'effectuer des paiements via QR codes.

## Fonctionnalités

- **Portefeuille Digital** : Affichage du solde et historique des transactions
- **Paiement QR Code** : Génération de QR codes pour les paiements en magasin
- **Réseau de Partenaires** : Localisation et recherche des commerçants partenaires
- **Mode Commerçant** : Interface pour les commerçants pour scanner et traiter les paiements
- **Interface intuitive** : Design moderne et user-friendly

## Écrans de l'Application

1. **Écran d'Accueil** : Portefeuille digital avec solde et transactions récentes
2. **Écran de Paiement** : Génération et affichage du QR code de paiement
3. **Écran Partenaires** : Carte et liste des commerces partenaires
4. **Écran Commerçant** : Scanner QR code, saisie montant, confirmation de paiement

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** (version 16 ou supérieure)
- **npm** ou **yarn**
- **Android Studio** avec SDK Android
- **Java Development Kit (JDK)** version 11 ou supérieure
- **React Native CLI** : `npm install -g @react-native-community/cli`

### Configuration Android

1. Installer Android Studio
2. Configurer les variables d'environnement :
   ```bash
   export ANDROID_HOME=$HOME/Android/Sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/tools
   export PATH=$PATH:$ANDROID_HOME/tools/bin
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```

## Installation

1. **Cloner le projet** (ou créer le dossier)
   ```bash
   git clone <repository-url>
   cd KadoPay
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Installer les icônes (React Native Vector Icons)**
   ```bash
   cd android
   ./gradlew clean
   cd ..
   ```

4. **Lier les icônes pour Android**
   
   Ajouter les lignes suivantes dans `android/app/build.gradle` dans la section `dependencies` si ce n'est pas déjà fait :
   ```gradle
   implementation project(':react-native-vector-icons')
   ```

   Ajouter dans `android/settings.gradle` :
   ```gradle
   include ':react-native-vector-icons'
   project(':react-native-vector-icons').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-vector-icons/android')
   ```

## Démarrage

### Méthode 1 : Avec un émulateur Android

1. **Démarrer l'émulateur Android**
   - Ouvrir Android Studio
   - Lancer AVD Manager
   - Créer et démarrer un appareil virtuel

2. **Lancer Metro Bundler**
   ```bash
   npm start
   ```

3. **Lancer l'application**
   ```bash
   npm run android
   ```

### Méthode 2 : Avec un appareil physique

1. **Activer le mode développeur** sur votre appareil Android
2. **Activer le débogage USB**
3. **Connecter l'appareil** via USB
4. **Vérifier la connexion** :
   ```bash
   adb devices
   ```
5. **Lancer l'application** :
   ```bash
   npm run android
   ```

## Structure du Projet

```
KadoPay/
├── App.js                          # Composant principal
├── index.js                        # Point d'entrée
├── package.json                     # Dépendances
├── metro.config.js                  # Configuration Metro
├── babel.config.js                  # Configuration Babel
├── app.json                         # Configuration app
├── android/                         # Configuration Android
│   ├── app/
│   │   ├── build.gradle            # Build config app
│   │   └── src/main/
│   │       ├── AndroidManifest.xml # Manifest Android
│   │       ├── java/com/kadopay/   # Code Java
│   │       └── res/                # Resources Android
│   ├── build.gradle                # Build config projet
│   ├── gradle.properties           # Propriétés Gradle
│   └── settings.gradle             # Settings Gradle
└── README.md                       # Ce fichier
```

## Dépendances Principales

- **React Native** : Framework de développement mobile
- **React Native Vector Icons** : Bibliothèque d'icônes
- **Hermes** : Moteur JavaScript optimisé

## Scripts Disponibles

- `npm start` : Démarre Metro Bundler
- `npm run android` : Lance l'app sur Android
- `npm run lint` : Vérifie le code avec ESLint
- `npm test` : Lance les tests

## Développement

### Ajout de nouvelles fonctionnalités

1. **Composants** : Ajouter dans `App.js` ou créer des fichiers séparés
2. **Styles** : Utiliser StyleSheet de React Native
3. **Navigation** : Géré par state dans le composant principal
4. **Icons** : Utiliser `react-native-vector-icons/Feather`

### Tests

Pour tester l'application :
```bash
npm test
```

### Build de Production

Pour créer un APK de production :
```bash
cd android
./gradlew assembleRelease
```

L'APK sera généré dans : `android/app/build/outputs/apk/release/`

## Dépannage

### Problèmes Courants

1. **Metro Bundler ne démarre pas**
   ```bash
   npx react-native start --reset-cache
   ```

2. **Erreurs de build Android**
   ```bash
   cd android
   ./gradlew clean
   cd ..
   npm run android
   ```

3. **Icônes ne s'affichent pas**
   - Vérifier que `react-native-vector-icons` est correctement lié
   - Nettoyer et rebuilder le projet

4. **Erreur de permissions Android**
   - Vérifier que les permissions sont déclarées dans `AndroidManifest.xml`
   - Redémarrer l'appareil/émulateur

## Permissions Android

L'application utilise les permissions suivantes :
- `INTERNET` : Pour les connexions réseau
- `CAMERA` : Pour scanner les QR codes
- `ACCESS_FINE_LOCATION` : Pour localiser les partenaires
- `ACCESS_COARSE_LOCATION` : Pour localiser les partenaires

## Contribution

Pour contribuer au projet :
1. Fork le repository
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## Support

Pour toute question ou problème, ouvrir une issue dans le repository GitHub.

## Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails. 
