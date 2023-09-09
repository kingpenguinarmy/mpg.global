const DashboardService = require('../services/DashboardService');
const UserService = require('../services/UserService');
const FinancialService = require('../services/FinancialService');
const AlertService = require('../services/AlertService');

// Real-time tracking of KPIs
exports.getKPIs = async (req, res) => {
  try {
    const kpis = await DashboardService.getKPIs();
    res.status(200).json(kpis);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching KPIs' });
  }
};

// User behavior analytics
exports.getUserAnalytics = async (req, res) => {
  try {
    const analytics = await UserService.getUserAnalytics();
    res.status(200).json(analytics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user analytics' });
  }
};

// Financial metrics
exports.getFinancialMetrics = async (req, res) => {
  try {
    const metrics = await FinancialService.getFinancialMetrics();
    res.status(200).json(metrics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching financial metrics' });
  }
};

// Alert settings for performance anomalies
exports.getAlertSettings = async (req, res) => {
  try {
    const settings = await AlertService.getAlertSettings();
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching alert settings' });
  }
};

// Update alert settings
exports.updateAlertSettings = async (req, res) => {
  try {
    const updatedSettings = await AlertService.updateAlertSettings(req.body);
    res.status(200).json(updatedSettings);
  } catch (error) {
    res.status(500).json({ message: 'Error updating alert settings' });
  }
};