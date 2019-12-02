import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from './category/category';
import { HomeService } from './home.service';  // Servicio de inicio de sesión
import { AuthService } from './auth.service'; // Servicio de autenticación


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'blog';
  categories: Category[] = []; // matriz de categorías
  loginStatus = false; // Estado de conexión del usuario

  constructor(private api: HomeService, private authService: AuthService, private router: Router) { }


  ngOnInit() {
    /*Verificación del estado de login
    this.authService.isLoggedIn.subscribe((status: any) => {
      if (status === true) {
        this.loginStatus = true;
      } else {
        this.loginStatus = false;
      }
    });*/
    //Carga de categorías desde la API REST
    this.api.getCategories()
      .subscribe((res: any) => {
        this.categories = res;
        console.log(this.categories);
      }, err => {
        console.log(err);
      });
  }
  //Cerrar la aplicación
  logout() {
    this.authService.logout()
      .subscribe((res: any) => {
        this.router.navigate(['/']);
      }, err => {
        console.log(err);
      });
  }
}
