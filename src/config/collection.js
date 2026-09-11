/**
 * API Collection Configuration & Variables
 * Source of Truth: docs/collection.json
 * 
 * Dinamis mengekstrak base_url dan variabel konfigurasi dari collection.json
 * sehingga tidak ada hardcoded endpoint URL di codebase.
 */

import collectionData from '../../docs/collection.json';

// Ekstrak base_url dari array variable collection.json
const baseUrlVariable = collectionData.variable?.find(
  (item) => item.key === 'base_url'
);

export const COLLECTION_BASE_URL = baseUrlVariable ? baseUrlVariable.value : '';

export const COLLECTION_INFO = collectionData.info || {};

export default collectionData;
