import { ShortUrlService } from './../../services/short-url.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-short-url',
  templateUrl: './short-url.component.html',
  styleUrls: ['./short-url.component.css']
})
export class ShortUrlComponent {
  nombreUrl: string;
  urlShort: string;
  urlProcesada: boolean;
  loading: boolean;
  mostrarError: boolean;
  textError: string;

  constructor(private _shortUrlServices: ShortUrlService) {
    this.nombreUrl = ''
    this.urlShort = '';
    this.urlProcesada = false;
    this.loading = false;
    this.mostrarError = false;
    this.textError = ''
  }
  procesarUrl() {

    if (this.nombreUrl === '') {
      this.error('Por favor ingrese una url')
      return;
    }
    setTimeout(() => {
      this.obtenerUrlShort()
    }, 2000)

  }
  obtenerUrlShort() {
    this.loading = true
    this._shortUrlServices.getUrlShort(this.nombreUrl).subscribe(data => {
      this.loading = false;
      this.urlProcesada = true;
      this.urlShort = data.link
    }, error => {
      this.loading = false;
      this.nombreUrl=''
      if (error.error.description === 'The value provided is invalid.') {
        this.error('La url ingresada es incorrecta')
      }
    })
  }
  error(valor: string) {
    this.mostrarError = true
    this.textError = valor
    setTimeout(() => {
      this.mostrarError = false;
    }, 4000)
  }
}
