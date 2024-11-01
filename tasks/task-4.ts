class Product {
    constructor(public id: number, public name: string, public price: number) {}
}

class Order {
    public status: string;

    constructor(public id: number, public products: Product[]) {
        this.status = 'Оформлен';
    }

    totalAmount(): number {
        return this.products.reduce((total, product) => total + product.price, 0);
    }

    changeStatus(newStatus: string) {
        this.status = newStatus;
    }
}

class Cart {
    private items: Product[] = [];

    addToCart(product?: Product) {
        if (product) {
            this.items.push(product);
            console.log(`Продукт ${product.name} добавлен в корзину`);
        }
    }

    removeFromCart(productId: number) {
        this.items = this.items.filter(product => product.id !== productId);
        console.log(`Продукт с ID ${productId} удален из корзины`);
    }

    checkCart() {
        return this.items;
    }

    clearCart() {
        if (!this.items.length) {
            return;
        }
        this.items = [];
        console.log('Корзина очищена');
    }
}

class OrderManager {
    private orders: Order[] = [];

    createOrder(products: Product[]){
        if (!products.length) {
            console.log('Невозможно создать заказ, добвьте товары в корзину');
            return null;
        }
        const newOrder = new Order(this.orders.length + 1, products);
        this.orders.push(newOrder);
        console.log(`Заказ #${newOrder.id} создан`);
        return newOrder;
    }

    changeOrderStatus(orderId: number, newStatus: string) {
        const order = this.orders.find(o => o.id === orderId);
        if (order) {
            order.changeStatus(newStatus);
            console.log(`Заказ ${orderId} изменил статус на ${newStatus}`);
        } else {
            console.log(`Заказ ${orderId} не найден`);
        }
    }

    public getOrders() {
        return this.orders;
    }
}

class ProductManager {
    products: Product[];
    constructor() {
        this.products = [];
    }

    addProduct(product: Product) {
        this.products.push(product);
        console.log(`Продукт ${product.name} добавлен`);
    }

    removeProduct(productId: number) {
        this.products = this.products.filter(product => product.id !== productId);
        console.log(`Продукт ${productId} удален`);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id: number) {
        return this.products.find(product => product.id === id);
    }
}

const productManager = new ProductManager();
const orderManager = new OrderManager();
const cart = new Cart();

productManager.addProduct(new Product(1, 'Штаны', 200));
productManager.addProduct(new Product(2, 'Рубашка', 777));
productManager.addProduct(new Product(3, 'Телефон', 555));

console.log('Доступные продукты:', productManager.getProducts());

cart.addToCart(new Product(1, 'Штаны', 200));
cart.addToCart(new Product(2, 'Телефон', 55555));

cart.removeFromCart(2);
console.log('Корзина:', cart.checkCart());

const order1 = orderManager.createOrder(cart.checkCart());
cart.clearCart();

productManager.removeProduct(2);
cart.addToCart(productManager.getProductById(2));
cart.addToCart(productManager.getProductById(3));

const order2 = orderManager.createOrder(cart.checkCart());
cart.clearCart();
if (order1 && order2) {
    console.log(`Cумма заказа 1: ${order1.totalAmount()}`);
    console.log(`Cумма заказа 2: ${order2.totalAmount()}`);
    orderManager.changeOrderStatus(order1.id, 'На сборке');
}

console.log('Текущие заказы:', orderManager.getOrders());


