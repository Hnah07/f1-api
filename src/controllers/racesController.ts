import { Request, Response } from "express";
import Driver from "../models/driverModel";
import { Race } from "../models/raceModel";
import { millisecondsToHours } from "date-fns";

export const getAllRaces = async (req: Request, res: Response) => {
  try {
    const races = await Race.find();
    // Step 2: Collect all unique driver_ids from all races' race_results
    const driverIds = races.flatMap((race) =>
      race.race_results.map((result) => result.driver_id)
    );
    // Step 3: Fetch all drivers based on the collected driver_ids
    const drivers = await Driver.find({ driver_id: { $in: driverIds } });
    // Step 4: Create a lookup map for easy access to driver details
    const driverMap = new Map();
    drivers.forEach((driver) => {
      driverMap.set(driver.driver_id, driver);
    });
    // Step 5: Merge driver details into race results for all races
    const racesWithDriverDetails = races.map((race) => {
      const raceResultsWithDriverDetails = race.race_results.map((result) => {
        const driverDetails = driverMap.get(result.driver_id);

        // Add driver details to each race result
        return {
          ...result.toObject(), // Convert Mongoose document to plain JavaScript object
          driver_id: driverDetails
            ? {
                driver_id: driverDetails.driver_id,
                name: driverDetails.givenName + " " + driverDetails.familyName,
                team: driverDetails.team,
                nationality: driverDetails.nationality,
                countryFlag: `https://purecatamphetamine.github.io/country-flag-icons/3x2/${driverDetails.countryCode.toUpperCase()}.svg`,
              }
            : null,
        };
      });
      // Return the race with merged race results
      return {
        ...race.toObject(), // Convert the race document to a plain object
        race_results: raceResultsWithDriverDetails,
      };
    });
    res.status(200).json(racesWithDriverDetails);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};
