import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  TextInput, 
  Image, 
  StyleSheet, 
  SafeAreaView,
  StatusBar,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

// Main App Component
export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [merchantStep, setMerchantStep] = useState('scan');
  const [amount, setAmount] = useState('');

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
      <View style={styles.phoneFrame}>
        <View style={styles.notch} />
        <View style={styles.screenContainer}>
          {renderScreen()}
        </View>
      </View>
    </SafeAreaView>
  );
}

// Screen 1: Home Screen (Digital Wallet)
const HomeScreen = ({ setCurrentScreen }) => {
  const transactions = [
    { id: 1, store: 'Achat chez Marina Market', amount: '- 4 500 F', type: 'debit' },
    { id: 2, store: 'Cadeau reçu de KadoPay Inc.', amount: '+ 10 000 F', type: 'credit' },
    { id: 3, store: 'Restaurant Le Zafaran', amount: '- 8 000 F', type: 'debit' },
    { id: 4, store: 'Recharge KadoPay', amount: '+ 15 000 F', type: 'credit' },
  ];

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.appTitle}>KadoPay</Text>
          <View style={styles.userInfo}>
            <Text style={styles.greeting}>Bonjour</Text>
            <Text style={styles.userName}>Issa C.</Text>
          </View>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* Digital Card */}
        <LinearGradient
          colors={['#2563eb', '#1d4ed8']}
          style={styles.cardContainer}
        >
          <View style={styles.cardContent}>
            <View>
              <Text style={styles.balanceLabel}>Solde Total Disponible</Text>
              <Text style={styles.balanceAmount}>
                25 000 F <Text style={styles.currency}>CFA</Text>
              </Text>
            </View>
            <View style={styles.cardFooter}>
              <Text style={styles.cardNumber}>**** **** **** 1234</Text>
              <Text style={styles.cardIcon}>💳</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Main Action Button */}
        <TouchableOpacity
          style={styles.payButton}
          onPress={() => setCurrentScreen('payment')}
        >
          <Text style={styles.payButtonIcon}>📱</Text>
          <Text style={styles.payButtonText}>Payer en Magasin</Text>
        </TouchableOpacity>

        {/* Recent Activity */}
        <View style={styles.activitySection}>
          <Text style={styles.sectionTitle}>Activité Récente</Text>
          <View style={styles.transactionsList}>
            {transactions.map(tx => (
              <View key={tx.id} style={styles.transactionItem}>
                <View style={styles.transactionLeft}>
                  <View style={[
                    styles.transactionIcon,
                    tx.type === 'credit' ? styles.creditIcon : styles.debitIcon
                  ]}>
                    <Text style={styles.storeIcon}>🏪</Text>
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

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>💳</Text>
          <Text style={[styles.navText, styles.activeNavText]}>Accueil</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => setCurrentScreen('partners')}
        >
          <Text style={styles.navIcon}>📍</Text>
          <Text style={styles.navText}>Partenaires</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => setCurrentScreen('merchant')}
        >
          <Text style={styles.navIcon}>🏪</Text>
          <Text style={styles.navText}>Commerçant</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Screen 2: Payment Screen (QR Code)
const PaymentScreen = ({ setCurrentScreen }) => {
  const [timer, setTimer] = useState(180); // 3 minutes in seconds

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
    <View style={styles.paymentScreen}>
      {/* Header */}
      <View style={styles.paymentHeader}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => setCurrentScreen('home')}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.paymentTitle}>Votre QR Code de Paiement</Text>
      </View>

      {/* Main Content */}
      <View style={styles.paymentMain}>
        <View style={styles.qrContainer}>
          <Image
            source={{ uri: 'https://placehold.co/256x256/000000/FFFFFF?text=QR+CODE' }}
            style={styles.qrCode}
          />
        </View>
        <Text style={styles.balanceText}>
          Solde disponible : <Text style={styles.balanceHighlight}>25 000 F CFA</Text>
        </Text>
        <Text style={styles.timerText}>Ce code expirera dans : {formatTime(timer)}</Text>
        <Text style={styles.instructionText}>
          Présentez ce code au caissier pour finaliser votre paiement.
        </Text>
      </View>

      {/* Footer */}
      <View style={styles.paymentFooter}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => setCurrentScreen('home')}
        >
          <Text style={styles.cancelButtonText}>Annuler</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Screen 3: Partners Network Screen
