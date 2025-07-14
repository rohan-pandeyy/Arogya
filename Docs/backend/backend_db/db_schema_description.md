# Database Schema Documentation

This document describes the structure and relationships between the core tables in the system. The schema is designed to support user management, healthcare facilities, doctor appointments, emergency services, physiotherapy sessions, and transaction tracking.



## Table: `users`

Holds basic authentication and profile information for all users.

**Fields:**
- `id`: Primary key (UUID)
- `name`: Full name
- `email`: Unique email address
- `password`: Hashed password
- `phone`: Contact number
- `role`: Role of the user (`patient`, `doctor`, `staff`, `admin`)
- `created_at`: Timestamp of account creation

**Relationships:**
- Linked to `patients`, `doctors`, and `staff` via one-to-one associations



## Table: `patients`

Stores medical-specific information for users with the `patient` role.

**Fields:**
- `id`: References `users.id`
- `date_of_birth`, `gender`, `blood_type`, `address`

**Relationships:**
- Has many `appointments`, `physio_sessions`, `ambulance_requests`, and `workout_plans`
- Assigned `physio_devices`



## Table: `doctors`

Stores information about medical professionals.

**Fields:**
- `id`: References `users.id`
- `specialization`, `license_number`, `years_experience`

**Relationships:**
- Linked to multiple `facilities` through `doctor_facilities`
- Linked to `appointments`, `physio_sessions`, and `workout_plans`
- Scheduled via `doctor_schedules`



## Table: `staff`

Represents receptionists or admin users associated with a facility.

**Fields:**
- `id`: References `users.id`
- `facility_id`: References `facilities.id`
- `role`: Either `receptionist` or `admin`



## Table: `facilities`

Generalized table for clinics or hospitals.

**Fields:**
- `id`: Primary key
- `name`, `address`, `phone`
- `type`: Either `clinic` or `hospital`

**Relationships:**
- Linked to `appointments`, `doctor_schedules`, and `staff`
- Doctors are associated via `doctor_facilities`



## Table: `doctor_facilities`

Many-to-many relationship between doctors and facilities.

**Fields:**
- `id`: Primary key
- `doctor_id`: References `doctors.id`
- `facility_id`: References `facilities.id`



## Table: `doctor_schedules`

Defines the weekly availability of doctors per facility.

**Fields:**
- `id`: Primary key
- `doctor_id`, `facility_id`
- `day_of_week`, `start_time`, `end_time`



## Table: `appointments`

Represents scheduled medical appointments.

**Fields:**
- `id`: Primary key
- `patient_id`, `doctor_id`, `facility_id`
- `scheduled_at`: Date and time of appointment
- `status`: `scheduled`, `completed`, or `cancelled`
- `notes`: Optional comments



## Table: `ambulances`

Represents available emergency vehicles.

**Fields:**
- `id`: Primary key
- `plate_number`, `driver_name`, `current_location`, `status`



## Table: `ambulance_requests`

Emergency transport requests from patients.

**Fields:**
- `id`: Primary key
- `patient_id`, `ambulance_id`
- `pickup_location`, `destination`
- `requested_at`, `status`



## Table: `physio_sessions`

Scheduled physiotherapy sessions between patient and therapist.

**Fields:**
- `id`: Primary key
- `patient_id`, `therapist_id`
- `scheduled_at`, `status`, `joint`, `notes`



## Table: `joint_motion_logs`

Sensor logs tracking joint movement during physio sessions.

**Fields:**
- `id`: Primary key
- `session_id`: References `physio_sessions.id`
- `timestamp`, `joint`, `angle`, `repetition`



## Table: `workout_plans`

Exercise plans created for patients based on their rehab needs.

**Fields:**
- `id`: Primary key
- `patient_id`, `created_by` (doctor)
- `joint`, `start_date`, `end_date`, `notes`



## Table: `plan_exercises`

Individual exercises included in a workout plan.

**Fields:**
- `id`: Primary key
- `plan_id`: References `workout_plans.id`
- `name`, `target_reps`, `target_angle`, `day_of_week`



## Table: `rehab_progress`

Aggregated progress metrics for a workout plan.

**Fields:**
- `id`: Primary key
- `plan_id`: References `workout_plans.id`
- `completed_reps`, `average_angle`, `compliance_rate`, `last_updated`



## Table: `transactions`

Tracks payments for services (appointments, ambulance, physio).

**Fields:**
- `id`: Primary key
- `user_id`: References `users.id`
- `service_type`: Type of service
- `service_id`: ID of the linked service
- `amount`, `status`, `created_at`



## Table: `messages`

Direct messages exchanged between users.

**Fields:**
- `id`: Primary key
- `sender_id`, `receiver_id`
- `content`, `sent_at`



## Table: `notifications`

System-generated alerts or reminders for users.

**Fields:**
- `id`: Primary key
- `user_id`: References `users.id`
- `message`, `type`, `created_at`, `read`



## Summary of Key Relationships

- `users` is the base table extended by `patients`, `doctors`, and `staff`.
- `facilities` host `doctors` and `staff`, and are involved in `appointments`.
- `appointments` link `patients`, `doctors`, and `facilities`.
- `doctor_facilities` manages many-to-many doctor affiliations.
- `physio_sessions`, `joint_motion_logs`, and `workout_plans` form the physiotherapy workflow.
- `ambulance_requests` and `transactions` support emergency services and billing.



This schema is modular, scalable, and adaptable for both web and mobile platforms used in the Arogya healthcare system.
