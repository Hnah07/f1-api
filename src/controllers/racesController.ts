import { Request, Response } from "express";
import Driver from "../models/driverModel";
import Race from "../models/raceModel";

export const getAllRaces = async (req: Request, res: Response) => {
  try {
    const races = await Race.find();

    const driverIds = races.flatMap((race) =>
      race.race_results.map((result) => result.driver_id)
    );

    const drivers = await Driver.find({ driver_id: { $in: driverIds } });

    const driverMap = new Map();
    drivers.forEach((driver) => {
      driverMap.set(driver.driver_id, driver);
    });

    const formatTimes = req.query.format === "true"; // Controleer of tijdformattering vereist is

    const racesWithDriverDetails = races.map((race) => {
      const raceResultsWithDriverDetails = race.race_results.map(
        (result, index) => {
          const driverDetails = driverMap.get(result.driver_id);

          let formattedTime: string | number = result.time;

          if (formatTimes && result.time !== null) {
            if (index === 0) {
              // ✅ Positie 1: uren:minuten:seconden.millis
              const hours = Math.floor(result.time / 3600000);
              const minutes = Math.floor((result.time % 3600000) / 60000);
              const seconds = Math.floor((result.time % 60000) / 1000);
              const millis = (result.time % 1000).toString().padStart(3, "0");
              formattedTime = `${hours}:${minutes
                .toString()
                .padStart(2, "0")}:${seconds
                .toString()
                .padStart(2, "0")}.${millis}`;
            } else if (index < 3) {
              // ✅ Posities 2 en 3: seconden.millis
              formattedTime = (result.time / 1000).toFixed(3);
            }
          }

          return {
            ...result.toObject(),
            time: formattedTime,
            driver_id: driverDetails
              ? {
                  driver_id: driverDetails.driver_id,
                  name: `${driverDetails.givenName} ${driverDetails.familyName}`,
                  team: driverDetails.team,
                  nationality: driverDetails.nationality,
                  countryFlag: `https://purecatamphetamine.github.io/country-flag-icons/3x2/${driverDetails.countryCode}.svg`,
                }
              : null,
          };
        }
      );

      return {
        ...race.toObject(),
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
