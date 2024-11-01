import Driver from "../models/Driver.js";

export async function addDriver(req, res) {
  try {
    const driver = new Driver(req.body);
    await driver.save();
    res.status(201).send("Driver added");
  } catch (error) {
    res.status(500).json({ message: "Error adding driver", error });
  }
}

export async function suggestDriver(req, res) {
  const { category, vehiclePark } = req.query;
  try {
    const drivers = await Driver.find({ category, vehiclePark, isAvailable: true });
    if (drivers.length === 0) {
      return res.status(404).send("No available drivers");
    }
    const randomDriver = drivers[Math.floor(Math.random() * drivers.length)];
    res.json(randomDriver);
  } catch (error) {
    res.status(500).json({ message: "Error suggesting driver", error });
  }
}
