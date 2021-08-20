const productsNode = document.getElementById('List');
const loading = document.getElementById('Loading');

let data = {};

const getProducts = async (page = 1, category = 1) => {
  loading.classList.add('display');

  const response = await fetch(
    `https://aqueous-wildwood-80798.herokuapp.com/product?page=${page}&category=${category}`
  );
  data = await response.json();

  if (data.error) {
    const h1 = document.createElement('h1');
    h1.textContent = 'Hubo un error, Intente más tarde';

    const image = document.createElement('img');
    image.classList.add('Product__img');
    image.src = './src/assets/error_image.jpg';

    productsNode.append(h1, image);
  } else {
    const productList = data.body.data;

    let allItems = [];
    productList.forEach((item) => {
      let image;
      if (item.url_image) {
        image = document.createElement('img');
        image.classList.add('Product__img');
        image.src = item.url_image;
      } else {
        image = document.createElement('h1');
        image.textContent = 'Imagen no disponible';
      }

      const title = document.createElement('h2');
      title.classList.add('Product__title');
      title.textContent = item.name;

      const price = document.createElement('div');
      price.classList.add('Product__price');
      price.textContent = item.price;

      const container = document.createElement('div');
      container.classList.add('Product');
      container.append(image, title, price);

      allItems.push(container);
    });

    productsNode.append(...allItems);
  }

  loading.classList.remove('display');

  console.log(data);
};

getProducts();
