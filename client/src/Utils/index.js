
export function formatNumber(number) {
    return new Intl.NumberFormat("es-AR", {
        style: "decimal"
    }).format(number)
};

export function filterProducts(state, auxs) {
    let res = state.filter(product => {
        let productCategories = product.categories.map(cat => cat.name)
        return auxs.reduce((prevFilter, nextFilter) => {
            return prevFilter && productCategories.includes(nextFilter);
        }, true);
    });
    return res;
};

export function orderProducts(state, order){
    //sort functionsf

        //ordene por disponibles o se podria hacer con un display none
        switch (order) {
            case 'Name-Asc':
                state = [...state.sort((p1, p2) => {
                    if (p1.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                        > p2.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) return 1;
                    else if (p1.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                        < p2.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) return -1;
                    return 0;
                })]

                break;
            case "Name-Des":
                state = [...state.sort((p1, p2) => {
                    if (p1.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") >
                        p2.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) return -1;
                    else if (p1.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                        < p2.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) return 1;
                    return 0;
                })]

                break;
            case 'Price-Asc':
                state = [...state.sort((p1, p2) => {
                    return p1.price - p2.price;
                })]

                break;
            case 'Price-Des':
                state = [...state.sort((p1, p2) => {
                    return p2.price - p1.price;
                })]

                break;
            default://sort by rating? display favoritos si hay?
                break;
        }
    return state;
};

export function filterCart (item, product) {
    if (item.id === product.id && item.size === product.size) {
        return false;
    }
    return true;
};

export function cartController (Swal, size, stock, quantity) {
    if (size === "" || quantity === 0) {
        return Swal.fire({
            title: 'Seleccioná un talle y una cantidad para continuar',
            showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        });
    } else if (quantity > stock) {
        return Swal.fire({
          title: 'La cantidad excede el limite del producto',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        });
    } else if (quantity < 0) {
        return Swal.fire({
          title: 'Cantidad invalida',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        });      
    } else {
       return true
    }
};