const Enquiry = require("../models/Enquiry");

const createEnquiry = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    const enquiry = await Enquiry.create({
      userId: req.user._id,
      name,
      email,
      subject,
      message,
    });

    res.status(201).json(enquiry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json(enquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllEnquiries = async (req, res) => {
  try {
    const { status } = req.query;

    const filter = {};
    if (status) filter.status = status;

    const enquiries = await Enquiry.find(filter)
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(enquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateEnquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["new", "pending", "resolved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }

    enquiry.status = status;
    const updated = await enquiry.save();

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }

    await enquiry.deleteOne();

    res.status(200).json({ message: "Enquiry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createEnquiry,
  getMyEnquiries,
  getAllEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
};
