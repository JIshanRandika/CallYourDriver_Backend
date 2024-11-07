import Driver, { find, findById, findByIdAndUpdate, findByIdAndDelete } from '../models/Driver';

export async function createDriver(req, res) {
  try {
    const driver = new Driver(req.body);
    await driver.save();
    res.status(201).json(driver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getDrivers(req, res) {
  try {
    const drivers = await find();
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getDriver(req, res) {
  try {
    const driver = await findById(req.params.id);
    if (!driver) return res.status(404).json({ message: 'Driver not found' });
    res.json(driver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateDriver(req, res) {
  try {
    const driver = await findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!driver) return res.status(404).json({ message: 'Driver not found' });
    res.json(driver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteDriver(req, res) {
  try {
    const driver = await findByIdAndDelete(req.params.id);
    if (!driver) return res.status(404).json({ message: 'Driver not found' });
    res.json({ message: 'Driver deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
