const getTest = (req, res) => {
    res.json({
        message: "Test route working successfully"
    });
};

module.exports = {
    getTest
};
