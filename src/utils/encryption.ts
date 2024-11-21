import CryptoJS from 'crypto-js';

export class NeuralEncryption {
  private static readonly KEY = 'toorak-neural-vpn-key-2024';
  private static readonly CORPORATE_KEY = 'toorak-corporate-key-2024';
  private static readonly PRIVATE_KEY = 'toorak-private-wealth-key-2024';
  
  private static encryptionCache = new Map<string, string>();
  private static anonymizeCache = new Map<string, string>();
  
  static encrypt(data: string, priority?: string): string {
    const cacheKey = `${data}-${priority}`;
    if (this.encryptionCache.has(cacheKey)) {
      return this.encryptionCache.get(cacheKey)!;
    }

    const encryptionKey = this.getEncryptionKey(priority);
    const timestamp = Date.now().toString();
    const location = 'Toorak, Victoria';
    const dataWithMetadata = `${data}|${timestamp}|${location}`;
    const encrypted = CryptoJS.AES.encrypt(dataWithMetadata, encryptionKey).toString();
    
    this.encryptionCache.set(cacheKey, encrypted);
    if (this.encryptionCache.size > 100) {
      const firstKey = Array.from(this.encryptionCache.keys())[0];
      if (firstKey) {
        this.encryptionCache.delete(firstKey);
      }
    }
    
    return encrypted;
  }
  
  static decrypt(encryptedData: string, priority?: string): string {
    const decryptionKey = this.getEncryptionKey(priority);
    const bytes = CryptoJS.AES.decrypt(encryptedData, decryptionKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    const [data] = decryptedData.split('|');
    return data;
  }
  
  static anonymize(sourceId: string, priority?: string): string {
    const cacheKey = `${sourceId}-${priority}`;
    if (this.anonymizeCache.has(cacheKey)) {
      return this.anonymizeCache.get(cacheKey)!;
    }

    const salt = `toorak-${priority || 'standard'}-${new Date().getFullYear()}`;
    const anonymized = CryptoJS.SHA256(`${sourceId}${salt}`).toString().substring(0, 16);
    
    this.anonymizeCache.set(cacheKey, anonymized);
    if (this.anonymizeCache.size > 100) {
      const firstKey = Array.from(this.anonymizeCache.keys())[0];
      if (firstKey) {
        this.anonymizeCache.delete(firstKey);
      }
    }
    
    return anonymized;
  }

  private static getEncryptionKey(priority?: string): string {
    switch (priority) {
      case 'justice':
        return this.CORPORATE_KEY;
      case 'law-enforcement':
        return this.PRIVATE_KEY;
      default:
        return this.KEY;
    }
  }

  static validateJurisdiction(jurisdiction: string): boolean {
    return jurisdiction.toLowerCase().includes('toorak') || 
           jurisdiction.toLowerCase().includes('victoria');
  }
}