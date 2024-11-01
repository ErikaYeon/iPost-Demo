// assets/mockData.js
export const mockData = [
  {
    id: '1',
    profilePictureUrl: 'https://www.dzoom.org.es/wp-content/uploads/2013/10/image2.jpeg',
    name: 'Maria Gonzalez',
    username: '@mariagonzalez',
    description: 'Mi primer post en esta app!',
    location: 'Ciudad de México',
    date: '30/10/2024',
    images: [
      'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?cs=srgb&dl=pexels-souvenirpixels-1619317.jpg&fm=jpg',
      'https://www.dzoom.org.es/wp-content/uploads/2013/10/image2.jpeg',
      'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    likes: 702,
    comments: 5,
    isVip: true, // Usuario VIP
    crownType: 'gold', // Tipo de corona (puedes cambiar este valor para otros tipos de corona)
    commentSection: [
      { id: '1', username: '@juanperez', text: '¡Me encanta esta foto!', profilePictureUrl: 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?cs=srgb&dl=pexels-souvenirpixels-1619317.jpg&fm=jpg' },
      { id: '2', username: '@ana123', text: '¡Genial!', profilePictureUrl: 'https://www.dzoom.org.es/wp-content/uploads/2013/10/image2.jpeg' },
    ]
  },

  {
    id: '2',
    profilePictureUrl: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    name: 'Carla Gonzalez',
    username: '@carlagonzalez',
    description: '¡Me encanta esta aplicación!',
    location: 'Madrid',
    date: '31/10/2024',
    images: [
      'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://www.dzoom.org.es/wp-content/uploads/2013/10/image2.jpeg'
    ],
    likes: 402,
    comments: 20,
    isVip: true, // Usuario VIP
    crownType: 'silver', // Tipo de corona (puedes cambiar este valor para otros tipos de corona)
        commentSection: [
      { id: '1', username: '@juanperez', text: '¡Me encanta esta foto!', profilePictureUrl: 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?cs=srgb&dl=pexels-souvenirpixels-1619317.jpg&fm=jpg' },
      { id: '2', username: '@ana123', text: '¡Genial!', profilePictureUrl: 'https://www.dzoom.org.es/wp-content/uploads/2013/10/image2.jpeg' },
    ]
  },
  {
    id: '3',
    profilePictureUrl: 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?cs=srgb&dl=pexels-souvenirpixels-1619317.jpg&fm=jpg',
    name: 'Josefina Quilmes',
    username: '@josequilmes',
    description: '¡Por fin vacaciones!',
    location: 'Australia',
    date: '29/10/2024',
    images: [
      'https://www.dzoom.org.es/wp-content/uploads/2013/10/image2.jpeg',
      'https://www.dzoom.org.es/wp-content/uploads/2013/10/image2.jpeg'
    ],
    likes: 402,
    comments: 20,
    isVip: true, // Usuario VIP
    crownType: 'gold', // Tipo de corona (puedes cambiar este valor para otros tipos de corona)
  },
  // Agrega más publicaciones aquí
];
