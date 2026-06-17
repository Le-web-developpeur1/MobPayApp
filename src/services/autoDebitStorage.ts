import AsyncStorage from '@react-native-async-storage/async-storage';

export interface AutoDebitRecord {
  id: string;
  frequency: string;
  amount: string;
  startDate: string;
  endDate: string;
  motif: string;
  createdAt: string;
  status: 'active' | 'completed' | 'cancelled';
}

const STORAGE_KEY = '@auto_debits';

export const autoDebitStorage = {
  // Sauvegarder un nouveau débit automatique
  async save(data: Omit<AutoDebitRecord, 'id' | 'createdAt' | 'status'>): Promise<AutoDebitRecord> {
    try {
      const existingData = await this.getAll();
      const newRecord: AutoDebitRecord = {
        ...data,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        status: 'active',
      };
      
      const updatedData = [...existingData, newRecord];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
      return newRecord;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du débit automatique:', error);
      throw error;
    }
  },

  // Récupérer tous les débits automatiques
  async getAll(): Promise<AutoDebitRecord[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Erreur lors de la récupération des débits automatiques:', error);
      return [];
    }
  },

  // Récupérer les débits actifs uniquement
  async getActive(): Promise<AutoDebitRecord[]> {
    try {
      const allDebits = await this.getAll();
      return allDebits.filter(debit => debit.status === 'active');
    } catch (error) {
      console.error('Erreur lors de la récupération des débits actifs:', error);
      return [];
    }
  },

  // Mettre à jour le statut d'un débit
  async updateStatus(id: string, status: 'active' | 'completed' | 'cancelled'): Promise<void> {
    try {
      const allDebits = await this.getAll();
      const updatedDebits = allDebits.map(debit => 
        debit.id === id ? { ...debit, status } : debit
      );
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDebits));
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
      throw error;
    }
  },

  // Supprimer un débit automatique
  async delete(id: string): Promise<void> {
    try {
      const allDebits = await this.getAll();
      const updatedDebits = allDebits.filter(debit => debit.id !== id);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDebits));
    } catch (error) {
      console.error('Erreur lors de la suppression du débit:', error);
      throw error;
    }
  },

  // Vider tous les débits (utile pour le debug)
  async clear(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Erreur lors de la suppression de tous les débits:', error);
      throw error;
    }
  },
};
