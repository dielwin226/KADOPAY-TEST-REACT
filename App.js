import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
  StatusBar,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const { width, height } = Dimensions.get('window');

// Composant principal de l'application
export default function App() {
  // État de gestion de l'écran actif actuel
  const [currentScreen, setCurrentScreen] = useState('home');
  // État du flux marchand
  const [merchantStep, setMerchantStep] = useState('scan'); // scan, enterAmount, confirmed
  const [amount, setAmount] = useState('');

  // Un routeur simple pour afficher le bon écran
  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen setCurrentScreen={setCurrentScreen} />;
      case 'payment':
        return <PaymentScreen setCurrentScreen={setCurrentScreen} />;
      case 'partners':
        return <PartnersScreen setCurrentScreen={setCurrentScreen} />;
      case 'merchant':
        return (
          <MerchantScreen
            setCurrentScreen={setCurrentScreen}
            step={merchantStep}
            setStep={setMerchantStep}
            amount={amount}
            setAmount={setAmount}
          />
        );
      default:
        return <HomeScreen setCurrentScreen={setCurrentScreen} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
      {renderScreen()}
    </SafeAreaView>
  );
}

// Écran 1 : Écran d'accueil (Le Portefeuille Digital)
const HomeScreen = ({ setCurrentScreen }) => {
  const transactions = [
    { id: 1, store: 'Achat chez Marina Market', amount: '- 4 500 F', type: 'debit' },
    { id: 2, store: 'Cadeau reçu de KadoPay Inc.', amount: '+ 10 000 F', type: 'credit' },
    { id: 3, store: 'Restaurant Le Zafaran', amount: '- 8 000 F', type: 'debit' },
    { id: 4, store: 'Recharge KadoPay', amount: '+ 15 000 F', type: 'credit' },
  ];

  return (
    <View style={styles.homeContainer}>
      {/* En-tête */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.appTitle}>KadoPay</Text>
          <View style={styles.userInfo}>
            <Text style={styles.greeting}>Bonjour</Text>
            <Text style={styles.userName}>Issa C.</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* Carte numérique */}
        <View style={styles.digitalCard}>
          <View>
            <Text style={styles.balanceLabel}>Solde Total Disponible</Text>
            <View style={styles.balanceContainer}>
              <Text style={styles.balanceAmount}>25 000 F </Text>
              <Text style={styles.balanceCurrency}>CFA</Text>
            </View>
          </View>
          <View style={styles.cardBottom}>
            <Text style={styles.cardNumber}>**** **** **** 1234</Text>
            <Icon name="credit-card" size={24} color="#ffffff80" />
          </View>
        </View>

        {/* Bouton d'action principal */}
        <TouchableOpacity
          style={styles.payButton}
          onPress={() => setCurrentScreen('payment')}
          activeOpacity={0.8}
        >
          <Icon name="smartphone" size={24} color="white" />
          <Text style={styles.payButtonText}>Payer en Magasin</Text>
        </TouchableOpacity>

        {/* Activité récente */}
        <View style={styles.recentActivity}>
          <Text style={styles.sectionTitle}>Activité Récente</Text>
          <View style={styles.transactionsList}>
            {transactions.map(tx => (
              <View key={tx.id} style={styles.transactionItem}>
                <View style={styles.transactionLeft}>
                  <View style={[
                    styles.transactionIcon,
                    tx.type === 'credit' ? styles.creditIcon : styles.debitIcon
                  ]}>
                    <Icon 
                      name="shopping-bag" 
                      size={16} 
                      color={tx.type === 'credit' ? '#10b981' : '#ef4444'} 
                    />
                  </View>
                  <View>
                    <Text style={styles.transactionStore}>{tx.store}</Text>
                  </View>
                </View>
                <Text style={[
                  styles.transactionAmount,
                  tx.type === 'credit' ? styles.creditAmount : styles.debitAmount
                ]}>
                  {tx.amount}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Navigation par le bas */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navItemActive}>
          <Icon name="credit-card" size={24} color="#2563eb" />
          <Text style={styles.navLabelActive}>Accueil</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => setCurrentScreen('partners')}
        >
          <Icon name="map-pin" size={24} color="#6b7280" />
          <Text style={styles.navLabel}>Partenaires</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => setCurrentScreen('merchant')}
        >
          <Icon name="shopping-bag" size={24} color="#6b7280" />
          <Text style={styles.navLabel}>Commerçant</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Écran 2 : Écran de paiement (le QR code)
const PaymentScreen = ({ setCurrentScreen }) => {
  const [timer, setTimer] = useState(180); // 3 minutes en secondes

  useEffect(() => {
    if (timer === 0) return;
    const intervalId = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <View style={styles.paymentContainer}>
      <View style={styles.paymentHeader}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => setCurrentScreen('home')}
        >
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.paymentTitle}>Votre QR Code de Paiement</Text>
      </View>

      <View style={styles.qrCodeContainer}>
        <View style={styles.qrCodeWrapper}>
          <View style={styles.qrCodePlaceholder}>
            <Text style={styles.qrCodeText}>QR CODE</Text>
          </View>
        </View>
        <Text style={styles.balanceText}>
          Solde disponible : <Text style={styles.balanceValue}>25 000 F CFA</Text>
        </Text>
        <Text style={styles.timerText}>
          Ce code expirera dans : {formatTime(timer)}
        </Text>
        <Text style={styles.instructionText}>
          Présentez ce code au caissier pour finaliser votre paiement.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => setCurrentScreen('home')}
      >
        <Text style={styles.cancelButtonText}>Annuler</Text>
      </TouchableOpacity>
    </View>
  );
};

