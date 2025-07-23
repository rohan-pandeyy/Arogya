const { PhysioSession, Patient, Doctor, User } = require('../models');

/**
 * @desc    Create a new physiotherapy session.
 *          - Patients create sessions for themselves.
 *          - Doctors and Admins can create sessions for any patient.
 * @route   POST /api/physio
 * @access  Private (Patient, Doctor, Admin)
 */
const createSession = async (req, res) => {
  const { patientId, therapistId, scheduledAt, joint, notes } = req.body;
  const { id: requesterId, Roles: requesterRoles } = req.user;
  const roles = requesterRoles.map((r) => r.name);

  try {
    const sessionData = { scheduledAt, joint, notes };

    if (roles.includes('patient')) {
      // Patients create sessions for themselves. therapistId is optional.
      sessionData.patientId = requesterId;
      if (therapistId) {
        sessionData.therapistId = therapistId;
      }
    } else if (roles.includes('doctor') || roles.includes('admin')) {
      // Doctors or Admins create sessions for a patient.
      if (!patientId) {
        return res
          .status(400)
          .json({ message: 'A patientId is required to create a session.' });
      }
      sessionData.patientId = patientId;
      if (therapistId) {
        sessionData.therapistId = therapistId;
      }
    } else {
      // This case should not be reached due to hasRole middleware, but it's a safeguard.
      return res
        .status(403)
        .json({ message: 'You do not have permission to create a session.' });
    }

    const newSession = await PhysioSession.create(sessionData);
    res.status(201).json(newSession);
  } catch (error) {
    console.error('Error creating physiotherapy session:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * @desc    Get a single physiotherapy session by its ID.
 *          - A Patient can only view their own session.
 *          - A Doctor can only view a session assigned to them.
 *          - An Admin can view any session.
 * @route   GET /api/physio/:id
 * @access  Private
 */
const getSessionById = async (req, res) => {
  const { id: sessionId } = req.params;
  const { id: requesterId, Roles: requesterRoles } = req.user;
  const roles = requesterRoles.map((r) => r.name);

  try {
    const session = await PhysioSession.findByPk(sessionId, {
      include: [
        {
          model: Patient,
          as: 'patient',
          include: [{ model: User, attributes: ['name', 'email'] }],
        },
        {
          model: Doctor,
          as: 'therapist',
          include: [{ model: User, attributes: ['name', 'email'] }],
        },
      ],
    });

    if (!session) {
      return res.status(404).json({ message: 'Session not found.' });
    }

    // Authorization check
    const isPatientOwner =
      roles.includes('patient') && session.patientId === requesterId;
    const isAssignedTherapist =
      roles.includes('doctor') && session.therapistId === requesterId;
    const isAdmin = roles.includes('admin');

    if (!isPatientOwner && !isAssignedTherapist && !isAdmin) {
      return res
        .status(403)
        .json({ message: 'You are not authorized to view this session.' });
    }

    res.status(200).json(session);
  } catch (error) {
    console.error('Error fetching session by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * @desc    Get all sessions for the currently logged-in patient.
 * @route   GET /api/physio/patient/sessions
 * @access  Private (Patient)
 */
const getPatientSessions = async (req, res) => {
  try {
    const sessions = await PhysioSession.findAll({
      where: { patientId: req.user.id },
      order: [['scheduledAt', 'DESC']],
      include: [
        {
          model: Doctor,
          as: 'therapist',
          include: [{ model: User, attributes: ['name', 'email'] }],
        },
      ],
    });
    res.status(200).json(sessions);
  } catch (error) {
    console.error('Error fetching patient sessions:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * @desc    Get all sessions assigned to a specific doctor.
 *          - A Doctor can only view their own sessions.
 *          - An Admin can view any doctor's sessions.
 * @route   GET /api/physio/doctor/:doctorId
 * @access  Private (Doctor, Admin)
 */
const getDoctorSessions = async (req, res) => {
  const { doctorId } = req.params;
  const { id: requesterId, Roles: requesterRoles } = req.user;
  const roles = requesterRoles.map((r) => r.name);

  try {
    // A doctor can only view their own sessions. Admins can view any.
    if (roles.includes('doctor') && requesterId !== doctorId) {
      return res
        .status(403)
        .json({ message: 'You can only view your own assigned sessions.' });
    }

    const sessions = await PhysioSession.findAll({
      where: { therapistId: doctorId },
      order: [['scheduledAt', 'DESC']],
      include: [
        {
          model: Patient,
          as: 'patient',
          include: [{ model: User, attributes: ['name', 'email'] }],
        },
      ],
    });

    res.status(200).json(sessions);
  } catch (error) {
    console.error('Error fetching doctor sessions:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * @desc      Delete a physiotherapy session.
 * - A Doctor can only delete a session assigned to them.
 * - An Admin can delete any session.
 * @route     DELETE /api/physio/:id
 * @access    Private (Doctor, Admin)
 */
const deleteSession = async (req, res) => {
  const { id: sessionId } = req.params;
  const { id: requesterId, Roles: requesterRoles } = req.user;
  const roles = requesterRoles.map((r) => r.name);

  try {
    const session = await PhysioSession.findByPk(sessionId);

    if (!session) {
      return res.status(404).json({ message: 'Session not found.' });
    }

    // Authorization check
    const isAssignedTherapist =
      roles.includes('doctor') && session.therapistId === requesterId;
    const isAdmin = roles.includes('admin');

    if (!isAssignedTherapist && !isAdmin) {
      return res
        .status(403)
        .json({ message: 'User not authorized to delete this session.' });
    }

    // Proceed with deletion
    await session.destroy();

    res
      .status(200)
      .json({ message: 'Physiotherapy session deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while deleting session.' });
  }
};

module.exports = {
  createSession,
  getSessionById,
  getPatientSessions,
  getDoctorSessions,
  deleteSession,
};
