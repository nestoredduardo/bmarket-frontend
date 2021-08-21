const productsNode = document.getElementById('List');
const loading = document.getElementById('Loading');

let paginationNode = document.querySelectorAll('#Pagination_number');
paginationNode = [...paginationNode];

const categoriesNode = document.getElementById('Category_list');

const menuBtn = document.getElementById('Menu__button');
const cerrarBtn = document.getElementById('Close_category');
const categoryBtn = document.getElementById('Category_button');

let data = {};

const getProducts = async (page = 1, category = 1) => {
  loading.classList.add('display');
  productsNode.innerHTML = '';

  const url = `https://aqueous-wildwood-80798.herokuapp.com/products?page=${page}&category=${category}`;

  const response = await fetch(url);
  data = await response.json();

  if (data.error) {
    const h1 = document.createElement('h1');
    h1.textContent = 'Hubo un error, Intente más tarde';
    h1.classList.add('Error_message', 'text_center');

    const image = document.createElement('img');
    image.classList.add('Error_img');
    image.src = './src/assets/error_image.jpg';

    productsNode.append(h1, image);
  } else {
    const productList = data.body.data;
    const npages = data.body.meta.npages;

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
        image.classList.add('Error_message');
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

    createPagination(npages, category);
  }

  loading.classList.remove('display');

  console.log(data);
};

const createPagination = (npages, category) => {
  paginationNode.forEach((item) => {
    item.innerHTML = '';
    let allPages = [];
    for (i = 0; i < npages; i++) {
      const page = document.createElement('span');
      const number = i + 1;
      page.textContent = number;
      page.addEventListener('click', () => {
        getProducts(number, category);
      });

      allPages.push(page);
    }

    item.append(...allPages);
  });
};

const getCategories = async () => {
  const response = await fetch(
    `https://aqueous-wildwood-80798.herokuapp.com/categories`
  );
  data = await response.json();
  const { categories } = data.body;

  console.log(data);

  let allCategories = [];
  categories.forEach((item) => {
    const name = document.createElement('h1');
    name.textContent = item.name;
    name.addEventListener('click', () => {
      getProducts(1, item.id);
    });

    allCategories.push(name);
  });

  categoriesNode.append(...allCategories);
};

menuBtn.addEventListener('click', () => {
  categoriesNode.classList.add('active');
});

cerrarBtn.addEventListener('click', () => {
  categoriesNode.classList.remove('active');
});

getProducts();
getCategories();

categoryBtn.addEventListener('mouseover', () => {
  categoriesNode.classList.add('display');
  categoryBtn.removeEventListener('mouseleave');
});

categoriesNode.addEventListener('mouseover', () => {
  categoriesNode.classList.add('display');
});

categoriesNode.addEventListener('mouseleave', () => {
  categoriesNode.classList.remove('display');
  categoryBtn.addEventListener('mouseleave', () => {
    categoriesNode.classList.remove('display');
  });
});
