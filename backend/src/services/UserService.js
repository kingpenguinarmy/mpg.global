const { Client } = require('pg'); // PostgreSQL client for database operations
const bcrypt = require('bcrypt'); // Library for password hashing
const jwt = require('jsonwebtoken'); // Library for generating JSON Web Tokens

class UserService {
  constructor() {
    // Initialize PostgreSQL client with connection details
    this.client = new Client({
      connectionString: 'postgresql://Admin:admin@localhost:5432/mpg-alg-data'
    });
    this.client.connect(); // Connect to the database
  }

  /**
   * Fetch a user by their ID.
   * @param {number} userId - The ID of the user.
   * @returns {Object} - The user's data.
   */
  async getUserById(userId) {
    const query = 'SELECT * FROM user_profiles WHERE id = $1';
    const values = [userId];
    const res = await this.client.query(query, values);
    return res.rows[0];
  }

  /**
   * Update a user's profile.
   * @param {number} userId - The ID of the user.
   * @param {Object} newProfileData - The new data for the user's profile.
   */
  async updateUserProfile(userId, newProfileData) {
    const query = 'UPDATE user_profiles SET first_name = $1, last_name = $2 WHERE id = $3';
    const values = [newProfileData.first_name, newProfileData.last_name, userId];
    await this.client.query(query, values);
  }

  /**
   * Fetch all users from the database.
   * @returns {Array} - An array of all users.
   */
  async getAllUsers() {
    const query = 'SELECT * FROM user_profiles';
    const res = await this.client.query(query);
    return res.rows;
  }

  /**
   * Delete a user by their ID.
   * @param {number} userId - The ID of the user.
   */
  async deleteUserById(userId) {
    const query = 'DELETE FROM user_profiles WHERE id = $1';
    const values = [userId];
    await this.client.query(query, values);
  }

  /**
   * Register a new user.
   * @param {Object} userData - The data of the user to be registered.
   * @returns {Object} - A success message.
   */
  async register(userData) {
    // Check if a user with the provided email already exists
    const existingUserQuery = 'SELECT * FROM user_profiles WHERE email = $1';
    const existingUserValues = [userData.email];
    const existingUserRes = await this.client.query(existingUserQuery, existingUserValues);
    if (existingUserRes.rows.length > 0) {
      throw new Error('User already exists');
    }

    // Hash the user's password for security
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    // Insert the new user into the database
    const insertQuery = 'INSERT INTO user_profiles(email, password, first_name, last_name) VALUES($1, $2, $3, $4)';
    const insertValues = [userData.email, hashedPassword, userData.first_name, userData.last_name];
    await this.client.query(insertQuery, insertValues);

    return { message: 'User registered successfully' };
  }

  /**
   * Authenticate and log in a user.
   * @param {Object} credentials - The email and password of the user.
   * @returns {Object} - A JWT for the authenticated user.
   */
  async login(credentials) {
    // Check if a user with the provided email exists
    const userQuery = 'SELECT * FROM user_profiles WHERE email = $1';
    const userValues = [credentials.email];
    const userRes = await this.client.query(userQuery, userValues);
    const user = userRes.rows[0];
    if (!user) {
      throw new Error('User not found');
    }

    // Compare the provided password with the stored hashed password
    const validPassword = await bcrypt.compare(credentials.password, user.password);
    if (!validPassword) {
      throw new Error('Invalid password');
    }

    // Generate a JWT for the authenticated user
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return { token };
  }
}

module.exports = UserService;