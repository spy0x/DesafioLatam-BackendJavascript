import { ChatUser } from '../../types';

export const currentUsers: ChatUser[] = [];

const animals = [
  'Abeja',
  'Aguila',
  'Alce',
  'Almeja',
  'Araña',
  'Ardilla',
  'Avestruz',
  'Ballena',
  'Bisonte',
  'Búfalo',
  'Burro',
  'Caballo',
  'Cabra',
  'Caimán',
  'Camaleón',
  'Camello',
  'Cangrejo',
  'Caracol',
  'Castor',
  'Cebra',
  'Cerdo',
  'Chimpancé',
  'Ciempiés',
  'Cisne',
  'Cocodrilo',
  'Codorniz',
  'Conejo',
  'Coyote',
  'Cuervo',
  'Delfín',
  'Elefante',
  'Escarabajo',
  'Escorpión',
  'Foca',
  'Gallina',
  'Gallo',
  'Ganso',
  'Gato',
  'Golondrina',
  'Gorila',
  'Halcón',
  'Hormiga',
  'Jirafa',
  'Kiwi',
  'Koala',
  'León',
  'Leopardo',
  'Lince',
  'Llama',
  'Lobo',
  'Lombriz',
  'Loro',
  'Mantis',
  'Mariposa',
  'Marmota',
  'Mofeta',
  'Mono',
  'Mosca',
  'Mosquito',
  'Murciélago',
  'Nutria',
  'Ornitorrinco',
  'Oso',
  'Ostra',
  'Pájaro',
  'Paloma',
  'Panda',
  'Pato',
  'Pavo',
  'Peces',
  'Perdiz',
  'Perro',
  'Pez',
  'Pingüino',
  'Piojo',
  'Polilla',
  'Pulga',
  'Rana',
  'Ratón',
  'Rinoceronte',
  'Salamandra',
  'Serpiente',
  'Tarántula',
  'Tigre',
  'Tiburón',
  'Tortuga',
  'Vaca',
  'Víbora',
  'Zorro',
];

export const assignUserName = (socketId: string) => {
  const user = userGenerator();
  currentUsers.push({ id: socketId, username: user });
  console.log(`Asignando nombre de usuario ${user} al socket ${socketId}`);
};

export const removeUserName = (socketId: string) => {
  const index = currentUsers.findIndex((user) => user.id === socketId);
  if (index !== -1) {
    console.log(`Eliminando nombre de usuario ${currentUsers[index].username} del socket ${socketId}`);
    currentUsers.splice(index, 1);
  }
}

const userGenerator = () => {
  let randomUser: string;
  do {
    randomUser = animals[Math.floor(Math.random() * animals.length)];
  } while (currentUsers.find((currentUser) => currentUser.username === randomUser));
  return randomUser;
};
