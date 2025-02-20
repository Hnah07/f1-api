import { Request, Response } from "express";
import Team from "../models/teamModel";
import Driver from "../models/driverModel";

export const getAllTeams = async (req: Request, res: Response) => {
  try {
    const teams = await Team.find();

    if (!teams || teams.length === 0) {
      return res.status(404).json({ message: "No teams found." });
    }

    // ✅ Verzamel alle unieke driver_id's uit alle teams
    const driverIds = teams.flatMap((team) =>
      team.drivers.map((driver) => driver.driver_id)
    );

    // ✅ Haal alle driver gegevens op
    const drivers = await Driver.find({ driver_id: { $in: driverIds } });

    // ✅ Maak een lookup-map voor snelle toegang tot driver-informatie
    const driverMap = new Map();
    drivers.forEach((driver) => {
      driverMap.set(driver.driver_id, driver);
    });

    // ✅ Formatteer teams met volledige driver-informatie
    const formattedTeams = teams.map((team) => ({
      team_id: team.team_id,
      name: team.name,
      principal: team.principal,
      base: team.base,
      founded_year: team.founded_year,
      engine: team.engine,
      image: team.image,
      drivers: team.drivers
        .map((driver) => {
          const driverDetails = driverMap.get(driver.driver_id);
          return driverDetails
            ? {
                driver_id: driver.driver_id,
                name: `${driverDetails.givenName} ${driverDetails.familyName}`,
                nationality: driverDetails.nationality,
                countryFlag: `https://purecatamphetamine.github.io/country-flag-icons/3x2/${driverDetails.countryCode.toUpperCase()}.svg`,
              }
            : null;
        })
        .filter(Boolean), // 🔹 Verwijder null-waarden (indien een driver niet wordt gevonden)
    }));

    res.status(200).json(formattedTeams);
  } catch (err) {
    res.status(500).json({
      message: err instanceof Error ? err.message : "Something went wrong",
    });
  }
};
