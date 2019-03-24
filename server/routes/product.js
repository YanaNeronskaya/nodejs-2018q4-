const router = require('express').Router();
const prouductsController = require('../controllers/products');

router.get('/', (req, res) => {
    prouductsController
        .getAllProducts()
        .then(products => res.json(products));
});

router.post('/', (req, res) => {
    prouductsController
        .createNewProduct()
        .then(() => res.json());
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    prouductsController
        .getProductById(id)
        .then(product => res.json(product), () => res.json(`Error. Product with id "${id}" not found`));
});

router.get('/:id/reviews', (req, res) => {
    const { id } = req.params;

    prouductsController
        .getProductReviewsById(id)
        .then(reviews => res.json(reviews), () => res.json(`Error. Product with id "${id}" not found`));
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    prouductsController
        .deleteProductById(id)
        .then(reviews => res.json(reviews), () => res.json(`Error. Product with id "${id}" not found`));
});

module.exports = router;
