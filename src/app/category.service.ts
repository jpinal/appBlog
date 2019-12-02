import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  getCategory: any;
  deleteCategory: any;
  addCategory: any;
  updateCategory: any;
  getCategories: any;

  constructor() { }
}
