const userService = require('../services/users.service');

const getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error('Erreur dans getUsers:', error.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const createUser = async (req, res) => {
    try {
        const newUser = await userService.createUser(req.body);
        return res.status(201).json(newUser);
    } catch (err) {
        console.error("Erreur création joueur :", err);

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

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await userService.deleteUserById(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (err) {
    console.error("Erreur suppression user :", err);
    res.status(500).json({ message: "Erreur lors de la suppression" });
  }
};

module.exports = {
  getUsers,
  createUser,
  deleteUser,
};
