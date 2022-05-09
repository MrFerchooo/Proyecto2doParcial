import VideoGame from '../../domain-layer/entities/Videojuego';
import DatabaseConnection from '../../persistence-layer/DatabaseConnection';
import IAsyncTask from './IAsyncTask';

export default class FindCarTask implements IAsyncTask<VideoGame> {
    private vgId: number;

    public constructor(vgId: number){
        this.vgId = vgId;
    }

    public async execute(): Promise<VideoGame> {
        const databaseConnection = await DatabaseConnection.getInstance();
        const carRepository = databaseConnection.getRepository(VideoGame);

        const car = await carRepository.findOneBy({ id: this.vgId });
        
        if(!car){
            throw new Error('Car not found');
        }

        return car;
    }
}
