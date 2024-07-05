import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Medicament } from 'src/app/classes/medicament.model';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: { medicament: Medicament, quantity: number }[] = [];
  user = { id: 1, name: 'John Doe', email: 'john.doe@example.com' }; // Replace with actual user data
  shippingAddress = ''; // Initialize with an empty string
  showAddressInput = false; // Flag to show/hide the address input
  factureVisible: boolean = false; // Initialize as false
  commandeResponse: any; // Variable to store the response from createCommande
  totalCartPrice: number = 0; // Initialize with 0

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.updateTotalCartPrice(); // Update total price initially

  }

  removeFromCart(item: { medicament: Medicament, quantity: number }): void {
    this.cartService.removeFromCart(item.medicament);
    this.cart = this.cartService.getCart();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.cart = [];
    this.updateTotalCartPrice(); // Update total price after clearing cart

  }

  updateTotalCartPrice(): void {
    this.totalCartPrice = this.calculateTotalCartPrice();
  }

  calculateTotalCartPrice(): number {
    return this.cart.reduce((total, item) => total + (item.quantity * item.medicament.prix), 0);
  }

  getMedicamentImageUrl(medicament: Medicament): string {
    return `data:image/jpeg;base64,${medicament.photo}`;
  }

  showAddressForm(): void {
    this.showAddressInput = true;
  }

  createCommande(): void {
    if (!this.shippingAddress) {
      console.error('Shipping address is required');
      return;
    }
  
    const ligneDeCommandes = this.cart.map(item => ({
      medicament: item.medicament,
      quantite: item.quantity
    }));
  
    const commandeRequest = {
      utilisateur: this.user,
      shippingAddress: this.shippingAddress,
      ligneDeCommandes: ligneDeCommandes
    };
  
    console.log('Sending commandeRequest:', commandeRequest);
  
    this.cartService.createCommande(commandeRequest).subscribe(
      response => {
        console.log('Commande created successfully:', response);
        this.commandeResponse = response; // Store response to access ligneDeCommandes
        this.clearCart();
        this.showAddressInput = false;
        this.factureVisible = true;
      },
      error => {
        console.error('Error creating commande:', error);
      }
    );
  }
  
calculateFactureTotal(): number {
  if (this.commandeResponse && this.commandeResponse.ligneDeCommandes) {
    return this.commandeResponse.ligneDeCommandes.reduce((total, item) => {
      return total + (item.quantite * item.medicament.prix);
    }, 0);
  }
  return 0;
}

  downloadFacturePDF(): void {
    const factureContent = document.getElementById('facture-content');
    const doc = new jsPDF();

    html2canvas(factureContent, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;

      doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      doc.save(`facture.pdf`); // Adjust to use the correct commande ID or another identifier
    }).catch(error => {
      console.error('Error generating PDF:', error);
    });
  }

  generatePDF(commande): void {
    const doc = new jsPDF();

    const content = document.getElementById('facture-content');
    setTimeout(() => {
      html2canvas(content, { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = canvas.height * imgWidth / canvas.width;

        doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        doc.save(`facture_${commande.id}.pdf`);
      }).catch(error => {
        console.error('Error generating PDF:', error);
      });
    }, 500); // Delay of 500ms
  }
}
