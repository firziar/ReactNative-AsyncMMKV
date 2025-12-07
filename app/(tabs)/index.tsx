import { useAuth } from '@/contexts/AuthContext';
import { addDummyMahasiswa, getAllMahasiswa, Mahasiswa } from '@/services/mahasiswaService';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    SafeAreaView,
    Platform,
    StatusBar,
} from 'react-native';

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const [mahasiswaList, setMahasiswaList] = useState<Mahasiswa[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const fetchMahasiswa = async () => {
    try {
      setLoading(true);
      const data = await getAllMahasiswa();
      setMahasiswaList(data);
    } catch (error) {
      Alert.alert('Error', 'Gagal mengambil data mahasiswa');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMahasiswa();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchMahasiswa();
    setRefreshing(false);
  };

  const handleLogout = async () => {
    console.log('handleLogout clicked');
    Alert.alert(
      'Logout',
      'Apakah Anda yakin ingin keluar?',
      [
        {
          text: 'Batal',
          style: 'cancel',
          onPress: () => console.log('Batal logout'),
        },
        {
          text: 'Ya',
          onPress: async () => {
            console.log('Ya logout clicked, calling logout...');
            try {
              await logout();
              console.log('Logout completed, navigating to login...');
              router.replace('/login');
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Error', 'Gagal logout: ' + error);
            }
          },
        },
      ]
    );
  };

  const handleAddDummy = async () => {
    console.log('handleAddDummy clicked');
    Alert.alert(
      'Tambah Data Dummy',
      'Tambahkan 3 data mahasiswa dummy?',
      [
        {
          text: 'Batal',
          style: 'cancel',
          onPress: () => console.log('Batal clicked'),
        },
        {
          text: 'Ya',
          onPress: async () => {
            console.log('Ya clicked, calling addDummyMahasiswa...');
            try {
              await addDummyMahasiswa();
              console.log('addDummyMahasiswa completed');
              Alert.alert('Sukses', 'Data dummy berhasil ditambahkan');
              await fetchMahasiswa();
            } catch (error) {
              console.error('Error in handleAddDummy:', error);
              Alert.alert('Error', 'Gagal menambahkan data dummy: ' + error);
            }
          },
        },
      ]
    );
  };

  const renderMahasiswaItem = ({ item }: { item: Mahasiswa }) => {
    // Support untuk dua format: database lama (nim, nama) dan baru (NIM, Nama)
    const nim = item.NIM || item.nim || 'N/A';
    const nama = item.Nama || item.nama || 'N/A';
    const fakultas = item.Fakultas || item.jurusan || 'N/A';
    const prodi = item.Prodi || 'N/A';
    
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{nama}</Text>
          <Text style={styles.cardNim}>{nim}</Text>
        </View>
        <View style={styles.cardBody}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Fakultas:</Text>
            <Text style={styles.infoValue}>{fakultas}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Prodi:</Text>
            <Text style={styles.infoValue}>{prodi}</Text>
          </View>
          {item.semester && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Semester:</Text>
              <Text style={styles.infoValue}>{item.semester}</Text>
            </View>
          )}
          {item.email && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>{item.email}</Text>
            </View>
          )}
          {item.tanggalLahir && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Tanggal Lahir:</Text>
              <Text style={styles.infoValue}>{item.tanggalLahir}</Text>
            </View>
          )}
          {item.alamat && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Alamat:</Text>
              <Text style={styles.infoValue}>{item.alamat}</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Memuat data mahasiswa...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Selamat Datang!</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{mahasiswaList.length}</Text>
          <Text style={styles.statLabel}>Total Mahasiswa</Text>
        </View>
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddDummy}>
          <Text style={styles.addButtonText}>+ Tambah Data Dummy</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={mahasiswaList}
        renderItem={renderMahasiswaItem}
        keyExtractor={(item) => item.id || ''}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Belum ada data mahasiswa</Text>
            <Text style={styles.emptySubtext}>Tambahkan data dummy untuk memulai</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 10 : 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  logoutButton: {
    backgroundColor: '#ff3b30',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  statsContainer: {
    padding: 20,
  },
  statCard: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 16,
    color: '#fff',
    marginTop: 4,
  },
  actionContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#34C759',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  listContainer: {
    padding: 20,
    paddingTop: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  cardNim: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  cardBody: {
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    flex: 2,
    textAlign: 'right',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#999',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#bbb',
  },
});