const PartnersScreen = ({ setCurrentScreen }) => {
  const partners = [
    { name: 'Marina Market', category: 'Supermarché', logo: '🛒' },
    { name: 'Le Zafaran', category: 'Restaurant', logo: '🍔' },
    { name: 'Ciné Burkina', category: 'Loisirs', logo: '🎬' },
    { name: 'Pharmacie du Progrès', category: 'Santé', logo: '💊' },
  ];

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.partnersHeader}>
        <View style={styles.partnersHeaderContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setCurrentScreen('home')}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.partnersTitle}>Réseau de Partenaires</Text>
        </View>
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un magasin ou une catégorie"
            placeholderTextColor="#9ca3af"
          />
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.partnersMain}>
        {/* Map View */}
        <View style={styles.mapContainer}>
          <Image
            source={{ uri: 'https://placehold.co/400x400/e2e8f0/64748b?text=Carte+de+Ouagadougou' }}
            style={styles.mapImage}
          />
        </View>

        {/* List View */}
        <ScrollView style={styles.partnersList} showsVerticalScrollIndicator={false}>
          <Text style={styles.partnersSubtitle}>Partenaires à proximité</Text>
          {partners.map(p => (
            <View key={p.name} style={styles.partnerItem}>
              <Text style={styles.partnerLogo}>{p.logo}</Text>
              <View style={styles.partnerInfo}>
                <Text style={styles.partnerName}>{p.name}</Text>
                <Text style={styles.partnerCategory}>{p.category}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

// Screen 4: Merchant Application Screen
const MerchantScreen = ({ setCurrentScreen, step, setStep, amount, setAmount }) => {
  const handleScan = () => {
    // Simulate scanning
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
    <View style={styles.merchantScreen}>
      {/* Header */}
      <View style={styles.merchantHeader}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => setCurrentScreen('home')}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.merchantTitle}>Mode Commerçant</Text>
      </View>

      {/* Main Content */}
      <View style={styles.merchantMain}>
        {step === 'scan' && (
          <View style={styles.scanContainer}>
            <Text style={styles.scanTitle}>En attente de paiement</Text>
            <Text style={styles.scanSubtitle}>
              Scannez le QR code de votre client pour commencer.
            </Text>
            <TouchableOpacity
              style={styles.scanButton}
              onPress={handleScan}
            >
              <Text style={styles.scanIcon}>📱</Text>
              <Text style={styles.scanButtonText}>Scanner</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 'enterAmount' && (
          <View style={styles.amountContainer}>
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
              style={styles.cancelAmountButton}
              onPress={() => setStep('scan')}
            >
              <Text style={styles.cancelAmountText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 'confirmed' && (
          <View style={styles.confirmedContainer}>
            <Text style={styles.successIcon}>✅</Text>
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
    backgroundColor: '#1f2937',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneFrame: {
    width: width * 0.9,
    height: height * 0.9,
    backgroundColor: 'white',
    borderRadius: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 8,
    borderColor: '#000',
    overflow: 'hidden',
  },
  notch: {
    position: 'absolute',
    top: 8,
    left: '50%',
    marginLeft: -48,
    width: 96,
    height: 20,
    backgroundColor: '#000',
    borderRadius: 10,
    zIndex: 20,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#f9fafb',
    marginTop: 28,
  },
  screen: {
    flex: 1,
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
  cardContainer: {
    borderRadius: 16,
    padding: 24,
    marginTop: 24,
    height: 192,
    justifyContent: 'space-between',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  balanceLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 4,
  },
  currency: {
    fontSize: 24,
    fontWeight: 'normal',
    opacity: 0.8,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cardNumber: {
    fontFamily: 'monospace',
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  cardIcon: {
    fontSize: 32,
    opacity: 0.8,
  },
  payButton: {
    backgroundColor: '#1d4ed8',
    paddingVertical: 16,
    marginTop: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  payButtonIcon: {
    fontSize: 24,
  },
  payButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  activitySection: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  transactionsList: {
    gap: 12,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
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
  storeIcon: {
    fontSize: 20,
  },
  transactionStore: {
    fontWeight: '600',
    fontSize: 14,
    color: '#374151',
  },
  transactionAmount: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  creditAmount: {
    color: '#16a34a',
  },
  debitAmount: {
    color: '#1f2937',
  },
  bottomNav: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 24,
  },
  navText: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
    color: '#6b7280',
  },
  activeNavText: {
    color: '#2563eb',
  },
  paymentScreen: {
    flex: 1,
    backgroundColor: '#1f2937',
  },
  paymentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  backIcon: {
    fontSize: 24,
    color: 'white',
  },
  paymentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  paymentMain: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  qrContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  qrCode: {
    width: 256,
    height: 256,
    borderRadius: 8,
  },
  balanceText: {
    marginTop: 24,
    color: '#d1d5db',
    fontSize: 16,
  },
  balanceHighlight: {
    fontWeight: 'bold',
    color: 'white',
  },
  timerText: {
    marginTop: 8,
    fontSize: 14,
    color: '#fbbf24',
  },
  instructionText: {
    marginTop: 16,
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
    maxWidth: 300,
  },
  paymentFooter: {
    padding: 24,
  },
  cancelButton: {
    backgroundColor: '#dc2626',
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  partnersHeader: {
    padding: 24,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  partnersHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  partnersTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginLeft: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchIcon: {
    fontSize: 20,
    color: '#9ca3af',
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
  },
  partnersMain: {
    flex: 1,
  },
  mapContainer: {
    height: height * 0.25,
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  partnersList: {
    flex: 1,
    padding: 16,
  },
  partnersSubtitle: {
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 12,
  },
  partnerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  partnerLogo: {
    fontSize: 32,
  },
  partnerInfo: {
    flex: 1,
  },
  partnerName: {
    fontWeight: '600',
    color: '#1f2937',
    fontSize: 16,
  },
  partnerCategory: {
    fontSize: 14,
    color: '#6b7280',
  },
  merchantScreen: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 24,
  },
  merchantHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  merchantTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  merchantMain: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanContainer: {
    alignItems: 'center',
  },
  scanTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  scanSubtitle: {
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
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  scanIcon: {
    fontSize: 64,
  },
  scanButtonText: {
    marginTop: 8,
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
  amountContainer: {
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
    color: '#6b7280',
    marginBottom: 24,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
  },
  amountInput: {
    width: '100%',
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 16,
  },
  currencyLabel: {
    position: 'absolute',
    right: 0,
    fontSize: 24,
    fontWeight: '600',
    color: '#9ca3af',
  },
  validateButton: {
    width: '100%',
    backgroundColor: '#22c55e',
    paddingVertical: 16,
    marginTop: 32,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  disabledButton: {
    backgroundColor: '#d1d5db',
  },
  validateButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  cancelAmountButton: {
    width: '100%',
    paddingVertical: 16,
    marginTop: 16,
  },
  cancelAmountText: {
    color: '#ef4444',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  confirmedContainer: {
    alignItems: 'center',
  },
  successIcon: {
    fontSize: 96,
    color: '#22c55e',
  },
  confirmedTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 16,
  },
  confirmedAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#22c55e',
    marginTop: 8,
  },
  confirmedCustomer: {
    color: '#6b7280',
    marginTop: 4,
  },
  newScanButton: {
    width: '100%',
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    marginTop: 48,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  newScanButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});