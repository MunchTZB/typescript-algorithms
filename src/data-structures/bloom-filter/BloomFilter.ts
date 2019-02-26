export default class BloomFilter {
  size: number;
  storage: {
    getValue: Function;
    setValue: Function;
  }

  constructor(size: number = 100) {
    this.size = size;
    this.storage = this.createStore(size);
  }

  insert(item: string) {
    const hashValues = this.getHashValues(item);

    hashValues.forEach(val => this.storage.setValue(val));
  }

  mayContain(item: string):boolean {
    const hashValues = this.getHashValues(item);

    for (let hashIndex = 0; hashIndex < hashValues.length; hashIndex += 1) {
      if (!this.storage.getValue(hashValues[hashIndex])) {
        return false;
      }
    }

    return true;
  }

  createStore(size: number) {
    const storage: Array<boolean> = [];

    for (let storageCellIndex = 0; storageCellIndex < size;  storageCellIndex += 1) {
      storage.push(false);
    }

    const storageInterface = {
      getValue(index: number) {
        return storage[index];
      },
      setValue(index: number) {
        storage[index] = true;
      }
    };

    return storageInterface;
  }

  hash1(item: string) {
    let hash = 0;

    for (let charIndex = 0; charIndex < item.length; charIndex += 1) {
      const char = item.charCodeAt(charIndex);
      hash = (hash << 5) + hash + char;
      hash &= hash;
      hash = Math.abs(hash);
    }

    return hash % this.size;
  }

  hash2(item: string) {
    let hash = 5381;

    for (let charIndex = 0; charIndex < item.length; charIndex += 1) {
      const char = item.charCodeAt(charIndex);
      hash = (hash << 5) + hash + char;
    }

    return Math.abs(hash % this.size);
  }

  hash3(item: string) {
    let hash = 0;

    for (let charIndex = 0; charIndex < item.length; charIndex += 1) {
      const char = item.charCodeAt(charIndex);
      hash = (hash << 5) - hash;
      hash += char;
      hash &= hash;
    }

    return Math.abs(hash % this.size);
  }

  getHashValues(item: string) {
    return [
      this.hash1(item),
      this.hash2(item),
      this.hash3(item),
    ]
  }
}