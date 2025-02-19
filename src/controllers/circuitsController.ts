import { Request, Response } from "express";
import Circuit from "../models/circuitModel";

export const getAllCircuits = async (req: Request, res: Response) => {
  try {
    const searchQuery = req.query.search as string | undefined;

    const searchCriteria = searchQuery
      ? {
          name: { $regex: searchQuery, $options: "i" },
        }
      : {};

    const circuits = await Circuit.find(searchCriteria);

    const formattedCircuits = circuits.map((circuit: any) => ({
      circuit_id: circuit.circuit_id,
      name: circuit.name,
      location: circuit.location,
      countryFlag: `https://purecatamphetamine.github.io/country-flag-icons/3x2/${circuit.location.country.toUpperCase()}.svg`,
      image: circuit.image,
      length_km: circuit.length_km,
      turns: circuit.turns,
    }));

    res.status(200).json(formattedCircuits);
  } catch (err) {
    res.status(500).json({
      message: err instanceof Error ? err.message : "Something went wrong",
    });
  }
};
