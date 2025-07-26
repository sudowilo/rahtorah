import { promises as fs } from "fs";
import path from "path";

const getData = async () => {
  const dirname = import.meta.dirname;
  const dataDir = path.join(dirname, "../lib");
  const citiesPath = path.join(dataDir, "iran-cities.json");
  const provincesPath = path.join(dataDir, "iran-provinces.json");

  const citiesJson = await fs.readFile(citiesPath, "utf8");
  const provincesJson = await fs.readFile(provincesPath, "utf8");

  const cities = await JSON.parse(citiesJson);
  const provinces = JSON.parse(provincesJson);

  return { cities, provinces };
};
const { cities, provinces } = await getData();

export const validateCity = (fullName) => {
  const [province, city] = fullName.split("/");

  const validCity = cities.some((item) => item.name === city);
  const validProvince = provinces.some((item) => item.name === province);

  return validCity && validProvince;
};
