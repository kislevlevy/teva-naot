import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  'Popular Products': [
    {
      name: 'שחר נשים',
      description:
        'דגם אייקוני בעל שתי רצועות קדמיות ושני אבזמים להתאמה ולאחיזה מושלמת של…',
      category: ['נשים', 'כפכפים לנשים'],
      image:
        'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600',
      price: 0,
      ratingsAvg: 4,
      ratingsQuantity: 80,
    },
  ],
  'Special 4 U': [
    {
      name: 'שחר נשים',
      description:
        'דגם אייקוני בעל שתי רצועות קדמיות ושני אבזמים להתאמה ולאחיזה מושלמת של…',
      category: ['נשים', 'כפכפים לנשים'],
      image:
        'https://www.tevanaot.co.il/media/catalog/product/cache/0d1eeda344e585470b8d983c25fb14e2/1/0/101101-382-01_1_11.jpg',
      price: 0,
      ratingsAvg: 4,
      ratingsQuantity: 80,
    },
    {
      name: 'שחר נשים',
      description:
        'דגם אייקוני בעל שתי רצועות קדמיות ושני אבזמים להתאמה ולאחיזה מושלמת של…',
      category: ['נשים', 'כפכפים לנשים'],
      image:
        'https://www.tevanaot.co.il/media/catalog/product/cache/0d1eeda344e585470b8d983c25fb14e2/1/0/101101-382-01_1_11.jpg',
      price: 0,
      ratingsAvg: 4,
      ratingsQuantity: 80,
    },
    {
      name: 'שחר נשים',
      description:
        'דגם אייקוני בעל שתי רצועות קדמיות ושני אבזמים להתאמה ולאחיזה מושלמת של…',
      category: ['נשים', 'כפכפים לנשים'],
      image:
        'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600',
      price: 0,
      ratingsAvg: 4,
      ratingsQuantity: 80,
    },
  ],
  'New Collection': [
    {
      name: 'שחר נשים',
      description:
        'דגם אייקוני בעל שתי רצועות קדמיות ושני אבזמים להתאמה ולאחיזה מושלמת של…',
      category: ['נשים', 'כפכפים לנשים'],
      image:
        'https://www.tevanaot.co.il/media/catalog/product/cache/0d1eeda344e585470b8d983c25fb14e2/1/0/101101-382-01_1_11.jpg',
      price: 0,
      ratingsAvg: 4,
      ratingsQuantity: 80,
    },
    {
      name: 'שחר נשים',
      description:
        'דגם אייקוני בעל שתי רצועות קדמיות ושני אבזמים להתאמה ולאחיזה מושלמת של…',
      category: ['נשים', 'כפכפים לנשים'],
      image:
        'https://www.tevanaot.co.il/media/catalog/product/cache/0d1eeda344e585470b8d983c25fb14e2/1/0/101101-382-01_1_11.jpg',
      price: 0,
      ratingsAvg: 4,
      ratingsQuantity: 80,
    },
  ],
};

const popularProductsSlice = createSlice({
  name: 'popularProducts',
  initialState,
  reducers: {
    updatePopularProducts(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export default popularProductsSlice.reducer;

export const { updatePopularProducts } = popularProductsSlice.actions;
