import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import {
  Feather,
  MaterialIcons,
  Ionicons,
} from '@expo/vector-icons';

// Helper to format amount consistently
const formatCurrency = (amount) => `${Number(amount).toLocaleString('fr-FR')} F CFA`;

export default function App() {
  // Simple router
  const [currentScreen, setCurrentScreen] = useState('home');
  // Merchant flow state
  const [merchantStep, setMerchantStep] = useState('scan'); // 'scan' | 'enterAmount' | 'confirmed'
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
    <SafeAreaView style={styles.root}>
      {renderScreen()}
    </SafeAreaView>
  );
}

/* -------------------------------------------------------------------------- */
/*                               HOME SCREEN                                  */
/* -------------------------------------------------------------------------- */
const HomeScreen = ({ setCurrentScreen }) => {
  const transactions = [
    { id: 1, store: 'Achat chez Marina Market', amount: '- 4 500 F', type: 'debit' },
    { id: 2, store: 'Cadeau reçu de KadoPay Inc.', amount: '+ 10 000 F', type: 'credit' },
    { id: 3, store: 'Restaurant Le Zafaran', amount: '- 8 000 F', type: 'debit' },
    { id: 4, store: 'Recharge KadoPay', amount: '+ 15 000 F', type: 'credit' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.brand}>KadoPay</Text>
        <View>
          <Text style={styles.greeting}>Bonjour</Text>
          <Text style={styles.userName}>Issa C.</Text>
        </View>
      </View>

      {/* Digital Card */}
      <View style={styles.cardBox}>
        <View>
          <Text style={styles.cardLabel}>Solde Total Disponible</Text>
          <Text style={styles.cardBalance}>25 000 F <Text style={styles.cardCurrency}>CFA</Text></Text>
        </View>
        <View style={styles.cardNumberRow}>
          <Text style={styles.cardNumber}>**** **** **** 1234</Text>
          <Feather name="credit-card" size={32} color="white" />
        </View>
      </View>

      {/* Main action */}
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => setCurrentScreen('payment')}
      >
        <MaterialIcons name="qr-code" size={28} color="white" />
        <Text style={styles.primaryButtonText}>Payer en Magasin</Text>
      </TouchableOpacity>

      {/* Recent Activity */}
      <Text style={styles.sectionTitle}>Activité Récente</Text>
      <ScrollView style={{ flexGrow: 0 }}>
        {transactions.map((tx) => (
          <View key={tx.id} style={styles.txRow}>
            <View style={styles.txLeft}>
              <View
                style={[
                  styles.txIconWrap,
                  tx.type === 'credit'
                    ? { backgroundColor: '#d1fae5' }
                    : { backgroundColor: '#fee2e2' },
                ]}
              >
                <Feather
                  name="shopping-bag"
                  size={20}
                  color={tx.type === 'credit' ? '#059669' : '#dc2626'}
                />
              </View>
              <Text style={styles.txStore}>{tx.store}</Text>
            </View>
            <Text
              style={[
                styles.txAmount,
                tx.type === 'credit' ? { color: '#059669' } : {},
              ]}
            >
              {tx.amount}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Bottom navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Feather name="credit-card" size={24} color="#2563eb" />
          <Text style={[styles.navLabel, { color: '#2563eb' }]}>Accueil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setCurrentScreen('partners')}
        >
          <Feather name="map-pin" size={24} color="#6b7280" />
          <Text style={styles.navLabel}>Partenaires</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setCurrentScreen('merchant')}
        >
          <Feather name="shopping-bag" size={24} color="#6b7280" />
          <Text style={styles.navLabel}>Commerçant</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

/* -------------------------------------------------------------------------- */
/*                               PAYMENT SCREEN                               */
/* -------------------------------------------------------------------------- */
const PaymentScreen = ({ setCurrentScreen }) => {
  const [timer, setTimer] = useState(180);

  useEffect(() => {
    if (timer === 0) return;
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timer]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <View style={[styles.container, { backgroundColor: '#1f2937' }]}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => setCurrentScreen('home')}
          style={styles.iconButton}
        >
          <Feather name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: 'white' }]}>Votre QR Code de Paiement</Text>
      </View>

      {/* Body */}
      <View style={styles.paymentBody}>
        <View style={styles.qrBox}>
          <Image
            source={{ uri: 'https://placehold.co/256x256/000000/FFFFFF?text=QR+CODE' }}
            style={{ width: 256, height: 256, borderRadius: 12 }}
          />
        </View>
        <Text style={styles.balanceInfo}>
          Solde disponible : <Text style={{ fontWeight: 'bold', color: 'white' }}>25 000 F CFA</Text>
        </Text>
        <Text style={styles.timerText}>Ce code expirera dans : {formatTime(timer)}</Text>
        <Text style={styles.helperText}>
          Présentez ce code au caissier pour finaliser votre paiement.
        </Text>
      </View>

      {/* Footer */}
      <TouchableOpacity
        style={styles.cancelBtn}
        onPress={() => setCurrentScreen('home')}
      >
        <Text style={styles.cancelBtnText}>Annuler</Text>
      </TouchableOpacity>
    </View>
  );
};

