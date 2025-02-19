import { Request, Response } from "express";
import Team from "../models/teamModel";

export const getAllTeams = async (req: Request, res: Response) => {
  try {
    const teams = await Team.find().populate({
      path: "drivers",
      select: "name countryCode",
    });

    if (!teams || teams.length === 0) {
      res.status(404).json({ message: "No teams found." });
    }

    const formattedTeams = teams.map((team) => ({
      team_id: team.team_id,
      name: team.name,
      principal: team.principal,
      base: team.base,
      founded_year: team.founded_year,
      engine: team.engine,
      image: team.image,
      drivers: team.drivers.map((driver: any) => ({
        name: driver.name,
        countryFlag: `https://purecatamphetamine.github.io/country-flag-icons/3x2/${driver.countryCode.toUpperCase()}.svg`,
      })),
    }));

    res.status(200).json(formattedTeams);
  } catch (err) {
    res.status(500).json({
      message: err instanceof Error ? err.message : "Something went wrong",
    });
  }
};
