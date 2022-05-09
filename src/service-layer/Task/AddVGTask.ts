import Videojuego from '../../domain-layer/entities/Videojuego';
import DatabaseConnection from '../../persistence-layer/DatabaseConnection';
import FindVGTask from "./FindVGTask";
import IAsyncTask from './IAsyncTask';

export type AddVGData = {
  Name: string,
  Year: string,
};

export default class AddVGTask implements IAsyncTask<Videojuego> {
  private addVGData: AddVGData;

  public constructor(addVGData: AddVGData) {
    this.addVGData = addVGData;
  }

  public async execute(): Promise<Videojuego> {
    const databaseConnection = await DatabaseConnection.getInstance();
    const VGRepository = databaseConnection.getRepository(Videojuego);

    const Videogame = VGRepository.save(this.addVGData);

    return Videogame;
  }
}

