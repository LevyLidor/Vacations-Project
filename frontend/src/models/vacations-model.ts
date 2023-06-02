
interface VacationsModel {
    id: number;
    destination: string;
    description: string;
    startDate: Date | string;
    endDate: Date | string;
    price: number;
    imageName: string;
    image?: FileList 
    totalLikes?: number;
    userLikes?: number;
    refresh?: boolean;
    setRefresh: (e : boolean) => void;
}

export default VacationsModel;

