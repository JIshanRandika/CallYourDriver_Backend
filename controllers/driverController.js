import Driver from '../models/Driver.js';
// import moment from 'moment';
import moment from 'moment-timezone';

// Create a new driver
export const createDriver = async (req, res) => {
  try {
    const {
      name,
      contactNumber,
      vehicleNumber,
      availableDays,
      availabilityStartTime,
      availabilityEndTime,
      currentAvailability,
      category,
      parkName,
      points
    } = req.body;

    const driver = new Driver({
      name,
      contactNumber,
      vehicleNumber,
      availableDays,
      availabilityStartTime,
      availabilityEndTime,
      currentAvailability,
      category,
      parkName,
      points
    });

    await driver.save();
    res.status(201).json(driver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all drivers
export const getDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single driver by ID
export const getDriver = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver) return res.status(404).json({ message: 'Driver not found' });
    res.json(driver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a driver by ID
export const updateDriver = async (req, res) => {
  try {
    const updates = {
      name: req.body.name,
      contactNumber: req.body.contactNumber,
      vehicleNumber: req.body.vehicleNumber,
      availableDays: req.body.availableDays,
      availabilityStartTime: req.body.availabilityStartTime,
      availabilityEndTime: req.body.availabilityEndTime,
      currentAvailability: req.body.currentAvailability,
      category: req.body.category,
      parkName: req.body.parkName,
      points: req.body.points
    };

    const driver = await Driver.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!driver) return res.status(404).json({ message: 'Driver not found' });
    res.json(driver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a driver by ID
export const deleteDriver = async (req, res) => {
  try {
    const driver = await Driver.findByIdAndDelete(req.params.id);
    if (!driver) return res.status(404).json({ message: 'Driver not found' });
    res.json({ message: 'Driver deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// // Suggest a driver
// export const suggestDriver = async (req, res) => {
//   // console.log(req.body);
//   const { category, parkName } = req.body;
//   const currentTime = moment();
//   const todayDay = currentTime.format('dddd'); // Get today's day name (e.g., "Monday", "Tuesday")

//   try {
//     let drivers = await Driver.find({
//       category,
//       parkName,
//       currentAvailability: true,
//       points: { $gte: 10 },
//     });

//     drivers = drivers.filter(driver => {
//       const startTime = moment(driver.availabilityStartTime, 'HH:mm');
//       const endTime = moment(driver.availabilityEndTime, 'HH:mm');
//       const isAvailableToday = driver.availableDays.includes(todayDay);
//       console.log(startTime)
//       console.log(endTime)
//       console.log(todayDay)
//       return isAvailableToday && currentTime.isBetween(startTime, endTime);
//     });

//     if (drivers.length === 0) {
//       return res.status(404).json({ message: 'No drivers available matching criteria' });
//     }

//     // Sort by dailySuggestions to ensure fair daily distribution
//     drivers.sort((a, b) => a.dailySuggestions - b.dailySuggestions);

//     // Select driver with the fewest daily suggestions
//     const selectedDriver = drivers[0];
//     // selectedDriver.points -= 10;  // Deduct points
//     selectedDriver.dailySuggestions += 1;  // Increment daily count
//     selectedDriver.totalSuggestions += 1;  // Increment total count

//     await selectedDriver.save();

//     return res.json({
//       message: 'Driver suggested successfully',
//       driver: {
//         name: selectedDriver.name,
//         contactNumber: selectedDriver.contactNumber,
//         vehicleNumber: selectedDriver.vehicleNumber,
//       },
//     });
//   } catch (error) {
//     console.error('Error suggesting driver:', error);
//     res.status(500).json({ message: 'Server error suggesting driver' });
//   }
// };

export const suggestDriver = async (req, res) => {
  console.log("suggestDriver")
  const { category, parkName } = req.body;
  // Specify your desired timezone, e.g., 'Asia/Colombo'

  // Specify your desired timezone, e.g., 'Asia/Colombo'
  const timezone = 'Asia/Colombo';

  // Get the current time as a moment object
  const currentMoment = moment().tz(timezone);

  // Format the date as a string
  const currentTime = currentMoment.format();

  // Get the day of the week
  const todayDay = currentMoment.format('dddd');

  try {
    // Initial database query
    let drivers = await Driver.find({
      category,
      parkName,
      currentAvailability: true,
      points: { $gte: 10 },
    });

    function sortDriversByDailySuggestions(originalArray) {
      return new Promise((resolve) => {
        // Create a sorted copy of the array
        const sortedArray = [...originalArray].sort((a, b) => 
          a.driver.dailySuggestions - b.driver.dailySuggestions
        );
        
        // Simulate a potential async operation with a small delay
        setTimeout(() => {
          resolve(sortedArray);
        }, 100); // Small delay to mimic potential async sorting
      });
    }

    const filterDriversAsync = async (drivers) => {
      console.log("filterDriversAsync")

      const availableDrivers = [];

      await Promise.all(drivers.map(async (driver) => {
        try {
            const startTime = moment(driver.availabilityStartTime, 'HH:mm');
            const endTime = moment(driver.availabilityEndTime, 'HH:mm');
            const isAvailableToday = driver.availableDays.includes(todayDay);
            
            // console.log('Driver:', driver.name);
            // console.log('Start Time:', startTime.format('HH:mm'));
            // console.log('End Time:', endTime.format('HH:mm'));
            // console.log('Current Time:', currentMoment.format('HH:mm'));
            // console.log(currentMoment.format('HH:mm') >= startTime.format('HH:mm') && currentMoment.format('HH:mm') <= endTime.format('HH:mm'))
            // console.log('Today:', todayDay);
            
            const result = {
                driver,
                isAvailable: isAvailableToday && currentMoment.isBetween(startTime, endTime)
            };
            // console.log("condition isAvailableToday")
            // console.log(isAvailableToday)
            // console.log("currentTime")
            // console.log(currentTime)
            // console.log("condition currentTime")
            // console.log(currentMoment.isBetween(startTime, endTime, 'minute'));

            if(currentMoment.format('HH:mm') >= startTime.format('HH:mm') && currentMoment.format('HH:mm') <= endTime.format('HH:mm')){
              availableDrivers.push(result); // Push the result to the array
            }
            return result;
            
        } catch (error) {
            console.error(`Error processing driver ${driver._id}:`, error);
            const errorResult = { driver, isAvailable: false };
            availableDrivers.push(errorResult); // Push error result to array
            return errorResult;
        }
    }));
    
      // Create a new array to store available drivers
      
      
      // Filter and add available drivers to the array
      // filterResults
      //   .filter(result => result.isAvailable)
      //   .forEach(result => {
      //     console.log("push")
      //     availableDrivers.push(result.driver);
      //   });
    
      // Return the array of available drivers
      return availableDrivers;
    };

    // Apply async filtering
    const availableDrivers = await filterDriversAsync(drivers);
    // console.log(availableDrivers)

    if (availableDrivers.length == 0) {
      return res.status(404).json({ 
        message: 'No drivers available matching criteria'
      });
    }

    console.log("availableDrivers")
    console.log(availableDrivers)

    // Sort by dailySuggestions for fair distribution
    // const sortedArray = availableDrivers.sort((a, b) => a.dailySuggestions - b.dailySuggestions);
    const sortedArray = await sortDriversByDailySuggestions(availableDrivers);


    console.log("sortedArray")
    console.log(sortedArray)

    // Select and update driver with fewest suggestions
    const selectedDriver = sortedArray[0].driver;
    
    // Update driver statistics
    const updatedDriver = await Driver.findByIdAndUpdate(
      selectedDriver._id,
      {
        $inc: {
          dailySuggestions: 1,
          totalSuggestions: 1
        }
      },
      { new: true }
    );

    if (!updatedDriver) {
      return res.status(404).json({
        message: 'Selected driver no longer available'
      });
    }

    return res.json({
      message: 'Driver suggested successfully',
      driver: {
        name: updatedDriver.name,
        contactNumber: updatedDriver.contactNumber,
        vehicleNumber: updatedDriver.vehicleNumber,
      },
    });

  } catch (error) {
    console.error('Error suggesting driver:', error);
    return res.status(500).json({ 
      message: 'Server error suggesting driver',
      error: error.message 
    });
  }
};

// Deduct 10 points from a driver based on contact number
export const deductPointsByContactNumber = async (req, res) => {
  const { contactNumber } = req.body;

  if (!contactNumber) {
    return res.status(400).json({ message: 'Contact number is required' });
  }

  try {
    // Find the driver by contact number
    const driver = await Driver.findOne({ contactNumber });

    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    // Check if the driver has enough points
    if (driver.points < 10) {
      return res.status(400).json({ message: 'Not enough points to deduct' });
    }

    // Deduct 10 points
    driver.points -= 10;

    // Save the updated driver object
    await driver.save();

    // Send a success response
    res.json({
      message: 'Points deducted successfully',
      driver: {
        name: driver.name,
        contactNumber: driver.contactNumber,
        points: driver.points,
      },
    });
  } catch (error) {
    console.error('Error deducting points:', error);
    res.status(500).json({ message: 'Server error deducting points' });
  }
};

// Toggle current availability via URL
export const toggleAvailabilityViaURL = async (req, res) => {
  try {
    const { id } = req.params; // Get driver ID from the URL

    // Find the driver by ID
    const driver = await Driver.findById(id);
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    // Toggle the currentAvailability value
    driver.currentAvailability = !driver.currentAvailability;

    // Save the updated driver
    await driver.save();

    // Send a success response as plain text for browser visibility
    res.send(`Driver availability updated. Current availability: ${driver.currentAvailability}`);
  } catch (error) {
    console.error('Error toggling availability:', error);
    res.status(500).send('Server error updating availability');
  }
};

// Fetch driver details by contact number
export const getDriverDetailsbyConctactNumber = async (req, res) => {
  const { contactNumber } = req.body;
  try {
    const drivers = await Driver.find({ contactNumber });
    if (drivers.length > 0) {
      return res.status(200).json({ drivers });
    }
    return res.status(404).json({ message: 'Driver not found' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};  

export const toggleAvailability = async (req, res) => {
  const { _id, currentAvailability } = req.body;
  try {
    await Driver.updateOne({ _id }, { currentAvailability });
    return res.status(200).json({ message: 'Driver availability updated' });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Server error' });
  }
};
