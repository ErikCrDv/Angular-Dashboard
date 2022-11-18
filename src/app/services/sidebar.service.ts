import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      title: 'MainDashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Home', url: '/' },
        { title: 'Progress', url: 'progress' },
        { title: 'Charts', url: 'grafica1' },
      ]
    }
  ]

  constructor() { }
}
