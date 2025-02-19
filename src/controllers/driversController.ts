import { Request, Response } from "express";
import Driver from "../models/driverModel"; // Zorg ervoor dat het juiste model wordt geïmporteerd

export const getAllDrivers = async (req: Request, res: Response) => {
  try {
    // Haal de search queryparameter op
    const searchQuery = req.query.search as string | undefined;

    // Stel de zoekcriteria in voor de query
    const searchCriteria = searchQuery
      ? {
          $or: [
            { givenName: { $regex: searchQuery, $options: "i" } }, // Case-insensitive zoeken op gegeven naam
            { familyName: { $regex: searchQuery, $options: "i" } }, // Case-insensitive zoeken op familienaam
          ],
        }
      : {}; // Als er geen zoekparameter is, haal alle coureurs op

    // Haal de drivers op uit de database met de zoekcriteria
    const drivers = await Driver.find(searchCriteria);

    // Bewerken van de response met de vlaggen-URL
    const formattedDrivers = drivers.map((driver) => ({
      driver_id: driver.driver_id,
      name: `${driver.givenName} ${driver.familyName}`, // Combineer givenName en familyName
      countryFlag: `https://purecatamphetamine.github.io/country-flag-icons/3x2/${driver.countryCode.toUpperCase()}.svg`, // Flag URL op basis van countryCode
      nationality: driver.nationality,
      image: driver.image,
      dateOfBirth: driver.dateOfBirth,
      url: driver.url,
    }));

    res.status(200).json(formattedDrivers); // Stuur de gefilterde en opgemaakte lijst van drivers
  } catch (err) {
    res.status(500).json({
      message: err instanceof Error ? err.message : "Something went wrong",
    });
  }
};