/* -------------------------------------------------------------------------- */
/*                             PARTNERS SCREEN                                */
/* -------------------------------------------------------------------------- */
const PartnersScreen = ({ setCurrentScreen }) => {
  const partners = [
    { name: 'Marina Market', category: 'Supermarché', logo: '🛒' },
    { name: 'Le Zafaran', category: 'Restaurant', logo: '🍔' },
    { name: 'Ciné Burkina', category: 'Loisirs', logo: '🎬' },
    { name: 'Pharmacie du Progrès', category: 'Santé', logo: '💊' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => setCurrentScreen('home')}
        >
          <Feather name="arrow-left" size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Réseau de Partenaires</Text>
      </View>

      {/* Search */}
      <View style={styles.searchWrapper}>
        <Feather name="search" size={18} color="#9ca3af" style={styles.searchIcon} />
        <TextInput placeholder="Rechercher un magasin ou une catégorie" style={styles.searchInput} />
      </View>

      {/* Map placeholder */}
      <Image
        source={{ uri: 'https://placehold.co/400x200/e2e8f0/64748b?text=Carte+de+Ouagadougou' }}
        style={styles.mapPlaceholder}
      />

      {/* List */}
      <ScrollView style={{ flex: 1 }}>
        <Text style={styles.sectionTitle}>Partenaires à proximité</Text>
        {partners.map((p) => (
          <View key={p.name} style={styles.partnerRow}>
            <Text style={styles.partnerLogo}>{p.logo}</Text>
            <View>
              <Text style={styles.partnerName}>{p.name}</Text>
              <Text style={styles.partnerCategory}>{p.category}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

/* -------------------------------------------------------------------------- */
/*                            MERCHANT SCREEN                                 */
/* -------------------------------------------------------------------------- */
const MerchantScreen = ({ setCurrentScreen, step, setStep, amount, setAmount }) => {
  const handleScan = () => {
    // Simulate scanning delay
    setTimeout(() => setStep('enterAmount'), 1500);
  };

  const handleValidation = (e) => {
    e.preventDefault();
    if (amount) {
      setStep('confirmed');
    }
  };

  const handleNewScan = () => {
    setAmount('');
    setStep('scan');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => setCurrentScreen('home')}
        >
          <Feather name="arrow-left" size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mode Commerçant</Text>
      </View>

      {/* Content */}
      <View style={[styles.container, { justifyContent: 'center' }]}>
        {step === 'scan' && (
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.merchantTitle}>En attente de paiement</Text>
            <Text style={styles.merchantSub}>Scannez le QR code de votre client pour commencer.</Text>
            <TouchableOpacity style={styles.scanCircle} onPress={handleScan}>
              <Ionicons name="scan" size={64} color="white" />
              <Text style={styles.scanLabel}>Scanner</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 'enterAmount' && (
          <View style={{ width: '100%' }}>
            <Text style={[styles.merchantTitle, { textAlign: 'center' }]}>Paiement de <Text style={{ color: '#2563eb' }}>Issa C.</Text></Text>
            <Text style={styles.merchantSub}>Saisissez le montant de l’achat</Text>
            <View style={styles.amountWrapper}>
              <TextInput
                style={styles.amountInput}
                placeholder="0"
                keyboardType="numeric"
                autoFocus
                value={amount}
                onChangeText={setAmount}
              />
              <Text style={styles.amountCurrency}>F CFA</Text>
            </View>
            <TouchableOpacity
              style={[styles.validateBtn, !amount && { backgroundColor: '#d1d5db' }]}
              disabled={!amount}
              onPress={handleValidation}
            >
              <Text style={styles.validateBtnText}>Valider le Paiement</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelTextBtn} onPress={() => setStep('scan')}>
              <Text style={{ color: '#ef4444', fontWeight: 'bold' }}>Annuler</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 'confirmed' && (
          <View style={{ alignItems: 'center' }}>
            <Feather name="check-circle" size={96} color="#22c55e" />
            <Text style={styles.merchantTitle}>Paiement Approuvé</Text>
            <Text style={styles.confirmAmount}>{formatCurrency(amount)}</Text>
            <Text style={styles.merchantSub}>de la part de Issa C.</Text>
            <TouchableOpacity style={styles.newScanBtn} onPress={handleNewScan}>
              <Text style={styles.newScanBtnText}>Nouveau Scan</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
  greeting: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'right',
  },
  userName: {
    fontWeight: '600',
    color: '#374151',
  },
  cardBox: {
    backgroundColor: '#1d4ed8',
    borderRadius: 20,
    padding: 24,
    marginTop: 24,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  cardLabel: {
    color: 'rgba(255,255,255,0.8)',
  },
  cardBalance: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 4,
  },
  cardCurrency: {
    fontSize: 20,
    fontWeight: 'normal',
    opacity: 0.8,
  },
  cardNumberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 24,
    opacity: 0.8,
  },
  cardNumber: {
    fontFamily: 'monospace',
    color: 'rgba(255,255,255,0.8)',
    fontSize: 18,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#1d4ed8',
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 24,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginTop: 32,
    marginBottom: 12,
  },
  txRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  txLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  txIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txStore: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  txAmount: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#374151',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#e5e7eb',
    marginHorizontal: -24,
    marginTop: 'auto',
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
  },
  navLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
  },
  iconButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
    flex: 1,
    textAlign: 'center',
  },
  paymentBody: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  qrBox: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  balanceInfo: {
    color: '#d1d5db',
    marginTop: 24,
  },
  timerText: {
    marginTop: 8,
    color: '#facc15',
  },
  helperText: {
    marginTop: 16,
    color: '#9ca3af',
    fontSize: 12,
    textAlign: 'center',
    maxWidth: 300,
  },
  cancelBtn: {
    backgroundColor: '#dc2626',
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 24,
  },
  cancelBtnText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  searchWrapper: {
    backgroundColor: '#f3f4f6',
    borderColor: '#d1d5db',
    borderWidth: 1,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginTop: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  mapPlaceholder: {
    width: '100%',
    height: 200,
    marginTop: 24,
    borderRadius: 12,
  },
  partnerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  partnerLogo: {
    fontSize: 24,
  },
  partnerName: {
    fontWeight: '600',
    color: '#374151',
  },
  partnerCategory: {
    fontSize: 12,
    color: '#9ca3af',
  },
  merchantTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
  },
  merchantSub: {
    color: '#6b7280',
    marginBottom: 24,
    textAlign: 'center',
  },
  scanCircle: {
    width: 192,
    height: 192,
    borderRadius: 96,
    backgroundColor: '#1d4ed8',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    transform: [{ scale: 1 }],
  },
  scanLabel: {
    marginTop: 8,
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
  amountWrapper: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  amountInput: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
  },
  amountCurrency: {
    position: 'absolute',
    right: 0,
    fontSize: 24,
    color: '#9ca3af',
  },
  validateBtn: {
    backgroundColor: '#22c55e',
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 32,
  },
  validateBtnText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelTextBtn: {
    marginTop: 16,
    alignSelf: 'center',
  },
  confirmAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#22c55e',
    marginVertical: 8,
  },
  newScanBtn: {
    backgroundColor: '#1d4ed8',
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 48,
    width: '100%',
  },
  newScanBtnText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});