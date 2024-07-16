import { Component, OnInit, ViewChild } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Medicament } from 'src/app/classes/medicament.model';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { MatStepper } from '@angular/material/stepper';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;

  cart: { medicament: Medicament, quantity: number }[] = [];
  shippingAddress = '';
  factureVisible: boolean = false;
  selectedPaymentMethod: 'delivery' | 'online' | null = null;
  commandeResponse: any = null;
  totalCartPrice: number = 0;
  totalCommande: number = 0;
  commandeID: number = 0;
  paymentInfo: any = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    note: ''
  };
  user = { id: 1, name: "Soulayma ben dahsen", email: "souleima.bendahsen@gmail.com" };

  paymentResponse: any = {};
  address = {
    postalCode: '',
    street: '',
    city: '',
    country: ''
    // Add more fields as needed
  };
  constructor(private cartService: CartService, private http: HttpClient, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.updateTotalCartPrice();
  }

  nextStep(form: NgForm): void {
    if (form.valid) {
      this.shippingAddress = `${this.address.postalCode} ${this.address.street}, ${this.address.city}, ${this.address.country}`;
      this.stepper.next();
    }
  }

  removeFromCart(item: { medicament: Medicament, quantity: number }): void {
    this.cartService.removeFromCart(item.medicament);
    this.cart = this.cartService.getCart();
    this.updateTotalCartPrice();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.cart = [];
    this.updateTotalCartPrice();
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

  selectPaymentMethod(method: 'delivery' | 'online'): void {
    this.selectedPaymentMethod = method;
    if (method === 'delivery') {
      this.createCommande();
      this.stepper.next();
      this.stepper.next();
    } else if (method === 'online') {
      this.createCommande();
      this.stepper.next();
    }
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
    this.totalCommande = this.totalCartPrice;

    this.cartService.createCommande(commandeRequest).subscribe(
      (response: any) => {
        console.log('Commande created successfully:', response);
        this.commandeID = response.id;
        this.commandeResponse = response;
        this.clearCart();
        this.factureVisible = true;
      },
      (error) => {
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
      doc.save(`facture.pdf`);
    }).catch(error => {
      console.error('Error generating PDF:', error);
    });
  }

  initiateOnlinePayment(): void {
    const apiUrl = 'https://sandbox.paymee.tn/api/v2/payments/create';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token 46c755955f7ff6a4b19e87e87712e019c9b330af'
    });
  
    console.log('Total Cart Price before initiating payment:', this.totalCommande);
  
    const requestBody = {
      amount: this.totalCommande,
      note: this.paymentInfo.note,
      first_name: this.paymentInfo.first_name,
      last_name: this.paymentInfo.last_name,
      email: this.paymentInfo.email,
      phone: this.paymentInfo.phone,
      return_url: 'https://monumental-conkies-7d71c0.netlify.app/',
      cancel_url: 'https://moonlit-dango-3a38c3.netlify.app/',
      webhook_url: 'https://localhost:8080/paymee-webhook/handle',
      order_id: this.commandeID
    };
  
    console.log('Request body:', requestBody);
  
    this.http.post(apiUrl, requestBody, { headers }).subscribe(
      (response: any) => {
        if (response.status === true && response.data && response.data.token) {
          this.paymentResponse = response.data;
  
          // Open the payment URL in a new tab
          const paymentWindow = window.open(response.data.payment_url, '_blank');
  
          if (paymentWindow) {
            // Periodically check if the new tab is closed
            const interval = setInterval(() => {
              if (paymentWindow.closed) {
                clearInterval(interval);
                console.log('Payment tab closed');
                this.callBackendApi(response.data.token, true, this.commandeID.toString());
              }
            }, 500); // Check every 500 milliseconds
          } else {
            console.error('Failed to open payment URL in a new tab');
          }
        } else {
          console.error('Invalid response format - token not found:', response);
        }
      },
      (error) => {
        console.error('Error initiating payment:', error);
      }
    );
  }
  

  callBackendApi(token: string, paymentStatus: boolean, orderId: string): void {
    const calculateChecksumUrl = 'http://localhost:8081/paymee-webhook/calculate-checksum';

    const requestBody = {
      token: token,
      payment_status: paymentStatus,
      order_id: orderId,
    };

    this.http.post<{ checksum: string }>(calculateChecksumUrl, requestBody).subscribe(
      (checksumResponse) => {
        const checksum = checksumResponse.checksum;
        const backendApiUrl = 'http://localhost:8081/paymee-webhook/handle';
        const backendRequestBody = {
          token: token,
          check_sum: checksum,
          payment_status: paymentStatus,
          order_id: orderId,
        };

        this.http.post(backendApiUrl, backendRequestBody).subscribe(
          (response: any) => {
            console.log('Payment confirmation response:', response);
            this.stepper.next();

            if (paymentStatus) {
              this._snackBar.open('Paiement effectué avec succès!', 'Fermer', {
                duration: 5000,
                panelClass: ['success-snackbar']
              });
            } else {
              this._snackBar.open('Échec du paiement. Veuillez réessayer.', 'Fermer', {
                duration: 5000,
                panelClass: ['error-snackbar']
              });
            }
          },
          (error) => {
            console.error('Error confirming payment:', error);
            this._snackBar.open('Erreur lors de la confirmation du paiement.', 'Fermer', {
              duration: 5000,
              panelClass: ['error-snackbar']
            });
          }
        );
      },
      (error) => {
        console.error('Error calculating checksum:', error);
        this._snackBar.open('Erreur lors du calcul du checksum.', 'Fermer', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    );
  }
}
