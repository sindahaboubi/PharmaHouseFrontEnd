export class Medicament {
  id: number;
  titre: string;
  description: string;
  dateExpiration: Date;
  prix: number;
  quantite: number;
  fabricant: string;
  dosage: string;
  unite: any; // Define the type as per your Unite entity in Spring Boot
  photo: string; // Assuming you are handling the image as a Base64 string
}
