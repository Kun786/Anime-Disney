const expres = require('express');
const Router = expres.Router();

const { AddPackage, GetPackages, DeletePackageById } = require(`../controllers/PackageManagementCOntroller`);
//Embdedded Data Route
Router.post('/AddPackage',AddPackage);
Router.get(`/GetPackages`,GetPackages);
Router.delete('/DeletePackage/:_Id',DeletePackageById);

module.exports = Router;