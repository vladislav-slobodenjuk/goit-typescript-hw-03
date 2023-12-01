interface IKey {
  getSignature(): number;
}

interface IPerson {
  getKey(): IKey;
}

class Key implements IKey {
  private signature: number = Math.random();

  getSignature(): number {
    return this.signature;
  }
}

class Person implements IPerson {
  constructor(private key: IKey) {}

  getKey(): IKey {
    return this.key;
  }
}

abstract class House {
  protected doorIsOpen: boolean = false;
  protected tenants: Person[] = [];

  constructor(protected key: IKey) {}

  comeIn(person: Person): void {
    if (this.doorIsOpen) {
      this.tenants.push(person);
    }
  }

  abstract openDoor(key: IKey): void;
}

class MyHouse extends House {
  openDoor(key: IKey): void {
    if (this.key.getSignature() === key.getSignature()) {
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