// Écran 3 : Écran du réseau de partenaires
const PartnersScreen = ({ setCurrentScreen }) => {
  const partners = [
    { name: 'Marina Market', category: 'Supermarché', logo: '🛒' },
    { name: 'Le Zafaran', category: 'Restaurant', logo: '🍔' },
    { name: 'Ciné Burkina', category: 'Loisirs', logo: '🎬' },
    { name: 'Pharmacie du Progrès', category: 'Santé', logo: '💊' },
  ];

  return (
    <View style={styles.partnersContainer}>
      <View style={styles.partnersHeader}>
        <View style={styles.partnersHeaderTop}>
          <TouchableOpacity 
            style={styles.backButtonLight}
            onPress={() => setCurrentScreen('home')}
          >
            <Icon name="arrow-left" size={24} color="#374151" />
          </TouchableOpacity>
          <Text style={styles.partnersTitle}>Réseau de Partenaires</Text>
        </View>
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#9ca3af" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un magasin ou une catégorie"
            placeholderTextColor="#9ca3af"
          />
        </View>
      </View>

      <ScrollView style={styles.partnersContent}>
        {/* Vue de la carte */}
        <View style={styles.mapContainer}>
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapText}>Carte de Ouagadougou</Text>
          </View>
        </View>

        {/* Vue en liste */}
        <View style={styles.partnersList}>
          <Text style={styles.partnersListTitle}>Partenaires à proximité</Text>
          {partners.map(p => (
            <View key={p.name} style={styles.partnerItem}>
              <Text style={styles.partnerLogo}>{p.logo}</Text>
              <View>
                <Text style={styles.partnerName}>{p.name}</Text>
                <Text style={styles.partnerCategory}>{p.category}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

// Écran 4 : Écran de l'application du commerçant
const MerchantScreen = ({ setCurrentScreen, step, setStep, amount, setAmount }) => {
  const handleScan = () => {
    // Simuler la numérisation
    setTimeout(() => setStep('enterAmount'), 1500);
  };

  const handleValidation = () => {
    if (amount) {
      setStep('confirmed');
    }
  };

  const handleNewScan = () => {
    setAmount('');
    setStep('scan');
  };

  return (
    <View style={styles.merchantContainer}>
      <View style={styles.merchantHeader}>
        <TouchableOpacity 
          style={styles.backButtonLight}
          onPress={() => setCurrentScreen('home')}
        >
          <Icon name="arrow-left" size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.merchantTitle}>Mode Commerçant</Text>
      </View>

      <View style={styles.merchantContent}>
        {step === 'scan' && (
          <View style={styles.scanContent}>
            <Text style={styles.scanTitle}>En attente de paiement</Text>
            <Text style={styles.scanSubtitle}>
              Scannez le QR code de votre client pour commencer.
            </Text>
            <TouchableOpacity 
              style={styles.scanButton}
              onPress={handleScan}
              activeOpacity={0.8}
            >
              <Icon name="camera" size={48} color="white" />
              <Text style={styles.scanButtonText}>Scanner</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 'enterAmount' && (
          <View style={styles.amountContent}>
            <Text style={styles.amountTitle}>
              Paiement de <Text style={styles.customerName}>Issa C.</Text>
            </Text>
            <Text style={styles.amountSubtitle}>Saisissez le montant de l'achat</Text>
            <View style={styles.amountInputContainer}>
              <TextInput
                style={styles.amountInput}
                value={amount}
                onChangeText={setAmount}
                placeholder="0"
                keyboardType="numeric"
                autoFocus
              />
              <Text style={styles.currencyLabel}>F CFA</Text>
            </View>
            <TouchableOpacity
              style={[styles.validateButton, !amount && styles.disabledButton]}
              onPress={handleValidation}
              disabled={!amount}
            >
              <Text style={styles.validateButtonText}>Valider le Paiement</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelMerchantButton}
              onPress={() => setStep('scan')}
            >
              <Text style={styles.cancelMerchantButtonText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 'confirmed' && (
          <View style={styles.confirmedContent}>
            <Icon name="check-circle" size={96} color="#10b981" />
            <Text style={styles.confirmedTitle}>Paiement Approuvé</Text>
            <Text style={styles.confirmedAmount}>
              {Number(amount).toLocaleString()} F CFA
            </Text>
            <Text style={styles.confirmedCustomer}>de la part de Issa C.</Text>
            <TouchableOpacity
              style={styles.newScanButton}
              onPress={handleNewScan}
            >
              <Text style={styles.newScanButtonText}>Nouveau Scan</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  // Home Screen Styles
  homeContainer: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    padding: 24,
    backgroundColor: 'white',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
  userInfo: {
    alignItems: 'flex-end',
  },
  greeting: {
    fontSize: 14,
    color: '#6b7280',
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 24,
  },
  digitalCard: {
    backgroundColor: '#2563eb',
    padding: 24,
    borderRadius: 16,
    marginTop: 16,
    justifyContent: 'space-between',
    height: 200,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#bfdbfe',
    marginBottom: 8,
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
  balanceCurrency: {
    fontSize: 24,
    color: '#bfdbfe',
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardNumber: {
    fontSize: 18,
    fontFamily: 'monospace',
    color: '#bfdbfe',
  },
  payButton: {
    backgroundColor: '#1d4ed8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 24,
    gap: 12,
  },
  payButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  recentActivity: {
    marginTop: 24,
    marginBottom: 100,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  transactionsList: {
    gap: 12,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  creditIcon: {
    backgroundColor: '#dcfce7',
  },
  debitIcon: {
    backgroundColor: '#fee2e2',
  },
  transactionStore: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  creditAmount: {
    color: '#059669',
  },
  debitAmount: {
    color: '#1f2937',
  },
  bottomNavigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  navItem: {
    alignItems: 'center',
  },
  navItemActive: {
    alignItems: 'center',
  },
  navLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    marginTop: 4,
  },
  navLabelActive: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2563eb',
    marginTop: 4,
  },
  // Payment Screen Styles
  paymentContainer: {
    flex: 1,
    backgroundColor: '#1f2937',
    padding: 24,
  },
  paymentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
  },
  paymentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
    textAlign: 'center',
    marginRight: 40,
  },
  qrCodeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrCodeWrapper: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  qrCodePlaceholder: {
    width: 256,
    height: 256,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  qrCodeText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  balanceText: {
    marginTop: 24,
    color: '#d1d5db',
    fontSize: 16,
  },
  balanceValue: {
    fontWeight: 'bold',
    color: 'white',
  },
  timerText: {
    marginTop: 8,
    color: '#fbbf24',
    fontSize: 14,
  },
  instructionText: {
    marginTop: 16,
    color: '#9ca3af',
    fontSize: 12,
    textAlign: 'center',
    maxWidth: 300,
  },
  cancelButton: {
    backgroundColor: '#dc2626',
    padding: 16,
    borderRadius: 12,
    marginTop: 40,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Partners Screen Styles
  partnersContainer: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  partnersHeader: {
    backgroundColor: 'white',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  partnersHeaderTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButtonLight: {
    padding: 8,
    borderRadius: 20,
    marginRight: 16,
  },
  partnersTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  searchContainer: {
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: 12,
    top: 12,
    zIndex: 1,
  },
  searchInput: {
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingLeft: 40,
    paddingRight: 16,
    paddingVertical: 8,
    fontSize: 16,
  },
  partnersContent: {
    flex: 1,
  },
  mapContainer: {
    height: height * 0.5,
    backgroundColor: '#e5e7eb',
  },
  mapPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapText: {
    fontSize: 18,
    color: '#6b7280',
  },
  partnersList: {
    padding: 16,
  },
  partnersListTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 12,
  },
  partnerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  partnerLogo: {
    fontSize: 24,
    marginRight: 16,
  },
  partnerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  partnerCategory: {
    fontSize: 14,
    color: '#6b7280',
  },
  // Merchant Screen Styles
  merchantContainer: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 24,
  },
  merchantHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  merchantTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
    textAlign: 'center',
    marginRight: 40,
  },
  merchantContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanContent: {
    alignItems: 'center',
  },
  scanTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  scanSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 32,
    textAlign: 'center',
  },
  scanButton: {
    width: 192,
    height: 192,
    backgroundColor: '#2563eb',
    borderRadius: 96,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  scanButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  amountContent: {
    width: '100%',
    alignItems: 'center',
  },
  amountTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 16,
  },
  customerName: {
    fontWeight: 'bold',
    color: '#1d4ed8',
  },
  amountSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 24,
  },
  amountInputContainer: {
    position: 'relative',
    width: '100%',
    marginBottom: 32,
  },
  amountInput: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'transparent',
    borderBottomWidth: 2,
    borderBottomColor: '#e5e7eb',
    paddingVertical: 8,
  },
  currencyLabel: {
    position: 'absolute',
    right: 0,
    top: '50%',
    fontSize: 24,
    fontWeight: '600',
    color: '#9ca3af',
  },
  validateButton: {
    backgroundColor: '#10b981',
    width: '100%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  disabledButton: {
    backgroundColor: '#d1d5db',
  },
  validateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelMerchantButton: {
    width: '100%',
    padding: 16,
  },
  cancelMerchantButtonText: {
    color: '#dc2626',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  confirmedContent: {
    alignItems: 'center',
  },
  confirmedTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 16,
    marginBottom: 8,
  },
  confirmedAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 4,
  },
  confirmedCustomer: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 48,
  },
  newScanButton: {
    backgroundColor: '#2563eb',
    width: '100%',
    padding: 16,
    borderRadius: 12,
  },
  newScanButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});