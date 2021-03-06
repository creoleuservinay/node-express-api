const Tour = require('../models/tourModel');

exports.getAllTours = async (req, res) => {
  try {
    const allTours = await Tour.find({});
    res.status(200).json({
      message: 'Available Tours',
      total: allTours.length,
      status: 'Success',
      data: {
        tours: allTours,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: 'No result found!!',
      status: 'Fail',
      data: null,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(200).json({
      message: 'Tour created successfully',
      status: 'Success',
      data: newTour,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      data: error,
      message: 'Something went wrong!!',
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const { id } = req.params;
    await Tour.deleteOne({ _id: id });
    res.status(200).json({
      message: 'Tour deleted successfully',
      status: 'Success',
    });
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      data: error,
      message: 'Something went wrong',
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await Tour.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      message: 'Tour updated successfully',
      status: 'Success',
      data: tour,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      data: error,
      message: 'Something went wrong please check the inputs',
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const { id } = req.params;
    const getTour = await Tour.findById(id);
    res.status(200).json({
      message: 'Tour data found',
      status: 'Success',
      data: getTour,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      data: error,
      message: 'Something went wrong',
    });
  }
};
