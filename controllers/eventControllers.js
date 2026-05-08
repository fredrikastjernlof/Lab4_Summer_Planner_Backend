// Protected test route

const getProtectedData = async (req, res) => {
    res.status(200).json({ message: 'This is protected data', user: req.user });
};

module.exports = {
    getProtectedData
};