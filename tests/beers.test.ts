import {jest} from '@jest/globals';
import supertest from 'supertest';
import {app} from '../src';
import {Beer} from "../types";

const mockBeers: Beer[] = [
    {
        id: "1",
        cerveceria: 'Cerveceria 1',
        origen: 'Chile',
        estilo: 'IPA',
        alcohol: 5.5,
        premios: "",
        ibu: 50
    },
    {
        id: "2",
        cerveceria: 'Cerveceria 2',
        origen: 'Argentina',
        estilo: 'APA',
        alcohol: 5.5,
        premios: "",
        ibu: 50
    },
    {
        id: "3",
        cerveceria: 'Cerveceria 3',
        origen: 'Brasil',
        estilo: 'APA',
        alcohol: 5.5,
        premios: "",
        ibu: 50
    }
]
jest.mock('../src/models/beers.model', () => {
    return {
        getAllBeers: jest.fn(() => Promise.resolve(mockBeers)),
        addBeer: jest.fn((cerveceria: string, origen: string, estilo: string, alcohol: number, premios: string, ibu: number) => { mockBeers.push({id: "4", cerveceria, origen, estilo, alcohol, premios, ibu})
        }),
        getBeer: jest.fn((id: string) => Promise.resolve(mockBeers.find(beer => beer.id === id))),
        changeBeerName: jest.fn((id: string, cerveceria: string) => {
            const beer = mockBeers.find(beer => beer.id === id);
            if (beer) {
                beer.cerveceria = cerveceria;
            }
        }),
        removeBeer: jest.fn((id: string) => {
            const index = mockBeers.findIndex(beer => beer.id === id);
            if (index !== -1) {
                mockBeers.splice(index, 1);
            }
        })
    }
});
describe('Testing Beers Endpoints!', () => {
    it('Return ALL beers', async () => {
        const response = await supertest(app).get('/api/beers');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({status: "success", payload: mockBeers});
    });

    it('Return a beer by id', async () => {
        const response = await supertest(app).get('/api/beers/1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({status: "success", payload: mockBeers[0]});
    });

    it('Add a new beer', async () => {
        const newBeer = {
            cerveceria: 'Cerveceria 4',
            origen: 'Alemania',
            estilo: 'APA',
            alcohol: 5.5,
            premios: "",
            ibu: 50
        };
        const response = await supertest(app).post('/api/beers').send(newBeer);
        expect(response.status).toBe(201);
        expect(response.body).toEqual({status: "success", message: "Beer added successfully"});
        expect(mockBeers).toContainEqual(expect.objectContaining(newBeer));
    });

    it('Update a beer name by id', async () => {
        const response = await supertest(app).put('/api/beers/4').send({cerveceria: 'Cerveceria 4 oficial'});
        expect(response.status).toBe(200);
        expect(response.body).toEqual({status: "success", message: "Beer updated successfully"});
        expect(mockBeers[0].cerveceria).toBe('Cerveceria 5');
    });

    it('Delete a beer by id', async () => {
        const response = await supertest(app).delete('/api/beers/4');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({status: "success", message: "Beer deleted successfully"});
        expect(mockBeers).not.toContainEqual(expect.objectContaining({id: "4"}));
    });
});


