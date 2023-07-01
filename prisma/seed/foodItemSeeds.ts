import { FoodCategory } from '@prisma/client'

interface FoodItemInterface {
  name: string
  price: string
  image: string
  category: FoodCategory
}

export const foodItemSeeds: FoodItemInterface[] = [
  {
    name: 'Samosa',
    price: '5.50',
    image: 'samosa.jpg',
    category: 'starters',
  },
  {
    name: 'Onion Bhaji',
    price: '5.50',
    image: 'onionbhaji.jpg',
    category: 'starters',
  },
  {
    name: 'Popadoms',
    price: '0.75',
    image: 'poppadum.webp',
    category: 'starters',
  },
  {
    name: 'Lamb Dhansk',
    price: '9.50',
    image: 'dhansak.jpg',
    category: 'mains',
  },
  {
    name: 'Chicken Korma',
    price: '7.50',
    image: 'korma.jpg',
    category: 'mains',
  },
  {
    name: 'Chicken Tikka Masala',
    price: '7.50',
    image: 'tikka.jpg',
    category: 'mains',
  },
  {
    name: 'White Rice',
    price: '5.25',
    image: 'whiterice.jpg',
    category: 'sides',
  },
  {
    name: 'Pilau Rice',
    price: '5.25',
    image: 'pilaurice.jpg',
    category: 'sides',
  },
  {
    name: 'Coke',
    price: '5.25',
    image: 'coke.jpg',
    category: 'drinks',
  },
  {
    name: '7up',
    price: '5.25',
    image: '7up.webp',
    category: 'drinks',
  },
]
