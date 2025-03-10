import { Injectable } from "@angular/core";
import Swal from 'sweetalert2';
@Injectable({
    providedIn: 'root',
  })


  export class AlertManager{
    
  showConfirmAlert(text: string, title: string, img?:string): Promise<any> {
    return Swal.fire({
      title: title,
      text: text,
      icon: img ? undefined : 'warning', 
      imageUrl: img,
        imageWidth: 300,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      customClass: {
        confirmButton: 'btn-confirm',  
        cancelButton: 'btn-cancel'    
      },
      reverseButtons: true,
    });
  }

  successAlert(text: string):Promise<any> {
    return Swal.fire({
      icon: 'success',
      title: 'Operación exitosa',
      text: text,
      confirmButtonText:'Aceptar',
    });
  }

 errorAlert(text: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: text,
      confirmButtonText: 'Aceptar',
    });
  }
  }

