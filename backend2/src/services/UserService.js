const { Client } = require('pg'); // PostgreSQL client

class UserService {
  constructor() {
    // Initialize PostgreSQL client
    this.client = new Client({
      connectionString: 'postgresql://Admin:admin@localhost:5432/mpg-alg-data'
    });
    this.client.connect();
  }

  // Fetch user by ID
  async getUserById(userId) {
    const query = 'SELECT * FROM user_profiles WHERE id = $1';
    const values = [userId];
    const res = await this.client.query(query, values);
    return res.rows[0];
  }

  // Update user profile
  async updateUserProfile(userId, newProfileData) {
    const query = 'UPDATE user_profiles SET first_name = $1, last_name = $2 WHERE id = $3';
    const values = [newProfileData.first_name, newProfileData.last_name, userId];
    await this.client.query(query, values);
  }

  // Fetch all users
  async getAllUsers() {
    const query = 'SELECT * FROM user_profiles';
    const res = await this.client.query(query);
    return res.rows;
  }

  // Delete user by ID
  async deleteUserById(userId) {
    const query = 'DELETE FROM user_profiles WHERE id = $1';
    const values = [userId];
    await this.client.query(query, values);
  }

  // Other user-related methods can be added here
}

module.exports = UserService;