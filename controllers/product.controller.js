const productService = require('../services/products.service');

const getProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error('Erreur dans getProducts :', error.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const createProduct = async (req, res) => {
    try {
        const newProduct = await productService.createProduct(req.body);
        return res.status(201).json(newProduct);
    } catch (err) {
        console.error("Erreur création produit :", err);

        if (err.code === 11000 && err.keyValue) {
            let fields = {};
            Object.keys(err.keyValue).forEach(field => {
                fields[field] = `${field} est déjà utilisé.`;
            });

            return res.status(400).json({
                type: 'DUPLICATE',
                message: 'Un ou plusieurs champs doivent être uniques.',
                fields: fields
            });
        }

        if (err.errors) {
            let fields = {};
            Object.keys(err.errors).forEach(e => {
                if (err.errors[e] && err.errors[e].properties) {
                    fields[e] = err.errors[e].properties.message;
                } else {
                    fields[e] = "Une erreur est survenue.";
                }
            });

            return res.status(400).json({
                type: 'NO_VALID',
                message: 'Formulaire non valide.',
                fields: fields
            });
        }

        return res.status(500).json({
            type: 'UNKNOWN_ERROR',
            message: 'Erreur inattendue.',
            fields: []
        });
    }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await productService.deleteProductById(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    res.status(200).json({ message: "Produit supprimé avec succès" });
  } catch (err) {
    console.error("Erreur suppression produit :", err);
    res.status(500).json({ message: "Erreur lors de la suppression" });
  }
};

module.exports = {
  getProducts,
  createProduct,
  deleteProduct,
};
