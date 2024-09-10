﻿import {
    AutoHydrate,
    PropertyConfigs
} from "../../src";

export interface ICreatePerson {
    name: string
    age: number
    birthdate: string
    addresses: ICreateAddress[]
}

export interface ICreateAddress {
    street: string
    number: number
    city: string
}

export class Address extends AutoHydrate {
    street: string = ''
    number: number = 0
    city: string = ''

    constructor() {
        super();
    }

    static create(createAddress: ICreateAddress) {
        const address = new Address();
        address.hydrate(createAddress);
        return address;
    }
}

export class Person extends AutoHydrate {
    name: string = ''
    age: number = 0
    birthdate: Date = null!
    primaryAddress: Address = null!
    addresses: Address[] = []

    constructor() {
        super({
            birthdate: PropertyConfigs.date(),
            primaryAddress: PropertyConfigs.map(x => x['addresses'][0], PropertyConfigs.object(Address)),
            addresses: PropertyConfigs.collection(PropertyConfigs.object(Address))
        });
    }

    static create(createPerson: ICreatePerson) {
        const person = new Person();
        person.hydrate(createPerson);
        return person;
    }
}