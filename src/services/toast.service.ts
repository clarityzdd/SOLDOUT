import {Injectable} from "@angular/core";
import {ToastController} from "ionic-angular";


@Injectable()
export class ToastService {

  constructor(private toast: ToastController) {

  }

  show(message: string, duration: number = 8000) {
    return this.toast
      .create({
        message,
        duration
      }).present();
  }
}
