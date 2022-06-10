import Robotics from "../models/Robotics.js"

export const createRobot = async (req, res, next) => {
    const newRobot = new Robotics(req.body);
    try {
       const savedRobot = await newRobot.save();
       res.status(200).json(savedRobot) 
    } catch (error) {
      next(err);
    }
  };


export const updateRobot = async (req, res, next) => {
    try {
      const updatedRobots = await Robotics.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedRobots);
    } catch (err) {
      next(err);
    }
  };

export const deleteRobot = async (req, res, next) => {
    try {
      await Robotics.findByIdAndDelete(req.params.id);
      res.status(200).json("Robot has been deleted.");
    } catch (err) {
      next(err);
    }
  };


  export const getRobots = async (req, res, next) => {
    
    try {
      const robots = await Robotics.find({})
      res.status(200).json(robots);
    } catch (err) {
      next(err);
    }
  };