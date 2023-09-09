const mysql = require('mysql');

// Initialize database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'Admin',
  password: 'admin',
  database: 'mpg-alg-data'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});

class DashboardService {

  // Fetch KPIs
  getKPIs() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM kpi_table';
      this.db.query(query, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  // Fetch User Behavior Analytics
  getUserBehavior() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM user_behavior_table';
      this.db.query(query, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  // Fetch Financial Metrics
  getFinancialMetrics() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM financial_metrics_table';
      this.db.query(query, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  // Fetch Alert Settings
  getAlertSettings() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM alert_settings_table';
      this.db.query(query, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = DashboardService;