import { NeuralPacket } from '../types/neural';

export class MelbourneSimulator {
  private static readonly TOORAK_LOCATIONS = [
    'Toorak Village',
    'Hawksburn Village',
    'St Georges Road',
    'Toorak Road Business District',
    'Kooyong Road Precinct',
    'Toorak Private Hospital',
    'Capital Grand Toorak',
    'Como Centre South Yarra',
    'ANZ Toorak Branch',
    'NAB Private Wealth Toorak',
    'Toorak Corporate Center',
    'Toorak Medical Precinct'
  ];

  private static readonly CORPORATE_ENTITIES = [
    'Private Banking Division',
    'Wealth Management Services',
    'Legal Advisory Group',
    'Investment Banking Unit',
    'Corporate Trust Services',
    'Private Medical Practice',
    'Real Estate Development',
    'Asset Management Firm',
    'Family Office Services',
    'Professional Services Firm',
    'Private Security Division',
    'Executive Management'
  ];

  private static readonly PRIORITY_MESSAGES = [
    'Secure transaction authorization required',
    'Confidential portfolio update',
    'Private wealth advisory notification',
    'Corporate restructuring brief',
    'Executive board meeting schedule',
    'Investment strategy update',
    'Legal documentation request',
    'Trust management alert',
    'Asset allocation modification',
    'Risk assessment notification'
  ];

  static generatePacket(): NeuralPacket {
    const source = this.TOORAK_LOCATIONS[Math.floor(Math.random() * this.TOORAK_LOCATIONS.length)];
    const corporate = this.CORPORATE_ENTITIES[Math.floor(Math.random() * this.CORPORATE_ENTITIES.length)];
    
    return {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      data: this.PRIORITY_MESSAGES[Math.floor(Math.random() * this.PRIORITY_MESSAGES.length)],
      source: `${source} - ${corporate}`,
      destination: this.getDestination(source),
      jurisdiction: 'Toorak, Victoria',
      priority: this.determinePriority(corporate),
      classification: this.determineClassification(corporate)
    };
  }

  private static getDestination(source: string): string {
    let destination;
    do {
      destination = `${
        this.TOORAK_LOCATIONS[Math.floor(Math.random() * this.TOORAK_LOCATIONS.length)]
      } - ${
        this.CORPORATE_ENTITIES[Math.floor(Math.random() * this.CORPORATE_ENTITIES.length)]
      }`;
    } while (destination === source);
    return destination;
  }

  private static determinePriority(entity: string): 'standard' | 'justice' | 'law-enforcement' {
    if (entity.includes('Legal') || entity.includes('Trust')) return 'justice';
    if (entity.includes('Security') || entity.includes('Management')) return 'law-enforcement';
    return 'standard';
  }

  private static determineClassification(entity: string): 'public' | 'confidential' | 'restricted' {
    if (entity.includes('Private') || entity.includes('Security')) return 'restricted';
    if (entity.includes('Corporate') || entity.includes('Executive')) return 'confidential';
    return 'public';
  }
}