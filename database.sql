-- Cognito Registration Form Database Schema
-- This file defines the structure for the local registration database.

-- 1. Create the registrations table
CREATE TABLE IF NOT EXISTS registrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullName TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    collegeName TEXT NOT NULL,
    branch TEXT,
    yearOfPassing TEXT,
    selectedCourse TEXT NOT NULL,
    preferredJobRole TEXT,
    cvPath TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Index for faster searching by email (optional)
CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);

-- 3. Sample Insert Query (for reference)
-- INSERT INTO registrations (
--     fullName, email, phone, collegeName, 
--     branch, yearOfPassing, selectedCourse, preferredJobRole
-- ) VALUES (
--     'John Doe', 'john@example.com', '+91 9876543210', 
--     'Example Engineering College', 'Computer Science', 
--     '2025', 'Full Stack Web Development', 'Junior Web Developer'
-- );
