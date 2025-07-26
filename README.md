# KadoPay - Application de Paiement Mobile

Une application React Native complète pour les paiements mobiles avec QR code, conçue pour Android.

## 🚀 Fonctionnalités

- **Portefeuille Digital** : Affichage du solde et des transactions récentes
- **Paiement QR Code** : Génération de codes QR pour les paiements en magasin
- **Réseau de Partenaires** : Carte et liste des commerces partenaires
- **Mode Commerçant** : Interface pour scanner les codes QR des clients
- **Design Moderne** : Interface utilisateur élégante avec animations

## 📱 Écrans de l'Application

### 1. Écran d'Accueil (HomeScreen)
- Affichage du solde disponible
- Carte numérique avec gradient
- Bouton principal pour payer en magasin
- Liste des transactions récentes
- Navigation par le bas

### 2. Écran de Paiement (PaymentScreen)
- QR Code généré pour le paiement
- Compte à rebours de 3 minutes
- Affichage du solde disponible
- Bouton d'annulation

### 3. Écran Partenaires (PartnersScreen)
- Carte des partenaires
- Barre de recherche
- Liste des commerces partenaires
- Navigation avec bouton retour

### 4. Écran Commerçant (MerchantScreen)
- Mode scan pour les QR codes
- Saisie du montant
- Confirmation de paiement
- Interface adaptée aux commerçants

## 🛠️ Installation

### Prérequis
- Node.js (version 14 ou supérieure)
- npm ou yarn
- Expo CLI
- Android Studio (pour le développement Android)

### Étapes d'installation

1. **Cloner le projet**
```bash
git clone <repository-url>
cd kadopay-app
```

2. **Installer les dépendances**
```bash
npm install
# ou
yarn install
```

3. **Installer Expo CLI (si pas déjà installé)**
```bash
npm install -g @expo/cli
```

4. **Démarrer l'application**
```bash
npm start
# ou
expo start
```

## 📱 Développement

### Pour Android
```bash
npm run android
# ou
expo start --android
```

### Pour iOS
```bash
npm run ios
# ou
expo start --ios
```

### Pour le Web
```bash
npm run web
# ou
expo start --web
```

## 🏗️ Structure du Projet

```
kadopay-app/
├── App.js                 # Composant principal
├── package.json           # Dépendances
├── app.json              # Configuration Expo
├── assets/               # Images et ressources
└── README.md             # Documentation
```

## 📦 Dépendances Principales

- **React Native** : Framework mobile
- **Expo** : Plateforme de développement
- **expo-linear-gradient** : Gradients pour l'interface
- **React Hooks** : Gestion d'état

## 🎨 Design System

L'application utilise un design system cohérent avec :
- **Couleurs** : Palette bleue (#2563eb, #1d4ed8)
- **Typographie** : Hiérarchie claire des textes
- **Espacement** : Système de padding/margin cohérent
- **Ombres** : Effets de profondeur subtils
- **Animations** : Transitions fluides

## 🔧 Configuration

### Variables d'environnement
Créez un fichier `.env` pour les variables d'environnement :
```
API_URL=your_api_url
QR_CODE_BASE_URL=your_qr_base_url
```

### Configuration Android
Le fichier `app.json` contient la configuration pour Android avec le package `com.kadopay.app`.

## 🚀 Déploiement

### Build pour Android
```bash
expo build:android
```

### Build pour iOS
```bash
expo build:ios
```

## 📝 Notes de Développement

- L'application utilise des emojis pour les icônes (solution temporaire)
- Les images QR code utilisent des placeholders
- La carte utilise une image placeholder
- Les données sont statiques (mock data)

## 🔮 Améliorations Futures

- [ ] Intégration d'une vraie API de paiement
- [ ] Scanner de QR code natif
- [ ] Intégration de cartes Google Maps
- [ ] Authentification utilisateur
- [ ] Notifications push
- [ ] Mode hors ligne
- [ ] Tests unitaires et d'intégration

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou problème, veuillez ouvrir une issue sur GitHub. 
