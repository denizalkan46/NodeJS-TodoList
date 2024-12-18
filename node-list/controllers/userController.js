const User = require('../models/userModel');

const listUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'username'); // Yalnızca kullanıcı adını döndür
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Kullanıcılar alınırken bir hata oluştu' });
  }
};

module.exports = { listUsers };
