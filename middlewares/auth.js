const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    try {
        const token = req.header("Authorization");
        console.log("Token reçu :", token); // 🔍 Debug

        if (!token) return res.status(400).json({ msg: "Invalid Authorization" });

        if (!token.startsWith("Bearer ")) {
            console.log("⚠️ Mauvais format du token :", token);
            return res.status(400).json({ msg: "Format du token invalide" });
        }

        const tokenWithoutBearer = token.split(" ")[1];
        console.log("Token après suppression de 'Bearer':", tokenWithoutBearer); // 🔍 Debug

        jwt.verify(tokenWithoutBearer, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                console.log("⚠️ Erreur de vérification du token :", err.message);
                return res.status(400).json({ msg: "Invalid Authorization" });
            }

            req.user = user;
            next();
        });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

module.exports = auth;
