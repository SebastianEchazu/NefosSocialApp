import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService]
})
export class UsersComponent implements OnInit {

  public title: string;
  public url: string;
  public identity;
  public token;
  public page;
  public nextPage;
  public prevPage;
  public status: string;
  public total;
  public pages;
  public users: User[];
  public follows;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.title = 'Gente';
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log('users componente a sido cargado');
    this.actualPage();
  }

  actualPage() {
    this.route.params.subscribe(params => {
      let page = + params.page;
      this.page = page;
      if (!params.page) {
        page = 1;
      }
      if (!page) {
        page = 1;
      } else {
        this.nextPage = page + 1;
        this.prevPage = page - 1;
        if (this.prevPage <= 0) {
          this.prevPage = 1;
        }
      }
      // devoler listado de usuarios
      this.getUsers(page);
    });
  }

  getUsers(page) {
    this.userService.getUsers(page).subscribe(
      response => {
        if (!response.users) {
          this.status = 'error';
        } else {
          this.total = response.total;
          this.users = response.users;
          this.pages = response.pages;
          this.follows = response.users_following;
          
          page > this.pages ?  this.router.navigate(['/gente', 1]) : console.log(this.pages);
        }

      },
      error => {
        const errorMessage = error as any;
        console.log(errorMessage);

        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    );
  }

  public followUserOver;

  mouseEnter(user_id){
    this.followUserOver = user_id;
  }
  mouseLeave(user_id){
    this.followUserOver = 0;
  }

}
