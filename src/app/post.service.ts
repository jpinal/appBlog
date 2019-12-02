import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Post } from './post/post';

const apiUrl = 'http://localhost:3000/api/post/';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(apiUrl)
      .pipe(
        tap(_ => this.log('Buscando Publicaciones')),
        catchError(this.handleError('getPosts', []))
      );
  }

  getPost(id: any): Observable<Post> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Post>(url).pipe(
      tap(_ => console.log(`Publicado por id=${id}`)),
      catchError(this.handleError<Post>(`getPost id=${id}`))
    );
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(apiUrl, post).pipe(
      tap((prod: Post) => console.log(`Publicación añadida por w/ id=${post.id}`)),
      catchError(this.handleError<Post>('addPost'))
    );
  }

  updatePost(id: any, post: Post): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, post).pipe(
      tap(_ => console.log(`Publicación actualizada id=${id}`)),
      catchError(this.handleError<any>('updatePost'))
    );
  }

  deletePost(id: any): Observable<Post> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Post>(url).pipe(
      tap(_ => console.log(`Publicación borrada id=${id}`)),
      catchError(this.handleError<Post>('deletePost'))
    );
  }

  private handleError<T>(operation = 'En funcionamiento', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}

