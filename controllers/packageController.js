const Package = require('../models/Package');
const createPackage = async (req, res) => {
  try {
    const { title, description, location, route, price, duration, category, image, availability } = req.body;

    
    if (!title || !description || !location || !price || !duration) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    const newPackage = await Package.create({
      title,
      description,
      location,
      route,
      price,
      duration,
      category,
      image,
      availability,
    });

    res.status(201).json(newPackage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllPackages = async (req, res) => {
  try {
    const { location, minPrice, maxPrice, category, search, page = 1, limit = 10 } = req.query;

  
    const filter = {};

    if (location) {
      filter.location = { $regex: location, $options: 'i' }; 
    }

    if (category) {
      filter.category = { $regex: category, $options: 'i' };
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (search) {
      
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }


    const skip = (Number(page) - 1) * Number(limit);

    const packages = await Package.find(filter)
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Package.countDocuments(filter);

    res.status(200).json({
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      packages,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getPackageById = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);

    if (!pkg) {
      return res.status(404).json({ message: 'Package not found' });
    }

    res.status(200).json(pkg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updatePackage = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);

    if (!pkg) {
      return res.status(404).json({ message: 'Package not found' });
    }

    const { title, description, location, route, price, duration, category, image, rating, availability } = req.body;

    
    pkg.title = title ?? pkg.title;
    pkg.description = description ?? pkg.description;
    pkg.location = location ?? pkg.location;
    pkg.route = route ?? pkg.route;
    pkg.price = price ?? pkg.price;
    pkg.duration = duration ?? pkg.duration;
    pkg.category = category ?? pkg.category;
    pkg.image = image ?? pkg.image;
    pkg.rating = rating ?? pkg.rating;
    pkg.availability = availability ?? pkg.availability;

    const updatedPackage = await pkg.save();

    res.status(200).json(updatedPackage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deletePackage = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);

    if (!pkg) {
      return res.status(404).json({ message: 'Package not found' });
    }

    await pkg.deleteOne();

    res.status(200).json({ message: 'Package deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




module.exports = { createPackage, getAllPackages, getPackageById , updatePackage, deletePackage };