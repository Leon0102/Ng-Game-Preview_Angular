import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  gameRating = 0;
  gameId!: string;
  game!: Game;
  routeSub!: Subscription;
  gameSub!: Subscription;


  constructor(
    private acitevatedRoute: ActivatedRoute,
    private httpService: HttpService,
  ) { }



  ngOnInit(): void {
    this.routeSub = this.acitevatedRoute.params.subscribe((params) => {
      this.gameId = params['id'];
      this.getGameDetails(this.gameId);
    });
  }

  getGameDetails(gameId: string): void {
    this.gameSub = this.httpService.getGameDetails(gameId).subscribe((data: Game) => {
      this.game = data;
      setTimeout(() => {
        this.gameRating = this.game.metacritic;
      }, 1000);
    }
    );
  }


  getColor(value: number): string {
    if (value >= 75) {
      return '#5ee432';
    }
    else if (value >= 50) {
      return 'fffa50';
    }
    else if (value >= 30) {
      return '#f7aa38';
    }
    else {
      return '#ef4655';
    }
  }

  ngOnDestroy(): void {
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
