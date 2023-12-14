const saveStorage = (cart) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('shopping-cart', JSON.stringify(cart));
    }
}

const getStorage = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('shopping-cart') ? JSON.parse(localStorage.getItem('shopping-cart')) : [];
    } else {
        return [];
    }
}

export { saveStorage, getStorage }