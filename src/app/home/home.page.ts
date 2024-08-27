import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonRange, IonLabel, AlertController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonRange, FormsModule, IonLabel],
})
export class HomePage {
  height: number = 100;
  weight: number = 30;

  constructor(private alertController: AlertController) {}

  onRangeChange(event: any) {
    this.height = event.detail.value;
  }

  onRangeChange1(event: any) {
    this.weight = event.detail.value;
  }

  calculateBMI(): number {
    const heightInMeters = this.height / 100;
    return this.weight / (heightInMeters * heightInMeters);
  }

  statusBMI(): string {
    const bmi = this.calculateBMI();
    if (bmi < 18.5) {
      return 'Underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
      return 'Normal';
    } else if (bmi >= 25 && bmi < 30) {
      return 'Overweight';
    } else {
      return 'Obesity';
    }
  }

  async presentAlert() {
    const bmi = this.calculateBMI();
    const bmiStatus = this.statusBMI();
    const alert = await this.alertController.create({
      header: 'BMI Result',
      subHeader: `Your BMI is ${bmi.toFixed(2)}`,
      message: `Your BMI status is: ${bmiStatus}`,
      buttons: ['OK']
    });
    await alert.present();
  }
}
