// Enum pour les ressources de données
export enum DataResource {
  INTERROGATION = 'INTERROGATION',
  PENSIEVE = 'PENSIEVE',
  SEARCH = 'SEARCH',
  CONDITIONS = 'CONDITIONS',
}

// Mapping pour les fichiers statiques
const staticResourceToFilename: Record<DataResource, string> = {
  [DataResource.INTERROGATION]: 'interrogation-clues.json',
  [DataResource.PENSIEVE]: 'pensieve-memories.json',
  [DataResource.SEARCH]: 'search-clues.json',
  [DataResource.CONDITIONS]: 'conditions.json',
};

// Mapping pour les endpoints API
const apiResourceToEndpoint: Record<DataResource, string> = {
  [DataResource.INTERROGATION]: 'interrogation',
  [DataResource.PENSIEVE]: 'pensieve',
  [DataResource.SEARCH]: 'search',
  [DataResource.CONDITIONS]: 'conditions',
};

export type DataLoaderMode = 'static' | 'api';

export interface DataLoader<T> {
  load(resource: DataResource): Promise<T>;
}

export class StaticJsonDataLoader<T> implements DataLoader<T> {
  async load(resource: DataResource): Promise<T> {
    const filename = staticResourceToFilename[resource];
    const response = await fetch(`/data/${filename}`);
    if (!response.ok) throw new Error(`Erreur de chargement: ${filename}`);
    return response.json();
  }
}

export class ApiDataLoader<T> implements DataLoader<T> {
  async load(resource: DataResource): Promise<T> {
    const endpoint = apiResourceToEndpoint[resource];
    const response = await fetch(`/api/${endpoint}`);
    if (!response.ok) throw new Error(`Erreur API: ${endpoint}`);
    return response.json();
  }
}

export function getDataLoader<T>(mode: DataLoaderMode): DataLoader<T> {
  if (mode === 'api') return new ApiDataLoader<T>();
  return new StaticJsonDataLoader<T>();
}
