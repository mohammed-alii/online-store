export interface product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  quantity: any
  rating: {
    rate: number;
    count: number;
  };
}
/*
1- check local storage if it has cart array
2- if it has cart array retrieve it
3- after retieval push new product to the existing data retrieved
4- add updated data to local storage again
5- this applys to product, category and cart components
*/
