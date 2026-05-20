const { getDashboardService } = require('../services/dashboard.service');

const getDashboard = async (req, res) => {
    try {
        const data = await getDashboardService(req.userId);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { getDashboard };