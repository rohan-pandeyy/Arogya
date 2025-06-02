-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    age INTEGER NOT NULL,
    gender VARCHAR(10) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Doctors table
CREATE TABLE doctors (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    specialization VARCHAR(100) NOT NULL,
    license_number VARCHAR(50) UNIQUE NOT NULL,
    years_of_experience INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Hospitals table
CREATE TABLE hospitals (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    address_street VARCHAR(255) NOT NULL,
    address_city VARCHAR(100) NOT NULL,
    address_state VARCHAR(100) NOT NULL,
    address_zip VARCHAR(20) NOT NULL,
    address_country VARCHAR(100) NOT NULL,
    contact_number VARCHAR(20) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Doctor-Hospital relationship
CREATE TABLE doctor_hospitals (
    doctor_id INTEGER REFERENCES doctors(id),
    hospital_id INTEGER REFERENCES hospitals(id),
    PRIMARY KEY (doctor_id, hospital_id)
);

-- Exercise sessions table
CREATE TABLE exercise_sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    doctor_id INTEGER REFERENCES doctors(id),
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE,
    exercise_type VARCHAR(100) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Sensor data table (time-series)
CREATE TABLE sensor_data (
    id SERIAL PRIMARY KEY,
    session_id INTEGER REFERENCES exercise_sessions(id),
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    gyro_x FLOAT NOT NULL,
    gyro_y FLOAT NOT NULL,
    gyro_z FLOAT NOT NULL,
    acc_x FLOAT NOT NULL,
    acc_y FLOAT NOT NULL,
    acc_z FLOAT NOT NULL
);

-- Create index on timestamp for faster time-range queries
CREATE INDEX idx_sensor_data_timestamp ON sensor_data(timestamp);
CREATE INDEX idx_sensor_data_session_id ON sensor_data(session_id);

-- Appointments table
CREATE TABLE appointments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    doctor_id INTEGER REFERENCES doctors(id),
    hospital_id INTEGER REFERENCES hospitals(id),
    appointment_time TIMESTAMP WITH TIME ZONE NOT NULL,
    duration_minutes INTEGER NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'scheduled',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_status CHECK (status IN ('scheduled', 'completed', 'cancelled', 'no-show'))
);

-- Ambulance bookings table
CREATE TABLE ambulance_bookings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    pickup_location VARCHAR(255) NOT NULL,
    destination_hospital_id INTEGER REFERENCES hospitals(id),
    booking_time TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_ambulance_status CHECK (status IN ('pending', 'dispatched', 'arrived', 'completed', 'cancelled'))
);

-- Create indexes for common queries
CREATE INDEX idx_appointments_user_id ON appointments(user_id);
CREATE INDEX idx_appointments_doctor_id ON appointments(doctor_id);
CREATE INDEX idx_appointments_hospital_id ON appointments(hospital_id);
CREATE INDEX idx_appointments_time ON appointments(appointment_time);
CREATE INDEX idx_ambulance_bookings_user_id ON ambulance_bookings(user_id);
CREATE INDEX idx_ambulance_bookings_status ON ambulance_bookings(status); 