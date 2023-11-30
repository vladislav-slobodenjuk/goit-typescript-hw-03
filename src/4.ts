interface IKey {
  getSignature(): number;
}

interface IPerson {
  getKey(): IKey;
}

class Key implements IKey {
  private signature: number;
  constructor() {
    this.signature = Math.random();
  }

  getSignature() {
    return this.signature;
  }
}

class Person implements IPerson {
  constructor(private key: IKey) {}
  getKey() {
    return this.key;
  }
}

abstract class House {
  doorIsOpen: boolean;
  key: IKey;
  tenants: Person[] = [];

  constructor(key: IKey) {
    this.key = key;
  }

  comeIn(person: Person) {
    if (this.doorIsOpen) {
      this.tenants.push(person);
    }
  }

  abstract openDoor(key: IKey): void;
}

class MyHouse extends House {
  constructor(key: IKey) {
    super(key);
  }

  openDoor(key: IKey) {
    if (this.key === key) {
      this.doorIsOpen = true;
    }
  }
}

const key = new Key();

const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());

house.comeIn(person);

export {};
