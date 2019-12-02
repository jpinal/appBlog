import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post/post';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  post: Post = { //variables de objetos Post
    category: '',
    id: '',
    postTitle: '',
    postAuthor: '',
    postDesc: '',
    postContent: '',
    postReference: '',
    postImgUrl: '',
    created: null,
    updated: null
  };
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private api: HomeService, private router: Router) { }

  ngOnInit() {
    this.getPostDetails(this.route.snapshot.params.id);
  }

  getPostDetails(id: any) { //Llamada a REST API para obtener los datos de la publicación por ID
    this.api.getPost(id)
      .subscribe((data: any) => {
        this.post = data;
        console.log(this.post);
        this.isLoadingResults = false;
      });
  }

}
